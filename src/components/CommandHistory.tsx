import React from 'react'
import styled from 'styled-components'

import { CommandResult } from '../types'

const Container = styled.ul`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column-reverse;
`

const Item = styled.li<{ active: boolean }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-size: 12px;
  opacity: ${(props) => (props.active ? 1.0 : 0.25)};
  padding: 16px;
`

const Title = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`

const Result = styled.span<{ success: boolean }>`
  color: ${(props) => (props.success ? props.theme.positive : props.theme.negative)};
  font-size: 12px;
`

interface Props {
  commands: CommandResult[]
}

function CommandHistory({ commands }: Props) {
  return (
    <Container>
      {commands.map((result, index) => (
        <Item key={index} active={index === commands.length - 1}>
          <Title>{result.command.name}</Title>
          <Result success={result.success}>{result.message}</Result>
        </Item>
      ))}
    </Container>
  )
}

export default CommandHistory
