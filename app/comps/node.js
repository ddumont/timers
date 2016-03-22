import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as bActions from '../actions/botany';
import * as fActions from '../actions/fishing';
import * as mActions from '../actions/mining';

import './node.less';

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

const actionmap = {
  botany: bActions,
  fishing: fActions,
  mining: mActions
};

class Node extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.node !== nextProps.node;
  }

  click() {
    const { idx, node, dispatch } = this.props;
    const { type, selected } = node;
    if (actionmap[type]) {
      dispatch(actionmap[type].toggle(idx, !selected));
    }
  }

  render() {
    const { node } = this.props;
    const { name, location } = node;
    const time = formatter.format(new Date(node.time * 1000));
    const slot = '[' + (node.slot || '?') + ']';

    const classes = classNames({
      node: true,
      selected: !!node.selected
    });

    return (
      <li className={classes} onClick={event => this.click(event)}>
        <span className="time">{time}</span>
        <span className="slot">{slot}</span>
        <span className="name">{name}</span>
        <span className="location">{location}</span>
      </li>
    )
  }
}

export default connect()(Node)
