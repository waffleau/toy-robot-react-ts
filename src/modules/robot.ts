import { Board, Direction, Robot } from '../types'

const LEFT_LOOKUP = {
  [Direction.North]: Direction.West,
  [Direction.East]: Direction.North,
  [Direction.South]: Direction.East,
  [Direction.West]: Direction.South,
}

const RIGHT_LOOKUP = {
  [Direction.North]: Direction.East,
  [Direction.East]: Direction.South,
  [Direction.South]: Direction.West,
  [Direction.West]: Direction.North,
}

export function canMove(robot: Robot, board: Board) {
  return canPlace(move(robot), board)
}

export function canPlace(robot: Robot, board: Board) {
  return robot.x >= 0 && robot.x < board.width && robot.y >= 0 && robot.y < board.height
}

export function move(robot: Robot): Robot {
  switch (robot.direction) {
    case Direction.North:
      return { ...robot, y: robot.y + 1 }

    case Direction.East:
      return { ...robot, x: robot.x + 1 }

    case Direction.South:
      return { ...robot, y: robot.y - 1 }

    case Direction.West:
      return { ...robot, x: robot.x - 1 }
  }
}

export function turnLeft(robot: Robot): Robot {
  return { ...robot, direction: LEFT_LOOKUP[robot.direction] }
}

export function turnRight(robot: Robot): Robot {
  return { ...robot, direction: RIGHT_LOOKUP[robot.direction] }
}
