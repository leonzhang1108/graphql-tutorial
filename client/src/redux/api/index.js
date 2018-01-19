import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'


const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
})

const getAuthors = () => {
  return client.query({
    query: gql`
      {
        authors {
          name, id
        }
      }
    `
  })
}

const deleteAuthor = id => {
  return client.mutate({
    mutation: gql`
      mutation {
        deleteAuthor(id: ${id}) {
          ok
        }
      }
    `
  })
}

export default {
  getAuthors,
  deleteAuthor
}