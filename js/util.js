export {getRandomIntInclusive, checkStringLength, isEscapeKey, debounce};

// функция получения случайного числа на рекомендованную курсом
function getRandomIntInclusive(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isEscapeKey(event) {
  return event.keyCode === 27;
}

function debounce(callback, timeoutDelay = 500) { // Функция взята из интернета - https://up.htmlacademy.ru/javascript/26/tasks/21
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
