define([
  'react',
  'react-router',
  // Not in callback
  './global-nav-link.less'
], function (
  React,
  reactRouter
) {
  var Link = reactRouter.Link;
  
  return React.createClass({
    render: function () {
      if (this.props.root) {
        return <Link className="global-nav-link" {...this.props}/>;
      } else {
        return <Link className="global-nav-link" activeClassName="active" {...this.props}/>;
      }
    }
  });
});
