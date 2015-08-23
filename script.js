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
      node.addEventListener('load', build, false);
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

    unhash();
  }

  function mining(data) {
    var list = document.body.querySelector('section.mining ol.list');
    list.innerHTML = '';

    var content = document.body.querySelector('template.mining.row').content;
    resort(list, data.map(function(item, idx) {
      var li = content.querySelector('li');
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      li.querySelector('.time').textContent = formatter.format(new Date(item.time * 1000));
      li.querySelector('.name').textContent = item.name;
      li.querySelector('.location').textContent = item.location;
      return document.importNode(content, true).firstElementChild;
    }), sorts.time);
    hash();
  }

  /**
   * Construct a mask of selected nodeids and encode it into the location hash.
   */
  function hash() {
    var data = [];
    Array.prototype.slice.call(
      document.body.querySelector('section.mining ol.list').childNodes
    ).forEach(function(node) {
      if (node.classList.contains('selected') || 1) {
        var id = Number(node.dataset.nodeid)
        var idx = ~~(id / 8);
        var val = id % 8;
        data[idx] = (data[idx] || 0) | (1 << val);
      }
    })
    history.replaceState(undefined, undefined, '#' + btoa(data.map(String.fromCharCode).join('')));
  }

  /**
   * Using the location hash as a nodeid mask, mark the nodes selected.
   */
  function unhash() {
    var hash = window.location.hash.substring(1);
    var id = 1;
    Array.prototype.slice.call(atob(hash)).map(function(char) {
      return char.charCodeAt(0);
    }).forEach(function(mask) {
      while (mask) {
        var nodeid = id++;
        if (mask & 1) {
          var nodes = document.body.querySelectorAll('[data-nodeid="' + nodeid + '"]');
          Array.prototype.slice.call(nodes || []).forEach(function(node) {
            node.classList.add('selected')
          });
        }
        mask >>>= 1;
      }
    });
  }
})();
