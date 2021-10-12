const changeColorComments = () => {
  const displayInputComments = document.querySelector('#add-comments');
  if (displayInputComments.style.color === 'rgb(75, 75, 165)') {
    displayInputComments.style.color = '#6c757d';
  } else {
    displayInputComments.style.color = '#4b4ba5';
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

const showComments = () => {
  const showComments = document.querySelector('#show-comments');
  showComments.classList.toggle('d-none');
  const hideWord = document.querySelector('#hide-word');
  hideWord.classList.toggle('d-none');
  const showWord = document.querySelector('#show-word');
  showWord.classList.toggle('d-none');
};

export const showComment = () => {
  showComments();
};
