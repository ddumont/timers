import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mActions from '../actions/mining'
import Mining from './mining'

import './app.less';

class App extends Component {
  render() {
    const { hash, mining } = this.props;
    
    return (
      <div className="app">
        {hash}
        <Mining mining={mining} />
      </div>
    );
  }
}

export default connect(state => state, dispatch => {
  return bindActionCreators(mActions, dispatch)
})(App)
