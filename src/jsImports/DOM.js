const { GameBoard } = require("./gameBoard")
const Alert = require('./alert')
const Search = require('./search')

class DOM{ /* Class links DOM to GameBoards */
  constructor(){
    this.player1 = new GameBoard('playerCell')
    this.player2 = new GameBoard('opponentCell')

    this.alert = new Alert()

    this.currentPlayer = this.player1 /* toggle to tell who is attacking and being attacked. */
    this.attackedPlayer = this.player2

    this.sideBarList = document.querySelector('ul')
    this.sideBarShips = document.querySelectorAll('.ship')

    this.ship = (this.currentPlayer).carrier
   
    this.orient = 'x'
    this.validArray = []
    this.count = 0 /* used to navigate to next ship in sideBar */
 
    this.search = new Search(this.player1.sunk) /* feeds player1 sunk array to computer search */
    
  }

  /*     PRE-GAME FUNCTIONS    */
  
  allShipsPlaced(){ /* REMEMBER TO CHANGE CURRENT PLAYER */
    let shipList = this.currentPlayer.shipsArray
    return shipList.length === 0 ? true : false
  }
  auditRange(){ /* checks this.validArray for null value  */
    if(this.validArray[this.validArray.length - 1] !== null){
      return true
    }
  }
  auditCellOccupied(array = this.validArray){ /* checks cell objs for empty status */
  for(let i = 0; i < array.length; i++){
    let key = (array[i])
    try{
      let coord = this.currentPlayer.board[key]
      if(coord.occupied !== false){
        return false
      }
    }catch(e){ /* coordinates that = 10 or -1. Since they don't exist, they can't be occupied. */
      if(e instanceof TypeError){
        continue
      }
    }
   }
   return true
  }
  cellAuditColoration(){ 
    let playerBoard = document.querySelector('.playerBoard')
    let cells = playerBoard.querySelectorAll('.cell')
    
    cells.forEach(cell =>{

      cell.style.background = (this.currentPlayer).board[cell.value].background /* intended to reset to either white(empty) or gray(ship placed)*/ 
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
    if(shipsArray.length > 0){
      let shipName = shipsArray[0].name
      
      this.selectShip(shipName)

      this.selectedShipIndicator(document.querySelector(`#${shipName}`))
    }
    
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

  /*    OPPONENT SHIP PLACEMENT   */

  auditComputerPlacement(){
    let orientIndex = { 
      x: 0,
      y: 1
    }
    let index = orientIndex[this.orient] //targets coordinate index based on ship orientation
  
    let inverseIndex = undefined
    index === 0 ? inverseIndex = 1 : inverseIndex = 0
  
    /* Points along ship axis */
    let beforeFirst = this.prepAdjacentCoords(0, index, -1) /* first and last inputs are intrinsicly static values */
  
    let afterLast = this.prepAdjacentCoords((this.validArray.length - 1), index, 1)
    
    let neighbors = [beforeFirst, afterLast]
    
    /* Points parallel to ship axis */
    for(let i = 0; i < this.validArray.length; i++){
      let under = this.prepAdjacentCoords(i, inverseIndex, -1)
      let over = this.prepAdjacentCoords(i, inverseIndex, 1)
  
      neighbors.push(under, over) 
    }
    if(this.auditCellOccupied(neighbors) === true){
      return true
    }
    
  }
  prepAdjacentCoords(arrayIndex, index, value){
    let start = this.validArray[arrayIndex].replace(',','') /* initial coordinates. comma removed for consisitent index targeting */
  
    //isolate coord to change
    let isolate = start[index]
  
    //Convert isolated coord to target value & convert back to string
    let changed = (parseInt(isolate) + value).toString()
  
    //isolate static coord
    let staticIndex = undefined
    index === 0 ? staticIndex = 1 : staticIndex = 0
  
    let unchanged = start[staticIndex]
  
    return  index < staticIndex ? `${changed},${unchanged}` : `${unchanged},${changed}` 
    /* dictates order of changed/unchanged variables based on index selected by this.orient */
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

  randomShipSet(){  /*  updateValidArray(cell)*/   

    if(this.allShipsPlaced() === true){
      return
    }
    this.orient = this.randomizeOrientation()

    let startingCoor =  this.randomizeCoordinates()
    this.updateValidArray(startingCoor)

    if(this.auditRange() === true && this.auditCellOccupied() !== false){
      if(this.auditComputerPlacement()){
        this.currentPlayer.setShip(this.ship, this.validArray, this.orient)
        this.setShipColoration()
        this.currentPlayer.trimShipsArray(this.ship)
        this.defaultShipSelector()
      }
    }
      this.randomShipSet() 
  }
  /*    GAME FUNCTIONS     */ 
  attackHandling(target){ /* fed from event listeners in index -> gameBegins() */
    let attackStatus = this.currentPlayer.receiveAttack(target)
    let marker = document.createElement('p')
    marker.className = 'marker'
    marker.textContent = 'x'
    if(attackStatus === 'miss'){
      marker.style.color = 'white'

    }
    else if(attackStatus === 'hit'){
      marker.style.color = 'red'
      
      let ship = this.currentPlayer.board[target].occupied
  
      this.auditSunk(ship)
    }
    // Implement a call to change this.changeCurrentPlayer()
    return marker
  }

  // Attack Functions
  accessCell(coord){
    return this.attackedPlayer.board[coord]
  }
  appendMarker(coord, marker){
    let cells = document.querySelectorAll('#opponentCell') 
    /* CHANGE QUERY TO PLAYER AFTER DEV!!!! */
    cells.forEach(cell => {
      if(cell.value === coord){
        cell.appendChild(marker)
      }
    })
  }
  // COMPUTER SEARCH DELEGATION
  standardSearch(){
    // console.log(this.search.pattern)
    let coord = this.search.pattern.coord //proposed attack coords
    
    let attacked = this.attackedPlayer.board[coord] //associated coord cell data

    if(attacked.selected === true){ //has already been attacked
      this.coordinateAdding()
    }
    else{
      let marker = this.attackHandling(coord)

      this.appendMarker(coord, marker)
       
      if(attacked.occupied !== false){
        this.resetSearchData(attacked.coordinates) /* resets hitSearch array & logs the first hit coord */
        return this.search.huntingShip = true
        //tells handleCompSearch() to call hitSearch() until ship has sunk.
      }
      this.coordinateAdding()    
    }
  }

  coordinateAdding(){ /* actual pattern for standard search */
      this.auditSearchGap()
      this.search.addToCoord()

      if(this.search.checkRange() === false){
        this.search.addNextOrigin()
        // this.searchProcess()
      }
      else if(this.search.checkRange() === 'done' ){
        return
      }
 
  }
  resetSearchData(attacked){  // only called after first hit.
    this.search.hitSearch = ['up', 'down', 'left', 'right'] //resets for each ship

    this.search.firstHit = attacked
    this.search.lastHit = attacked
  }

  hitSearch(coord){ //coord obj
    let board = this.attackedPlayer.board
  
    try{
      let ship = board[coord].occupied
     
      this.auditSunk(ship) //includes huntingShip toggle for sunk
      if(this.search.huntingShip === false){
        return
      }
      coord = board[coord][this.search.hitSearch[0]].toString() /* coords stored in obj */

      if(board[coord].selected === false){ /* NOT YET ATTACKED */
        let marker = this.attackHandling(coord)
        this.appendMarker(coord, marker)
  
        if(board[coord].occupied !== false){/* ___HIT___ */
          return this.search.lastHit = coord 
      
        }
      }
     //CALLS BELOW FOR MISS, AND ALREADY ATTACKED
      this.updateHitSearch() //trims search array
      this.initialCoord() // reassigns initial hit coordinate to firstHit
    }
    catch(error){ /* OUT OF RANGE */
      if(error instanceof TypeError){
        // console.log('TEST')
         /* removes direction that led off board */
        this.updateHitSearch() //trims array
        return this.search.lastHit = this.initialCoord() // reassigns initial hit coordinate
      }
    }
  
  }
  // STATE MONITORING AND ALTERATION
  handleCompSearch(){ /* recursion here.. not in the search functions */
     //this.search.randomize()....
    if(this.search.huntingShip === false){

      this.standardSearch() //resets to first hit before finding next coord
    }
    else{
        this.hitSearch(this.search.lastHit)
    }

    setTimeout(() =>{this.handleCompSearch()}, 600)
  }
  auditSunk(ship){
    if(ship.sunk === true){
      this.currentPlayer.sunk.push(ship)

      // this.alert.sunkMessage(ship.name)

      return this.search.huntingShip = false /* handleCompSearch() used for stdSearch vs hitSearch */

    }
    else{
      // this.alert.hitMessage(ship.name)
    }
  }
  auditSearchGap(){
    let ships = this.attackedPlayer.sunk
    ships = ships.sort((shortest, longest) => shortest.length - longest.length)
    if(ships.length !== 0){
      if(ships[0].name === 'destroyer'){
        this.search.updateSearchInfo(3)
        this.gap = 3
      }
    }
   
  }
  toggleTurn(){
    if(this.currentPlayer === this.player1){
      return this.currentPlayer = this.player2, this.attackedPlayer = this.player1
    }
    else{
      return this.currentPlayer = this.player1, this.attackedPlayer = this.player2
    }
    

  }
  initialCoord(){
    return this.search.lastHit = this.search.firstHit
  }
  updateHitSearch(){
    return (this.search.hitSearch).splice(0,1)
  }

  
}

module.exports = DOM