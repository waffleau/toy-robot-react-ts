import React from 'react'
import styled from 'styled-components'

import { Board as BoardType, Nullable, Robot as RobotType } from '../types'

import Robot from './Robot'

const Container = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.primaryDark};
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 100%;
`

const Grid = styled.div<{ height: number; width: number }>`
  background-color: rgba(255, 255, 255, 0.1);
  height: ${(props) => props.height}px;
  position: relative;
  width: ${(props) => props.width}px;
`

const Cell = styled.div<{ size: number; x: number; y: number }>`
  border: 1px solid rgba(255, 255, 255, 0.2);
  bottom: ${(props) => props.size * props.y}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.size * props.x}px;
  position: absolute;
  width: ${(props) => props.size}px;
`

const RobotWrapper = styled.div<{ size: number; x: number; y: number }>`
  bottom: ${(props) => props.size * props.y}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.size * props.x}px;
  padding: 8px;
  position: absolute;
  transition: left 0.2s, bottom 0.2s;
  width: ${(props) => props.size}px;
`

const Stats = styled.div`
  color: rgba(255, 255, 255, 0.5);
  bottom: 0;
  left: 0;
  padding: 16px;
  position: absolute;
`

interface Props {
  board: BoardType
  cellSize: number
  robot: Nullable<RobotType>
}

function Board({ board, cellSize, robot }: Props) {
  const gridHeight = board.height * cellSize
  const gridWidth = board.width * cellSize

  const columns = Array.from(new Array(board.width), (x, i) => i)
  const rows = Array.from(new Array(board.height), (x, i) => i)

  return (
    <Container>
      <Grid height={gridHeight} width={gridWidth}>
        {columns.map((column) =>
          rows.map((row) => <Cell key={`${row}-${column}`} size={cellSize} x={column} y={row} />)
        )}

        {robot && (
          <RobotWrapper size={cellSize} x={robot.x} y={robot.y}>
            <Robot robot={robot} />
          </RobotWrapper>
        )}
      </Grid>

      {robot && <Stats>{`x: ${robot.x}, y: ${robot.y}, direction: ${robot.direction}`}</Stats>}
    </Container>
  )
}

export default Board
