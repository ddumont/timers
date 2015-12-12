define([
  'require'
], function (
  require
) {
  return {
    path: ':announcementId',
    getComponent: function (location, done) {
      require(['./components/announcement'], function (Announcement) {
        done(null, Announcement);
      });
    }
  };
});
