import '../style.css';
/* import 'bootstrap'; */
import { Spotify } from './spotifyAPI.js';
import {SPOTIFYKEY, APIKEY} from "./api.js"
const songsList = document.getElementById("songs-list")
const renderAlbum = (albumObj) => {
  /*
  <div id="songID" class="card">
          <img class="card-img-top songImg" src="https://i.scdn.co/image/ab67616d0000b2738e6551a2944764bc8e33a960" alt="">
          <div class="card-body">
            <h3 class="card-title">Album name</h3>
            <p class="card-text">
            Autor: Kid Laroi 
            <br>
            Year: 2021
          </p>
          <a href="#" class="btn btn-danger">Open more info</a>
          </div>
          
        </div>
        */
    const album = document.createElement("div")
    album.id = albumObj.id
    album.classList.add("card")
    
    const img = document.createElement("img")
    img.classList.add("card-img-top","songImg")
    img.src = albumObj["images"][0]["url"]
    album.appendChild(img)

    const cbody = document.createElement("div")
    const ctitle = document.createElement("h3")
    const cinfo = document.createElement("p")
    const cbtn = document.createElement("a")
    cbody.classList.add("card-body")

    ctitle.classList.add("card-title")
    ctitle.innerText = albumObj["name"]
    cbody.appendChild(ctitle)
    const lol = 
    cinfo.innerHTML = `
    Autor: ${albumObj["artists"][0]["name"]}
    <br>
    Release: ${albumObj["release-date"]}
    `
    cbody.appendChild(cinfo)

    cbtn.classList.add("btn", "btn-danger")
    cbtn.innerText = "Open for more info"
    album.appendChild(cbody)
    album.appendChild(cbtn)

    

    songsList.appendChild(album)

    

}


window.onload = () => {
  //console.log(SPOTIFYKEY, APIKEY)
  const x = new Spotify()
  //x.getApiKey().then(f => console.log(f))
  //x.renewKey().then(console.log(x.apiKey))
  const temp = []
  
    x.get50Albums().then(albumsArr => {
        albumsArr.forEach((album) => {
          if (!temp.includes(album.name)){
            renderAlbum(album)
            temp.push(album.name)
          }
        })

    })
  
  
};