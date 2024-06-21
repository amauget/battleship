const shipObjs = require('./ship')
const ship = shipObjs.Ship /* this.length, this.hits, this.sunk */
let notSunk = shipObjs.notSunkShip /* this.length = 3 this.hits = 1 */
let sunkShip = shipObjs.sunkShip  /* this.length = 5, this.hits = 5 */

it('newly created ship length is correct', () => {
  expect((new ship(4)).length).toEqual(4)
})

it('ship hit count adds', () =>{
  expect(new ship(5).hit()).toEqual(1)
})

it('ship hit count continuously adds', () => {
  expect(new ship(5).hit()).toEqual(1)
})


it("3 length ship with 1 hit doesn't sink", () =>{
  expect(notSunk.sunk).toBeFalsy()
})

it('5 length ship with 5 hit sinks', () => { 
  /* mock values assigned before importing*/
  expect(sunkShip.isSunk()).toBeTruthy()
})