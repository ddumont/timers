import React, { Component, PropTypes } from 'react';
import Node from './node';

export default class Botany extends Component {
  render() {
    const { botany } = this.props;

    return (
      <section className="botany">
        <h1><a href="javascript: void 0;">Botany</a></h1>
        <ol>
          { botany.map(node => <Node key={node.key} node={node} />) }
        </ol>
      </section>
    )
  }
}
