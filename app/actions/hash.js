import { toggle as btoggle } from './botany'
import { toggle as ftoggle } from './fishing'
import { toggle as mtoggle } from './mining'

export const HASH_CHANGED = 'HASH_CHANGE'
export const UPDATE_HASH = 'UPDATE_HASH'


export function update() {
  return {
    type: UPDATE_HASH,
    hash
  }
}

export function changed(newhash) {
  return (dispatch, getState) => {
    const { hash, botany, fishing, mining } = getState();

    if (newhash !== hash) {
      dispatch({ type: HASH_CHANGED, hash: newhash });

      const selected = decode(newhash.split('|')[0]);
      const toggles = [btoggle, ftoggle, mtoggle];
      const lists   = [botany,  fishing, mining ];
      lists.forEach( (list, tidx) => {
        const toggle = toggles[tidx];
        list.forEach(
          ({nodeid, hashidx}, idx) => dispatch(toggle(idx, selected[hashidx] || 0, true))
        );
      })
    }
  }
}

// returns a boolean array of if the nodeid idx is selected
function decode(hash) {
  const ret = [];
  const data = atob(hash);

  for (var idx = 0; idx < data.length; idx++) {
    var mask = data.charCodeAt(idx);
    for (var i = 0; i < 8; i++) {
      ret.push(mask && (mask & 1))
      mask >>>= 1;
    }
  }

  return ret;
}
