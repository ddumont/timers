import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

// import './node.less';

const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',  minute: 'numeric', timeZone: 'UTC', hour12: false
});

export default class WatchNode extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { clock, node } = this.props;
    return node !== nextProps.node || clock !== nextProps.clock;
  }

  render() {
    const { node, clock } = this.props;
    const { eorzea, elapsed } = clock;
    const { location } = node;

    const time = formatter.format(new Date((node.time - (elapsed || 0)) * 1000));

    const classes = classNames({
      watchnode: true
    });

    return (
      <li className={classes} onClick={event => this.click(event)}>
        <span className="time">{time}</span>
        <span className="location">{location}</span>
      </li>
    )
  }
}
