import { renderAlbum } from "../index.js"
import LocalStorage from "../__mocks__/LocalStorage.js"
global.localStorage = new LocalStorage();

document.body.innerHTML = "<section id=\"songs-container\"><h2>Top <strong id=\"items-counter\">0</strong> Albums</h2></section> <section id=\"songs-list\"></section>"
document.getElementById("items-counter").innerText = "0"

const runAddAlbum = () => {
    renderAlbum({
        id: "Test",
        images:["test.com"], 
        name: "Test", 
        artists:[{
            name:"ArtistTest", 
            external_urls:
            {spotify:
                "TestURL"
                }
            },
        ],
        release_date: "TestDate",
        album_type: "testlower"
    }, [])
}
const counter = () => {return parseInt(document.getElementById("items-counter").innerText, 10)}
describe("Testing adding albums counter", () => {
    const tasks = parseInt(Math.random()*1000);
  test("Adding only one album", () => {
    
    runAddAlbum()
    expect(counter()).toBe(1)
  })

  test("Adding two albums", () => {
    runAddAlbum()
    expect(counter()).toBe(2)
  })
  test("Adding " + tasks + " albums", () => {
    document.getElementById("items-counter").innerText = "0"
    
    for (let i = 0; i < tasks; i++){
        runAddAlbum()
    }
    expect(counter()).toBe(parseInt(tasks,10))
  })

})

