import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import * as bActions from '../actions/botany'
import * as fActions from '../actions/fishing'
import * as mActions from '../actions/mining'

import './node.less';

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

export default class Node extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.node !== nextProps.node;
  }

  render() {
    const { node } = this.props;
    const { type } = node;
    const time = formatter.format(new Date(node.time * 1000));
    const slot = '[' + (node.slot || '?') + ']';

    const classes = classNames({
      node: true,
      selected: !!node.selected
    });

    return (
      <li className={classes}>
        <span className="time">{time}</span>
        <span className="slot">{slot}</span>
        <span className="name">{node.name}</span>
        <span className="location">{node.location}</span>
      </li>
    )
  }
}
