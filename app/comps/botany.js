import React, { Component, PropTypes } from 'react';
import Node from './node';

export default class Botany extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.botany !== nextProps.botany;
  }

  render() {
    const { botany } = this.props;

    return (
      <section className="botany">
        <h1><a href="javascript: void 0;">Botany</a></h1>
        <ol>
          { botany.map((node, idx) => <Node key={node.key} node={node} idx={idx} />) }
        </ol>
      </section>
    )
  }
}
