import React, { Component, PropTypes } from 'react'
import Node from './node'

export default class Mining extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.mining !== nextProps.mining;
  }

  render() {
    const { mining } = this.props;

    return (
      <section className="mining">
        <h1><a href="javascript: void 0;">Mining</a></h1>
        <ol>
          { mining.map((node, idx) => <Node key={node.key} node={node} idx={idx} />) }
        </ol>
      </section>
    )
  }
}
