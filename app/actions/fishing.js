import * as hActions from './hash';
import debounce from 'lodash.debounce';

export const FISHING_NODE_ON = 'FISHING_NODE_ON'
export const FISHING_NODE_OFF = 'FISHING_NODE_OFF'

const updateHash = debounce((dispatch) => dispatch(hActions.update()), 50);

export function toggle(idx, value, fromHash) {
  return (dispatch, getState) => {
    const { fishing } = getState();
    const { selected, hashidx } = fishing[idx];

    if ( value !== selected ) {
      fishing.filter((node, idx) => {
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
  return { type: FISHING_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: FISHING_NODE_OFF, idx };
}
