export const MINING_NODE_ON = 'MINING_NODE_ON'
export const MINING_NODE_OFF = 'MINING_NODE_OFF'

export function toggle() {
  return (dispatch, getState) => {
    // const { counter } = getState();
    //
    // if (counter % 2 === 0) {
    //   return
    // }
    //
    // dispatch(increment())
    dispatch(on());
  }


}

export function on() {
  return {
    type: MINING_NODE_ON,
    payload: 'on'
  }
}

export function off() {
  return {
    type: MINING_NODE_OFF,
    payload: 'off'
  }
}
