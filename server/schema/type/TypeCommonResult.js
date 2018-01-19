import {
  GraphQLObjectType,
  GraphQLBoolean
} from 'graphql'

const CommonResult = new GraphQLObjectType({
  name: 'CommonResult',
  description: 'This is CommonResult',
  fields: () => {
    return {
      ok: {
        type: GraphQLBoolean,
        resolve: res => res.ok
      }
    }
  }
})

module.exports = CommonResult