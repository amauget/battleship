const { GameBoard } = require("./gameBoard")

class DOM{ /* Class links DOM to GameBoards */
  constructor(){
    this.player1 = new GameBoard('human')
    this.player2 = new GameBoard('computer')

    this.currentPlayer = this.player1

    this.sideBarList = document.querySelector('ul')
    this.sideBarShips = document.querySelectorAll('.ship')

    this.ship = (this.player1).carrier
   
    this.orient = 'x'
    this.validArray = []
    this.count = 0 /* used to navigate to next ship in sideBar */
  }
  allShipsPlaced(){
    let shipList = document.querySelector('.ships')
    return shipList.childElementCount === 0 ? true : false
  }
  auditRange(){ /* checks this.validArray for null value  */
    if(this.validArray[this.validArray.length - 1] !== null){
      return true
    }
  }
  auditCellOccupied(){ /* checks cell objs for empty status */
   for(let i = 0; i < this.validArray.length; i++){
    let key = (this.validArray[i])
    let coord = this.player1.board[key]

    if(coord.occupied !== false){
      return false
    }
   }
   return true
  }
  cellAuditColoration(){ 
    let playerBoard = document.querySelector('.playerBoard')
    let cells = playerBoard.querySelectorAll('.cell')
    
    cells.forEach(cell =>{

      cell.style.background = (this.player1).board[cell.value].background /* intended to reset to either white(empty) or gray(ship placed)*/ 
        if((this.validArray).length === 0){
          cell.style.background = 'none'
          return
        }
        
          if((this.validArray).includes(cell.value)){ /* narrows target to to pertinent cells */
  
          if(this.auditRange() === true && this.auditCellOccupied() === true){
            cell.style.background = 'rgba(0, 128, 0, 0.479)'
          }
          else{
            cell.style.background = 'rgba(255, 0, 0, 0.384)'
          }
        }
    })
  }
  createBoard(container, desiredClassName, cellId){
    let div = document.createElement('div')
    div.className = desiredClassName
    
    let classArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    for(let row = 0; row < 10; row++){
      let rowElement = document.createElement('div')
      rowElement.className = classArray[row]
      rowElement.id = 'row'
      
      for(let col = 0; col < 10; col++){
        let colElement = document.createElement('div')
        colElement.value = `${col},${row}`
        colElement.className = 'cell' 
        colElement.id = cellId

        rowElement.appendChild(colElement)  
         
      }
      div.appendChild(rowElement)
    }
    return container.appendChild(div)
  }
  changeCurrentPlayer(){
    if(this.currentPlayer === this.player1){
      this.currentPlayer = this.player2
    }
    else{
      this.currentPlayer = this.player1
    }
    return this.currentPlayer
  }
  defaultShipSelector(){ /* utilizes ship array found under Gameboard */
    let shipsArray = this.currentPlayer.shipsArray
    // console.log(shipsArray)
    if(shipsArray.length > 0){
      let shipName = shipsArray[0].name
      
      this.selectShip(shipName)

      this.selectedShipIndicator(document.querySelector(`#${shipName}`))
    }
    
  }
  randomShipSet(player = this.player2){  /*  updateValidArray(cell)*/
    let shipsArray = player.shipsArray
   
    while(player.shipsArray.length > 0){
      this.orient = this.randomizeOrientation()

      let startingCoor =  this.randomizeCoordinates()
     
      this.updateValidArray(startingCoor)
     
      while(this.auditRange() !== true){
        startingCoor = this.randomizeCoordinates()
        this.updateValidArray(startingCoor) 
      }
      player.setShip(this.ship, this.validArray, this.orient )

      this.setShipColoration()
   
      player.trimShipsArray()
      
      this.defaultShipSelector()
    }
    
  }
  randomizeCoordinates(){
    let array = []
    
    for(let i = 0; i < 2; i ++){
      let randomizer = Math.floor(Math.random() * 10)
      array.push(randomizer)
    }
    let x = array[0], y = array[1]

    return `${x},${y}` /* this is starting point of ship placement */

  }
  randomizeOrientation(){
    let orientations = ['x', 'y']
    
    let randomizer = Math.floor(Math.random() * 2)
    return this.orient = orientations[randomizer] /* this is the orientation of ship placement */
  }
  resetSideBar(){
    this.sideBarList.innerHTML = ''
    let shipNames = ['carrier', 'battleship', 'submarine', 'cruiser', 'destroyer']
    for(let i = 0; i < 5; i++){
      let item = document.createElement('img')
      item.src = `./externalItems/shipSprites/${shipNames[i]}.png`
      item.id = (shipNames[i]).toLocaleLowerCase()
      item.className = 'ship'

      this.sideBarList.append(item)
    }
    this.sideBarShips =  this.updateSideBarShips(undefined, 'reset') 

    return this.sideBarList
  }
  setShipColoration(){
    let opponent = document.querySelector('.opponentBoard')
    let cells = opponent.querySelectorAll('.cell')

    cells.forEach(cell =>{
      /* target only relevent cells, if empty and within range, allow ship placement */
      if((this.validArray).includes(cell.value)){

        (this.currentPlayer).board[cell.value].background = 'blue'
        this.currentPlayer.board[cell.value]
        cell.style.background = 'blue'
      }
    })
    return this.currentPlayer
  }

  setShipImg(cell){
    cell.style.background = 'none'
    let ship = this.ship
    let img = document.createElement('img')

    img.src = `./externalItems/shipSprites/${ship.name}.png`
    img.id = ship.name
    img.className = 'ship'
    img.style.transformOrigin = 'top'
    img.style.background = 'none'
    img.style.zIndex = 0;
    if(this.orient === 'x'){
        cell.style.transform = 'rotate(270deg)' 
        /* rotating the cell keeps the image origin in the same spot.  */
    }
    else{
      cell.style.transform = 'rotate(180deg)'
    }
    cell.appendChild(img)
    cell.style.textAlign = 'center'
   
  }
  selectShip(shipName){
    return this.ship = this.currentPlayer[shipName] /* targets current "gameboard" */
  }
  selectedShipIndicator(ship){
    let ships = document.querySelectorAll('.ship')
    
    ships.forEach(item =>{
      item.style.background = 'none'
    })
    ship.style.background = 'rgb(255, 0, 0, 0.275)'
  }
  shadeOrientButton(orientation){
    let orients = document.querySelectorAll('.orient')

    orients.forEach(orient => orient.style.background = 'white')

    let button = document.querySelector(`#${orientation}`)
    button.style.background = 'rgba(255, 0, 0, 0.276)'
  }
  trimSideBar(){
    let placedShip = document.querySelector(`#${this.ship.name}`)
    this.sideBarList.removeChild(placedShip)
    this.count += 1

    return this.sideBarShips = this.updateSideBarShips(placedShip) /* nodeList to iterate for ship placement status */
  }
  updateOrient(orientation){ /* takes in DOM element */
    this.shadeOrientButton(orientation)
    this.orient = orientation
  }
  updateValidArray(cell){ /* takes in DOM element */
    return this.validArray = (this.currentPlayer).validPlacement(this.ship, cell, this.orient)
  }
  updateSideBarShips(placedShip, status = 'trim'){ 
    /* status condition determines whether reset or ship placement is occurring */
    let newSideBarShips = []
    if(status === 'reset'){
      newSideBarShips = document.querySelectorAll('.ship')
    }
    else{
      this.sideBarShips.forEach(ship => {
        if(ship.id !== placedShip.id){
          newSideBarShips.push(ship)
        }
      })
    }
    return newSideBarShips /* updates this.sideBarShips */
  }  
 
}

module.exports = DOM