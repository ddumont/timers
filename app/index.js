import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './comps/app';
import state from './state';
import data from './data';
import * as hActions from './actions/hash';

import Worker from 'worker!./worker.js';
import serviceWorker from 'serviceworker!./worker.js';

import './index.less';

function getHash(url) {
  const match = /^[^#]*#(.*)$/.exec(url);
  return match && match[1];
}

window.addEventListener('hashchange', event => {
  store.dispatch(hActions.changed(getHash(event.newURL)));
}, false);

let worker;
try {
  serviceWorker().then(registration => {
    registration.onupdatefound = function(event) {
      console.log('Service update found...');
      registration.update();
      window.location.reload();
    };
  });
} catch (e) {
  worker = new Worker();
}

// process data
const processed = data.reduce((obj, node) => {
  obj[node.type].push(node);
  return obj;
}, { botany: [], fishing: [],  mining: [], hash: '', worker: worker });

// sort nodes
Object.keys(processed).forEach(key => {
  if (processed[key] && processed[key].sort) {
    processed[key].sort((a, b) => {
      var delta = a.time - b.time;
      if (delta !== 0) return delta;
      delta = a.nodeid - b.nodeid;
      if (delta !== 0) return delta;
      return a.slot - b.slot;
    });
  }
});

const store = state(processed);
store.dispatch(hActions.changed(getHash(window.location.hash)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container')
);
