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
  function qa(selector, node) { // snapshot
    return slice((node || document.body).querySelectorAll(selector) || []);
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
  var formatterl = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric', minute: 'numeric'
  });
  var formatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
  });
  var formatterh = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric', timeZone: 'UTC', hour12: false
  });
  var formatterhm = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',  minute: 'numeric', timeZone: 'UTC', hour12: false
  });
  var sorts = {
    'default': function(a, b) {
      var delta = Number(a.dataset.time) - Number(b.dataset.time);
      if (delta !== 0) return delta;
      delta = Number(a.dataset.nodeid) - Number(b.dataset.nodeid);
      if (delta !== 0) return delta;
      return Number(a.dataset.slot) - Number(b.dataset.slot);
    },
    'nodeid': function(a,b) {
      return Number(a.dataset.nodeid) - Number(b.dataset.nodeid);
    },
    'timeleft': function(a,b) {
      return Number(a.dataset.hour) - Number(b.dataset.hour);
    }
  };
  var day = 60 * 60 * 24;
  var twohr = 2 * 60 * 60;
  try {
    // Start the web wokrer
    var worker = new Worker("worker.js");
    worker.onmessage = function(e) {
      local.textContent = formatterl.format(e.data[1]);
      game.textContent = formatter.format(e.data[2]);
      var hour = formatterh.format(e.data[2]);
      var now = Math.floor(e.data[2].getTime() / 1000) % (day);
      qa('.active li.selected').forEach(function(elem) {
        var time = Number(elem.dataset.time);
        if (time < now)
          time += day;
        var delta = (time - now) % (day) + 60;
        var hour = formatterh.format(delta * 1000);
        elem.dataset.hour = hour;
        if (delta < twohr)
          q('.time', elem).textContent = formatterhm.format(delta * 1000);
        else
          q('.time', elem).textContent = hour + ':00';
      });
      if (game.dataset.hour !== hour) {
        resort(q('.active ol'), qa('.active li.selected'), sorts.timeleft);
        game.dataset.hour = hour;
      }
    };
  } catch(e) {
    console.error(e);
  }

  window.addEventListener("hashchange", unhash, false);

  function resort(parent, elems, compare) {
    elems = slice(elems || parent.childNodes || [])
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

    qa('section[data-sectionid] li[data-nodeid]').forEach(function(node, idx) {
      node.addEventListener('click', function(e) {
        qa('li[data-nodeid="' + e.currentTarget.dataset.nodeid + '"]').forEach(function(check) {
          check.classList.toggle('selected');
        });
        hash();
      });
    });

    qa('section[data-sectionid]').forEach(function(elem) {
      q('h1 a', elem).addEventListener("click", function(e) {
        elem.classList.toggle('minimize');
        hash();
      });
    });

    qa('nav li').forEach(function(elem) {
      q('a', elem).addEventListener("click", function(e) {
        var section = q('section.' + elem.dataset.target);
        section.classList.remove('minimize');
        q('h1 a', section).focus();

        hash();
      });
    });

    unhash();
  }

  function mining(data) {
    var list = q('section.mining ol');
    var active = q('section.active ol');

    var content = q('template.mining.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      var location = q('.location', li);
      location.textContent = item.location;

      var item = document.importNode(content, true).firstElementChild;
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]').length)
        active.appendChild(item.cloneNode(true));

      return item;
    }), sorts.default);
  }

  function botany(data) {
    var list = q('section.botany ol');
    var active = q('section.active ol');

    var content = q('template.botany.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      var item = document.importNode(content, true).firstElementChild;
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]').length)
        active.appendChild(item.cloneNode(true));

      return item;
    }), sorts.default);
  }

  function fishing(data) {
    var list = q('section.fishing ol');
    var active = q('section.active ol');

    var content = q('template.fishing.row').content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      var item = document.importNode(content, true).firstElementChild;
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]').length)
        active.appendChild(item.cloneNode(true));

      return item;
    }), sorts.default);
  }

  /**
   * @param {Array<Element>} elems
   * @param {<Boolean> Function(Element)} filter
   * @param {<Number> Function(Element)?} identify
   * @return {string} encoded bitarray
   */
  function encodeba(elems, filter, identify) {
    var data = [];
    elems.forEach(function(elem) {
      if (filter(elem)) {
        var id = identify(elem);
        var idx = ~~(id / 8);
        var val = id % 8;
        data[idx] = (data[idx] || 0) | (1 << val);
      }
    });
    for (var i = 0; i < data.length; i++)
      data[i] = String.fromCharCode(data[i] || 0);
    return btoa(data.join(''));
  }

  /**
   * @param {string} enc Encoded bitarray
   * @param {Function<Number>} apply
   */
  function decodeba(enc, apply) {
    var data = atob(enc);
    for (var idx = 0; idx < data.length; idx++) {
      var mask = data.charCodeAt(idx);
      for (var i = 0; i < 8; i++) {
        if (mask && (mask & 1))
          apply(8 * idx + i);
        mask >>>= 1;
      }
    }
  }

  /**
   * Construct a mask of selected nodeids and encode it into the location hash.
   */
  function hash() {
    var enc = encodeba(
      qa('section[data-sectionid] li[data-nodeid]'),
      function(elem) { return elem.classList.contains('selected'); },
      function(elem) { return Number(elem.dataset.nodeid); }
    );
    if (qa('section[data-sectionid].minimize').length) {
      enc += '|' + encodeba(
        qa('section[data-sectionid]'),
        function(elem) { return elem.classList.contains('minimize'); },
        function(elem) { return Number(elem.dataset.sectionid); }
      );
    }

    history.replaceState(undefined, undefined, '#' + encodeURI(enc));
  }

  /**
   * Using the location hash as a nodeid mask, mark the nodes selected.
   */
  function unhash() {
    // reset
    qa('li[data-nodeid]').forEach(function(node) {
      node.classList.remove('selected');
    });
    qa('section[data-sectionid]').forEach(function(node) {
      node.classList.remove('minimize');
    });

    // read values from hash
    var hash = decodeURI(window.location.hash.substring(1)).split('|');
    decodeba(hash[0] || '', function(id) {
      qa('li[data-nodeid="' + id + '"]').forEach(function(elem) {
        elem.classList.add('selected');
      });
    });
    decodeba(hash[1] || '', function(id) {
      qa('section[data-sectionid="' + id + '"]').forEach(function(elem) {
        elem.classList.add('minimize');
      });
    });
  }

})();
