if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

var formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric'
});

var local = document.body.querySelector('.time.local');
var game = document.body.querySelector('.time.local');

// Start the web wokrer
var worker = new Worker("worker.js");
worker.onmessage = function(e) {
  local.textContent = formatter.format(new Date());
};
