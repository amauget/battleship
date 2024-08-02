class Search{
  constructor(sunk){
    this.sunk = sunk /* DOM.js this.player1.sunk array for search tracking */
    this.pattern = this.searchInfo()

    this.firstHit = {} /* cell obj goes here after hit */
    this.lastHit = ''
    this.hitSearch = ['up', 'down', 'left', 'right']

    this.huntingShip = false

    // add a hit coord tracker
  }
  // INITIALIZATION 
  searchInfo(origin = 'one'){   
    let search = { /*  */
      one: {start: '0,1', addToStart: [0,2], addToHalfway: [2,0], coord: '0,1', addToCoord: [1,-1]},
      two: {start: '8,9', addToStart: [0,-2], addToHalway: [-2,0], coord:'8,9', addToCoord:[1,-1]}
    }
    return search[origin]
  }
  // SEARCH INCREMENTS
 
  addNextOrigin(){ /* called when next hypotenuse is ready to be traversed. */
    let adder = this.pattern.addToStart /* array */
    let start = (this.pattern.start).split(',')
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
  changeAddTo(){
    
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


}

module.exports = Search