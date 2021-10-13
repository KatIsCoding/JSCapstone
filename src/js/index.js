import '../style.css';

import 'bootstrap';

import Spotify from './spotifyAPI.js';

import { addComment, showComment } from './comments.js';

import { postComment, getComments } from './involvementAPI.js';

const displayInputComments = document.querySelector('#add-comments');
displayInputComments.addEventListener('click', () => { addComment(); });

const addNewComment = async (id) => {
  const userName = document.querySelector('#user-name');
  const userText = document.querySelector('#user-comment');

  try {
    await postComment(id, userName.value, userText.value);
  } catch (e) {
    throw new Error(`Error posting comment: ${e}`);
  }
};

const getArrComments = async (id) => {
  let comments = [];
  try {
    comments = await getComments(id).json();
  } catch (e) {
    throw new Error(`Error getting comments: ${e}`);
  }
  console.log(comments);
};

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
    const addBtn = document.querySelector('#add-comment-btn');
    const displayComments = document.querySelector('#show-comments-btn');

    albumName.innerText = albumObj.name;
    albumPlayer.setAttribute('src', `https://open.spotify.com/embed/album/${albumObj.id}`);
    artistName.innerText = albumObj.artists[0].name;
    artistName.setAttribute('href', albumObj.artists[0].external_urls.spotify);
    releaseDate.innerText = albumObj.release_date;

    addBtn.addEventListener('click', () => addNewComment(albumObj.id));
    displayComments.addEventListener('click', () => {
      getArrComments(albumObj.id);
      showComment();
    });
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
