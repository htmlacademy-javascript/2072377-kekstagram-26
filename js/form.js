import {isEscapeKey} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const cancelBtnEditingForm = document.querySelector('#upload-cancel');
const imageEditingForm = document.querySelector('.img-upload__form');
const imagePreviewEditingForm = document.querySelector('.img-upload__overlay');
const zoonInput = document.querySelector('.scale__control--value');
const zoomInBtn = document.querySelector('.scale__control--bigger');
const zoomOutBtn = document.querySelector('.scale__control--smaller');
const previewImage = document.querySelector('.img-upload__preview');
const pristine = new Pristine(imageEditingForm);
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

uploadFile.addEventListener('change', feelClickOnUploadFile);


function feelClickOnUploadFile() {
  /*const img = previewImage.querySelector('img');
  const file = uploadFile.files[0];
  if (!file.type.startsWith('image/')){ return; }
  img.file = file;
  const reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);*/
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

function closeImageEditingForm(event) {
  if(!(document.activeElement.matches('.text__hashtags') || document.activeElement.matches('.text__description')) &&
      (isEscapeKey(event) || (event.target.matches('#upload-cancel')))) {
    event.preventDefault();
    imagePreviewEditingForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    zoomInBtn.removeEventListener('change', zoomIn);
    zoomOutBtn.removeEventListener('change', zoomOut);
    for (const effect of effectsList.querySelectorAll('.effects__label')) {
      effect.removeEventListener('click', chooseEffect);
    }
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
    effectLevelValue.value = '';
    previewImage.style.filter = '';
    previewImage.classList.remove(effectsList.querySelector(`.effects__preview--${  effectsList.querySelector('input:checked').value}`).classList[1]);
    effectsList.querySelector('input:checked').removeAttribute('checked');
    effectsList.querySelector('#effect-none').setAttribute('checked','');
    document.removeEventListener('keydown', closeImageEditingForm);
    cancelBtnEditingForm.removeEventListener('click', closeImageEditingForm);
    imageEditingForm.reset();
  }
}

imageEditingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    imageEditingForm.submit();
  }
});

function zoomIn() {
  let currentValue = zoonInput.value.substring(0, zoonInput.value.length-1);
  currentValue = +currentValue >= 100 ? 100 : +currentValue + 25;
  previewImage.style.transform = `scale(${(+currentValue/100).toFixed(2)})`;
  zoonInput.value = `${currentValue}%`;
}

function zoomOut() {
  let currentValue = zoonInput.value.substring(0, zoonInput.value.length-1);
  currentValue = +currentValue <= 25 ? 25 : +currentValue - 25;
  previewImage.style.transform = `scale(${(+currentValue/100).toFixed(2)})`;
  zoonInput.value = `${currentValue}%`;
}

function chooseEffect(event) {
  let targetClassName = '';
  if (event.target.classList[0] === 'effects__label') {
    targetClassName = event.target.querySelector('.effects__preview').classList[1];
  } else {
    targetClassName = event.target.classList[1];
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
    switch (targetClassName) {
      case 'effects__preview--none':
        previewImage.style.filter = '';
        effectLevelValue.value = '';
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
      default:
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
