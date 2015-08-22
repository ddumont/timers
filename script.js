if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !('content' in document.createElement('template')) ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

if (!window.data) { // let the data load
  var nodes = Array.prototype.slice.call(document.head.childNodes).filter(function(node) {
    return node.nodeType === Node.ELEMENT_NODE
      && node.nodeName === 'SCRIPT'
      && /data\.js$/.test(node.src);
  }).forEach(function(node) {
    node.addEventListener('load', function () {
       build();
    }, false);
  });
} else {
  build();
}

var local = document.body.querySelector('.time.local');
var game = document.body.querySelector('.time.game');
var formatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
});

// // Start the web wokrer
// var worker = new Worker("worker.js");
// worker.onmessage = function(e) {
//   local.textContent = e.data[1];
//   game.textContent = e.data[2];
// };

function build() {
  mining(data.filter(function(item) {
    return item.type === 'mining';
  }));
}

function mining(data, sort) {
  sort = sort || 'time'
  data.sort(function(a, b) {
    return a[sort] - b[sort];
  });

  var list = document.body.querySelector('section.mining ol.list');
  list.innerHTML = '';

  var template = document.body.querySelector('template.mining.row');
  data.forEach(function(item) {
    template.content.querySelector('.time').textContent =
      window.formatter.format(new Date(item.time * 1000));
    template.content.querySelector('.name').textContent = item.name;
    template.content.querySelector('.location').textContent = item.location;
    list.appendChild(document.importNode(template.content, true));
  });
}
