define([
  'react',
  'react-router',
  // Not in callback
  './nav.less'
], function (
  React,
  reactRouter
) {
  var Link = reactRouter.Link;
  
  return React.createClass({
    render: function () {
      var pages = [
        [ 'announcements', 'Announcements' ],
        [ 'assignments', 'Assignments' ],
        [ 'grades', 'Grades' ]
      ];
      var course = this.props.course;
      return (
        <nav className="course-nav">
          {pages.map(function (page, index) {
            return (
              <Link
                key={page[0]}
                className="course-link"
                activeClassName="active"
                to={'/course/' + course.id + '/' + page[0]}
              >{page[1]}</Link>
            );
          })}
        </nav>
      );
    }
  });
});
