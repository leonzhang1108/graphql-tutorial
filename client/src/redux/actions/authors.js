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
    const { data, errors } = await Api.deleteAuthor(id)
    
    if(errors) return errorsAction(errors)

    return {
      type: ActionTypes.DELETE_AUTHOR,
      id
    }
  },
  updateAuthor: async author => {

    const { data, errors } = await Api.updateAuthor(author)

    if(errors) return errorsAction(errors)

    return {
      type: ActionTypes.UPDATE_AUTHOR,
      author
    }
  }
}

export default AuthorActions