import { HASH_CHANGED, UPDATE_HASH } from '../actions/hash'

export default function hash(state = '', action) {
  switch (action.type) {
    case HASH_CHANGED:
      return action.hash;
    default:
      return state
  }
}
