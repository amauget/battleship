const { GameBoard } = require("./jsImports/gameBoard")

class DOM{ /* Class links DOM to GameBoards */
  constructor(){
    this.player1 = new GameBoard('human')
    this.player2 = new GameBoard('computer')

    this.currentPlayer = this.player1

    this.playerDOM = document.querySelector('.playerBoard')
    this.sideBarList = document.querySelector('ul')
    this.sideBarShips = document.querySelectorAll('.ship')

    this.ship = (this.player1).carrier
    this.orient = 'x'
    this.validArray = []
    this.count = 0 /* used to navigate to next ship in sideBar */
  }
  createBoard(){
    let classArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    for(let row = 0; row < 10; row++){
      let rowElement = document.createElement('div')
      rowElement.className = classArray[row]
      rowElement.id = 'row'
      
      for(let col = 0; col < 10; col++){
        let colElement = document.createElement('div')
        colElement.value = `${col},${row}`
        colElement.className = 'cell' 
        rowElement.appendChild(colElement)
        colElement.textContent = `${colElement.value}`      
      }
      (this.playerDOM).appendChild(rowElement)
    }
  }
  selectShip(shipName){
    return this.ship = this.currentPlayer[shipName] /* targets current "gameboard" */
  }

  updateOrient(orientation){ /* takes in DOM element */
    return this.orient = orientation
  }
  updateValidArray(cell){ /* updates valid array for storage, instead of multiple values reaching eventListener, data is accessed outside function */
    return this.validArray = (this.currentPlayer).validPlacement(this.ship, cell, this.orient)
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
    let cells = document.querySelectorAll('.cell')
    
    cells.forEach(cell =>{
      cell.style.background = (this.player1).board[cell.value].background /* intended to reset to either white(empty) or gray(ship placed)*/ 
      if((this.validArray).includes(cell.textContent)){

        if(this.auditRange() === true && this.auditCellOccupied() === true){
          cell.style.background = 'green'
        }
        else{
          cell.style.background = 'red'
        }
      }
    })
  }
  setShipColoration(){
    let cells = document.querySelectorAll('.cell')

    cells.forEach(cell =>{
      /* target only relevent cells, if empty and within range, allow ship placement */
     
      if((this.validArray).includes(cell.value)){

        (this.currentPlayer).board[cell.value].background = 'gray'
        this.currentPlayer.board[cell.value]
        cell.style.background = 'gray'
      }
    })
    return this.currentPlayer
  }
  trimSideBar(){
    let placedShip = document.querySelector(`#${this.ship.name}`)
    console.log(this.ship.name)
    this.sideBarList.removeChild(placedShip)
    this.count += 1

    return this.sideBarShips = this.updateSideBarShips(placedShip) /* nodeList to iterate for ship placement status */
  }
  updateSideBarShips(placedShip, status = 'trim'){ /* status condition determines whether reset or ship placement is occurring */
    let newSideBarShips = []
    if(status === 'reset'){
      newSideBarShips = document.querySelectorAll('.ship')
    }
    else{
      this.sideBarShips.forEach(ship => {
        if(ship.textContent !== placedShip.textContent){
          newSideBarShips.push(ship)
        }
      })
    }

    return newSideBarShips /* updates this.sideBarShips */
  }
  allShipsPlaced(){
    let sideBarShips = document.querySelectorAll('.ship')
    sideBarShips.forEach(ship =>{
      if(ship.style.display !== 'none'){
        return false
      }
    })
    return true
  }
  resetSideBar(){
    this.sideBarList.innerHTML = ''
    let shipNames = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']
    for(let i = 0; i < 5; i++){
      let item = document.createElement('li')
      item.textContent = shipNames[i]
      item.id = (shipNames[i]).toLocaleLowerCase()
      item.className = 'ship'

      this.sideBarList.append(item)
    }
    this.sideBarShips =  this.updateSideBarShips(undefined, 'reset') 

    return this.sideBarList
  }
  defaultShipSelector(){
    let shipName = this.sideBarShips[0].id
    this.selectShip(shipName)
  }
}

module.exports = DOM