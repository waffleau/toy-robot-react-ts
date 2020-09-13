import { Command, State } from '../types'

import { canMove, canPlace, move, turnLeft, turnRight } from './robot'

const commandError = (state: State, command: Command, message: string): State => {
  const result = { command, message, success: false }
  return { ...state, commands: [...state.commands, result] }
}

const commandSuccess = (state: State, command: Command, message: string): State => {
  const result = { command, message, success: true }
  return { ...state, commands: [...state.commands, result] }
}

function reducer(state: State, command: Command): State {
  if (state.robot === null && command.name !== 'PLACE') {
    return commandError(state, command, 'Robot has not been placed')
  }

  // Even though TS should have enough info here to know that robot is assigned
  // for any command besides a PLACE, it still thinks it might be null, so
  // we're just going to go ahead and correct it
  const robot = state.robot!

  switch (command.name) {
    case 'MOVE': {
      if (!canMove(robot, state.board)) {
        return commandError(state, command, 'Move would cause robot to fall')
      }

      const deltaRobot = move(robot)
      const message = `Moved to ${deltaRobot.x}, ${deltaRobot.y}`
      return commandSuccess({ ...state, robot: deltaRobot }, command, message)
    }

    case 'PLACE': {
      if (!canPlace(command.robot, state.board)) {
        return commandError(state, command, 'Robot must be placed with a valid coordinate')
      }

      const message = `Robot placed: ${command.robot.x}, ${command.robot.y}, ${command.robot.direction}`
      return commandSuccess({ ...state, robot: command.robot }, command, message)
    }

    case 'REPORT': {
      const message = `Robot status: ${robot.x}, ${robot.y}, ${robot.direction}`
      return commandSuccess(state, command, message)
    }

    case 'TURN_LEFT': {
      const deltaRobot = turnLeft(robot)
      const message = `Direction is now ${deltaRobot.direction}`
      return commandSuccess({ ...state, robot: deltaRobot }, command, message)
    }

    case 'TURN_RIGHT': {
      const deltaRobot = turnRight(robot)
      const message = `Direction is now ${deltaRobot.direction}`
      return commandSuccess({ ...state, robot: deltaRobot }, command, message)
    }

    default:
      return state
  }
}

export default reducer
