import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as mActions from '../actions/mining'

import Botany  from './botany'
import Fishing from './fishing'
import Mining  from './mining'

import './app.less';

class App extends Component {
  render() {
    const { hash, mining, botany, fishing } = this.props;

    return (
      <div className="app">
        <nav>
          <ul>
            <li><a href="javascript: void 0;">Mining</a></li>
            <li><a href="javascript: void 0;">Botany</a></li>
            <li><a href="javascript: void 0;">Fishing</a></li>
          </ul>
        </nav>
        <a href="https://github.com/ddumont/timers">
          <img className="github"
               src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
               alt="Fork me on GitHub"
               data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" />
        </a>
        <main>
          <section className="clock">
            <dl>
              <dt className="local">Local Time</dt>
              <dd className="time local"></dd>
              <dt className="game">Eorzea Time</dt>
              <dd className="time game"></dd>
            </dl>
          </section>
          <Mining  mining ={mining}  />
          <Botany  botany ={botany}  />
          <Fishing fishing={fishing} />
        </main>
      </div>
    );
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(mActions, dispatch)
})(App)
