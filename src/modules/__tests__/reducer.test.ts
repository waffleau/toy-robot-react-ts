import { Command, Direction, State } from '../../types'

import reducer from '../reducer'

const state = {
  board: { height: 5, width: 5 },
  commands: [],
  robot: null,
}

describe('MOVE command', () => {
  test('denies a move command before a place', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer(state, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
  })

  test('can move north', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 2, y: 2, direction: Direction.North } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot).toEqual({ x: 2, y: 3, direction: 'north' })
  })

  test('can move east', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 2, y: 2, direction: Direction.East } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot).toEqual({ x: 3, y: 2, direction: 'east' })
  })

  test('can move south', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 2, y: 2, direction: Direction.South } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot).toEqual({ x: 2, y: 1, direction: Direction.South })
  })

  test('can move south', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 2, y: 2, direction: Direction.West } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot).toEqual({ x: 1, y: 2, direction: Direction.West })
  })

  test('cannot move north off the board', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 0, y: 4, direction: Direction.North } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
    expect(result.robot).toEqual({ x: 0, y: 4, direction: Direction.North })
  })

  test('cannot move east off the board', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 4, y: 0, direction: Direction.East } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
    expect(result.robot).toEqual({ x: 4, y: 0, direction: Direction.East })
  })

  test('cannot move south off the board', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.South } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
    expect(result.robot).toEqual({ x: 0, y: 0, direction: Direction.South })
  })

  test('cannot move west off the board', () => {
    const command: Command = { name: 'MOVE' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.West } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
    expect(result.robot).toEqual({ x: 0, y: 0, direction: Direction.West })
  })
})

describe('PLACE command', () => {
  test('cannot place off the board', () => {
    const assertNotPlaced = (newState: State) => {
      expect(newState.commands).toHaveLength(1)
      expect(newState.commands[0].success).toBeFalsy()
      expect(newState.robot).toBeNull()
    }

    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: -1, y: 0, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: 0, y: -1, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: -1, y: -1, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: 5, y: 0, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: 0, y: 5, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: 5, y: 5, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: -1, y: 5, direction: Direction.North } }))
    assertNotPlaced(reducer(state, { name: 'PLACE', robot: { x: 5, y: -1, direction: Direction.North } }))
  })

  test('places robot in valid position', () => {
    const robot = { x: 0, y: 0, direction: Direction.North }
    const command: Command = { name: 'PLACE', robot }
    const result = reducer({ ...state, robot: null }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot).toEqual(robot)
  })
})

describe('REPORT command', () => {
  test('denies a report command before a place', () => {
    const command: Command = { name: 'REPORT' }
    const result = reducer(state, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
  })

  test('cannot move west off the board', () => {
    const command: Command = { name: 'REPORT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.West } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
  })
})

describe('TURN_LEFT command', () => {
  test('denies a turn left command before a place', () => {
    const command: Command = { name: 'TURN_LEFT' }
    const result = reducer(state, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
  })

  test('north -> west', () => {
    const command: Command = { name: 'TURN_LEFT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.North } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.West)
  })

  test('west -> south', () => {
    const command: Command = { name: 'TURN_LEFT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.West } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.South)
  })

  test('south -> east', () => {
    const command: Command = { name: 'TURN_LEFT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.South } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.East)
  })

  test('east -> north', () => {
    const command: Command = { name: 'TURN_LEFT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.East } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.North)
  })
})

describe('TURN_RIGHT command', () => {
  test('denies a turn right command before a place', () => {
    const command: Command = { name: 'TURN_RIGHT' }
    const result = reducer(state, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeFalsy()
  })

  test('north -> east', () => {
    const command: Command = { name: 'TURN_RIGHT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.North } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.East)
  })

  test('east -> south', () => {
    const command: Command = { name: 'TURN_RIGHT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.East } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.South)
  })

  test('south -> west', () => {
    const command: Command = { name: 'TURN_RIGHT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.South } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.West)
  })

  test('west -> north', () => {
    const command: Command = { name: 'TURN_RIGHT' }
    const result = reducer({ ...state, robot: { x: 0, y: 0, direction: Direction.West } }, command)

    expect(result.commands).toHaveLength(1)
    expect(result.commands[0].success).toBeTruthy()
    expect(result.robot?.direction).toEqual(Direction.North)
  })
})
