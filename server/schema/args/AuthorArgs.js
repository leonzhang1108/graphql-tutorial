import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

module.exports = {
  name: {
    type: new GraphQLNonNull(GraphQLString)
  },
  gender: {
    type: GraphQLInt
  },
  age: {
    type: GraphQLInt
  },
  email: {
    type: new GraphQLNonNull(GraphQLString)
  },
  intro: {
    type: GraphQLString
  },
}