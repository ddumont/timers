import { toggle as btoggle } from './botany'
import { toggle as mtoggle } from './mining'

export const HASH_CHANGED = 'HASH_CHANGE'

export function update() {
  return (dispatch, getState) => {
    const { hash, botany, mining } = getState();
    const data = [];
    [botany, mining].forEach( list => list.forEach(
      ({selected, hashidx}) => {
        data[hashidx] = selected ? 1 : 0;
      }
    ));

    const newhash = encode(data);
    if (newhash && newhash !== hash) {
      history.replaceState(undefined, undefined, '#' + encodeURI(newhash));
      dispatch(changed(newhash));
    }
  }
}

export function changed(newhash) {
  return (dispatch, getState) => {
    const { hash, botany, mining } = getState();

    if (newhash && newhash !== hash) {
      dispatch({ type: HASH_CHANGED, hash: newhash });

      const selected = decode(newhash.split('|')[0]);
      const toggles  = [btoggle, mtoggle];
      const lists    = [botany, mining];
      lists.forEach( (list, tidx) => {
        const toggle = toggles[tidx];
        list.forEach(
          ({hashidx}, idx) => dispatch(toggle(idx, selected[hashidx] || 0, true))
        );
      });
    }

    dispatch(update());
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

function encode(data) {
  var ret = [];

  data.forEach((on, idx) => {
    if (on) {
      var packedidx = ~~(idx / 8);
      var shift = idx % 8;
      ret[packedidx] = (ret[packedidx] || 0) | (1 << shift);
    }
  });

  // The array is sparse, don't map or foreach it.
  for (var i = 0; i < ret.length; i++)
    ret[i] = String.fromCharCode(ret[i] || 0);

  return btoa(ret.join(''));
}
