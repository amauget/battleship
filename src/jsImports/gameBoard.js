const ShipObjs = require('./ship')
const Ship = ShipObjs.Ship

class GameBoard{
  constructor(carrier, battleship, cruiser, sub, destroyer){ /* ship obj requires length and name determined. */
    this.board = this.createGraph()
    this.sinkCount = 0 /* This could be used to track winner/loser. But does it belong here, or under player class? */
    this.carrier = new Ship(5, 'Carrier')
    this.battleship = new Ship(4, 'Battleship')
    this.cruiser = new Ship(3, 'Cruiser')
    this.sub = new Ship(3, 'Submarine')
    this.destroyer = new Ship(2, 'Destroyer')

  }
  createGraph(){
    this.board = {}
    for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
        let key = [col, row].toString()
        let moves = this.validRange(col, row)
        
        this.board[key] = {
          coordinates: [col, row], 
          up: moves[0], 
          down: moves[1], 
          left: moves[2], 
          right: moves[3], 
          occupied: null, 
          selected: false
        }
        /* key is string of coordinates, obj includes coordinates and surrounding positions, including null. 
        Occupied status default value of false. Selected of true can't be selected again */
      }
    }
    return this.board
  }
  validRange(col, row){
    let up = [col, row + 1]
    let down = [col, row -1 ]
    let left = [col -1, row] 
    let right = [col + 1, row]
    if(row > 8){
      up = null
    }
    else if(row < 1){
      down = null
    }
    if(col > 8){
      right = null
    }
    else if(col < 1){ /* bug in left right determination */
      left = null
    }
    let array = []
    array.push(up,down,left,right)
    return array
  }
 
  receiveAttack(key){
    this.changeSelected(this.board[key])
    if(this.board[key].occupied !== null){ /* ship class item is stored in "this.board[coor].occupied" making .hit() callable when square is attacked. */
      let ship = this.board[key].occupied
      ship.hit()
      return 'hit'
    }
    return 'miss'
  }
  changeSelected(item){
    return item.selected = true
  }
  setShip(ship ,coordinates, orientation = 'x'){
    let key = coordinates.toString()
    const origin = this.board[key].coordinates

    let coordinateArray = []

    if(orientation === 'x'){
      if((origin[0] + ship.length - 1) > 9){
        return null
      }
      else{
        /* retrieve all affected coordinates, change .occupied from null to ship */
        for(let i = 0; i < ship.length; i++){
          this.board[key].occupied = ship /* allows ship to be referenced later when square has an interaction */
          coordinateArray.push(this.board[key].coordinates)
          key = this.board[key].right
        }
        return coordinateArray
      }
    }
    else{
      if((origin[1] + ship.length - 1) > 9){
        return null
      }
      else{
        /* retrieve all affected coordinates, change .occupied from null to ship */
        for(let i = 0; i < ship.length; i++){
          this.board[key].occupied = ship /* allows ship to be referenced later when square has an interaction */
          coordinateArray.push(this.board[key].coordinates)
          key = this.board[key].up
          
        }
        return coordinateArray
      }
    }
  }
}


let test = new GameBoard()
test.createGraph()
test.setShip(test.destroyer, [0,0], 'x')

test.receiveAttack('0,0')
test.receiveAttack('1,0')

/* Mock Obj */
let player1 = new GameBoard()
player1.createGraph()
player1.board['5,5'].occupied = 'destroyer'

module.exports ={
  GameBoard,
  player1
}