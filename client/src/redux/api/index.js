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
      query {
        authors {
          name, id, email, intro
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

const updateAuthor = author => {
  return client.mutate({
    mutation: gql`
      mutation {
        updateAuthor(
          id: ${author.id},
          name: "${author.name}",
          intro: "${author.intro}",
          email: "${author.email}"
        ) {
          ok
        }
      }
    `
  })
}

const createAuthor = author => {
  return client.mutate({
    mutation: gql`
      mutation {
        createAuthor(
          name: "${author.name}",
          intro: "${author.intro}",
          email: "${author.email}"
        ) {
          name, id, email, intro
        }
      }
    `
  })
}

export default {
  getAuthors,
  deleteAuthor,
  updateAuthor,
  createAuthor
}