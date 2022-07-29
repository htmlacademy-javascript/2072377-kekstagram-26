import {isEscapeKey} from './util.js';
import {sendFotoToServer} from './network.js';
import {showSuccessLoadMessage, showErrorLoadPhotoMessage} from './modal-windows.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const MAX_LENGTH_COMMENT = 140;

const uploadFile = document.querySelector('#upload-file');
const cancelBtnEditingForm = document.querySelector('#upload-cancel');
const imageEditingForm = document.querySelector('.img-upload__form');
const imagePreviewEditingForm = document.querySelector('.img-upload__overlay');
const zoonInput = document.querySelector('.scale__control--value');
const zoomInBtn = document.querySelector('.scale__control--bigger');
const zoomOutBtn = document.querySelector('.scale__control--smaller');
const previewImage = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const submitButton = document.querySelector('#upload-submit');
const pristine = new Pristine(imageEditingForm);
const uploadEffectLevel = imagePreviewEditingForm.querySelector('.img-upload__effect-level');

function initUploadFileForm() {
  uploadFile.addEventListener('change', feelClickOnUploadFile);
  pristine.addValidator(imageEditingForm.querySelector('.text__hashtags'), validateHashtag, 'Хештег должен начинаться с # и содержать от 1 до 19 букв');
  pristine.addValidator(imageEditingForm.querySelector('.text__description'), validateTextComment, 'Максимальная блинна комментария - 140 символов.');
}

function feelClickOnUploadFile() {
  showImgInPreview();
  uploadEffectLevel.classList.add('hidden');
  imagePreviewEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', closeImageEditingForm);
  cancelBtnEditingForm.addEventListener('click', closeImageEditingForm);
  zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn.addEventListener('click', zoomOut);
  for (const effect of effectsList.querySelectorAll('.effects__label')) {
    effect.addEventListener('click', chooseEffect);
  }
}

function closeImageEditingForm(evt) {
  if(!(document.activeElement.matches('.text__hashtags') || document.activeElement.matches('.text__description')) &&
      (isEscapeKey(evt) || evt.target.matches('#upload-cancel') || evt.type === 'submit')) {
    evt.preventDefault();
    document.querySelector('body').classList.remove('modal-open');
    imagePreviewEditingForm.classList.add('hidden');
    previewImage.classList.remove(effectsList.querySelector(`.effects__preview--${effectsList.querySelector('input:checked').value}`).classList[1]);
    effectLevelValue.value = '';
    previewImage.style.filter = '';
    previewImage.style.transform = '';
    document.removeEventListener('keydown', closeImageEditingForm);
    effectsList.querySelector('input:checked').removeAttribute('checked');
    effectsList.querySelector('#effect-none').setAttribute('checked','');
    zoomInBtn.removeEventListener('change', zoomIn);
    zoomOutBtn.removeEventListener('change', zoomOut);
    cancelBtnEditingForm.removeEventListener('click', closeImageEditingForm);
    for (const effect of effectsList.querySelectorAll('.effects__label')) {
      effect.removeEventListener('click', chooseEffect);
    }
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
    imageEditingForm.reset();
  }
}

function blockSubmitButton() {
  submitButton.disabled = true;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
}

imageEditingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendFotoToServer(
      () => {
        closeImageEditingForm(evt);
        showSuccessLoadMessage();
        unblockSubmitButton();
      },
      () => {
        document.removeEventListener('keydown', closeImageEditingForm);
        showErrorLoadPhotoMessage();
        unblockSubmitButton();
      },
      new FormData(imageEditingForm),
    );
  }
});

function zoomIn() {
  let currentValue = zoonInput.value.substring(0, zoonInput.value.length-1);
  currentValue = +currentValue >= 100 ? 100 : +currentValue + 25;
  previewImage.querySelector('img').style.transform = `scale(${(+currentValue/100).toFixed(2)})`;
  zoonInput.value = `${currentValue}%`;
}

function zoomOut() {
  let currentValue = zoonInput.value.substring(0, zoonInput.value.length-1);
  currentValue = +currentValue <= 25 ? 25 : +currentValue - 25;
  previewImage.querySelector('img').style.transform = `scale(${(+currentValue/100).toFixed(2)})`;
  zoonInput.value = `${currentValue}%`;
}

function chooseEffect(evt) {
  let targetClassName = '';
  if (evt.target.classList[0] === 'effects__label') {
    targetClassName = evt.target.querySelector('.effects__preview').classList[1];
  } else {
    targetClassName = evt.target.classList[1];
  }
  if (targetClassName) {
    for (const className of previewImage.classList) {
      if (className.includes('effects__preview')) {
        previewImage.classList.remove(className);
      }
    }
    effectsList.querySelector('input:checked').removeAttribute('checked');
    effectsList.querySelector(`#effect-${targetClassName.split('--')[1]}`).setAttribute('checked','');
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
    uploadEffectLevel.classList.remove('hidden');
    switch (targetClassName) {
      case 'effects__preview--none':
        previewImage.style.filter = '';
        effectLevelValue.value = '';
        uploadEffectLevel.classList.add('hidden');
        break;
      case 'effects__preview--chrome':
        getSlider(0, 1, 1, 0.1, 1);
        effectLevelValue.value = 1;
        slider.noUiSlider.on('update', () => {
          effectLevelValue.value = slider.noUiSlider.get();
          previewImage.style.filter = `grayscale(${effectLevelValue.value})`;
        });
        break;
      case 'effects__preview--sepia':
        getSlider(0, 1, 1, 0.1, 1);
        effectLevelValue.value = 1;
        slider.noUiSlider.on('update', () => {
          effectLevelValue.value = slider.noUiSlider.get();
          previewImage.style.filter = `sepia(${effectLevelValue.value})`;
        });
        break;
      case 'effects__preview--marvin':
        getSlider(0, 100, 100, 1, 0);
        effectLevelValue.value = 100;
        slider.noUiSlider.on('update', () => {
          effectLevelValue.value = slider.noUiSlider.get();
          previewImage.style.filter = `invert(${effectLevelValue.value}%)`;
        });
        break;
      case 'effects__preview--phobos':
        getSlider(0, 3, 3, 0.1, 1);
        effectLevelValue.value = 3;
        slider.noUiSlider.on('update', () => {
          effectLevelValue.value = slider.noUiSlider.get();
          previewImage.style.filter = `blur(${effectLevelValue.value}px)`;
        });
        break;
      case 'effects__preview--heat':
        getSlider(0, 3, 3, 0.1, 1);
        effectLevelValue.value = 3;
        slider.noUiSlider.on('update', () => {
          effectLevelValue.value = slider.noUiSlider.get();
          previewImage.style.filter = `brightness(${effectLevelValue.value})`;
        });
        break;
    }
    previewImage.classList.add(targetClassName);
  }
}

function getSlider(minValue, maxValue, start, step, fix) {
  noUiSlider.create(slider, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: start,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(fix);
        }
        return value.toFixed(fix);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
}

function validateHashtag(value) {
  const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,19}$');
  if ((value.match(/#/g) || []).length > MAX_HASHTAG_COUNT) {
    return false;
  }
  const hashtags = value.split(' ');
  hashtags.sort();
  for (let i = 0; i < hashtags.length-1; i++) {
    if (hashtags[i] === '') {
      continue;
    }
    if (hashtags[i + 1].trim().toLowerCase() === hashtags[i].trim().toLowerCase()) {
      return false;
    }
  }
  return hashtags.every((elem) => (re.test(elem.trim()) || elem.trim() === '') || !value);
}

function validateTextComment(value) {
  return value.length <= MAX_LENGTH_COMMENT || !value;
}

function showImgInPreview() {
  const preview = previewImage.querySelector('img');
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

export {closeImageEditingForm, initUploadFileForm};
