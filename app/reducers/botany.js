import { BOTANY_NODE_ON, BOTANY_NODE_OFF } from '../actions/botany'

export default function botany(state = {}, action) {
  const newstate = [...state];
  const { type, idx } = action;

  switch (type) {
    case BOTANY_NODE_ON:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: 1
      });
      return newstate;
    case BOTANY_NODE_OFF:
      newstate[idx] = Object.assign({}, state[idx], {
        selected: 0
      });
      return newstate;
    default:
      return state
  }
}
