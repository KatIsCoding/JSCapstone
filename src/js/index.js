/* eslint-disable no-new */
/* eslint-disable no-undef */

import '../style.css';

import 'bootstrap';

import Spotify from './spotifyAPI.js';

import {
  addComment, showComments, getArrComments, addNewComment, clearInputComments,
} from './comments.js';

import { getLikes, addLike } from './likesAPI.js';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

const displayInputComments = document.querySelector('#add-comments');
displayInputComments.addEventListener('click', () => { addComment(); });

const hideComments = document.querySelector('#hide-comments-btn');
hideComments.addEventListener('click', () => showComments());

const closeModal = document.querySelector('#close-modal');
closeModal.addEventListener('click', () => {
  clearInputComments();
  if (!document.querySelector('#hide-comments-btn').classList.contains('d-none')) {
    showComments();
  }
});

const displayComments = document.querySelector('#show-comments-btn');
displayComments.addEventListener('click', () => getArrComments());

const addBtn = document.querySelector('#add-comment-btn');
addBtn.addEventListener('click', () => addNewComment());

const songsList = document.getElementById('songs-list');

const renderAlbum = (albumObj, likes) => {
  document.getElementById("items-counter").innerText = parseInt(document.getElementById("items-counter").innerText, 10) + 1 + ""
  const likeIcon = document.createElement('i');
  likeIcon.classList.add('p-0', 'fas', 'fa-heart');

  const album = document.createElement('div');
  album.id = albumObj.id;
  album.classList.add('card');

  const img = document.createElement('img');
  img.classList.add('card-img-top', 'songImg');
  img.src = albumObj.images[0].url;
  album.appendChild(img);

  const cbody = document.createElement('div');
  const ctitle = document.createElement('h3');
  const cinfo = document.createElement('p');
  const cbtn = document.createElement('a');
  const likesbtn = document.createElement('button');

  const likescount = document.createElement('span');

  likesbtn.classList.add('btn', 'info', 'mb-0', 'mt-2', 'likes');

  if (Object.keys(likes).includes(albumObj.id)) {
    likescount.innerText = `${likes[albumObj.id]} `;
  } else {
    likescount.innerText = '0 ';
  }

  likesbtn.appendChild(likescount);
  likesbtn.appendChild(likeIcon);

  // Event Handler of adding a like
  const addALikeEvent = () => {
    likescount.innerText = `${parseInt(likescount.innerText, 10) + 1} `;
    addLike(albumObj.id);
    likesbtn.setAttribute('data-bs-toggle', 'tooltip');
    likesbtn.setAttribute('data-bs-placement', 'top');
    likesbtn.setAttribute('title', 'You have liked this before!!');
    new bootstrap.Tooltip(likesbtn);
    likesbtn.removeEventListener('click', addALikeEvent);
  };

  // First initialization of adding a like handler
  if (!JSON.parse(localStorage.getItem('liked')).includes(albumObj.id)) {
    likesbtn.addEventListener('click', addALikeEvent);
  } else {
    likesbtn.setAttribute('data-bs-toggle', 'tooltip');
    likesbtn.setAttribute('data-bs-placement', 'top');
    likesbtn.setAttribute('title', 'You have liked this before!!');
    new bootstrap.Tooltip(likesbtn);
  }

  cbody.appendChild(likesbtn);

  cbtn.setAttribute('data-bs-toggle', 'modal');
  cbtn.setAttribute('data-bs-target', '#modal-container');

  cbtn.addEventListener('click', () => {
    const albumName = document.querySelector('#album-name');
    const albumPlayer = document.querySelector('#album-player');
    const artistName = document.querySelector('#artist-name');
    const releaseDate = document.querySelector('#release-date');
    const idAlbum = document.querySelector('.id-album');

    albumName.innerText = albumObj.name;
    albumPlayer.setAttribute('src', `https://open.spotify.com/embed/album/${albumObj.id}`);
    artistName.innerText = albumObj.artists[0].name;
    artistName.setAttribute('href', albumObj.artists[0].external_urls.spotify);
    releaseDate.innerText = albumObj.release_date;
    idAlbum.setAttribute('id', albumObj.id);
  });
  cbody.classList.add('card-body');

  ctitle.classList.add('card-title');
  ctitle.innerText = albumObj.name;
  cbody.appendChild(ctitle);
  cinfo.innerHTML = `Autor: ${albumObj.artists[0].name}<br>Release: ${albumObj.release_date}<br>Type: ${albumObj.album_type[0].toUpperCase() + albumObj.album_type.slice(1)}`;
  cbody.appendChild(cinfo);

  cbtn.classList.add('btn', 'btn-danger');
  cbtn.innerText = 'Click for more info';
  album.appendChild(cbody);
  album.appendChild(cbtn);

  songsList.appendChild(album);
};

window.onload = async () => {
  const SpotifyObject = new Spotify();
  const temp = [];
  if (localStorage.getItem('liked') == null) {
    localStorage.setItem('liked', JSON.stringify([]));
  }
  const likes = await getLikes();
  SpotifyObject.get50Albums().then((albumsArr) => {
    albumsArr.forEach((album) => {
      if (!temp.includes(album.name)) {
        renderAlbum(album, likes);
        temp.push(album.name);
      }
    });
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
      return 0;
    });
  });
};
