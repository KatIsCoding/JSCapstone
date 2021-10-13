import '../style.css';

import 'bootstrap';

import { addComment, showComment } from './comments.js';

const displayInputComments = document.querySelector('#add-comments');
displayInputComments.addEventListener('click', () => { addComment(); });

const displayComments = document.querySelector('#show-comments-btn');
displayComments.addEventListener('click', () => { showComment(); });
