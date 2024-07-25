const randomize = require('./randomizeAudit')

const prepAdjacentCoords = randomize.prepAdjacentCoords


it('returns a before string of "1,0"', () => {
  expect(prepAdjacentCoords(['1,2', '1,3', '1,4'],0, 1, -1)).toMatch('1,1')
                    /* (this.validArray, index of array, coordinate index , adder)        */
})

it('returns an after string of "6,4"', () =>{
  expect(prepAdjacentCoords(['3,4', '4,4', '5,4'], 2, 0, 1)).toMatch('6,4')
})

it('returns higher coord string with x-orientation', () => {
  expect(prepAdjacentCoords(['1,2', '1,3', '1,4'], 0, 0, 1)).toMatch('2,2')
})

it('returns lower coord string with x-orientation', () => {
  expect(prepAdjacentCoords(['1,2', '1,3', '1,4'], 0, 0, -1)).toMatch('0,2')
})

it('returns left coord string with y-orientation', () => {
  expect(prepAdjacentCoords(['3,4', '3,5', '3,6', '3,7'], 2, 0, -1)).toMatch('2,6')
})
it('returns right coord string with y-orientation', () => {
  expect(prepAdjacentCoords(['3,4', '3,5', '3,6', '3,7'], 3, 0, 1)).toMatch('4,7')
})