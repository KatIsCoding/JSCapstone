import { SPOTIFYKEY } from "./crypto.js";
export class Spotify {
  constructor() {
    this.renewKey()
  }

  renewKey = async () => {
    if (localStorage.getItem("lastKeyTime") != null){
        if ((((Date.now() - parseInt(localStorage.getItem("lastKeyTime")))))/60 > 3600){
            this.getApiKey().then(api => {
                localStorage.setItem("lastKey", api["access_token"])
            })
            localStorage.setItem("lastKeyTime", Date.now()) 
        }
    } else {
        this.getApiKey().then(api => {
            localStorage.setItem("lastKey", api["access_token"])
            console.log("Api Key Renewed!!", this.apiKey)})
        localStorage.setItem("lastKeyTime", Date.now())
    }

  }

  getApiKey = async () => {
      return fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
              Authorization: "Basic "+SPOTIFYKEY,
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "grant_type=client_credentials"
      }).then(r => r.json()).then(d => {return d})
  }

  getAlbum = async (albumID) => {
    await this.renewKey()
    return fetch("https://api.spotify.com/v1/albums/"+albumID, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("lastKey")
        }
    }).then(r => r.json()).then(d => {return d})
  }
  get50Albums = async() => {
      await this.renewKey()
      return fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
          headers: {
              Accept: "application/json",
              "Content-type": "applicacion/json",
              Authorization: "Bearer "+localStorage.getItem("lastKey")
          }
      }).then(r => r.json()).then(d =>{
          let out = []
          d["tracks"]["items"].forEach((trackObj) => {
            out.push(trackObj["track"]["album"])
          })
          console.log(out)
          return out
      })
  }
}