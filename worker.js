var local = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});
var game = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.

    var now = new Date();
    postMessage([
      'tick',
      local.format(now),
      game.format(new Date(now.valueOf() * 3600 / 175))
    ]);
  }, 1000); // tick every second
}

tick();
