export const countComments = (modal) => {
  let count = 0;
  const validComments = modal.querySelectorAll('.valid-comments');

  validComments.forEach(() => { count += 1; });
  return count;
};

export const populateCounter = (modal) => {
  const contComments = modal.querySelector('#cont-comments');
  const numberComments = countComments(modal);
  if (numberComments === 1) {
    contComments.innerText = '1 comment';
  } else {
    contComments.innerText = `${numberComments} comments`;
  }
};

export default () => {
  const modal = document.querySelector('.modal');
  populateCounter(modal);
};