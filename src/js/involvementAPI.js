import { APIKEY } from './api.js';

const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const commentsURL = `${baseURL}/apps/${APIKEY}/comments`;

export const postComment = (id, userName, userText) => {
  const comment = {
    item_id: id,
    username: userName,
    comment: userText,
  };
  const response = fetch(commentsURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return response;
};

export const getComments = (id) => {
  const getCommentsURL = `${commentsURL}?item_id=${id}`;
  const response = fetch(getCommentsURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response;
};