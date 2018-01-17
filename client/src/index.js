import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import gql from 'graphql-tag'

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
})

client.query({ query: gql`{ count }` }).then(console.log);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
