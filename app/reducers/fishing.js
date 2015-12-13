import { FISHING_NODE_ON, FISHING_NODE_OFF } from '../actions/fishing'

export default function fishing(state = {}, action) {
  const newstate = [...state];
  const { type, idx } = action;

  switch (type) {
    case FISHING_NODE_ON:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: 1
      });
      return newstate;
    case FISHING_NODE_OFF:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: 0
      });
      return newstate;
    default:
      return state
  }
}
