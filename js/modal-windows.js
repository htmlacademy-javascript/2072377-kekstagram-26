import {isEscapeKey} from './util.js';
import {closeImageEditingForm} from './form.js';

export {showErrorMessage, showSuccessLoadMessage, showErrorLoadPhotoMessage};

let errorWindow;

function showSuccessLoadMessage(){
  const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  successMessage.addEventListener('click', cloceLoadMessage);
  document.addEventListener('keydown', cloceLoadMessage);
  document.querySelector('body').appendChild(successMessage);
}

function cloceLoadMessage(event) {
  if (document.querySelector('.success') && (isEscapeKey(event) || event.target.classList[0] === 'success__button' || event.target.classList[0] === 'success')) {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', cloceLoadMessage);
    return;
  }
  if (document.querySelector('.error') && isEscapeKey(event) || (event.target.classList[0] === 'error__button' || event.target.classList[0] === 'error')) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', cloceLoadMessage);
    document.addEventListener('keydown', closeImageEditingForm);
  }
}

function showErrorLoadPhotoMessage() {
  const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  error.addEventListener('click', cloceLoadMessage);
  error.style.zIndex = '2'; //иначе под форму залезает...
  document.addEventListener('keydown', cloceLoadMessage);
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
