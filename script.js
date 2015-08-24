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
    botany(data.filter(function(item) {
      return item.type === 'botany';
    }));
    fishing(data.filter(function(item) {
      return item.type === 'fishing';
    }));

    Array.prototype.slice.call(
      document.body.querySelectorAll('li[data-nodeid]')
    ).forEach(function(node, idx, arr) {
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
    var list = document.body.querySelector('section.mining ol');
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
    }), sorts.default);
  }

  function botany(data) {
    var list = document.body.querySelector('section.botany ol');
    list.innerHTML = '';

    // use the mining template for now.
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
    }), sorts.default);
  }

  function fishing(data) {
    var list = document.body.querySelector('section.fishing ol');
    list.innerHTML = '';

    // use the mining template for now.
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
    }), sorts.default);
  }

  /**
   * Construct a mask of selected nodeids and encode it into the location hash.
   */
  function hash() {
    var data = [];
    Array.prototype.slice.call(
      document.body.querySelectorAll('li[data-nodeid]')
    ).forEach(function(node) {
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
    var nodeid = 0;
    var data = atob(hash);
    for (var idx = 0; idx < data.length; idx++) {
      var mask = data.charCodeAt(idx);
      for (var j = 8; j > 0; j--) {
        var id = nodeid++;
        if (mask && (mask & 1)) {
          var nodes = document.body.querySelectorAll('li[data-nodeid="' + id + '"]');
          Array.prototype.slice.call(nodes || []).forEach(function(node) {
            node.classList.add('selected')
          });
        }
        mask >>>= 1;
      }
    };
  }
  window.addEventListener("hashchange", unhash, false);
})();
