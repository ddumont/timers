import * as hActions from './hash';
import * as sActions from './selected';
import debounce from 'lodash.debounce';

export const BOTANY_NODE_ON = 'BOTANY_NODE_ON';
export const BOTANY_NODE_OFF = 'BOTANY_NODE_OFF';

const updateHash = debounce((dispatch) => dispatch(hActions.update()), 50);

export function toggle(idx, value, fromHash) {
  return (dispatch, getState) => {
    const { botany } = getState();
    const { selected, hashidx } = botany[idx];

    if ( value !== selected ) {
      botany.forEach((node, idx) => {
        if (hashidx === node.hashidx) {
          dispatch( value ? on(idx, fromHash) : off(idx, fromHash) );
          dispatch( value ? sActions.on(node) : sActions.off(node) );
        }
      });
    }

    if (!fromHash)
      updateHash(dispatch);
  }
}

export function on(idx, fromHash) {
  return { type: BOTANY_NODE_ON, idx };
}

export function off(idx, fromHash) {
  return { type: BOTANY_NODE_OFF, idx };
}
