import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './redux/store'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

// 主题
const theme = createMuiTheme({
  status: {
    danger: 'orange'
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App/>
      </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
