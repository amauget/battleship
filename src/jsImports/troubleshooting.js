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


class GameBoard{
  constructor(carrier, battleship, cruiser, sub, destroyer){ /* ship obj requires length and name determined. */
    this.board = this.createGraph()
    this.sinkCount = 0 /* This could be used to track winner/loser. But does it belong here, or under player class? */
    this.carrier = new Ship(5, 'carrier')
    this.battleship = new Ship(4, 'battleship')
    this.cruiser = new Ship(3, 'cruiser')
    this.sub = new Ship(3, 'submarine')
    this.destroyer = new Ship(2, 'destroyer')

  }
   
  receiveAttack(key){
    if(this.board[key].selected === false){
      this.changeSelected(this.board[key])

      if(this.board[key].occupied !== false){ /* ship class item is stored in "this.board[coor].occupied" making .hit() callable when square is attacked. */
        let ship = this.board[key].occupied
        ship.hit()
        return 'hit'
      }
      return 'miss'
    }
    else{
      return false /* return value is deferring to bool for whether turn should change */
    }
  }
}