export const HASH_CHANGED = 'HASH_CHANGE'
export const UPDATE_HASH = 'UPDATE_HASH'

export function update() {
  return {
    type: UPDATE_HASH,
    payload: hash
  }
}

export function changed(hash) {
  return {
    type: HASH_CHANGED,
    payload: hash
  }
}
