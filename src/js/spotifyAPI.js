import { SPOTIFYKEY } from './api.js';

export default class Spotify {
  renewKey = async () => {
    if (localStorage.getItem('lastKeyTime') != null) {
      if ((((Date.now() - parseInt(localStorage.getItem('lastKeyTime'), 10)))) / 60 > 3600) {
        const api = await this.getApiKey()
        localStorage.setItem('lastKey', api.access_token);
        localStorage.setItem('lastKeyTime', Date.now());
      }
      
    } else {
      const api = await this.getApiKey()
      localStorage.setItem('lastKey', api.access_token);
      localStorage.setItem('lastKeyTime', Date.now());
    }
    return 0;
  }

  getApiKey = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${SPOTIFYKEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await response.json()
  return data;
  }

  get50Albums = async () => {
    await this.renewKey();
    const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'applicacion/json',
        Authorization: `Bearer ${localStorage.lastKey}`,
      },
    })
    const data = await response.json()
    const out = []
    data.tracks.items.forEach((trackObj) => {
      out.push(trackObj.track.album);
    });
    return out;
  }
}