export {showFullSizePhoto};

let fullSizeForm = document.querySelector('.big-picture');

function showFullSizePhoto(element, photo) {
  fullSizeForm = document.querySelector('.big-picture');
  fullSizeForm.querySelector('.big-picture__img img').src = photo.url;
  fullSizeForm.querySelector('.likes-count').textContent = photo.likes;
  fullSizeForm.querySelector('.comments-count').textContent = photo.comments.length;
  fullSizeForm.querySelector('.social__caption').textContent = photo.description;
  fullSizeForm.querySelector('.social__comment-count').classList.add('hidden');
  fullSizeForm.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  const commentsList = fullSizeForm.querySelector('.social__comments');
  commentsList.innerHTML = '';
  for (const comment of photo.comments) {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = '';
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"><p class="social__text">${comment.message}</p>`;
    commentsList.append(commentElement);
  }
  fullSizeForm.classList.remove('hidden');
  document.addEventListener('keydown', myClick);
}

function myClick(event) {
  if(event.keyCode === 27) {
    fullSizeForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', event);
  }
}
