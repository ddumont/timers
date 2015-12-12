define([
  'require'
], function (
  require
) {
  return {
    path: 'profile',
    getComponent: function (location, cb) {
      require(['./components/profile'], function (Profile) {
        cb(null, Profile);
      });
    }
  };
});
