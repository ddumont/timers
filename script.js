if (
  !window.Worker ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

// Start the web wokrer
var worker = new Worker("worker.js");
worker.onmessage = function(e) {
  console.log('Message received from worker', e);
};
