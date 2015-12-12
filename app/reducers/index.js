import { combineReducers } from 'redux'
import mining from './mining'
import hash from './hash'

const rootReducer = combineReducers({ mining, hash });

export default rootReducer
