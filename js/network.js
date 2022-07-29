import {initPhoto} from './picture.js';
import {showErrorMessage} from './modal-windows.js';

const BASE_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

function getFotosFromServer() {
  fetch(
    `${BASE_ADDRESS  }/data`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Код ответа сервера "${response.status}". Сообщение "${response.statusText}"`);
    })
    .then((data) => {
      initPhoto(data);
    })
    .catch((err) => {
      showErrorMessage(err.message);
    });
}

function sendFotoToServer(onSuccess, onFail, body) {
  fetch(
    BASE_ADDRESS,
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

export {getFotosFromServer, sendFotoToServer};
