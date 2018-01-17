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


const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a Author',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(author, root, context) {
          return author.id
        }
      },
      name: {
        type: GraphQLString,
        resolve(author) {
          return author.name
        }
      },
      gender: {
        type: GraphQLInt,
        resolve(author) {
          return author.gender
        }
      },
      intro: {
        type: GraphQLString,
        resolve(author) {
          return author.intro
        }
      },
      email: {
        type: GraphQLString,
        resolve(author) {
          return author.email
        }
      }
    }
  }
})

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
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args, context) {
          // root是rootValue
          // context是context
          return ModelAuthor.retrieveAuthor(args)
        }
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
        type: Author,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(source, args) {
          "use strict"
          return ModelAuthor.deleteAuthor(args)
        }
      }
    }
  }
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'root',
  fields:{
    count: {
      type: GraphQLString,
      //Add description
      description: 'The count!',
      resolve: function() {
        return "123"
      }
    }
  }
})


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema