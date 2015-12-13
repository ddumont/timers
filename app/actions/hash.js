import { toggle as mtoggle } from './mining'

export const HASH_CHANGED = 'HASH_CHANGE'
export const UPDATE_HASH = 'UPDATE_HASH'


export function update() {
  return {
    type: UPDATE_HASH,
    hash
  }
}

export function changed(hash) {
  return (dispatch, getState) => {
    const { curhash, mining } = getState();

    if (hash !== curhash) {
      dispatch({ type: HASH_CHANGED, hash });

      const selected = decode(hash.split('|')[0]);
      Object.keys(mining).forEach(
        nodeid => dispatch(mtoggle(nodeid, selected[nodeid], true))
      );
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
