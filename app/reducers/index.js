import { combineReducers } from 'redux'
import botany from './botany'
import fishing from './fishing'
import mining from './mining'
import hash from './hash'
import clock from './clock'

const rootReducer = combineReducers({ hash, botany, fishing, mining, clock });
export default rootReducer
