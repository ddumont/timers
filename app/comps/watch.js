import React, { Component, PropTypes } from 'react';
import WatchNode from './watchnode';
import classNames from 'classnames';

import './watch.less';

const day = 60 * 60 * 24;
export default class Watch extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { mining, botany, fishing, clock } = this.props;

    return mining !== nextProps.mining || botany !== nextProps.botany ||
           fishing !== nextProps.fishing || clock !== nextProps.clock;
  }

  render() {
    const { mining, botany, fishing, clock } = this.props;
    const elapsed = clock.elapsed || 0;

    const classes = classNames(
      ['watch'].concat(this.props.className.split(/\s+/))
    );

    let nodes = mining.filter(node => node.selected)
      .concat(botany.filter(node => node.selected))
      .concat(fishing.filter(node => node.selected));
    nodes.sort((a, b) => {
      return ((day + a.time - elapsed) % day) - ((day + b.time - elapsed) % day);
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
