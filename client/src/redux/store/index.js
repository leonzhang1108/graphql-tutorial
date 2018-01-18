import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import asyncAwait from 'redux-async-await'

import reducers from '../reducers'


const middlewares = [
  asyncAwait,
  thunk
]

const store = applyMiddleware(...middlewares)(createStore)(combineReducers(reducers))

export default store