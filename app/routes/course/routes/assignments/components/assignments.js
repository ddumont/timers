define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      return (
        <div>
          <h3>Assignments</h3>
          {this.props.children || <p>Choose an assignment from the sidebar.</p>}
        </div>
      );
    }
  });
});
