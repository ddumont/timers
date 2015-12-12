import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mActions from '../actions/mining'

import './app.less';

class App extends Component {
  render() {
    const { hash } = this.props;

    return (
      <div className="app">
        {hash}
      </div>
    );
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(mActions, dispatch)
})(App)
