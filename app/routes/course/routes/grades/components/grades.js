define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      var assignments = COURSES[this.props.params.courseId].assignments;
      return (
        <div>
          <h3>Grades</h3>
          <ul>
            {assignments.map(function (assignment) {
              return <li key={assignment.id}>{assignment.grade} - {assignment.title}</li>
            })}
          </ul>
        </div>
      );
    }
  });
});
