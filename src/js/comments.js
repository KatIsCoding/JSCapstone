import { postComment, getComments } from './involvementAPI.js';

const changeColorComments = () => {
  const displayInputComments = document.querySelector('#add-comments');
  if (displayInputComments.classList.contains('add-clicked')) {
    displayInputComments.classList.add('add-no-click');
    displayInputComments.classList.remove('add-clicked');
  } else {
    displayInputComments.classList.remove('add-no-click');
    displayInputComments.classList.add('add-clicked');
  }
};

const showInputComment = () => {
  const addComment = document.querySelector('#add-comment');
  addComment.classList.toggle('d-none');
  const addCommentBtn = document.querySelector('#add-comment-btn');
  addCommentBtn.classList.toggle('d-none');
};

export const addComment = () => {
  showInputComment();
  changeColorComments();
};

export const showComments = () => {
  const showComments = document.querySelector('#show-comments');
  showComments.classList.toggle('d-none');
  const hideWord = document.querySelector('#hide-comments-btn');
  hideWord.classList.toggle('d-none');
  const showWord = document.querySelector('#show-comments-btn');
  showWord.classList.toggle('d-none');
};

const populateComments = (comments) => {
  const commentList = document.querySelector('#comment-list');
  commentList.innerText = '';
  if (comments[0].creation_date === '' && comments[0].comment === 'No comments yet') {
    comments.forEach((child) => {
      const addNewComment = document.createElement('li');
      addNewComment.innerHTML = `<p>${child.username}:  ${child.comment}</p>`;
      commentList.appendChild(addNewComment);
    });
  } else {
    comments.forEach((child) => {
      const addNewComment = document.createElement('li');
      addNewComment.innerHTML = `<p>
      ${child.username}:  ${child.comment} <br>
      <span class="valid-comments">${child.creation_date}<span>
      </p>`;
      commentList.appendChild(addNewComment);
    });
  }
};

export const clearInputComments = () => {
  document.querySelector('#user-name').value = '';
  document.querySelector('#user-comment').value = '';
};

export const getArrComments = async () => {
  let comments = [];
  comments = await getComments(document.querySelector('.id-album').id);
  if (!comments[0]) {
    comments = [{ comment: 'No comments yet', creation_date: '', username: 'Add your comment ' }];
  }
  populateComments(comments);
  showComments();
};

export const addNewComment = async () => {
  const userName = document.querySelector('#user-name');
  const userText = document.querySelector('#user-comment');
  try {
    await postComment(document.querySelector('.id-album').id, userName.value, userText.value);
  } catch (e) {
    throw new Error(`Error posting comment: ${e}`);
  }
  clearInputComments();
};
