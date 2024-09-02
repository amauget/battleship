const DOM = require('./jsImports/DOM')

import './style.css'

/* index.js is the quarterback. Nothing but event listeners and function calls! 
Emphasis on loosely coupled function relationships
*/

function init(start = 'firstGame'){ 
  let body = document.querySelector('body')

  let game = new DOM()


  game.originalInnerHTML(body)
  
  let opponentBoardContainer = document.querySelector('.opponentBoardContainer')
  game.createBoard(opponentBoardContainer, 'opponentBoard', 'opponentCell')

  let playerBoardContainer = document.querySelector('.playerBoardContainer')
  game.createBoard(playerBoardContainer, 'playerBoard', 'playerCell')

  if(start === 'firstGame'){
    game.alert.welcome()

    let handleOkay = () => {
      game.alert.hide()

      setUp(game, playerBoardContainer, opponentBoardContainer)
      okayBtn.removeEventListener('click', handleOkay)
    }
  
    let okayBtn = document.querySelector('.okay')
    okayBtn.addEventListener('click', handleOkay)

    
  }
  else{
    setUp(game, playerBoardContainer, opponentBoardContainer)
  }

}
function setUp(game, playerBoard, opponentBoard){ /* all current data is stored outside the queue */
  let shipList = document.querySelector('.ships')

  shipList.addEventListener('click', (event) =>{
    let target = event.target
    switch(target.className){
      case('ship'):
        game.selectShip(target.id)
        game.selectedShipIndicator(target, shipList)
            
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

  let handleMouseover = (event) =>{ /* red/green backgrounds to indicate elligibility */
    if(shipList.childElementCount > 0){ /* rework this into defaultShipSelector */
      let target = event.target
      if(target.className === 'ship'){ /* Redirects target from ship nested in cell to parent cell */
        target = target.parentElement
      }
      if(target.className === 'cell'){
        switch(target.className){
          case('cell'):

          game.updateValidArray(target) /*if ship img is clicked within cell, parent cell value targeted */
        }
        
      }
      else{
        game.validArray = []
      }
      game.cellAuditColoration()
    }
  }
  playerBoard.addEventListener('mouseover', handleMouseover)

  let playerDOM = document.querySelector('.playerBoardContainer')

  playerDOM.addEventListener('mousedown', (event) =>{ /* this event allows for ship direction toggle with scroll click */
    if(game.allShipsPlaced() === false){ 
      if(event.button === 1){
        let newVal = undefined
        if(game.orient === 'x')
          newVal = 'y'
        else{
          newVal = 'x'
        }
        let cell = event.target
        if(event.target.className === 'ship'){
          cell = event.target.parentElement /* conveys parent cell instead of img */
        }
        game.updateOrient(newVal)
        game.updateValidArray(cell)
        game.cellAuditColoration()
      }  
    }
  })

  let handleClick = (event) =>{ 
    let target = event.target
    switch(target.className){
      case('cell'):
        if(game.auditRange() === true && game.auditCellOccupied() === true){
          
          (game.currentPlayer).setShip(game.ship, game.validArray, game.orient)
          game.trimSideBar() 

          game.currentPlayer.trimShipsArray(game.ship)

/*           game.setShipColoration() /* changes default grid color to gray */          
          game.setShipImg(target)
          if(game.allShipsPlaced() === true){
            game.validArray = []
            
          }
          game.cellAuditColoration() /* reset cell colors after ship placement */
          game.defaultShipSelector()
        }
    }
  }
  playerDOM.addEventListener('click', handleClick)
  
  let handleReset = () =>{ /* note. grid doesn't reset until hover occurs */      
    let playerBoard = document.querySelector('.playerBoard')
    playerDOM.removeChild(playerBoard)
    
    game.createBoard(playerDOM, 'playerBoard', 'playerCell') /* creates new DOM game board */

    game.player1.createGraph() /* resets cell obj data*/
    
    game.resetSideBar()

    game.currentPlayer.resetShipsArray()
    
    game.defaultShipSelector()
  
  }
  let resetPieces = document.querySelector('.resetPieces')

  resetPieces.addEventListener('click', handleReset)


  let startGame = document.querySelector('.startGame')

  startGame.addEventListener('click', () =>{
    if(shipList.childElementCount === 0){
      playerDOM.removeEventListener('click', handleClick)
      playerDOM.removeEventListener('mouseover', handleMouseover)
      
      resetPieces.removeEventListener('click', handleReset)

      game.alert.displayHitLog()
      
      gameBegins(game, playerBoard, opponentBoard)
      
      startGame.style.display = 'none'
      resetPieces.style.display = 'none'
      
      let sideBar = document.querySelector('.sideBar')
      sideBar.style.marginRight = '-100vw'

      // game.setShipColoration() 
      //FOR DEV 
      // game.resetDOM()
      // init('reset')
    }

  })
}


function gameBegins(game, playerBoard, opponentBoard){ 
  opponentBoard = handleOpponentShips(game)
  
  game.alert.openFire()
  game.alert.timeout(1500)

  game.currentPlayer = game.player1
  game.attackedPlayer = game.player2

  let handleClick = (event) =>{
    let target = event.target

    let cell = game.player2.board[target.value]

    try{
      if(game.currentPlayer === game.player1 && cell.selected === false){

        if(target.id === 'opponentCell'){ 
          switch(target.className){
            case('cell'):
              // Reminder: cell.value = key for coordinate obj
              
              let marker = game.attackHandling(target.value, game.player2)
              target.appendChild(marker)
              if(game.winnerFound() !== false){ /* after player attack */
                opponentBoard.removeEventListener('click', handleClick)
                handleEndGame(game)
                return
          
              } 

              game.toggleTurn()
  
              setTimeout(() =>{
                game.handleCompSearch()
                if(game.winnerFound() !== false){ /* after computer attack */
                  opponentBoard.removeEventListener('click', handleClick)
                  handleEndGame(game)
                  return
                }  
              }, 250)
              
              
              game.toggleTurn()

            }
        }
      }
      
    }catch(error){
      console.log(error)
      if(error === TypeError){ /* handles target ids that don't have coordinate values. */
        return
      }
    }
    
  }
  opponentBoard.addEventListener('click', handleClick)
}
function handleEndGame(game){
  game.alert.result(game.winner)
  game.changeBackground()
  game.setShipColoration()
  game.alert.timeout(3000)
  game.alert.playAgain()

  let playAgain = document.querySelector('.playAgain')

  playAgain.addEventListener('click', ()=>{
    game.resetDOM()
    init('new game')
  })



}


function handleOpponentShips(game){
  game.toggleTurn()
  //Change turn. Set ships. Change turn again..
  let opponentBoard = document.querySelector('.opponentBoardContainer')
  game.defaultShipSelector()

  game.randomShipSet()

  game.currentPlayer = game.player1

  game.toggleTurn()

  return opponentBoard
}


console.trace()

init()

