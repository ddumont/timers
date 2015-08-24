if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("onhashchange" in window) ||
  !("history" in window) ||
  !('content' in document.createElement('template')) ||
  !("classList" in document.createElement("_"))
) {
  document.body.className = "unsupported";
}

(function() {
  function slice(arr) {
    return Array.prototype.slice.call(arr);
  }
  function q(selector, node) {
    return (node || document.body).querySelector(selector);
  }
  function qa(selector, node) {
    return (node || document.body).querySelectorAll(selector);
  }
  if (!window.data) { // let the data load
    var nodes = slice(document.head.childNodes).filter(function(node) {
      return node.nodeType === Node.ELEMENT_NODE
        && node.nodeName === 'SCRIPT'
        && /data\.js$/.test(node.src);
    }).forEach(function(node) {
      node.addEventListener('load', build, false);
    });
  } else {
    build();
  }

  var local = q('.time.local');
  var game = q('.time.game');
  var formatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
  });
  var sorts = {
    'default': function(a, b) {
      var delta = Number(a.dataset.time) - Number(b.dataset.time);
      if (delta !== 0) return delta;
      delta = Number(a.dataset.nodeid) - Number(b.dataset.nodeid);
      if (delta !== 0) return delta;
      return Number(a.dataset.slot) - Number(b.dataset.slot);
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

  window.addEventListener("hashchange", unhash, false);

  function resort(parent, elems, compare) {
    elems = slice(elems || list.childNodes || [])
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
    botany(data.filter(function(item) {
      return item.type === 'botany';
    }));
    fishing(data.filter(function(item) {
      return item.type === 'fishing';
    }));

    slice(qa('li[data-nodeid]')).forEach(function(node, idx, arr) {
      node.addEventListener('click', function(e) {
        var target = e.currentTarget;
        arr.forEach(function(check) {
          if (check.dataset.nodeid === target.dataset.nodeid)
            check.classList.toggle('selected');
        });
        hash();
      });
    });

    unhash();
  }

  function mining(data) {
    var list = q('section.mining ol');
    list.innerHTML = '';

    var content = q('template.mining.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      return document.importNode(content, true).firstElementChild;
    }), sorts.default);
  }

  function botany(data) {
    var list = q('section.botany ol');
    list.innerHTML = '';

    // use the mining template for now.
    var content = q('template.mining.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      return document.importNode(content, true).firstElementChild;
    }), sorts.default);
  }

  function fishing(data) {
    var list = q('section.fishing ol');
    list.innerHTML = '';

    // use the mining template for now.
    var content = q('template.mining.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      return document.importNode(content, true).firstElementChild;
    }), sorts.default);
  }

  /**
   * Construct a mask of selected nodeids and encode it into the location hash.
   */
  function hash() {
    var data = [];
    slice(qa('li[data-nodeid]')).forEach(function(node) {
      if (node.classList.contains('selected')) {
        var id = Number(node.dataset.nodeid)
        var idx = ~~(id / 8);
        var val = id % 8;
        data[idx] = (data[idx] || 0) | (1 << val);
      }
    });
    for (var i = 0; i < data.length; i++)
      data[i] = String.fromCharCode(data[i] || 0);
    history.replaceState(undefined, undefined, '#' + btoa(data.join('')));
  }

  /**
   * Using the location hash as a nodeid mask, mark the nodes selected.
   */
  function unhash() {
    var hash = window.location.hash.substring(1);
    var data = atob(hash);
    for (var idx = 0; idx < data.length; idx++) {
      var mask = data.charCodeAt(idx);
      for (var i = 0; i < 8; i++) {
        if (mask && (mask & 1)) {
          var nodes = qa('li[data-nodeid="' + (8 * idx + i) + '"]');
          slice(nodes || []).forEach(function(node) {
            node.classList.add('selected')
          });
        }
        mask >>>= 1;
      }
    };
  }

})();
