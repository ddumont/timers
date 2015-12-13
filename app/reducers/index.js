import { combineReducers } from 'redux'
import botany from './botany'
import fishing from './fishing'
import mining from './mining'
import hash from './hash'

const rootReducer = combineReducers({ hash, botany, fishing, mining });
export default rootReducer
