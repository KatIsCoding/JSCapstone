/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import '../style.css';

import 'bootstrap';

import Spotify from './spotifyAPI.js';

import {
  addComment, showComments, getArrComments, addNewComment, clearInputComments,
} from './comments.js';

import { getLikes, addLike } from './likesAPI.js';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

const displayInputComments = document.querySelector('#add-comments');

const hideComments = document.querySelector('#hide-comments-btn');

const closeModal = document.querySelector('#close-modal');

const displayComments = document.querySelector('#show-comments-btn');

const addBtn = document.querySelector('#add-comment-btn');

// const songsList = document.getElementById('songs-list');

export const renderAlbum = (albumObj, likes) => {
  const songsList = document.getElementById('songs-list');
  document.getElementById('items-counter').innerText = `${parseInt(document.getElementById('items-counter').innerText, 10) + 1}`;
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
  const btnLikes = document.querySelector('#likes-popup');

  const likescount = document.createElement('span');
  likescount.classList.add('likes-count');

  likesbtn.classList.add('btn', 'mb-0', 'mt-2', 'likes');

  if (Object.keys(likes).includes(albumObj.id)) {
    likescount.innerText = `${likes[albumObj.id]} `;
  } else {
    likescount.innerText = '0 ';
  }

  likesbtn.appendChild(likescount);
  likesbtn.appendChild(likeIcon);

  // Event Handler of adding a like
  const addALikeEvent = () => {
    const countLikes = document.querySelector('#count-likes-popup');
    likescount.innerText = `${parseInt(likescount.innerText, 10) + 1} `;
    addLike(albumObj.id);
    likesbtn.setAttribute('data-bs-toggle', 'tooltip');
    likesbtn.setAttribute('data-bs-placement', 'top');
    likesbtn.setAttribute('title', 'You have liked this before!!');
    new bootstrap.Tooltip(likesbtn);
    countLikes.innerText = likescount.innerText;
    likesbtn.removeEventListener('click', addALikeEvent);
    btnLikes.removeEventListener('click', addALikeEvent);
  };

  // First initialization of adding a like handler
  if (localStorage.getItem('liked') !== null) {
    if (!JSON.parse(localStorage.getItem('liked')).includes(albumObj.id)) {
      likesbtn.addEventListener('click', addALikeEvent);
    } else {
      likesbtn.setAttribute('data-bs-toggle', 'tooltip');
      likesbtn.setAttribute('data-bs-placement', 'top');
      likesbtn.setAttribute('title', 'You have liked this before!!');
      new bootstrap.Tooltip(likesbtn);
    }
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
    const countLikes = document.querySelector('#count-likes-popup');

    albumName.innerText = albumObj.name;
    albumPlayer.setAttribute('src', `https://open.spotify.com/embed/album/${albumObj.id}`);
    artistName.innerText = albumObj.artists[0].name;
    artistName.setAttribute('href', albumObj.artists[0].external_urls.spotify);
    releaseDate.innerText = albumObj.release_date;
    idAlbum.setAttribute('id', albumObj.id);
    if (!localStorage.getItem('liked').includes(albumObj.id)) {
      countLikes.innerText = 'Add';
      btnLikes.addEventListener('click', addALikeEvent);
    } else {
      countLikes.innerText = likescount.innerText;
    }
  });
  cbody.classList.add('card-body');

  ctitle.classList.add('card-title');
  cbody.setAttribute('id', `card${albumObj.id}`);
  ctitle.innerText = albumObj.name;
  cbody.appendChild(ctitle);
  cinfo.innerHTML = `Author: ${albumObj.artists[0].name}<br>Release: ${albumObj.release_date}<br>Type: ${albumObj.album_type[0].toUpperCase() + albumObj.album_type.slice(1)}`;
  cbody.appendChild(cinfo);

  cbtn.classList.add('btn', 'btn-danger');
  cbtn.innerText = 'Click for more info';
  album.appendChild(cbody);
  album.appendChild(cbtn);

  songsList.appendChild(album);
};

window.onload = async () => {
  displayComments.addEventListener('click', () => getArrComments());
  displayInputComments.addEventListener('click', () => { addComment(); });
  addBtn.addEventListener('click', () => addNewComment());
  hideComments.addEventListener('click', () => showComments());
  closeModal.addEventListener('click', () => {
    clearInputComments();
    if (!document.querySelector('#hide-comments-btn').classList.contains('d-none')) {
      showComments();
    }
  });
  document.getElementById('close-modal-btn').addEventListener('click', () => {
    clearInputComments();
    if (!document.querySelector('#hide-comments-btn').classList.contains('d-none')) {
      showComments();
    }
  });
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

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 355,
        density: {
          enable: true,
          value_area: 789.1476416322727,
        },
      },
      color: {
        value: '#FF0000',
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#FF0000',
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.48927153781200905,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 20,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 83.91608391608392,
          size: 1,
          duration: 3,
          opacity: 1,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
};
