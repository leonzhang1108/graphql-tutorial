import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a Author',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: author => author.id
      },
      name: {
        type: GraphQLString,
        resolve: author => author.name
      },
      gender: {
        type: GraphQLInt,
        resolve: author => author.gender
      },
      intro: {
        type: GraphQLString,
        resolve: author => author.intro
      },
      email: {
        type: GraphQLString,
        resolve: author => author.email
      }
    }
  }
})

module.exports = Author