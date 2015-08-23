if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("onhashchange" in window) ||
  !('content' in document.createElement('template')) ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

(function() {
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
  var sorts = {
    'time': function(a, b) {
      return Number(a.dataset.time) - Number(b.dataset.time);
    }
  };
  try {
    // Start the web wokrer
    var worker = new Worker("worker.js");
    worker.onmessage = function(e) {
      local.textContent = e.data[1];
      game.textContent = e.data[2];
    };
  } catch(e) {
    console.error(e);
  }

  window.addEventListener("hashchange", function(e) {
    console.log(e);
  }, false);

  function resort(parent, elems, compare) {
    elems = Array.prototype.slice.call(elems || list.childNodes || [])
    .filter(function(node) {
      return node.nodeType === Node.ELEMENT_NODE;
    });
    elems.sort(compare).forEach(function(elem) {
      parent.appendChild(elem);
    });
  }

  function build() {
    mining(data.filter(function(item) {
      return item.type === 'mining';
    }));
  }

  function mining(data) {
    var list = document.body.querySelector('section.mining ol.list');
    list.innerHTML = '';

    var content = document.body.querySelector('template.mining.row').content;
    resort(list, data.map(function(item) {
      var li = content.querySelector('li');
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.querySelector('.time').textContent = formatter.format(new Date(item.time * 1000));
      li.querySelector('.name').textContent = item.name;
      li.querySelector('.location').textContent = item.location;
      return document.importNode(content, true).firstElementChild;
    }), sorts.time);
  }
})();
