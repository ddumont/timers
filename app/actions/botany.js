export const BOTANY_NODE_ON = 'BOTANY_NODE_ON'
export const BOTANY_NODE_OFF = 'BOTANY_NODE_OFF'

export function toggle(idx, value, fromHash) {
  return (dispatch, getState) => {
    const { selected } = getState().botany[idx];
    if( value !== (selected || 0) )
      dispatch( value ? on(idx, fromHash) : off(idx, fromHash) );
  }
}

export function on(idx, fromHash) {
  return { type: BOTANY_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: BOTANY_NODE_OFF, idx };
}
