if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}
var local = document.body.querySelector('.time.local');
var game = document.body.querySelector('.time.game');

// Start the web wokrer
var worker = new Worker("worker.js");
worker.onmessage = function(e) {
  local.textContent = e.data[1];
  game.textContent = e.data[2];
};
