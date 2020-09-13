export type Command =
  | { name: 'MOVE' }
  | { name: 'PLACE'; robot: Robot }
  | { name: 'REPORT' }
  | { name: 'TURN_LEFT' }
  | { name: 'TURN_RIGHT' }

export interface CommandResult {
  command: Command
  message: string
  success: boolean
}

export type Nullable<T> = T | null

export enum Direction {
  North = 'north',
  East = 'east',
  South = 'south',
  West = 'west',
}

export interface Board {
  height: number
  width: number
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
