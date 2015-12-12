import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default function state(initialState) {
  return applyMiddleware(thunk)(createStore)(reducers, initialState)
}
