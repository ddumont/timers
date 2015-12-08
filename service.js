addEventListener('install', function(event) {
  console.log('service installed: ' + new Date());
});

addEventListener('activate', function(event) {
  console.log('service activated: ' + new Date());
  event.waitUntil( clients.claim() );
});

addEventListener('message', function(event) {
  var msg = event.data;
  if (msg.type === 'notification') {
    registration.showNotification(msg.title, {
      tag: msg.tag,
      body: msg.body
    });
  }
});
