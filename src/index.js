const DOM = require('./jsImports/DOM')

import './style.css'

/* index.js is the quarterback. Nothing but event listeners and function calls! 
Emphasis on loosely coupled function relationships
*/

function init(){ 
  let game = new DOM()

  let opponentBoard = document.querySelector('.opponentBoardContainer')
  game.createBoard(opponentBoard, 'opponentBoard', 'opponentCell')

  let playerBoardContainer = document.querySelector('.playerBoardContainer')
  game.createBoard(playerBoardContainer, 'playerBoard', 'playerCell')

  // game.alert.welcome()

/* remove after dev  */

 /*^^^ remove after dev ^^^  */

  // let okayBtn = document.querySelector('.okay')
  // okayBtn.addEventListener('click', () =>{
  //   game.alert.hide()
    setUp(game, playerBoardContainer, opponentBoard)
  // })
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
        // console.log(target.value)
        switch(target.className){
          case('cell'):
        //   console.log('case', target.value)
            game.updateValidArray(target) /*if ship img is clicked within cell, parent cell value targeted */
        }
        
      }
      else{
        game.validArray = []
      }
      game.cellAuditColoration()
    }
  }
  // let playerBoard = document.querySelector('.playerBoardContainer')
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
          console.log(game.player1.board[target.value])
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

  // startGame.addEventListener('click', () =>{
  //   if(shipList.childElementCount === 0){
  //     playerDOM.removeEventListener('click', handleClick)
  //     playerDOM.removeEventListener('mouseover', handleMouseover)
      
  //     resetPieces.removeEventListener('click', handleReset)
     
      gameBegins(game, playerBoard, opponentBoard)
    // }

  // })
  // REMOVE THESE AFTER DEV
  // game.changeCurrentPlayer()
  // gameBegins(game)
}


function gameBegins(game, playerBoard, opponentBoard){ 
  game.changeCurrentPlayer()
  opponentBoard = handleOpponentShips(game)

  game.handleCompSearch()

  // let eventToggle = ((target) =>{
  //   let element1 = opponentBoard, element2 = playerBoard

  //   if(target === 'playerCell'){ element1 = playerBoard, element2 = opponentBoard }
    
  //   element1.removeEventListener('click', handleClick)
  //   element2.addEventListener('click', handleClick)
  // })

  let handleClick = (event) =>{
    let target = event.target

    if(target.id === game.currentPlayer.playerType){ 
      /* playerType =  playerCell or opponentCell to isolate cell ID*/
      switch(target.className){
        case('cell'):
          // Reminder: cell.value = key for coordinate obj
          let marker = game.attackHandling(target.value)
          target.appendChild(marker)
          
          game.toggleTurn() //changes turn
      }
    }
  }
   
  opponentBoard.addEventListener('click', handleClick)
  playerBoard.addEventListener('click', handleClick)
}
function handleOpponentShips(game){
  let opponentBoard = document.querySelector('.opponentBoardContainer')
  game.defaultShipSelector()/* REMOVE AFTER DEV */

  game.randomShipSet()
  return opponentBoard
}


console.trace()

init()

