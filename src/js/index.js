import '../style.css';

import 'bootstrap';

import Spotify from './spotifyAPI.js';

import {
  addComment, showComments, getArrComments, addNewComment,
} from './comments.js';

const displayInputComments = document.querySelector('#add-comments');
displayInputComments.addEventListener('click', () => { addComment(); });

const hideComments = document.querySelector('#hide-comments-btn');
hideComments.addEventListener('click', () => showComments());

const displayComments = document.querySelector('#show-comments-btn');
displayComments.addEventListener('click', () => getArrComments());

const addBtn = document.querySelector('#add-comment-btn');
addBtn.addEventListener('click', () => addNewComment());

const songsList = document.getElementById('songs-list');
const renderAlbum = (albumObj) => {
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

window.onload = () => {
  const SpotifyObject = new Spotify();
  const temp = [];

  SpotifyObject.get50Albums().then((albumsArr) => {
    albumsArr.forEach((album) => {
      if (!temp.includes(album.name)) {
        renderAlbum(album);
        temp.push(album.name);
      }
    });
  });
};
