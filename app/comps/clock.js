import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './clock.less';

const local = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});
const game = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

class Clock extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.clock !== nextProps.clock;
  }

  render() {
    const { now, eorzea, elapsed } = this.props.clock;
    const { type } = this.props;
    const time = type === 'Eorzea' ?
      game.format(new Date(eorzea || 0)) : local.format(new Date(now || 0));

    const classes = classNames({
      clock: true,
      game: type === 'Eorzea'
    });

    return (
      <div className={classes}>
        <h4>{ type } time:</h4>
        <div className="time">{ time }</div>
      </div>
    )
  }
}

Clock.defaultProps = {
  type: 'Local' // 'Eorzea'
};

export default Clock;
