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
        <Mining  mining={mining}  />
        <Botany  botany={botany}  />
        <Fishing fishing={fishing} />
      </div>
    );
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(mActions, dispatch)
})(App)
