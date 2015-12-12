define([
  'require'
], function (
  require
) {
  return {
    path: 'announcements',

    getChildRoutes: function (location, done) {
      require(['./routes/announcement'], function (announcementRoute) {
        done(null, [announcementRoute]);
      });
    },

    getComponents: function (location, done) {
      require([
        './components/sidebar',
        './components/announcements'
      ], function (
        Sidebar,
        Announcements
      ) {
        done(null, {
          sidebar: Sidebar,
          main: Announcements
        })
      });
    }
  }
});
