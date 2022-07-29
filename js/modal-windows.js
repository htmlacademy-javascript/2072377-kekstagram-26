import {isEscapeKey} from './util.js';
import {closeImageEditingForm} from './form.js';

let errorWindow;

function showSuccessLoadMessage(){
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  successMessage.addEventListener('click', cloceLoadMessageSuccess);
  document.addEventListener('keydown', cloceLoadMessageSuccess);
  document.querySelector('body').appendChild(successMessage);
}

function cloceLoadMessageSuccess(evt) {
  if (document.querySelector('.success') && (isEscapeKey(evt)) || evt.target.classList[0] === 'success__button' || evt.target.classList[0] === 'success') {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', cloceLoadMessageSuccess);
  }
}

function cloceLoadMessageError(evt) {
  if (document.querySelector('.error') && isEscapeKey(evt) || (evt.target.classList[0] === 'error__button' || evt.target.classList[0] === 'error')) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', cloceLoadMessageError);
    document.addEventListener('keydown', closeImageEditingForm);
  }
}

function showErrorLoadPhotoMessage() {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  error.addEventListener('click', cloceLoadMessageError);
  document.addEventListener('keydown', cloceLoadMessageError);
  document.querySelector('body').appendChild(error);
}

function showErrorMessage(message) {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true); // ну почти сам...)
  error.querySelector('h2').textContent = 'Изображения не загрузились';
  error.querySelector('button').classList.add('hidden');
  const element = document.createElement('p');
  element.textContent = message;
  error.querySelector('.error__inner').appendChild(element);
  document.querySelector('.img-upload__form').appendChild(error);
  errorWindow = error;
  setTimeout(removeErrorWindow, 5000);
}

function removeErrorWindow() {
  if (errorWindow){
    errorWindow.remove();
  }
}

export {showErrorMessage, showSuccessLoadMessage, showErrorLoadPhotoMessage};
