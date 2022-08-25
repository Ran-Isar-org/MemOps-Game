// import {Card} from '.Card';



const number_of_cards = 46
const positions = []
for (let pos = 0; pos < number_of_cards; pos++) {
    positions.push(pos)
}
positions.sort(function() { return 0.5 - Math.random();})
console.log(positions)
const cols = (number_of_cards > 10 ? 10 : number_of_cards)
const rows = Math.round(number_of_cards / cols)

// for (let card = 0; card < number_of_cards/2; card++) {
//     const card1 = new Card(card, "IMG", Math.random(number_of_cards),false)
//     const card2 = new Card(card, "IMG", Math.random(number_of_cards),false)
// }

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

