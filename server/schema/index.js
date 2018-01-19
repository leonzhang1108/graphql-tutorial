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
  Author,
  CommonResult
} from './type'

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      authors: {
        type: new GraphQLList(Author),
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        resolve: (root, args, context) => ModelAuthor.retrieveAuthor(args)
      },
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields: () => {
    return {
      createAuthor: {
        type: Author,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          gender: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          age: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          intro: {
            type: GraphQLString
          },
        },
        resolve(source, args) {
          return ModelAuthor.createAuthor(args.name, args.gender, args.age, args.email, args.intro)
        }
      },
      updateAuthor: {
        type: Author,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          gender: {
            type: GraphQLInt
          },
          intro: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          },
        },
        resolve(source, args) {
          "use strict"
          return ModelAuthor.updateAuthor(args.id, args)
        }
      },
      deleteAuthor: {
        type: CommonResult,
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
