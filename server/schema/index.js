import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import {
  ModelAuthor
} from '../model'

import  {
  TypeAuthor,
  TypeCommonResult
} from './type'

import {
  AuthorArgs
} from './args'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: () => {
    return {
      authors: {
        type: new GraphQLList(TypeAuthor),
        resolve: (root, args, context) => ModelAuthor.retrieveAuthor(args)
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Mutations',
  fields: () => {
    return {
      createAuthor: {
        type: new GraphQLList(TypeAuthor),
        args: AuthorArgs,
        resolve: (source, args) => ModelAuthor.createAuthor(args)
      },
      updateAuthor: {
        type: TypeCommonResult,
        args: {
          ...AuthorArgs,
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (source, args) => ModelAuthor.updateAuthor(args)
      },
      deleteAuthor: {
        type: TypeCommonResult,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (source, args) => ModelAuthor.deleteAuthor(args)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

module.exports = schema
