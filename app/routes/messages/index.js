define([
  'require'
], function (
  require
) {
  return {
    path: 'messages',
    getComponent: function (location, done) {
      require(['./components/messages'], function (Messages) {
        done(null, Messages);
      });
    }
  }
});
