import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './comps/app';
import state from './state';
import data from './data';
import * as hActions from './actions/hash';
import * as cActions from './actions/clock';

import Worker from 'worker!./webworker.js';
import serviceWorker from 'serviceworker!./svcworker.js';

import './index.less';

function getHash(url) {
  const match = /^[^#]*#(.*)$/.exec(url);
  return match && match[1];
}

window.addEventListener('hashchange', event => {
  store.dispatch(hActions.changed(getHash(event.newURL)));
}, false);

// process data
const processed = data.reduce((obj, node) => {
  obj[node.type] && obj[node.type].push(node);
  return obj;
}, { botany: [], mining: [], hash: '' });

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

const tick = event => {
  const [message, now, eorzea, elapsed] = event.data;
  if (message === 'tick') {
    store.dispatch(cActions.tick(now, eorzea, elapsed));
  }
};

try {
  serviceWorker().then(registration => {
    registration.onupdatefound = function(event) {
      console.log('Service update found...');
      registration.update();
      window.location.reload();
    };
  });
} catch (e) {
  console.error(e);
}

window.worker = new Worker();
worker.addEventListener('message', tick);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#container')
);
