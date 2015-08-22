if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

var localformat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});

var local = document.body.querySelector('.time.local');
var localformat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});
var game = document.body.querySelector('.time.local');
var gameformat = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

// Start the web wokrer
var worker = new Worker("worker.js");
worker.onmessage = function(e) {
  var now = new Date();
  local.textContent = localformat.format(now);
  game.textContent = gameformat.format(new Date(now.valueOf() * 3600 / 175));
};
