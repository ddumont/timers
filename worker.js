function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.
    postMessage('tick');
  }, 1000); // tick every second
}

tick();
