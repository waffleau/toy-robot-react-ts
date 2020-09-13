import { Direction } from '../../types'

import parseCommand from '../parseCommand'

describe('parseCommand', () => {
  test('accepts left command', () => {
    expect(parseCommand('left')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
    expect(parseCommand('Left')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
    expect(parseCommand('LEFT')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
    expect(parseCommand(' LEFT')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
    expect(parseCommand(' LEFT ')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
    expect(parseCommand(' LEFT ignored')).toEqual({ command: { name: 'TURN_LEFT' }, error: null })
  })

  test('accepts move command', () => {
    expect(parseCommand('move')).toEqual({ command: { name: 'MOVE' }, error: null })
    expect(parseCommand('Move')).toEqual({ command: { name: 'MOVE' }, error: null })
    expect(parseCommand('MOVE')).toEqual({ command: { name: 'MOVE' }, error: null })
    expect(parseCommand(' MOVE')).toEqual({ command: { name: 'MOVE' }, error: null })
    expect(parseCommand(' MOVE ')).toEqual({ command: { name: 'MOVE' }, error: null })
    expect(parseCommand(' MOVE ignored')).toEqual({ command: { name: 'MOVE' }, error: null })
  })

  test('accepts place command', () => {
    expect(parseCommand('place 1,2,north')).toEqual({
      command: { name: 'PLACE', robot: { x: 1, y: 2, direction: Direction.North } },
      error: null,
    })
    expect(parseCommand('PLACE 3,3,south')).toEqual({
      command: { name: 'PLACE', robot: { x: 3, y: 3, direction: Direction.South } },
      error: null,
    })
    expect(parseCommand('PLACE 2,2,EAST')).toEqual({
      command: { name: 'PLACE', robot: { x: 2, y: 2, direction: Direction.East } },
      error: null,
    })
  })

  test('rejects a place command with invalid args', () => {
    expect(parseCommand('place a,2,north')).toEqual({
      command: null,
      error: 'Invalid place command. X-coordinate must be an integer',
    })
    expect(parseCommand('place 1,something,north')).toEqual({
      command: null,
      error: 'Invalid place command. Y-coordinate must be an integer',
    })
    expect(parseCommand('place a,b,north')).toEqual({
      command: null,
      error: 'Invalid place command. X-coordinate must be an integer',
    })
    expect(parseCommand('place 1,2,something')).toEqual({
      command: null,
      error: 'Invalid place command. Direction must be one of NORTH, SOUTH, EAST, WEST',
    })
  })

  test('accepts report command', () => {
    expect(parseCommand('report')).toEqual({ command: { name: 'REPORT' }, error: null })
    expect(parseCommand('report')).toEqual({ command: { name: 'REPORT' }, error: null })
    expect(parseCommand('REPORT')).toEqual({ command: { name: 'REPORT' }, error: null })
    expect(parseCommand(' REPORT')).toEqual({ command: { name: 'REPORT' }, error: null })
    expect(parseCommand(' REPORT ')).toEqual({ command: { name: 'REPORT' }, error: null })
    expect(parseCommand(' REPORT ignored')).toEqual({ command: { name: 'REPORT' }, error: null })
  })

  test('accepts right command', () => {
    expect(parseCommand('right')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
    expect(parseCommand('Right')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
    expect(parseCommand('RIGHT')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
    expect(parseCommand(' RIGHT')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
    expect(parseCommand(' RIGHT ')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
    expect(parseCommand(' RIGHT ignored')).toEqual({ command: { name: 'TURN_RIGHT' }, error: null })
  })

  test('returns an error for unknwon commands', () => {
    expect(parseCommand('toss')).toEqual({ command: null, error: "Command 'toss' not found" })
    expect(parseCommand('a')).toEqual({ command: null, error: "Command 'a' not found" })
    expect(parseCommand('COIN')).toEqual({ command: null, error: "Command 'coin' not found" })
    expect(parseCommand('To')).toEqual({ command: null, error: "Command 'to' not found" })
    expect(parseCommand('Your')).toEqual({ command: null, error: "Command 'your' not found" })
    expect(parseCommand('  WITCHER')).toEqual({ command: null, error: "Command 'witcher' not found" })
  })
})
