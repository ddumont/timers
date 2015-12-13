import './index.less'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './comps/app'
import state from './state'
import data from './data'
import * as hActions from './actions/hash'

function getHash(url) {
  const match = /^[^#]*#(.*)$/.exec(url);
  return match && match[1];
}
window.addEventListener('hashchange', event => {
  store.dispatch(hActions.changed(getHash(event.newURL)));
}, false);

const store = state(data.reduce((obj, node) => {
  obj[node.type].push(node);
  return obj;
}, { botany: [], fishing: [],  mining: [], hash: '' }));
store.dispatch(hActions.changed(getHash(window.location.hash)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container')
);
