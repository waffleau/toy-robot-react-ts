import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import './styles/reset.css'
import './styles/base.css'

import App from './components/App'

const theme = {
  primary: '#03A9F4',
  primaryDark: '#01579B',
  primaryLight: '#81D4FA',
  secondary: '#EF6C00',
  negative: '#f44336',
  negativeLight: '#ef9a9a',
  positive: '#4CAF50',
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
