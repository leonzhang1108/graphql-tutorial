
import ActionTypes from '../constants/ActionTypes'
import createReducer from 'redux-create-reducer-curry'
import { Map, List, fromJS } from 'immutable'


const initialState = Map({
  list: new List()
})

const findListIndex = (state, itemId) => {
  return state.get('list').findIndex(
    (item) => item.get('id') === itemId
  )
}

const getAuthors = (state, list) => state.set('list', fromJS(list))

const deleteAuthor = (state, id) => {
  
  const newState = state.update('list',
    list => list.filterNot(
      item => item.get('id') === id
    )
  )
  
  return newState
}

const updateAuthor = (state, author) => {

  const index = findListIndex(state, author.id)

  const updatedItem = state.get('list')
    .get(index)
    .set('name', author.name)
    .set('email', author.email)
    .set('intro', author.intro)

  return state.update('list', list => list.set(index, updatedItem))
}

const authors = createReducer(initialState)({

  [ActionTypes.GET_AUTHORS]: (state, action) => getAuthors(state, action.list),

  [ActionTypes.DELETE_AUTHOR]: (state, action) => deleteAuthor(state, action.id),

  [ActionTypes.UPDATE_AUTHOR]: (state, action) => updateAuthor(state, action.author)

})

export default authors