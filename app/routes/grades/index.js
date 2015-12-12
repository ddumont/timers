define([
  'require'
], function (
  require
) {
  return {
    path: 'grades',
    getComponent: function (location, done) {
      require(['./components/grades'], function (Grades) {
        done(null, Grades);
      });
    }
  }
});
