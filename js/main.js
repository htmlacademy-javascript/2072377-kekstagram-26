/*
Готовая функция с сайта MDN:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#получение_случайного_целого_числа_в_заданном_интервале_включительно
*/
function getRandomIntInclusive(min, max) {
  if (min > max) {
    return; // вернёт "undefined"
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive();

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength();
