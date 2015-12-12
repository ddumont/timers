define([
  'require'
], function (
  require
) {
  return {
    path: 'calendar',
    getComponent: function (location, done) {
      require(['./components/calendar'], function (Calendar) {
        done(null, Calendar);
      });
    }
  };
});
