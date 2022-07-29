import {showFullSizePhoto} from './picture-full-size.js';
import {debounce, getRandomIntInclusive} from './util.js';

const defaultFilterBtn = document.querySelector('#filter-default');
const randomFilterBtn = document.querySelector('#filter-random');
const discussedFilterBtn = document.querySelector('#filter-discussed');
const LIMIT_RANDOM = 10;
let photos = [];

function initPhoto(arrPhoto) {
  photos = arrPhoto;
  showPhoto(photos);
}

function updatePhoto(arrPhoto) {
  showPhoto(arrPhoto);
}

const debouncePhotos = debounce(updatePhoto, 500);
defaultFilterBtn.addEventListener('click', () => {debouncePhotos(getPhotoDefault());});
randomFilterBtn.addEventListener('click', () => {debouncePhotos(getPhotoRandom());});
discussedFilterBtn.addEventListener('click', () => {debouncePhotos(getPhotoDiscussed());});

function showPhoto(arrPhotos) {
  const template = document.querySelector('#picture').content.querySelector('a');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  arrPhotos.forEach((photo) => {
    const element = template.cloneNode(true);
    element.querySelector('img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(element);
  });
  document.querySelectorAll('.picture').forEach((element) => {element.remove();});
  document.addEventListener('click', feelClickOnPhoto);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
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

function getPhotoDefault() {
  defaultFilterBtn.classList.add('img-filters__button--active');
  randomFilterBtn.classList.remove('img-filters__button--active');
  discussedFilterBtn.classList.remove('img-filters__button--active');
  return photos;
}

function getPhotoRandom() {
  const randomePhotosIds = [];
  const randomePhotos = [];
  for (let i = 0; i < LIMIT_RANDOM; i++) {
    let photo = getRandomIntInclusive(0, photos.length - 1);
    while (randomePhotosIds.includes(photo)) {
      photo = getRandomIntInclusive(0, photos.length - 1);
    }
    randomePhotosIds.push(photo);
  }
  randomePhotosIds.forEach((element) => {randomePhotos.push(photos[element]);});
  defaultFilterBtn.classList.remove('img-filters__button--active');
  randomFilterBtn.classList.add('img-filters__button--active');
  discussedFilterBtn.classList.remove('img-filters__button--active');
  return randomePhotos;
}

function getPhotoDiscussed(){
  const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  defaultFilterBtn.classList.remove('img-filters__button--active');
  randomFilterBtn.classList.remove('img-filters__button--active');
  discussedFilterBtn.classList.add('img-filters__button--active');
  return discussedPhotos;
}

export {initPhoto};
