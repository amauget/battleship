const ShipObjs = require('./ship')
const Ship = ShipObjs.Ship

class GameBoard{
  constructor(playerType){ /* ship obj requires length and name determined. */
    this.board = this.createGraph()
    this.playerType = playerType /* either "playerCell" or "opponentCell" for gameBoard coordinates */

    this.carrier = new Ship(5, 'carrier')
    this.battleship = new Ship(4, 'battleship')
    this.cruiser = new Ship(3, 'cruiser')
    this.submarine = new Ship(3, 'submarine')
    this.destroyer = new Ship(2, 'destroyer')

    this.shipsArray = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer] /* utilized for setting opponent ships */
    this.sunk = [] /* sunk ship tracker. Allows access to names(DOM Alert) and length of ship (computer search) */
    
  }
  createGraph(){
    this.board = {}
    for(let row = 0; row < 10; row++){
      for(let col = 0; col < 10; col++){
        let key = [col, row].toString()
        let moves = this.surroundingCoords(col, row)
        
        this.board[key] = {
          coordinates: [col, row], 
          up: moves[0], 
          down: moves[1], 
          left: moves[2], 
          right: moves[3], 
          occupied: false, 
          selected: false,
          background: 'none' /* default cell color, changes only after ship placement */
        }
        /* key is string of coordinates, obj includes coordinates and surrounding positions, including null. 
        Occupied status default value of false. Selected of true can't be selected again */
      }
    }
    return this.board
  }
  
  resetShipsArray(){
    return this.shipsArray = [this.carrier, this.battleship, this.cruiser, this.submarine, this.destroyer]
  }

  setShip(ship, validArray, orientation = 'x'){
    let next = undefined
    if(orientation === 'x'){
      next = 'right'
    }
    else{ /* orientation = y */
      next = 'up'
    }
    let arraySeg = validArray[0]

    let key = this.board[arraySeg].coordinates
    for(let i = 0; i < ship.length; i++){
      this.board[key].occupied = ship /* allows ship to be referenced later when square has an interaction */
      key = this.board[key][next]

      arraySeg = validArray[i]
      key = this.board[arraySeg][next]
    }
    return this.board
  }

  surroundingCoords(col, row){
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
    else if(col < 1){
      left = null
    }
    let array = []
    array.push(up,down,left,right)
    return array
  }

  trimShipsArray(ship){
    let index = this.shipsArray.indexOf(ship)
    
    return this.shipsArray.splice(index, 1)
  }
 
  validPlacement(ship, item, orientation){ /* item -> start coordinate var */
  /* set duplicates should be handled in setShip()*/
    let key = item
    if(typeof(item) === 'object'){ /* DOM Item vs String Coordinates */
      key = item.value
    }
    let currentCoord = this.board[key]

    let array = []
    let next = 'right'
    if(orientation === 'y'){
      next = 'up'
    }
    for(let i = 0; i < ship.length; i++){
      array.push(`${currentCoord.coordinates}`) /* push first because selected coor is valid by nature */
      if(currentCoord[next] === null){
        if(array.length < ship.length){
          array.push(currentCoord[next])
        }
        break
      }
      else{
        currentCoord = this.board[currentCoord[next]]
      }
    }
    return array
 }

  // START GAME

  receiveAttack(key){
    if(this.board[key].selected === false){
      this.changeSelected(this.board[key])

      if(this.board[key].occupied !== false){ /* ship class item is stored in "this.board[coor].occupied" making .hit() callable when square is attacked. */
        let shipKey = this.board[key].occupied
        shipKey.hit()
        return 'hit'
      }
      return 'miss'
    }
    else{
      return /*Implies cell has already been attacked... Do nothing*/
    }
  }
  changeSelected(item){ /* changes coordinate selected status to true to avoid multiple attacks on a coord */
    return item.selected = true
  }

}


// let test = new GameBoard()
// test.createGraph()
// test.setShip(test.destroyer, [0,0], 'x')

// test.receiveAttack('0,0')
// test.receiveAttack('1,0')



module.exports ={
  GameBoard,

}