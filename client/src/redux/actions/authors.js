import ActionTypes from '../constants/ActionTypes'

import getAuthors from '../api'

console.log(getAuthors)

const errorsAction = (errors) => {
  console.log(errors)
  return {
    type: ActionTypes.ERRORS,
    errors
  }
}


const AuthorActions = {
  async addList(list){
    // const list = await getAuthors()
    return {
      type: ActionTypes.GET_AUTHOR,
      list
    }
  }
}

export default AuthorActions