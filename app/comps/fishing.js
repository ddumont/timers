import React, { Component, PropTypes } from 'react';
import Node from './node';

export default class Fishing extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.fishing !== nextProps.fishing;
  }

  render() {
    const { fishing } = this.props;

    return (
      <section className="fishing">
        <h1><a href="javascript: void 0;">Fishing</a></h1>
        <ol>
          { fishing.map((node, idx) => <Node key={node.key} node={node} idx={idx} />) }
        </ol>
      </section>
    )
  }
}
