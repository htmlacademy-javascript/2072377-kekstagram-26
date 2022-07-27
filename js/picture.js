import {showFullSizePhoto} from './picture-full-size.js';

export {showRandomPhoto};

const photos = [];

function showRandomPhoto(arrPhoto) {
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  for (let i = 0; i < arrPhoto.length; i++) {
    const photo = arrPhoto[i];
    photos.push(photo);
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  }
  document.addEventListener('click', feelClickOnPhoto);
  pictures.appendChild(fragment);
}

function feelClickOnPhoto(evt) {
  if (evt.target.matches('img')) {
    const targetSrc = evt.target.getAttribute('src');
    const photo = photos.find((item) => item.url === targetSrc);
    if (photo) {
      showFullSizePhoto(photo);
    }
  }
}
