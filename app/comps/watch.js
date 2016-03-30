import React, { Component, PropTypes } from 'react';
import WatchNode from './watchnode';
import classNames from 'classnames';

import './watch.less';

const day = 60 * 60 * 24;
export default class Watch extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { clock, selected } = this.props;
    return selected !== nextProps.selected || clock !== nextProps.clock;
  }

  render() {
    const { clock, selected } = this.props;
    const elapsed = clock.elapsed || 0;

    const classes = classNames(
      ['watch'].concat(this.props.className.split(/\s+/))
    );

    const nodes = Object.keys(selected).map(key => selected[key]);
    nodes.sort((a, b) => {
      return ((day + a.time + a.duration - elapsed) % day) - ((day + b.time + b.duration - elapsed) % day);
    });

    return (
      <section className={classes}>
        <h1>Watch</h1>
        <ol>
          { nodes.map((node, idx) => <WatchNode key={node.key} node={node} idx={idx} clock={clock} />) }
        </ol>
      </section>
    )
  }
}
