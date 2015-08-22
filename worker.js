var local = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});
var game = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.
  }, 1000); // tick every second.

  var now = new Date();
  var eorzea = new Date(now.valueOf() * 3600 / 175);
  postMessage(['tick',
    local.format(now), // local time formatted to browser locale
    game.format(eorzea), // eorzea time formatted to browser locale
    Math.floor(eorzea.valueOf() / 1000) * 1000
  ]);
}

tick();
