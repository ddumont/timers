import React, { Component, PropTypes } from 'react'
import Node from './node'

export default class Mining extends Component {
  render() {
    const { mining } = this.props;

    return (
      <section className="mining">
        <h1><a href="javascript: void 0;">Mining</a></h1>
        <ol>
          { mining.map(node => <Node key={node.key} node={node} />) }
        </ol>
      </section>
    )
  }
}
