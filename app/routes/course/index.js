define([
  'require'
], function (
  require
) {
  return {
    path: 'course/:courseId',
    getChildRoutes: function (location, done) {
      require([
        './routes/announcements',
        './routes/assignments',
        './routes/grades'
      ], function (
        announcementsRoute,
        assignmentsRoute,
        gradesRoute
      ) {
        done(null, [announcementsRoute, assignmentsRoute, gradesRoute]);
      });
    },
    getComponent: function (location, done) {
      require(['./components/course'], function (Course) {
        done(null, Course);
      });
    }
  };
});
