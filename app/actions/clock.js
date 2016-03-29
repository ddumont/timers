export const CLOCK_TICK = 'CLOCK_TICK';

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', timeZone: 'UTC', hour12: false
});

export function tick(now, eorzea, elapsed) {
  return (dispatch, getState) => {
    const { clock } = getState();
    if ( eorzea !== clock.eorzea ) {
      const eorzea_h = formatter.format(new Date(eorzea || 0));
      dispatch({ type: CLOCK_TICK, now, eorzea, elapsed, eorzea_h });
    }
  }
}
