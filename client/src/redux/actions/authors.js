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
  getAuthors: async () =>{
    const { data, errors } = await Api.getAuthors()

    if(errors)  return errorsAction(errors)

    return {
      type: ActionTypes.GET_AUTHORS,
      list: data.authors
    }
  },
  deleteAuthor: async id => {
    const { errors } = await Api.deleteAuthor(id)
    
    if(errors)  return errorsAction(errors)

    return {
      type: ActionTypes.DELETE_AUTHOR,
      id
    }
  }
}

export default AuthorActions