import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'


const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
})

const getAuthors = client.query({
  query: gql`
    {
      authors {
        name, id
      }
    }
  `,
})


export default {
  getAuthors
}