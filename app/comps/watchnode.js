import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './watchnode.less';

const day = 60 * 60 * 24;

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
    const { eorzea } = clock;
    const { location } = node;
    const elapsed = clock.elapsed || 0;

    const diff = (day + node.time - elapsed) % day;
    const diffdespawn = (day + node.time + node.duration - elapsed) % day;
    const spawn = eorzea - elapsed + node.time;
    const despawn = spawn + node.duration;
    const active = spawn < eorzea && eorzea < despawn;
    const time = formatter.format(new Date((active ? diffdespawn : diff) * 1000));


    const classes = classNames({
      watchnode: true,
      active: active
    });

    return (
      <li className={classes}>
        <span className="type">{node.type.substring(0,1)}</span>
        <span className="time">{time}</span>
        <span className="location">{location}</span>
      </li>
    )
  }
}
