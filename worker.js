function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.
  }, 1000); // tick every second.

  var now = new Date();
  var eorzea = new Date(now.valueOf() * 3600 / 175);
  postMessage(['tick',
    now,
    eorzea,
    Math.floor(eorzea.valueOf() / 1000) % 86400 // # of elapsed seconds in the eorzean day
  ]);
}

tick();
