import {Card} from '/js/Card.js';



const number_of_cards = 46
const positions = []
const pos_to_card = new Map()
for (let pos = 0; pos < number_of_cards; pos++) {
    positions.push(pos)
}
positions.sort(function() { return 0.5 - Math.random();})

console.log(positions)

const cols = (number_of_cards > 10 ? 10 : number_of_cards)
const rows = Math.round(number_of_cards / cols)

for (let card = 0; card < number_of_cards/2; card++) {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => console.log(data));
    let pos1 = positions.pop()
    let pos2 = positions.pop()
    const card1 = new Card(card, "IMG", pos1,false)
    const card2 = new Card(card, "IMG", pos2,false)
}

let card_number = 0

for (let row = 0; row < rows; row++) {
    const row_div = document.createElement("div")
    row_div.className = "row"
    row_div.id = `row-${row}`
    const board = document.getElementById("Board");
    board.appendChild(row_div);
    for (let col = 0; col < cols; col++) {
        const card = document.createElement("div")
        card.className = "card col"
        card.style = "width: 10rem;"
        const img = document.createElement("img")
        img.src = "https://i.ibb.co/VjRzYsx/Gerbil-cropped.png"
        img.className = "card-img-top"
        card.appendChild(img)
        row_div.appendChild(card)
        card_number++
        if (card_number == number_of_cards) { break }
    }
}

