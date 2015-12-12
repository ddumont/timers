define([
  'react',
  'react-router'
], function (
  React,
  reactRouter
) {
  var Link = reactRouter.Link;
  return React.createClass({
    render: function () {
      var params = this.props.params;
      var assignments = COURSES[this.props.params.courseId].assignments;
      return (
        <div>
          <h3>Sidebar Assignments</h3>
          <ul>
            {assignments.map(function (assignment) {
              return (
                <li key={assignment.id}>
                  <Link to={'/course/' + params.courseId + '/assignments/' + assignment.id}>
                    {assignment.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )
    }
  })
});
