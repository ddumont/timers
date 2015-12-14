import React, { Component, PropTypes } from 'react'
import * as mActions from '../actions/mining'

export default class Mining extends Component {
  render() {
    const { mining } = this.props;

    return (
      <section className="mining">
        <h1><a href="javascript: void 0;">Mining</a></h1>
        <ol>
          { mining.map(node => <li key={node.key}>{node.name}</li>) }
        </ol>
      </section>
    );
  }
}
