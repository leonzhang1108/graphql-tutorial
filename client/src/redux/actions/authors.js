import ActionTypes from '../constants/ActionTypes'

import Api from '../api'

const errorsAction = (errors) => {
  console.log(errors)
  return {
    type: ActionTypes.ERRORS,
    errors
  }
}


const AuthorActions = {
  async getAuthors(){
    const { data } = await Api.getAuthors()
    return {
      type: ActionTypes.GET_AUTHORS,
      list: data.authors
    }
  },
  async deleteAuthor(id){
    const { data } = await Api.deleteAuthor(id)
    console.log(data)
    return {
      type: ActionTypes.DELETE_AUTHOR
    }
  }
}

export default AuthorActions