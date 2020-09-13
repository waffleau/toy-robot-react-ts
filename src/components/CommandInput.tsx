import React, { useState } from 'react'
import styled from 'styled-components'

import { Nullable } from '../types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
`

const TextInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-right: 8px;
  height: 40px;
  padding: 8px;
  width: 100%;
`

const Button = styled.button`
  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  transition: box-shadow 0.2s;
  width: 75px;

  &:hover {
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  }
`

const Error = styled.div`
  background-color: ${(props) => props.theme.negativeLight};
  border: 1px solid ${(props) => props.theme.negative};
  border-radius: 8px;
  color: ${(props) => props.theme.negative};
  font-size: 12px;
  line-height: 1.4;
  margin-top: 16px;
  padding: 8px;
`

interface Props {
  error: Nullable<string>
  onSubmit(input: string): void
}

function CommandInput({ error, onSubmit }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(value)
    setValue('')
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextInput
          name="command"
          placeholder="Enter a command"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </Form>

      {error && <Error>{error}</Error>}
    </Container>
  )
}

export default CommandInput
