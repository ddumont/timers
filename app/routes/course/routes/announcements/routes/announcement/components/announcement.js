define([
  'react'
], function (
  React
) {
  return React.createClass({
    render: function () {
      var courseId = this.props.params.courseId;
      var announcementId = this.props.params.announcementId;
      var title = COURSES[courseId].announcements[announcementId].title;
      var body = COURSES[courseId].announcements[announcementId].body;

      return (
        <div>
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      );
    }
  });
});
