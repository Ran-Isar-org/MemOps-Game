export class Card {
    static selected = 0 
    static pairs = []

    constructor(id, img, pos, pair, obj_front="", obj_back="") {
        this.id = id
        this.img = img
        this.pos = pos
        this.pair = pair
        this.obj_front = obj_front
        this.obj_back = obj_back
    }
}
