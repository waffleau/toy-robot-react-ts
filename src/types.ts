export enum Direction {
  North = 'north',
  East = 'east',
  South = 'south',
  West = 'west',
}

export type Command =
  | { name: 'MOVE' }
  | { name: 'PLACE'; robot: Robot }
  | { name: 'REPORT' }
  | { name: 'TURN_LEFT' }
  | { name: 'TURN_RIGHT' }

export type Nullable<T> = T | null

export interface Board {
  height: number
  width: number
}

export interface CommandResult {
  command: Command
  message: string
  success: boolean
}

export interface Robot {
  direction: Direction
  x: number
  y: number
}

export interface State {
  board: Board
  commands: CommandResult[]
  robot: Nullable<Robot>
}
