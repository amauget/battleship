const createBoard = require('./DOM')
const boardObj = require('./jsImports/gameBoard')
const GameBoard = boardObj.GameBoard
import './style.css'

function init(){
  let player = document.querySelector('.playerBoard')
  createBoard(player)
  
  // let opponent = document.querySelector('.opponentBoard')
  // createBoard(opponent)

  events(player)
}


function events(player){
  let player1 = new GameBoard()

  player.addEventListener('mouseover', (event) =>{ /* This event is only called after a ship is selected. Thus, the auditing (setShip()) function can run with ship type. Default of x */
    let target = event.target
    switch(target.className){
      case('cell'):

      let validArray = player1.validPlacement(player1.cruiser, target, 'x')
      let cells = document.querySelectorAll('.cell')
      cells.forEach(cell => {
        cell.style.background = 'none'
        if(validArray.includes(cell.textContent)){
          if(validArray.length < player1.battleship.length || validArray[validArray.length - 1] === null){
            cell.style.background = 'red'
            // console.log('if condition')
            // console.log(validArray)
          }
          else/* (validArray.length === player1.battleship.length && !validArray.includes(null)) */{
            // console.log('else condition')
            // console.log(validArray)
            cell.style.background = 'green'
          }
         
        }
        
 
      })
      
    }
  })
  player1.setShip('battleship',[0,0], 'x')
  player.addEventListener('click', (event) =>{

    let target = event.target
    switch(target.className){
      case('cell'):
      let key = target.id
      
      let hitStatus = player1.receiveAttack(key)
      // console.log(player1[hitStatus].hit())
      if(hitStatus !== 'miss'){
        // player1[key].hit()     

      
      }
    }
  })
}


console.trace()

init()
