addEventListener('message', function(event) {
  var msg = event.data;
  if (msg.type === 'notification') {
    registration.showNotification(msg.title, {
      tag: msg.tag,
      body: msg.body
    });
  }
});
