import {isEscapeKey} from './util.js';

export {showFullSizePhoto};

const fullSizeForm = document.querySelector('.big-picture');
const loadMoreCommentBtn = fullSizeForm.querySelector('.comments-loader');
const cancelBtn = document.querySelector('#picture-cancel');
const commentsList = fullSizeForm.querySelector('.social__comments');
let showCommentCounter;

function showFullSizePhoto(photo) {
  showCommentCounter = 0;
  document.querySelector('body').classList.add('modal-open');
  fullSizeForm.querySelector('.big-picture__img img').src = photo.url;
  fullSizeForm.querySelector('.likes-count').textContent = photo.likes;
  fullSizeForm.querySelector('.social__caption').textContent = photo.description;
  addCommentList(photo.comments);
  fullSizeForm.classList.remove('hidden');
  document.addEventListener('keydown', closeFullSizePhoto);
  cancelBtn.addEventListener('click', closeFullSizePhoto);
}

function closeFullSizePhoto(event) {
  if(isEscapeKey(event) || event.target.matches('#picture-cancel')) {
    event.preventDefault();
    fullSizeForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', closeFullSizePhoto);
    cancelBtn.removeEventListener('click', closeFullSizePhoto);
    loadMoreCommentBtn.removeEventListener('click', loadMoreComments);
  }
}

function addCommentList(coments) {
  if (coments.length === 0) {
    fullSizeForm.querySelector('.social__comment-count').textContent = 'Комментариев нет';
    loadMoreCommentBtn.classList.add('hidden');
    commentsList.innerHTML = '';
  } else if (coments.length <= 5){
    fullSizeForm.querySelector('.social__comment-count').textContent = `${coments.length} из ${coments.length} комментариев`;
    loadMoreCommentBtn.classList.add('hidden');
    commentsList.innerHTML = '';
    for (const comment of coments) {
      const commentElement = document.createElement('li');
      commentElement.innerHTML = '';
      commentElement.classList.add('social__comment');
      commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"><p class="social__text">${comment.message}</p>`;
      commentsList.append(commentElement);
    }
  } else {
    fullSizeForm.querySelector('.social__comment-count').textContent = `5 из ${coments.length} комментариев`;
    loadMoreCommentBtn.classList.remove('hidden');
    commentsList.innerHTML = '';
    for (let i = 0; i < coments.length; i++) {
      const commentElement = document.createElement('li');
      commentElement.innerHTML = '';
      commentElement.classList.add('social__comment');
      commentElement.classList.add('hidden');
      commentElement.innerHTML = `<img class="social__picture" src="${coments[i].avatar}" alt="${coments[i].name}" width="35" height="35"><p class="social__text">${coments[i].message}</p>`;
      commentsList.append(commentElement);
    }
    loadMoreComments();
    loadMoreCommentBtn.addEventListener('click', loadMoreComments);
  }
}

function loadMoreComments(){
  const firstNumber = commentsList.querySelectorAll('.hidden');
  for (let i = 0; i < 5 && i < firstNumber.length; i++) {
    firstNumber[i].classList.remove('hidden');
    showCommentCounter++;
  }
  fullSizeForm.querySelector('.social__comment-count').textContent = `${showCommentCounter} из ${commentsList.querySelectorAll('.social__comment').length} комментариев`;
  if (firstNumber.length <= 5) {
    loadMoreCommentBtn.classList.add('hidden');
    loadMoreCommentBtn.removeEventListener('click', loadMoreComments);
  }
}
