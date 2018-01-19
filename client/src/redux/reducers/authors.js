
import ActionTypes from '../constants/ActionTypes'
import createReducer from 'redux-create-reducer-curry'
import { Map, List, fromJS } from 'immutable'


const initialState = Map({
  list: new List()
})

const getAuthors = (state, list) => state.set('list', fromJS(list))

const deleteAuthor = (state, id) => {
  
  const newState = state.update('list',
    list => list.filterNot(
      item => item.get('id') === id
    )
  )
  
  return newState
}


const authors = createReducer(initialState)({

  [ActionTypes.GET_AUTHORS]: (state, action) => getAuthors(state, action.list),

  [ActionTypes.DELETE_AUTHOR]: (state, action) => deleteAuthor(state, action.id)

})

export default authors