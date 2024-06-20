const shipObjs = require('./ship')
const ship = shipObjs.Ship
let notSunk = shipObjs.notSunkShip
let sunkShip = shipObjs.sunkShip

it('ship hit count adds', () =>{
  expect(new ship(5).hit()).toEqual(1)
})

it('ship hit count continuously adds', () => {
  expect(new ship(5).hit() * 5).toEqual(5)
})


it("3 length ship with 1 hit doesn't sink", () =>{
  expect(notSunk.sunk).toBeFalsy()
})

it('5 length ship with 5 hit sinks', () => { 
  /* mock values assigned before importing*/
  expect(sunkShip.isSunk()).toBeTruthy()
})