import {showPhoto} from './picture.js';
import {showErrorMessage} from './modal-windows.js';

export {getFotosFromServer, sendFotoToServer};

function getFotosFromServer() {
  fetch(
    'https://26.javascript.pages.academy/kekstagram/data'
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Код ответа сервера "${response.status}". Сообщение "${response.statusText}"`);
    })
    .then((data) => {
      showPhoto(data);
    })
    .catch((err) => {
      showErrorMessage(err.message);
    });
}

function sendFotoToServer(onSuccess, onFail, body) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`Код ответа сервера "${response.status}". Сообщение "${response.statusText}"`);
      }
    })
    .catch(() => {
      onFail();
    });
}
