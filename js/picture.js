import {showFullSizePhoto} from './picture-full-size.js';
import {debounce, getRandomIntInclusive} from './util.js';

export {showPhoto};

const defaultFilterBtn = document.querySelector('#filter-default');
const randomFilterBtn = document.querySelector('#filter-random');
const discussedFilterBtn = document.querySelector('#filter-discussed');

const photos = [];

defaultFilterBtn.addEventListener('click', debounce(() => showPhotoDefault(photos), 500,));
randomFilterBtn.addEventListener('click', debounce(() => showPhotoRandom(photos), 500,));
discussedFilterBtn.addEventListener('click', debounce(() => showPhotoDiscussed(photos), 500,));
defaultFilterBtn.addEventListener('click', changeBattonSelect);
randomFilterBtn.addEventListener('click', changeBattonSelect);
discussedFilterBtn.addEventListener('click', changeBattonSelect);

function showPhoto(arrPhoto) {
  const template = document.querySelector('#picture').content.querySelector('a');
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

function feelClickOnPhoto(event) {
  if (event.target.matches('img')) {
    const targetSrc = event.target.getAttribute('src');
    const photo = photos.find((item) => item.url === targetSrc);
    if (photo) {
      showFullSizePhoto(photo);
    }
  }
}

function showPhotoDefault(photosArr) {
  const template = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  for (let i = 0; i < photosArr.length; i++) {
    const photo = photosArr[i];
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  }
  document.querySelectorAll('.picture').forEach((element) => {element.remove();});
  pictures.appendChild(fragment);
}

function showPhotoRandom(photosArr) {
  const template = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  const idPhotos = [];
  for (let i = 0; i < 10; i++) {
    let photo = getRandomIntInclusive(0, photosArr.length - 1);
    while (idPhotos.includes(photo)) {
      photo = getRandomIntInclusive(0, photosArr.length - 1);
    }
    idPhotos.push(photo);
  }
  for (let i = 0; i < idPhotos.length; i++) {
    const photo = photosArr[idPhotos[i]];
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  }
  document.querySelectorAll('.picture').forEach((element) => {element.remove();});
  pictures.appendChild(fragment);
}

function showPhotoDiscussed(photosArr){
  const template = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  const tenpArrPhotos = photosArr.slice().sort((a, b) => { //сортировку взял с сайта MDM https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });
  for (let i = 0; i < tenpArrPhotos.length; i++) {
    const photo = tenpArrPhotos[i];
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  }
  document.querySelectorAll('.picture').forEach((element) => {element.remove();});
  pictures.appendChild(fragment);
}

function changeBattonSelect(event) {
  switch (event.target.id) {
    case 'filter-default':
      defaultFilterBtn.classList.add('img-filters__button--active');
      randomFilterBtn.classList.remove('img-filters__button--active');
      discussedFilterBtn.classList.remove('img-filters__button--active');
      break;
    case 'filter-random':
      defaultFilterBtn.classList.remove('img-filters__button--active');
      randomFilterBtn.classList.add('img-filters__button--active');
      discussedFilterBtn.classList.remove('img-filters__button--active');
      break;
    case 'filter-discussed':
      defaultFilterBtn.classList.remove('img-filters__button--active');
      randomFilterBtn.classList.remove('img-filters__button--active');
      discussedFilterBtn.classList.add('img-filters__button--active');
      break;
  }
}
