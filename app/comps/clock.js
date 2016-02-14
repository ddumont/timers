import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './clock.less';

const formatterl = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});
const formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

class Clock extends Component {

  componentDidMount() {
    const {worker} = this.props;

    if (worker) {
      worker.addEventListener('message', event => this.onMessage(event));
    } else {
      try {
        navigator.serviceWorker.addEventListener('message', event => this.onMessage(event));
      } catch (e) {
        console.error('Service workers are not supported.', e);
      }
    }
  }

  onMessage({data}) {
    const {type} = this.props;

    if (data[0] === 'tick') {
      this.setState({time: type === 'Eorzea' ? data[2] : data[1]});
    }
  }

  render() {
    const {type} = this.props;
    const {time} = this.state || {};
    const date = new Date(time || 0);
    const classes = classNames({
      clock: true,
      game: type === 'Eorzea'
    });

    return (
      <div className={classes}>
        <h4>{ type } time:</h4>
        <div className="time">{ type === 'Eorzea' ? formatter.format(date) : formatterl.format(date) }</div>
      </div>
    )
  }
}

Clock.defaultProps = {
  type: 'Local' // 'Eorzea'
};

export default Clock;
