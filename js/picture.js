import {createRandomPhoto} from './data.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

for (let i = 1; i < 26; i++) {
  const photo = createRandomPhoto(i);
  const element = template.cloneNode(true);
  element.querySelector('img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  fragment.appendChild(element);
}

pictures.appendChild(fragment);
