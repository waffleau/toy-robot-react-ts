import React, { useReducer, useState } from 'react'
import styled from 'styled-components'

import { Nullable } from '../types'

import parseCommand from '../modules/parseCommand'
import reducer from '../modules/reducer'

import Board from './Board'
import CommandHistory from './CommandHistory'
import CommandInput from './CommandInput'

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: row;
  width: 100vw;
`

const Display = styled.div`
  flex-grow: 1;
`

const Controls = styled.div`
  width: 300px;
`

const initialState = {
  board: { height: 5, width: 5 },
  commands: [],
  error: null,
  robot: null,
}

function App() {
  const [inputError, setInputError] = useState<Nullable<string>>(null)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { board, commands, robot } = state

  const onCommandSubmit = (input: string) => {
    const result = parseCommand(input)

    if (result.command) {
      dispatch(result.command)
      setInputError(null)
    }

    if (result.error) {
      setInputError(result.error)
    }
  }

  return (
    <Container>
      <Display>
        <Board board={board} cellSize={60} robot={robot} />
      </Display>
      <Controls>
        <CommandInput error={inputError} onSubmit={onCommandSubmit} />
        <CommandHistory commands={commands} />
      </Controls>
    </Container>
  )
}

export default App
