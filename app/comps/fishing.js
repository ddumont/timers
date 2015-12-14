import React, { Component, PropTypes } from 'react'
import Node from './node'

export default class Fishing extends Component {
  render() {
    const { fishing } = this.props;

    return (
      <section className="fishing">
        <h1><a href="javascript: void 0;">Fishing</a></h1>
        <ol>
          { fishing.map(node => <Node key={node.key} node={node} />) }
        </ol>
      </section>
    )
  }
}
