export const MINING_NODE_ON = 'MINING_NODE_ON'
export const MINING_NODE_OFF = 'MINING_NODE_OFF'

export function toggle(idx, value = 'TOGGLE', fromHash) {
  return (dispatch, getState) => {
    const { selected } = getState().mining[idx];
    if (value === 'TOGGLE')
      value = !selected;
      
    if( value !== (selected || 0) ) {
      dispatch( value ? on(idx, fromHash) : off(idx, fromHash) );
      console.log(idx, value);
    }
  }
}

export function on(idx, fromHash) {
  return { type: MINING_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: MINING_NODE_OFF, idx };
}
