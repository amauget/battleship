class Search{
  constructor(sunk){
    this.sunk = sunk /* DOM.js this.player1.sunk array for search tracking */

    this.gap = 2 // defaults to length of destroyer
    this.origin = this.randomizeOrigin()
    this.pattern = this.searchInfo()

    this.firstHit = ''
    this.lastHit = ''

    this.targetShip = undefined //updates sweep search finds hit
    this.hitLog = [] /* "firstHit" coordinates are pushed here if determined that more than one ship is attacked */
    this.hitCount = 0
    this.missCount = 0
    // this.multiShips = false // if ships are aligned during search toggles to true
    // used to control when this.hitLog pushes data

    this.hitSearch = ['up', 'down', 'left', 'right']
    this.huntingShip = false
  }
  // INITIALIZATION 
  searchInfo(){
    let search = { /*  */
      one: {start: '0,1', addToStart: [0, this.gap], addToHalfway: [this.gap, 0], coord: '0,1', addToCoord: [1,-1]},
      two: {start: '8,9', addToStart:[-this.gap, 0], addToHalfway: [0, -this.gap], coord:'8,9', addToCoord:[1,-1]},
      three: {start: '0,9', addToStart:[this.gap, 0], addToHalfway: [0, this.gap], coord:'0,9', addToCoord: [1,-1]}, /* works from halfway to right corner then starts @ 0,1 */
      four: {start: '0,9', addToStart:[0, -this.gap], addToHalfway: [-this.gap, 0], coord: '0,9', addToCoord: [1,-1]}
    }
    return search[this.origin]
  }
  randomizeOrigin(){
    let originArray = ['one', 'two', 'three', 'four']

    let index = Math.floor(Math.random() * 4)
    return originArray[index]
  }
  updateSearchInfo(){

    if(this.origin === 'two' || this.origin === 'four'){
      this.gap *= -1
      // this.pattern.addToStart = [this.gap, 0], this.pattern.addToHalfway = [0, this.gap] 
    }
   
    for(let i = 0; i < this.pattern.addToStart.length; i++){
      if(this.pattern.addToStart[i] !== 0){
        this.pattern.addToStart[i] = this.gap
      
      }
      if(this.pattern.addToHalfway[i] !== 0){
        this.pattern.addToHalfway[i] = this.gap
      }
    }
  }
  // SEARCH INCREMENTS
 
  addNextOrigin(){ /* called when next hypotenuse is ready to be traversed. */
    let adder = this.pattern.addToStart /* array */
    let start = (this.pattern.start).split(',')
    /* x and y axis */
    let x = parseInt(start[0]) + adder[0]
    let y = parseInt(start[1]) + adder[1]
    if(this.origin === 'three' && ((x > 9 && y >= 7)||(x > 9 && y < 0))){
      x = 0
      y = -1 + this.gap
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    else if(this.origin === 'four' && ( y < 0 && x === 0)){
      x = 10 - Math.abs(this.gap)
      y = 9
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    this.pattern.start = `${x},${y}`
    this.pattern.coord = this.pattern.start
    return this.pattern
  }

  changeCoordAdder(){ /* hypotenuse traversal of grid */
    let adder = this.pattern.addToCoord
    let coord = this.pattern.coord.split(',')
    // x and y axis
    let x = parseInt(coord[0]) + adder[0]
    let y = parseInt(coord[1]) + adder[1] 
  
    return this.pattern.coord = `${x},${y}`
  }
  checkRange(){
    let x = parseInt((this.pattern.coord.split(','))[0])
    let y = parseInt((this.pattern.coord.split(','))[1])

    if(this.origin === 'one' && (x === 10 || y > 9)){
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    if(this.origin === 'two' && x === -1){
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    if(this.origin === 'three' && x > 9 && y >= 7 ){ /* 7 is minimum y value when x is out of bounds at corner */
      this.pattern.addToStart = this.pattern.addToHalfway
      this.pattern.start = '0,-1'
      this.pattern.coord = '0,-1'
    }
    if(this.origin === 'four' && y < 0 && x === 2){
      this.pattern.addToStart = this.pattern.addToHalfway
      this.pattern.start = '11,9'
      this.pattern.coord = '11,9'
    }
    if(this.origin === 'one' || this.origin === 'two'){
      return y < 0 || x === 10 ? false : true

    }
    return y < 0 || y > 9 || x < 0 || x > 9 ? false : true /* false: new start, true: keep going down */
  }
  changeGap(increment){
    return this.gap = increment
  }

  /* NEIGHBORING SHIPS */

  multipleShips(){
    if(this.missCount > 1 && this.hitCount > 1){ /* more than 1 ship found */  
      return this.multiShips = true
    }

  }
  trimHitLog(){
    return this.hitLog.splice(0,1)
  }
  prepShipInfo(){
    this.firstHit = this.hitLog[0].coordinates
    this.lastHit = this.firstHit
    this.targetShip = this.hitLog[0].occupied
    this.hitSearch = ['up', 'down', 'left', 'right']
    /* 
    Ways to determine:
      1. gather hit and miss count since hunting ship became true.
        if miss > 1 and ship hasn't sunk, multiple ships = hit count
    */
  }
  auditHitLogLength(){
    if(this.hitLog.length === 0){
      this.hitCount = 0
      return this.multiShips = false
    }
  }
  updateAttackCounts(status, player){
    if(player.playerType === 'playerCell'){
      if(status === 'hit'){
        this.hitCount ++
      }
      else{
        this.missCount ++
      }
    }
 
  }
  compareAttacks(cell){
    if(this.targetShip.name === cell.occupied.name){
      return true
    }
    else{
      this.pushHitLog(cell)
      return false
    }
  }
  pushHitLog(cell){
    this.hitLog.push(cell)
    return this.hitLog
  }
  monitorTarget(){
    if(this.targetShip === undefined){ return }

    if(this.targetShip.sunk === true){
      this.updateSunk()

      if(this.hitLog.length === 0){
        this.huntingShip = false
        this.hitLog = []
        this.targetShip = undefined
      }
      else{
        this.prepShipInfo() // refreshes search array & last hit
        this.trimHitLog()
        
      }
    }
  }
  updateSunk(){
    this.sunk.push(this.targetShip)
    return this.sunk
  }
}


module.exports = Search