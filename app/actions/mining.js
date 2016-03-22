import * as hActions from './hash';
import debounce from 'lodash.debounce';

export const MINING_NODE_ON = 'MINING_NODE_ON'
export const MINING_NODE_OFF = 'MINING_NODE_OFF'

const updateHash = debounce((dispatch) => dispatch(hActions.update()), 50);

export function toggle(idx, value, fromHash) {
  return (dispatch, getState) => {
    const { mining } = getState();
    const { selected, hashidx } = mining[idx];

    if( value !== selected ) {
      mining.filter((node, idx) => {
        if (hashidx === node.hashidx) {
          dispatch( value ? on(idx, fromHash) : off(idx, fromHash) );
        }
      });
    }
    
    if (!fromHash)
      updateHash(dispatch);
  }
}


export function on(idx, fromHash) {
  return { type: MINING_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: MINING_NODE_OFF, idx };
}
