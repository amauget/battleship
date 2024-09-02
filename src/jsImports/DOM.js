const { GameBoard } = require("./gameBoard")
const Alert = require('./alert')
const Search = require('./search')

class DOM{ /* Class links DOM to GameBoards */
  constructor(){
    this.player1 = new GameBoard('playerCell')
    this.player2 = new GameBoard('opponentCell')

    this.body = []

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
    
    this.winner = false
  }

  /*          PRE-GAME FUNCTIONS          */
  originalInnerHTML(body){
    /* save OG elements for "new game" */
    for(let i = 0; i < body.childElementCount; i++){
      this.body.push(body.children[i].cloneNode(true)) 
      /* clone node disables updating of elements as game goes on. */
    }
  }
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
  setShipColoration(array = this.validArray){
    let opponent = document.querySelector('.opponentBoard')
    let cells = opponent.querySelectorAll('.cell')

    cells.forEach(cell =>{
      /* target only relevent cells, if empty and within range, allow ship placement */
      if((array).includes(cell.value)){
       
        // this.player2.board[cell.value]
        cell.style.background = (this.player2).board[cell.value].background 
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
        img.style.transform = 'rotate(-90deg)' 
        img.style.marginTop = '30px'
        img.style.marginLeft = '-50px'
        img.style.position = 'static'
        img.style.bottom = '0px'
        
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

  /*          OPPONENT SHIP PLACEMENT         */

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
  /*          GAME FUNCTIONS          */

  attackHandling(target, player){ /* fed from event listeners in index -> gameBegins() */
    let attackStatus = player.receiveAttack(target)
    let marker = document.createElement('p')
    marker.className = 'marker'
    marker.textContent = 'x'

    if(attackStatus === 'miss'){
      marker.style.color = 'white'
    }
    else if(attackStatus === 'hit'){
      if(this.search.huntingShip === true){
        this.search.hitCount ++ 
      }
      marker.style.color = 'red'
      this.search.auditHitLogLength() 
      

      if(player.playerType === 'opponentCell'){ /* player 1 is attacking */
     
        let ship = (player.board[target].occupied)
        let shipName = ship.name

        if(ship.sunk === false){
          this.alert.appendHitLog(shipName,'Hit', 'black')
        }
        else{
          this.alert.appendHitLog(shipName,'Sunk', 'red')
        }
      }

    }    
    return marker
  }
  winnerFound(){
    let playerSunk = 0
    let compSunk = 0
    let nameArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']
    for(let i = 0; i < 5; i++){
      let shipName = nameArray[i]

      if(this.player1[shipName].sunk === true){
        playerSunk++
      }
      if(this.player2[shipName].sunk === true){
        compSunk ++
      }
    }
    if(playerSunk === 5){
      this.winner = 'computer'
    }
    else if(compSunk === 5){
      this.winner = 'player'
    }
    return this.winner
  }

  // Attack Functions
  accessCell(coord){
    return this.attackedPlayer.board[coord]
  }
  appendMarker(coord, marker){
    let cells = document.querySelectorAll('#playerCell') 
    /* CHANGE QUERY TO PLAYER AFTER DEV!!!! */
    cells.forEach(cell => {
      if(cell.value === coord){
        if(cell.childElementCount > 0 && cell.style.transform === 'rotate(270deg)'){
          marker.id = 'markerWithShip'
        }
        cell.appendChild(marker)
      }
    })
  }
/*          COMPUTER SEARCH DELEGATION          */

  sweepSearch(){
    let coord = this.search.pattern.coord //proposed attack coords
  
    let attacked = this.player1.board[coord] //associated coord cell data

    if(attacked === undefined || attacked.selected === true){ 
      /* when starting sweep begins out of bounds or has already been attacked */
      this.coordinateAdding()
      this.handleCompSearch()
    }
    else{ 
      
      let marker = this.attackHandling(coord, this.player1)

      this.appendMarker(coord, marker)
        
      if(attacked.occupied !== false){
        this.resetSearchData(attacked.coordinates) /* resets hitSearch array & logs the first hit coord */
        this.search.targetShip = attacked.occupied
        return this.search.huntingShip = true
        //tells handleCompSearch() to call hitSearch() until ship has sunk.
      }
      this.coordinateAdding()    
    }
    
   
  }
  coordinateAdding(){ /* actual pattern for standard search */
      this.auditSearchGap()
      this.search.changeCoordAdder()

      if(this.search.checkRange() === false){
        this.search.addNextOrigin()
      }
  }
  resetSearchData(cell){  // only called after first hit.
    this.search.hitSearch = ['up', 'down', 'left', 'right'] //resets for each ship

    this.search.firstHit = cell
    this.search.lastHit = cell
  }
  hitSearch(coord){ //coord obj
    let board = this.player1.board
    // this.auditSunk(coord, this.player1)

    // this.search.multipleShips() 
    try{
      // let ship = board[coord].occupied
      // this.auditSunk(ship) //includes huntingShip toggle for sunk
  
      if(this.search.huntingShip === false){ //breaks recursion
        this.handleCompSearch()
        return
      }
      let direction = this.search.hitSearch[0]

      coord = board[coord][direction].toString() /* coords stored in obj */      
      if(board[coord].selected === false){ /* NOT YET ATTACKED */
        let marker = this.attackHandling(coord, this.player1)
        this.appendMarker(coord, marker)
  
        if(board[coord].occupied !== false){/* ___HIT___ */
          if(this.search.compareAttacks(board[coord]) === true){ 
            //only continues searching that direction if ship names match
            return this.search.lastHit = coord 
          }
          
          
        }
      }
      else if(board[coord].selected === true){
        // this.search.lastHit = this.initialCoord() // reassigns initial hit coordinate

        this.updateHitSearch() //trims search array
        this.initialCoord() // reassigns initial hit coordinate to firstHit

        this.handleCompSearch()
      }

    }
    catch(error){ /* OUT OF RANGE */
      if(error instanceof TypeError){
         /* removes direction that led off board */
        this.updateHitSearch() //trims array
        this.search.lastHit = this.initialCoord() // reassigns initial hit coordinate
        this.handleCompSearch()
      }
    }
  }
  /*          COMP SEARCH STATE MONITORING AND ALTERATION          */

  handleCompSearch(){ /* recursion here.. not in the search functions */
    console.log('handleCompSearch')
    this.search.monitorTarget() //Coordinates targetShip & hitLog
    if(this.player1.sunk.length === 5){
      return
    }
    else if(this.search.huntingShip === false){
      this.sweepSearch() //resets to first hit before finding next coord
    }
    //This way, ships origin can be entered from this.hitLog[0]
    else{
        this.hitSearch(this.search.lastHit) //change to this.hitLog[0]?
    }
    
  }

  auditSearchGap(){
    let ships = this.search.sunk
    ships = ships.sort((shortest, longest) => shortest.length - longest.length)
    let gap = 2

    if(ships.length !== 0){
      if(ships[0].name === 'destroyer'){
        gap = 3

        if(ships.length >= 3 && ships[1].length === 3 && ships[2].length === 3){
          gap = 4
          if(ships.length >= 4 && ships[3].length === 4){
            gap = 5
          }
        }
        this.search.changeGap(gap)
        // this.search.updateAddTo(gap)
        this.search.updateSearchInfo()
        
      }
    }
  }
  toggleTurn(){
    if(this.currentPlayer === this.player1){
      return this.currentPlayer = this.player2, this.attackedPlayer = this.player1
    }
    else if(this.currentPlayer === this.player2){
      return this.currentPlayer = this.player1, this.attackedPlayer = this.player2
    }
  }
  initialCoord(){
    return this.search.lastHit = this.search.firstHit.toString()
  }
  updateHitSearch(){
    return (this.search.hitSearch).splice(0,1)
  }

  /* RESET GAME FUNCTIONS */

  resetDOM(){
    let body = document.querySelector('body')
    body.innerHTML = ''
    for(let i = 0; i < this.body.length; i++){
      body.append(this.body[i])
    }
  }

  changeBackground(){
    let board = this.player2.board
    let array = []
    for(const cell in board){
      if(board[cell].occupied !== false){
        board[cell].background = 'gray'
        array.push(board[cell].coordinates.toString())
      }
    }
    this.setShipColoration(array)
    return board

  }
}

module.exports = DOM