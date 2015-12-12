define([
  'require'
], function (
  require
) {
  return {
    path: ':assignmentId',
    getComponent: function (location, done) {
      require(['./components/assignment'], function (Assignment) {
        done(null, Assignment);
      });
    }
  };
});
