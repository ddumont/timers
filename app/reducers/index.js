import { combineReducers } from 'redux';
import botany from './botany';
import mining from './mining';
import hash from './hash';
import clock from './clock';

const rootReducer = combineReducers({ hash, botany, mining, clock });
export default rootReducer
