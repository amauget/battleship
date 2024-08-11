class Search{
  constructor(sunk){
    this.sunk = sunk /* DOM.js this.player1.sunk array for search tracking */

    this.gap = 2 // defaults to length of destroyer
    this.origin = this.randomizeOrigin()
    this.pattern = this.searchInfo()

    this.firstHit = ''
    this.lastHit = ''



    // this.lastAttack = 'hit' // only referenced after hit, so defaults as hit.

    this.hitSearch = ['up', 'down', 'left', 'right']
    this.huntingShip = false

    // add a hit coord tracker
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
      // console.log(this.pattern.addToStart[i], ' add to start')
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
    // console.log(this.gap)
    // console.log(x, y, ' addNextOrigin')
    this.pattern.start = `${x},${y}`
    this.pattern.coord = this.pattern.start
    return this.pattern
  }

  addToCoord(){ /* hypotenuse traversal of grid */
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
    // console.log('check range')
    // console.log(this.pattern)
    // console.log(x, y)
    if(this.origin === 'one' && x === 10){
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    if(this.origin === 'two' && x === -1){
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    if(this.origin === 'three' && x > 9 && y >= 7 ){ /* 7 is minimum y value when x is out of bounds at corner */
      this.pattern.addToStart = this.pattern.addToHalfway
      this.pattern.start = '0,-1'
      this.pattern.coord = '0,-1'
      console.log(this.pattern)
    }
    if(this.origin === 'four' && y < 0 && x === 2){
      console.log('!!!!TEST!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(x, y)
      this.pattern.addToStart = this.pattern.addToHalfway
      this.pattern.start = '11,9'
      this.pattern.coord = '11,9'
    }
    return y < 0 || y > 9 || x < 0 || x > 9 ? false : true /* false: new start, true: keep going down */

  }
  changeGap(increment){
    return this.gap = increment
  }
}

module.exports = Search