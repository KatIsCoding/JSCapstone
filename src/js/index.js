import '../style.css';
import 'bootstrap';
import Spotify from './spotifyAPI.js';

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
  cbody.classList.add('card-body');

  ctitle.classList.add('card-title');
  ctitle.innerText = albumObj.name;
  cbody.appendChild(ctitle);
  cinfo.innerHTML = `Autor: ${albumObj.artists[0].name}<br>Release: ${albumObj['release-date']}`;
  cbody.appendChild(cinfo);

  cbtn.classList.add('btn', 'btn-danger');
  cbtn.innerText = 'Open for more info';
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