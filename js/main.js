import {createRandomPhoto} from './data.js';

const photos = [];

for (let i = 1; i < 26; i++) {
  photos.push(createRandomPhoto(i));
}
