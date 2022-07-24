import {isEscapeKey} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const cancelBtnEditingForm = document.querySelector('#upload-cancel');
const imageEditingForm = document.querySelector('.img-upload__form');
const imagePreviewEditingForm = document.querySelector('.img-upload__overlay');
//const previewImage = document.querySelector('.img-upload__preview');

const pristine = new Pristine(imageEditingForm);

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
}

function closeImageEditingForm(event) {
  if(!(document.activeElement.matches('.text__hashtags') || document.activeElement.matches('.text__description')) &&
      (isEscapeKey(event) || (event.target.matches('#upload-cancel')))) {
    event.preventDefault();
    imagePreviewEditingForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
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
