define([
  'require'
], function (
  require
) {
  return {
    path: 'assignments',

    getChildRoutes: function (location, done) {
      require(['./routes/assignment'], function (assignmentRoute) {
        done(null, [assignmentRoute]);
      });
    },

    getComponents: function (location, done) {
      require([
        './components/sidebar',
        './components/assignments'
      ], function (
        Sidebar,
        Assignments
      ) {
        done(null, {
          sidebar: Sidebar,
          main: Assignments
        });
      });
    }
  };
});
