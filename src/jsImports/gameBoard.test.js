const gameBoardObjs = require('./gameBoard')

const GameBoard = gameBoardObjs.GameBoard
/* Mock Obj */
let player1 = new GameBoard()
player1.createGraph()
player1.board['5,5'].occupied = 'destroyer'

it('provides correct coordinate above', () => {
  expect(player1.board['2,2'].up).toContain(2,3)
})

it('provides correct coordinate below', () => {
  expect(player1.board['7,3'].down).toContain(7,2)
})

it('provides correct coordinate to left', () =>{
  expect(player1.board['6,9'].left).toContain(5,9)
})

it('provides correct coordinate to right', () =>{
  expect(player1.board['5,5'].right).toContain(6,5)
})

it('returns null for connected "cells" that are below of range', () =>{
  expect(player1.board['0,0'].down).toEqual(null)
})

it('returns null for connceted "cells" that are above range', () => {
  expect(player1.board['9,9'].up).toEqual(null)
})

it('returns null for connected "cells" that are left of min range', () =>{
  expect(player1.board['0,9'].left).toEqual(null)
})

it('returns null for connected "cells" that are right of max range', () => {
  expect(player1.board['9,0'].right).toEqual(null)
})

/* Setting ships */

it('sets a ship with proper x-axis coordinates', () =>{ /* cruiser = 3 */
  const expectedPosition = [[0,0], [1,0], [2,0]]
  const result = player1.setShip(player1.cruiser,[0,0], 'x')
  expect(result).toEqual(expectedPosition)
})

it('sets a ship with proper y-axis coordinates', () => {
  const expectedPosition = [[5,5], [5,6], [5,7], [5,8]]
  const result = player1.setShip(player1.battleship, [5,5], 'y')
  expect(result).toEqual(expectedPosition)
})

it('returns null for out of bounds x-axis', () => {
  expect(player1.setShip(player1.carrier, [7,0], 'x')).toEqual(null)
})

it('returns null for out of bounds y-axis', () => {
  expect(player1.setShip(player1.destroyer, [0,9], 'y')).toEqual(null)
})
