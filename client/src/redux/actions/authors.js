import ActionTypes from '../constants/ActionTypes'

import Api from '../api'

console.log(Api)

const errorsAction = (errors) => {
  console.log(errors)
  return {
    type: ActionTypes.ERRORS,
    errors
  }
}


const AuthorActions = {
  async addList(){
    const { data } = await Api.getAuthors()
    return {
      type: ActionTypes.GET_AUTHOR,
      list: data.authors
    }
  }
}

export default AuthorActions