class Search{
  constructor(sunk){
    this.sunk = sunk /* DOM.js this.player1.sunk array for search tracking */

    this.gap = 2 // defaults to length of destroyer
    this.origin = 'one' /* CHANGE TO RANDOMIZE FUNCTION!!!!!!!!!!! */
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
      two: {start: '8,9', addToStart:[-this.gap, 0], addToHalway: [0, -this.gap], coord:'8,9', addToCoord:[1,-1]}
    }
    return search[this.origin]
  }
  updateSearchInfo(value){
    console.log(value, ' value')
    let index1 = this.pattern.addToStart.indexOf(this.gap)
    this.pattern.addToStart[index1] = value

    let index2 = this.pattern.addToHalfway.indexOf(this.gap)
    this.pattern.addToHalfway[index2] = value

    console.log(index1, ' index1')
  }
  // SEARCH INCREMENTS
 
  addNextOrigin(){ /* called when next hypotenuse is ready to be traversed. */
    let adder = this.pattern.addToStart /* array */
    let start = (this.pattern.start).split(',')
    console.log(adder)
    /* x and y axis */
    let x = parseInt(start[0]) + adder[0]
    let y = parseInt(start[1]) + adder[1]

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
    if(x === 10){
      this.pattern.addToStart = this.pattern.addToHalfway
    }
    if(x === 10 && y === 9){
      return 'done'
    }
    return y < 0 || x === 10 ? false : true
  }
  changeGap(increment){
    return this.gap = increment
  }


}

module.exports = Search