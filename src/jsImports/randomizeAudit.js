

function prepAdjacentCoords(/* validArray ,*/ arrayIndex, index, value){
  let start = validArray[arrayIndex].replace(',','') /* initial coordinates */

  //isolate var to change
  let isolate = start[index]

  //Convert isolated coord to target value & convert back to string
  let changed = (parseInt(isolate) + value).toString()

  //isolate static coord
  let staticIndex = undefined
  index === 0 ? staticIndex = 1 : staticIndex = 0

  let unchanged = start[staticIndex]

  return  index < staticIndex ? `${changed},${unchanged} ` : `${unchanged},${changed}` 
  /* dictates order of changed/unchanged variables based on index selected by this.orient */
}

let validArray = ['1,2', '1,3', '1,4']
let orient = 'y'

function auditComputerPlacement(){
  let orientIndex = { 
    x: 0,
    y: 1
  }
  let index = orientIndex[orient] //targets coordinate index based on ship orientation

  let inverseIndex = undefined
  index === 0 ? inverseIndex = 1 : inverseIndex = 0

  /* Points along ship axis */
  let beforeFirst = prepAdjacentCoords(0, index, -1) /* first and last inputs are intrinsicly static values */

  let afterLast = prepAdjacentCoords((validArray.length - 1), index, 1)
  
  let neighbors = [beforeFirst, afterLast]
  
  /* Points parallel to ship axis */
  for(let i = 0; i < validArray.length; i++){
    let under = prepAdjacentCoords(i, inverseIndex, -1)
    let over = prepAdjacentCoords(i, inverseIndex, 1)

    neighbors.push(under, over)
    
  }

}

auditComputerPlacement()

module.exports = {
  prepAdjacentCoords
}