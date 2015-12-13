import { MINING_NODE_ON, MINING_NODE_OFF } from '../actions/mining'

export default function mining(state = {}, action) {
  const newstate = {};
  const { type, nodeid } = action;

  switch (type) {
    case MINING_NODE_ON:
      newstate[nodeid] = Object.assign({}, state[nodeid], {
        selected: 1
      });
      return Object.assign({}, state, newstate);
    case MINING_NODE_OFF:
      newstate[nodeid] = Object.assign({}, state[nodeid], {
        selected: 0
      });
      return Object.assign({}, state, newstate);
    default:
      return state
  }
}
