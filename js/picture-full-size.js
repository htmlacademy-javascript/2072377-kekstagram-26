import {isEscapeKey} from './util.js';

const COMMENT_LIMIT = 5;

const fullSizeForm = document.querySelector('.big-picture');
const loadMoreCommentBtn = fullSizeForm.querySelector('.comments-loader');
const cancelBtn = document.querySelector('#picture-cancel');
const commentsList = fullSizeForm.querySelector('.social__comments');
let showCommentCounter;
let photoComments;

function showFullSizePhoto(photo) {
  showCommentCounter = 0;
  photoComments = photo.comments;
  document.querySelector('body').classList.add('modal-open');
  fullSizeForm.querySelector('.big-picture__img img').src = photo.url;
  fullSizeForm.querySelector('.likes-count').textContent = photo.likes;
  fullSizeForm.querySelector('.social__caption').textContent = photo.description;
  addCommentList(photoComments);
  fullSizeForm.classList.remove('hidden');
  document.addEventListener('keydown', closeFullSizePhoto);
  cancelBtn.addEventListener('click', closeFullSizePhoto);
}

function closeFullSizePhoto(evt) {
  if(isEscapeKey(evt) || evt.target.matches('#picture-cancel')) {
    evt.preventDefault();
    fullSizeForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', closeFullSizePhoto);
    cancelBtn.removeEventListener('click', closeFullSizePhoto);
    loadMoreCommentBtn.removeEventListener('click', showComments);
  }
}

function addCommentList(coments) {
  commentsList.innerHTML = '';
  if (coments.length === 0) {
    fullSizeForm.querySelector('.social__comment-count').textContent = 'Комментариев нет';
    loadMoreCommentBtn.classList.add('hidden');
    return;
  }
  loadMoreCommentBtn.addEventListener('click', showComments);
  showComments();
}

function showComments() {
  const commentsFragment = new DocumentFragment();
  for (const i = showCommentCounter ; showCommentCounter < i + COMMENT_LIMIT && showCommentCounter < photoComments.length; showCommentCounter++) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = '';
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${photoComments[showCommentCounter].avatar}" alt="${photoComments[showCommentCounter].name}" width="35" height="35"><p class="social__text">${photoComments[showCommentCounter].message}</p>`;
    commentsFragment.appendChild(commentElement);
  }
  commentsList.appendChild(commentsFragment);
  fullSizeForm.querySelector('.social__comment-count').textContent = `${showCommentCounter} из ${photoComments.length} комментариев`;
  if (photoComments.length - showCommentCounter <= 0) {
    loadMoreCommentBtn.classList.add('hidden');
    return;
  }
  loadMoreCommentBtn.classList.remove('hidden');
}

export {showFullSizePhoto};
