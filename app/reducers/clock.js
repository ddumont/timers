import { CLOCK_TICK } from '../actions/clock';

export default function fishing(state = {}, action) {
  const { type, now, eorzea, elapsed } = action;

  switch (type) {
    case CLOCK_TICK:
      return { now, eorzea, elapsed };
    default:
      return state;
  }
}
