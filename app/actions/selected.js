export const SELECTED_NODE_ON = 'SELECTED_ON';
export const SELECTED_NODE_OFF = 'SELECTED_OFF';

export function on(node) {
  return { type: SELECTED_NODE_ON, node };
}

export function off(node) {
  return { type: SELECTED_NODE_OFF, node };
}
