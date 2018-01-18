import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

// 主题
const theme = createMuiTheme({
  status: {
    danger: 'orange'
  }
})

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
