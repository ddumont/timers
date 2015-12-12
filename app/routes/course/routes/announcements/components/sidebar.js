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
      var announcements = COURSES[this.props.params.courseId].announcements;
      return (
        <div>
          <h3>Sidebar Assignments</h3>
          <ul>
            {announcements.map(function (announcement) {
              return (
                <li key={announcement.id}>
                  <Link to={'/course/' + params.courseId + '/announcements/' + announcement.id}>
                    {announcement.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  });
});
