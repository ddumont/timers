function tick() {
  self.timeout = setTimeout(function() {
    tick(); // schedule next tick.
  }, 1000); // tick every second.

  const now = new Date().valueOf();
  const eorzea = new Date(now * 3600 / 175).valueOf();
  const elapsed = Math.floor(eorzea / 1000) % 86400; // # of elapsed seconds in the eorzean day

  try {
    clients.matchAll({includeUncontrolled: true}).then(clients => {
      clients.forEach(client => {
        client.postMessage(['tick', now, eorzea, elapsed]);
      });
    })
  } catch (e) {
    postMessage(['tick', now, eorzea, elapsed]);
  }
}

tick();
