export const FISHING_NODE_ON = 'FISHING_NODE_ON'
export const FISHING_NODE_OFF = 'FISHING_NODE_OFF'

export function toggle(idx, value, fromHash) {
  return (dispatch, getState) => {
    const { selected } = getState().fishing[idx];
    if( value !== (selected || 0) )
      dispatch( value ? on(idx, fromHash) : off(idx, fromHash) );
  }
}

export function on(idx, fromHash) {
  return { type: FISHING_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: FISHING_NODE_OFF, idx };
}
