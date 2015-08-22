function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.
    postMessage('tick');
  }, 1000 * 175 / 3600 * 60); // tick every eorzea minute
}

tick();
