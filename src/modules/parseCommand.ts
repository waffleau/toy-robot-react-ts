import { Command, Direction, Nullable } from '../types'

interface ParsedCommand {
  command: Nullable<Command>
  error: Nullable<string>
}

const INVALID_PLACE_COMMAND_ERROR = "Invalid place command. Example usage: 'PLACE 1,2,NORTH'"

const directionsStringLookup: Record<string, Direction> = {
  north: Direction.North,
  east: Direction.East,
  south: Direction.South,
  west: Direction.West,
}

const sendError = (error: string) => ({ command: null, error })
const sendSuccess = (command: Command) => ({ command, error: null })

function parseCommand(input: string): ParsedCommand {
  const cleanInput = input.toLowerCase().trim()
  const splitInput = cleanInput.split(' ')

  switch (splitInput[0]) {
    case 'left':
      return sendSuccess({ name: 'TURN_LEFT' })

    case 'move':
      return sendSuccess({ name: 'MOVE' })

    case 'place':
      return parsePlaceCommand(cleanInput)

    case 'report':
      return sendSuccess({ name: 'REPORT' })

    case 'right':
      return sendSuccess({ name: 'TURN_RIGHT' })

    default:
      return sendError(`Command '${splitInput[0]}' not found`)
  }
}

// I Can't Believe It's Not Go™
function parsePlaceCommand(inputString: string): ParsedCommand {
  const argsString = inputString.replace('place ', '')
  const args = argsString.split(',').map((x) => x.trim())

  if (args.length !== 3) {
    return sendError(INVALID_PLACE_COMMAND_ERROR)
  }

  const x = parseInt(args[0])
  if (isNaN(x)) {
    return sendError('Invalid place command. X-coordinate must be an integer')
  }

  const y = parseInt(args[1])
  if (isNaN(y)) {
    return sendError('Invalid place command. Y-coordinate must be an integer')
  }

  const direction = directionsStringLookup[args[2]]
  if (direction === undefined) {
    return sendError('Invalid place command. Direction must be one of NORTH, SOUTH, EAST, WEST')
  }

  return sendSuccess({
    name: 'PLACE',
    robot: { x, y, direction },
  })
}

export default parseCommand
