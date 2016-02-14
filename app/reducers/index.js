import { combineReducers } from 'redux'
import botany from './botany'
import fishing from './fishing'
import mining from './mining'
import hash from './hash'
import worker from './worker'

const rootReducer = combineReducers({ hash, botany, fishing, mining, worker });
export default rootReducer
