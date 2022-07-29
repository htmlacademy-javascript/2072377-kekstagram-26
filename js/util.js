function getRandomIntInclusive(min, max) { // функция получения случайного числа на рекомендованную курсом
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function isEscapeKey(evt) {
  return evt.keyCode === 27;
}

function debounce(callback, timeoutDelay = 500) { // Функция взята из интернета - https://up.htmlacademy.ru/javascript/26/tasks/21
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomIntInclusive, isEscapeKey, debounce};
