import {createRandomPhoto} from './data.js';
import {showFullSizePhoto} from './picture-full-size.js';

export {showRandomPhoto};

function showRandomPhoto() {
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
    element.onclick = function() {
      showFullSizePhoto(element, photo);
    };
    fragment.appendChild(element);
  }
  pictures.appendChild(fragment);
}
