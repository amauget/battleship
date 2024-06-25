const gameBoardObjs = require('./gameBoard')
const GameBoard = gameBoardObjs.GameBoard

class Player{
  constructor(user = 'human'){
    this.user = user
    this.GameBoard = new GameBoard()
  }
} /* Be sure to explore where Computer search algos are going. If they don't go here, then what's the point of Player Class? */

let player = new Player()
let computer = new Player('Computer')
let key = '4,1'
/* computer.GameBoard.board[key] access format */

module.exports = Player