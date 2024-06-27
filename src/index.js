const DOM = require('./DOM')

import './style.css'

/* index.js is the quarterback. Nothing but event listeners and function calls! 
Emphasis on loosely coupled function relationships
*/

function init(){ 
  let game = new DOM()
  game.createBoard()
  events(game)

}
function events(game){ /* all current data is stored outside the queue */
  let shipList = document.querySelector('ul')
  shipList.addEventListener('click', (event) =>{
    let target = event.target
    switch(target.className){
      case('ship'):
        game.selectShip(target.id)
        /* cell id is labeled to be the same as ship obj key */
    }
  })

  let orient_y = document.querySelector('#y')

  orient_y.addEventListener('click', () =>{
    game.updateOrient('y')

  })

  let orient_x = document.querySelector('#x')

  orient_x.addEventListener('click', () =>{
    game.updateOrient('x')
  })

  let playerDOM = document.querySelector('.playerBoard')
  
  let handleMouseover = (event) =>{ /* red/green backgrounds to indicate elligibility */
    if(shipList.childElementCount > 0){
      let target = event.target
  
      switch(target.className){
        case('cell'):
          game.updateValidArray(target) /* array items are strings...? */
       
          game.cellAuditColoration()
      }
    }
  }
  playerDOM.addEventListener('mouseover', handleMouseover)

  let handleClick = (event) =>{ 
    let target = event.target
    switch(target.className){
      case('cell'):
        if(game.auditRange() === true && game.auditCellOccupied() === true){
          
          (game.currentPlayer).setShip(game.ship, game.validArray, game.orient)

          game.setShipColoration() /* changes default grid color to gray */
          game.trimSideBar() /* hides previously set ships from side bar */
          game.defaultShipSelector()
        }
    }
  }
  playerDOM.addEventListener('click', handleClick)
  

  let handleReset = () =>{ /* note. grid doesn't reset until hover occurs */      
    playerDOM.innerHTML = '' /* deletes DOM game board */
    game.createBoard() /* creates new DOM game board */

    game.player1.createGraph() /* resets cell obj data*/
    
    game.resetSideBar()
    
    game.defaultShipSelector()
    console.log(game.ship)
  }
  let resetPieces = document.querySelector('.resetPieces')

  resetPieces.addEventListener('click', handleReset)


  let startGame = document.querySelector('.startGame')

  startGame.addEventListener('click', () =>{
    if(shipList.childElementCount === 0){
      playerDOM.removeEventListener('click', handleClick)
      playerDOM.removeEventListener('mouseover', handleMouseover)
      
      resetPieces.removeEventListener('click', handleReset)
      
      gameBegins(playerDOM, game)
    }

  })
}

function gameBegins(playerDOM, game){
  console.log('test')
}


console.trace()

init()
