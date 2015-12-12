define([
  'react',
  'react-router',
  './global-nav-link',
  // Not in callback
  './global-nav.less'
], function (
  React,
  reactRouter,
  Link
) {
  return React.createClass({
    logOut: function () {
      alert('Log out!');
    },
    getDefaultProps: function () {
      return {
        user: {
          id: 1,
          name: 'Ryan Florence'
        }
      };
    },
    render: function () {
      var user = this.props.user;
      return (
        <div className="global-nav-wrapper">
          <div className="global-nav-left">
            <Link to="/" root={true}>Home</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/grades">Grades</Link>
            <Link to="/messages">Messages</Link>
          </div>
          <div className="global-nav-right">
            <Link to="/profile">{user.name}</Link>
            <button onClick={this.logOut}>Log Out</button>
          </div>
        </div>
      );
    }
  });
});
