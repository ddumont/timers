import { MINING_NODE_ON } from '../actions/mining'

export default function mining(state = 0, action) {
  switch (action.type) {
    case MINING_NODE_ON:
      console.log(action.payload);
      return state; // do nothing..yet
    default:
      return state
  }
}
