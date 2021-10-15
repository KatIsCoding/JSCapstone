import { SPOTIFYKEY } from './api.js';

export default class Spotify {
  renewKey = async () => {
    if (localStorage.getItem('lastKeyTime') != null) {
      // Gotta return a promise so the function doesn't get inmediately resolved

      if ((((Date.now() - parseInt(localStorage.getItem('lastKeyTime'), 10)))) / 60 > 3600) {
        return this.getApiKey().then((api) => {
          localStorage.setItem('lastKey', api.access_token);
          localStorage.setItem('lastKeyTime', Date.now());
          return 0;
        });
      }
    } else {
      return this.getApiKey().then((api) => {
        localStorage.setItem('lastKey', api.access_token);
        localStorage.setItem('lastKeyTime', Date.now());
        return 0;
      });
    }
    return 0;
  }

  getApiKey = async () => fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${SPOTIFYKEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  }).then((r) => r.json()).then((d) => d)

  get50Albums = async () => {
    // Since a promise is being returned properly, I can await the fullfillment of the promise
    await this.renewKey();
    return fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'applicacion/json',
        Authorization: `Bearer ${localStorage.lastKey}`,
      },
    }).then((r) => r.json()).then((d) => {
      const out = [];
      d.tracks.items.forEach((trackObj) => {
        out.push(trackObj.track.album);
      });
      return out;
    });
  }
}