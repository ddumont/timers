define([
  'react',
  './dashboard',
  './global-nav',
  // Not in callback
  './app.less'
], function (
  React,
  Dashboard,
  GlobalNav
) {
  return React.createClass({
    render: function () {
      return (
        <div>
          <GlobalNav />
          <div className="app-main">
            {this.props.children || <Dashboard courses={COURSES} />}
          </div>
        </div>
      );
    }
  });
});
