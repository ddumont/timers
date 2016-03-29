import { CLOCK_TICK } from '../actions/clock';

export default function fishing(state = {}, action) {
  const { type, now, eorzea, elapsed, eorzea_h } = action;

  switch (type) {
    case CLOCK_TICK:
      const newstate = { now, eorzea, elapsed };
      newstate.eorzea_h = state.eorzea_h != eorzea_h ? state.eorzea_h : eorzea_h;
      return newstate;
    default:
      return state;
  }
}
