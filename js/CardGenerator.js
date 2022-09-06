import {Card} from '/js/Card.js';

import {StartTimer,StopTimer, ResetTimer} from '/js/timer.js';

//import few functions from timer.js

let finished = false;

const number_of_cards = 6
const positions = []
const images = [] 
const pos_to_card = new Map()
for (let pos = 0; pos < number_of_cards; pos++) {
    positions.push(pos)
}


positions.sort(function() { return 0.5 - Math.random();})

console.log(positions)

const cols = (number_of_cards > 10 ? 10 : number_of_cards)
const rows = Math.round(number_of_cards / cols)

async function getData(url) {
    const response = await fetch(url);
    return response.json();
  }

for (let card = 0; card < number_of_cards/2; card++) {
    let image = images.pop()
    const data = await getData("https://dog.ceo/api/breeds/image/random");
    image = (data["message"])
    let pos1 = positions.pop()
    let pos2 = positions.pop()
    const card1 = new Card(card, image, pos1, pos2)
    const card2 = new Card(card, image, pos2, pos1)
    pos_to_card.set(pos1, card1)
    pos_to_card.set(pos2, card2)
}

let card_number = 0
const row_div = document.createElement("div")
row_div.className = "row row-cols-xl-2 row-cols-l-2 row-cols-sm-2 row-cols-md-4"
row_div.id = `row`
const board = document.getElementById("Board");
board.appendChild(row_div);
for (let index = 0; index < number_of_cards; index++) {
    const card_obj = pos_to_card.get(index)
    const card_back = document.createElement("div")
    const card_front = document.createElement("div")
    card_obj.card_back = card_back
    card_obj.card_front = card_front
    card_back.className = "card col-xl col-l border-dark rounded bg-dark p-1 m-1"
    card_front.className = "card col-xl col-l border-dark rounded bg-dark p-1 m-1"
    card_back.id = `card-back-${card_obj.pos}`
    card_front.id = `card-front-${card_obj.pos}`
    const img_back = document.createElement("img")
    const img_front = document.createElement("img")
    console.log(card_obj.img)
    img_back.src = card_obj.img
    img_front.src = "https://toppng.com/uploads/preview/question-mark-icon-png-1155224288245ptwi4q2v.png"
    img_back.className = "card-img-top h-100 w-100 img-test"
    img_front.className = "card-img-top h-100 w-100 img-test"
    card_back.appendChild(img_back)
    card_front.appendChild(img_front)
    card_back.style.display = "none"
    row_div.appendChild(card_front)
    row_div.appendChild(card_back)
}

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
 }  

var score = document.getElementById("score");
var chosen_pair=[]

let click_count = 0;

for (let index = 0; index < number_of_cards; index++) {
    const card_obj = pos_to_card.get(index)
    
    const card_obj_pair = pos_to_card.get(card_obj.pair)
    const card_back = card_obj.card_back
    const card_front = card_obj.card_front

    // card_back.onclick = foo => {
    //     card_back.style.display = "none"
    //     card_front.style.display = "flex"
    // }

    card_front.onclick = foo => {  
        if (click_count == 0) {
            StartTimer();
        }
        
        click_count++;
        
        chosen_pair.push(card_obj)
        card_front.style.display = "none"
        card_back.style.display = "flex"
        card_obj.flipped = true
        Card.selected++
        if (chosen_pair.length >=3){
            chosen_pair.forEach(pair => {
                pair.card_back.style.display = "None"
                pair.card_front.style.display = "flex"
            });
            chosen_pair=[]
            
        }
        else{
            sleep(1000).then(() =>{
                if (chosen_pair.length == 2){
                    if (chosen_pair[0].pair == chosen_pair[1].pos){
                        Card.pairs.push(chosen_pair[0])
                        Card.pairs.push(chosen_pair[1])
                        Card.pairs.forEach(pair => {
                            pair.card_back.style.display = "flex"
                            pair.card_front.style.display = "none"
                        });
                        chosen_pair=[]
                        console.log("yay")
                    }
                    else{
                        chosen_pair.forEach(pair => {
                            pair.card_back.style.display = "None"
                            pair.card_front.style.display = "flex"
                        });
                        chosen_pair=[]
                        Card.selected -= 2
                        console.log("NAH")
                    }
                }
                if (Card.pairs.length == number_of_cards){
                    console.log("winner")
                    finished = true;
                    StopTimer()

                    // var oldelement = document.getElementById('navbarNav')

                    // finish game score and play again button
                    let finish = document.createElement("div")
                    finish.id = "finish"
                    finish.className = "collapse navbar-collapse finish"
                    finish.innerHTML = `<label><h4>Game Finished!</h4>you did it in ${minutes.textContent} minutes, and ${seconds.textContent} seconds!</label>`

                    let elem = document.createElement("html")
                    elem.id = "elem"
                    elem.appendChild(finish)


                    // add play again button
                    let play_again = document.createElement("button")
                    play_again.id = "play_again_btn"
                    play_again.className = "btn btn-primary"
                    play_again.textContent = "Play Again"
                    
                    finish.appendChild(play_again)
                    document.getElementById('navbarNav').innerHTML = elem.innerHTML

                    document.getElementById("play_again_btn").addEventListener("click", function(){
                        ResetGame();
                        console.log("play again");
                    })
                }
            })
        }
        
    }
}

if (!finished) {
    setInterval(()=> score.innerHTML = Card.pairs.length/2 +"" ,1000/30)
}


// isar todo
function ResetGame() {
    // reset timer
    console.log("reset timer");

    // reset cards
    console.log("reset score");

    // reset score
    console.log("reset score");

    // reload - for testing
    location.reload();
}
