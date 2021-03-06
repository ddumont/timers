if (
  !window.Worker ||
  !window.Intl ||
  !window.Intl.DateTimeFormat ||
  !("onhashchange" in window) ||
  !("history" in window) ||
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

  // Check for notifications
  if ("Notification" in window) {
    var notif = q('.notifications input');
    if (Notification.permission === "granted")
      notif.checked = true;
    if (Notification.permission === "denied")
      notif.disabled = true;
    notif.addEventListener('click', notifyPermission);
  } else {
    qa('.notifications').forEach(function(elem) {
      elem.parentNode.removeChild(elem);
    });
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
      var aa = a.classList.contains('active') ? 0 : 1;
      var ab = b.classList.contains('active') ? 0 : 1;
      if (aa !== ab) return aa - ab;
      return Number(a.dataset.hour) - Number(b.dataset.hour);
    }
  };
  var day = 60 * 60 * 24;
  var twohr = 2 * 60 * 60;
  try {
    // Start the web wokrer
    var worker = window.worker = new Worker("worker.js");

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service.js').then(function(registration) {
        registration.onupdatefound = function(event) {
          console.log('Service update found...');
          registration.update();
          window.location.reload();
        };
      }).catch(console.error.bind(console));
    }

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

        var duration = elem.dataset.duration;
        var active = duration - (day - delta) > 0;
        game.dataset.sort = Boolean(game.dataset.sort) || (active ^ elem.classList.contains('active'));
        if (active) // IE 10 is retarded, doesn't support classList.toggle's 3rd arg.
          elem.classList.add('active');
        else
          elem.classList.remove('active');

        if (active) {
          q('.time', elem).textContent = formatterhm.format((duration - (day - delta)) * 1000);
          if (elem.dataset.alarmed)
            delete elem.dataset.alarmed;
        } else if (delta < twohr) {
          q('.time', elem).textContent = formatterhm.format(delta * 1000);
          if (q('.notifications > input:checked') && delta < twohr / 2 && !elem.dataset.alarmed) {
            elem.dataset.alarmed = 'true';

            var title = q('.location', elem).textContent;
            var tag = elem.dataset.nodeid + '-' + new Date().getTime();
            var body = qa('section[data-sectionid] li[data-nodeid="' + elem.dataset.nodeid + '"]').map(function(elem) {
              return qa('.slot,.name', elem).map(function(elem) { return elem.textContent; }).join(' ');
            }).join('\n');

            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.ready.then(function(registration) {
                registration.active.postMessage({ type: 'notification', tag: tag, title: title, body: body });
              });
            } else {
              new Notification(q('.location', elem).textContent, { tag: tag, body: body });
            }
          }
        } else {
          q('.time', elem).textContent = hour + ':00';
          if (elem.dataset.alarmed)
            delete elem.dataset.alarmed;
        }
      });
      if (Boolean(game.dataset.sort))
        resort(q('.active ol'), qa('.active li.selected'), sorts.timeleft);
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
        game.dataset.sort = true;
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

    var content = q('template.mining.row');
    content = content.content || content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;
      q('.slot', li).textContent = '[' + (item.slot || '?') + ']';

      if ('content' in document.createElement('template'))
        var item = q('li', document.importNode(content, true));
      else
        var item = content.firstElementChild.cloneNode(true);
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]', active).length)
        active.appendChild(item.cloneNode(true));

      return item;
    }), sorts.default);
  }

  function botany(data) {
    var list = q('section.botany ol');
    var active = q('section.active ol');

    var content = q('template.botany.row');
    content = content.content || content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;
      q('.slot', li).textContent = '[' + (item.slot || '?') + ']';

      if ('content' in document.createElement('template'))
        var item = q('li', document.importNode(content, true));
      else
        var item = content.firstElementChild.cloneNode(true);
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]', active).length)
        active.appendChild(item.cloneNode(true));

      return item;
    }), sorts.default);
  }

  function fishing(data) {
    var list = q('section.fishing ol');
    var active = q('section.active ol');

    var content = q('template.fishing.row');
    content = content.content || content;
    resort(list, data.map(function(item, idx) {
      var li = q('li', content);
      Object.keys(item).forEach(function(key) {
        li.dataset[key] = item[key];
      });
      li.dataset.id = idx;
      q('.time', li).textContent = formatter.format(new Date(item.time * 1000));
      q('.name', li).textContent = item.name;
      q('.location', li).textContent = item.location;

      if ('content' in document.createElement('template'))
        var item = q('li', document.importNode(content, true));
      else
        var item = content.firstElementChild.cloneNode(true);
      if (!qa('li[data-nodeid="' + li.dataset.nodeid + '"]', active).length)
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

  function notifyPermission(event) {
    var notif = event.currentTarget;
    if (notif.checked) {
      if (Notification.permission !== "granted") {
        notif.checked = false;
        Notification.requestPermission(function (permission) {
          if (permission === "granted")
            notif.checked = true;
          else
            notif.disabled = true;
        });
      }
    } else {
      qa('*[data-alarmed]').forEach(function(elem) {
        delete elem.dataset.alarmed;
      })
    }
  }

  // IE is so lame...
  var ua = window.navigator.userAgent;
  if (ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1 || ua.indexOf('Edge/') > -1) {
    qa('section.clock, section.active').forEach(function(elem) {
      elem.style.left = '10px';
      elem.style.transform = 'translateX(0px)';
    });
  }

})();
