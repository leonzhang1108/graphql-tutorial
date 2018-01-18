
import ActionTypes from '../constants/ActionTypes'
import createReducer from 'redux-create-reducer-curry'


const initialState = {
  list: []
}

const get_authors = (state, list) => {
  return Object.assign({}, state, { 
    list
  })
}


const authors = createReducer(initialState)({
  [ActionTypes.GET_AUTHORS]: (state, action) => {
    return get_authors(state, action.list)
  },
  [ActionTypes.DELETE_AUTHOR]: (state, action) => {
    console.log(action)
    return state
  }
})

export default authors