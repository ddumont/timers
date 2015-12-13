export const MINING_NODE_ON = 'MINING_NODE_ON'
export const MINING_NODE_OFF = 'MINING_NODE_OFF'

export function toggle(nodeid, value, fromHash) {
  return (dispatch, getState) => {
    const { selected } = getState().mining[nodeid];
    if( value !== (selected || 0) )
      dispatch( value ? on(nodeid, fromHash) : off(nodeid, fromHash) );
  }
}

export function on(nodeid, fromHash) {
  return { type: MINING_NODE_ON, nodeid };
}

export function off(nodeid, fromHash) {
  return { type: MINING_NODE_OFF, nodeid };
}
