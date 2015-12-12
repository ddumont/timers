define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      return (
        <div>
          <h3>Announcements</h3>
          {this.props.children || <p>Choose an announcement from the sidebar.</p>}
        </div>
      );
    }
  });
});
