class Ship{
  constructor(length, name){
    this.length = length
    this.name = name
    this.hits = 0
    this.sunk = false
  }
  hit(){ /* a hit will be determined in board obj */
    this.hits += 1
    if(this.hits === this.length){
      this.isSunk()
    }
    return this.hits
  }
  isSunk(){
    if(this.length === this.hits){
      return this.sunk = true
    }
  }
}

let sunkShip = new Ship(5)
sunkShip.hits = 5

let notSunkShip = new Ship(3).hit()

module.exports = {
  Ship,
  sunkShip,
  notSunkShip 
}