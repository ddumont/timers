import React, { Component, PropTypes } from 'react'

import * as bActions from '../actions/botany'
import * as fActions from '../actions/fishing'
import * as mActions from '../actions/mining'

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

export default class Node extends Component {
  render() {
    const { node } = this.props;
    const { type } = node;
    const time = formatter.format(new Date(node.time * 1000));

    return (
      <li>
        <span className="time">{time}</span>
        <span className="slot">{'[' + (node.slot || '?') + ']'}</span>
        <span className="name">{node.name}</span>
        <span className="location">{node.location}</span>
      </li>
    )
  }
}
