define([
  'react',
  './dashboard',
  './nav',
  // Not in callback
  './course.less'
], function (
  React,
  Dashboard,
  Nav
) {
  return React.createClass({
    render: function () {
      var sidebar = this.props.sidebar;
      var main = this.props.main;
      var children = this.props.children;
      var params = this.props.params;
      var course = COURSES[params.courseId];
      
      var content = null;
      if (sidebar && main) {
        content = (
          <div>
            <div className="course-sidebar">
              {sidebar}
            </div>
            <div className="course-main">
              {main}
            </div>
          </div>
        );
      } else if (children) {
        content = children;
      } else {
        content = <Dashboard />
      }
      
      return (
        <div>
          <h2>{course.name}</h2>
          <Nav course={course} />
          {content}
        </div>
      );
    }
  })
});
