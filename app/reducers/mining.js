import { MINING_NODE_ON, MINING_NODE_OFF } from '../actions/mining'

export default function mining(state = {}, action) {
  const newstate = [...state];
  const { type, idx } = action;

  switch (type) {
    case MINING_NODE_ON:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: true
      });
      return newstate;
    case MINING_NODE_OFF:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: false
      });
      return newstate;
    default:
      return state
  }
}
