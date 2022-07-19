import {createRandomPhoto} from './data.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

console.log(pictures.children[0].children[0]);

for (let i = 1; i < 26; i++) {
  const photo = createRandomPhoto(i);
  const element = template.cloneNode(true);
  element.querySelector('img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  //element.classList.add(`el-${  i + 1}`); // Добавляем порядковый класс, который начинается с единицы, а не с нуля, поэтому 'i + 1'
  //element.children[0].textContent = i; // Записываем содержимое
  fragment.appendChild(element);
}

pictures.appendChild(fragment);
