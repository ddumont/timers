import { SELECTED_NODE_ON, SELECTED_NODE_OFF } from '../actions/selected';

export default function selected(state = {}, action) {
  const { type, node } = action;

  switch (type) {
    case SELECTED_NODE_ON:
      if (!state[node.hashidx]) {
        const stub = {};
        stub[node.hashidx] = node;
        return Object.assign({}, state, stub);
      }
      return state;
    case SELECTED_NODE_OFF:
      if (state[node.hashidx]) {
        const newstate = Object.assign({}, state);
        delete newstate[node.hashidx];
        return newstate;
      }
      return state;
    default:
      return state;
  }
}
