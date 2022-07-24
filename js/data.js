import {getRandomIntInclusive} from './util.js';

export {createRandomPhoto};

const PHRASES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];

const NAMES = ['Артём',
  'Сергей',
  'Конь',
  'Бабка с пистолетом',
  'Миша',
  'Люда',
  'Зоя',
  'Слава',
  'Урфин Джус',
  'Пончик',];

const idComments = [];

function createRandomPhoto(idPhoto) {
  const photo = {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: `Фотография ${idPhoto}`,
    likes: getRandomIntInclusive(15, 200),
    comments: createRandomComments(getRandomIntInclusive(0, 6)),
  };
  return photo;
}

function createRandomComments(count) {
  const comments = [];
  for (let i = 0; i < count; i++) {
    let idComment = getRandomIntInclusive(1, 500);
    while (idComments.includes(idComment)) { //такие циклы, конечно, лучше не использовать. Но ситуация условная же... от сюда и решение.
      idComment = getRandomIntInclusive(1, 500);
    }
    idComments.push(idComment);
    const comment = {
      id: idComment,
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
      message: PHRASES[getRandomIntInclusive(0, PHRASES.length - 1)],
      name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
    };
    comments.push(comment);
  }
  return comments;
}
