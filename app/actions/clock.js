export const CLOCK_TICK = 'CLOCK_TICK'

export function tick(now, eorzea, elapsed) {
  return (dispatch, getState) => {
    const { clock } = getState();
    if ( now !== clock.now ) {
      dispatch({ type: CLOCK_TICK, now, eorzea, elapsed });
    }
  }
}
