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
  local.textContent = localformat.format(new Date());
  game.textContent = gameformat.format(new Date(Date.UTC() * 3600 / 175));
};
