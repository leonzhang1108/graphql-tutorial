
import ActionTypes from '../constants/ActionTypes'
import createReducer from 'redux-create-reducer-curry'


const initialState = {
  list: []
}

const get_author = (state, list) => {
  return Object.assign({}, state, { 
    list
  })
}


const authors = createReducer(initialState)({
  [ActionTypes.GET_AUTHOR]: (state, action) => {
    return get_author(state, action.list)
  }
})

export default authors