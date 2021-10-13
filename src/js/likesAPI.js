import { APIKEY } from "./api.js";

const base = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/"+APIKEY+"/likes"

export const getLikes = async () => {
    return fetch(base).then(r => r.json()).then(likesArr => {
        const likesObj = {}
        likesArr.map((likeObj) => {
            likesObj[likeObj["item_id"]] = likeObj["likes"]
        })
        return likesObj;
    })
}

export const addLike = async (albumID) => {
    if (localStorage.getItem("liked") == null){
        localStorage.setItem("liked", JSON.stringify([]))
    }
    const temp = JSON.parse(localStorage.getItem("liked"))
    temp.push(albumID)
    localStorage.setItem("liked", JSON.stringify(temp))

    fetch(base, {
        method: "POST",
        headers: {
            Accept: 'application/json',
       'Content-Type': 'application/json'
        },
        body: JSON.stringify({"item_id" : albumID})    
    })
}



