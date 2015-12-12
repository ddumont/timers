define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      var params = this.props.params;
      var courseId = params.courseId;
      var assignmentId = params.courseId;
      var assignment = COURSES[courseId].assignments[assignmentId];
      var title = assignment.title;
      var body = assignment.body;

      return (
        <div>
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      );
    }
  });
});
