(function () {
  'use strict';

  /* ================= Data ================= */
  var KEY = 'impasto_admin_v1', SESS = 'impasto_admin_session';
  var MENU_SEED = [{"cat": "pizza", "name": "Margherita", "price": 14, "desc": "San Marzano tomato, fresh mozzarella, basil and a drizzle of olive oil.", "img": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80", "badge": "Best Seller"}, {"cat": "pizza", "name": "Diavola", "price": 17, "desc": "Spicy salami, tomato, mozzarella and a touch of chili honey.", "img": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80", "badge": "Spicy"}, {"cat": "pizza", "name": "Quattro Formaggi", "price": 17, "desc": "Mozzarella, gorgonzola, parmigiano and fontina on a creamy white base.", "img": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", "badge": null}, {"cat": "pizza", "name": "Prosciutto e Funghi", "price": 18, "desc": "Tomato, mozzarella, cured ham, roasted mushrooms and fresh herbs.", "img": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", "badge": null}, {"cat": "pizza", "name": "Pepperoni", "price": 16, "desc": "Tomato, mozzarella and crispy-edged pepperoni.", "img": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80", "badge": "Popular"}, {"cat": "pizza", "name": "Vegetariana", "price": 16, "desc": "Grilled zucchini, peppers, olives, red onion, tomato and mozzarella.", "img": "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80", "badge": "Veggie"}, {"cat": "pasta", "name": "Spaghetti Carbonara", "price": 18, "desc": "Fresh spaghetti, crispy guanciale, egg yolk, pecorino and black pepper.", "img": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80", "badge": null}, {"cat": "pasta", "name": "Tagliatelle al Ragù", "price": 19, "desc": "Handmade tagliatelle with a slow-cooked beef and tomato ragù.", "img": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80", "badge": null}, {"cat": "pasta", "name": "Penne all’Arrabbiata", "price": 15, "desc": "Penne in a fiery tomato, garlic and chili sauce, finished with parsley.", "img": "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=800&q=80", "badge": "Spicy"}, {"cat": "pasta", "name": "Fettuccine Alfredo", "price": 17, "desc": "Fresh fettuccine tossed in butter, cream and aged parmigiano.", "img": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80", "badge": null}, {"cat": "pasta", "name": "Pesto Genovese", "price": 16, "desc": "Trofie with basil pesto, pine nuts, parmigiano and green beans.", "img": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", "badge": "Veggie"}, {"cat": "pasta", "name": "Lasagna della Casa", "price": 20, "desc": "Layers of fresh pasta, beef ragù, béchamel and baked mozzarella.", "img": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80", "badge": "Best Seller"}, {"cat": "starters", "name": "Bruschetta al Pomodoro", "price": 8, "desc": "Grilled bread, fresh tomato, garlic and basil.", "img": null, "badge": null}, {"cat": "starters", "name": "Burrata & Tomatoes", "price": 12, "desc": "Creamy burrata, ripe tomatoes and olive oil.", "img": null, "badge": null}, {"cat": "starters", "name": "Arancini", "price": 9, "desc": "Crispy risotto balls filled with mozzarella.", "img": null, "badge": null}, {"cat": "desserts", "name": "Tiramisù", "price": 9, "desc": "Mascarpone cream, espresso-soaked savoiardi and cocoa.", "img": null, "badge": null}, {"cat": "desserts", "name": "Panna Cotta", "price": 8, "desc": "Silky vanilla cream with a berry sauce.", "img": null, "badge": null}, {"cat": "desserts", "name": "Affogato", "price": 7, "desc": "Vanilla gelato topped with a shot of hot espresso.", "img": null, "badge": null}, {"cat": "drinks", "name": "Italian Lemonade", "price": 5, "desc": "Fresh lemon, mint and sparkling water.", "img": null, "badge": null}, {"cat": "drinks", "name": "Mint Iced Tea", "price": 5, "desc": "Brewed daily and lightly sweetened.", "img": null, "badge": null}, {"cat": "drinks", "name": "Espresso", "price": 3, "desc": "Rich, short and strong.", "img": null, "badge": null}];
  var CATS = [['pizza', 'Pizza'], ['pasta', 'Pasta'], ['starters', 'Starters'], ['desserts', 'Desserts'], ['drinks', 'Drinks']];
  var CATNAME = {}; CATS.forEach(function (c) { CATNAME[c[0]] = c[1]; });
  var STATUS = { new: 'New', preparing: 'Preparing', ready: 'Ready', completed: 'Completed', cancelled: 'Cancelled' };
  var NEXT = { new: ['preparing', 'Start'], preparing: ['ready', 'Mark ready'], ready: ['completed', 'Complete'] };
  var TYPE = { dine: 'Dine-in', takeaway: 'Takeaway', delivery: 'Delivery' };
  var BADGES = ['', 'Best Seller', 'Popular', 'Spicy', 'Veggie', 'New'];
  var RES_STATUS = { pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled' };

  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function dateStr(offset) {
    var d = new Date(); d.setDate(d.getDate() + offset);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function seedData() {
    var r = rng(20260612), now = Date.now(), DAY = 864e5;
    var menu = MENU_SEED.map(function (m, i) {
      return { id: 'm' + (i + 1), name: m.name, cat: m.cat, price: m.price, desc: m.desc, img: m.img || '', badge: m.badge || '', available: true };
    });
    var main = menu.filter(function (m) { return m.cat === 'pizza' || m.cat === 'pasta'; });
    var sides = menu.filter(function (m) { return m.cat !== 'pizza' && m.cat !== 'pasta'; });
    var names = ['Layla Hassan', 'Omar Khaled', 'Sara Mostafa', 'Youssef Adel', 'Nour El-Din', 'Mariam Samir', 'Karim Fathy', 'Hana Tarek', 'Ahmed Nabil', 'Dina Rashed', 'Mostafa Ali', 'Salma Ibrahim', 'Tamer Gamal', 'Farah Essam', 'Ziad Hossam', 'Jana Wael'];
    var orders = [];
    for (var d = 29; d >= 0; d--) {
      var n = d === 0 ? 8 : 3 + Math.floor(r() * 5) + ((d % 7 === 5 || d % 7 === 6) ? 2 : 0);
      for (var k = 0; k < n; k++) {
        var t;
        if (d === 0) { t = now - r() * Math.min(10, Math.max(1, new Date().getHours())) * 36e5; }
        else { var day = new Date(now - d * DAY); day.setHours(12 + Math.floor(r() * 11), Math.floor(r() * 60), 0, 0); t = day.getTime(); }
        var count = 1 + Math.floor(r() * 4), lines = [];
        for (var j = 0; j < count; j++) {
          var pool = r() < 0.72 ? main : sides, it = pool[Math.floor(r() * pool.length)];
          var qty = r() < 0.25 ? 2 : 1, ex = lines.filter(function (l) { return l.name === it.name; })[0];
          if (ex) ex.qty += qty; else lines.push({ name: it.name, price: it.price, qty: qty });
        }
        var tp = r(), type = tp < 0.5 ? 'dine' : tp < 0.75 ? 'takeaway' : 'delivery', status;
        if (d === 0) {
          var age = (now - t) / 6e4;
          status = r() < 0.05 ? 'cancelled' : age < 25 ? 'new' : age < 50 ? 'preparing' : age < 80 ? 'ready' : 'completed';
        } else status = r() < 0.06 ? 'cancelled' : 'completed';
        orders.push({ t: Math.round(t), customer: names[Math.floor(r() * names.length)], type: type, status: status, items: lines });
      }
    }
    orders.sort(function (a, b) { return a.t - b.t; });
    orders.forEach(function (o, i) { o.id = 1001 + i; });

    var reservations = [
      ['Layla Hassan', '+20 100 555 0142', 0, '19:30', 4, 'Window table please.', 'confirmed'],
      ['Omar Khaled', '+20 102 555 0177', 0, '21:00', 2, 'Anniversary dinner.', 'pending'],
      ['Sara Mostafa', '+20 111 555 0120', 1, '13:30', 6, 'Two high chairs.', 'confirmed'],
      ['Youssef Adel', '+20 100 555 0198', 1, '20:00', 3, '', 'pending'],
      ['Nour El-Din', '+20 122 555 0166', 2, '19:00', 5, 'One guest is vegetarian.', 'confirmed'],
      ['Mariam Samir', '+20 109 555 0134', 3, '18:30', 2, '', 'pending'],
      ['Karim Fathy', '+20 101 555 0183', 4, '21:30', 8, 'Birthday cake arriving at 21:00.', 'confirmed'],
      ['Hana Tarek', '+20 115 555 0155', 5, '14:00', 4, '', 'cancelled'],
      ['Ahmed Nabil', '+20 100 555 0109', 6, '20:30', 2, 'Quiet corner if possible.', 'pending']
    ].map(function (x, i) { return { id: 'r' + (i + 1), name: x[0], phone: x[1], date: dateStr(x[2]), time: x[3], guests: x[4], note: x[5], status: x[6] }; });

    return {
      menu: menu, orders: orders, reservations: reservations,
      settings: {
        accepting: true, password: 'impasto123',
        name: 'IMPASTO', phone: '+1 (555) 123-4567', email: 'hello@impasto.com',
        address: '12 Via Roma Street, Your City, Country',
        hours: [{ days: 'Mon – Thu', time: '12:00 PM – 11:00 PM' }, { days: 'Fri – Sat', time: '12:00 PM – 12:00 AM' }, { days: 'Sunday', time: '1:00 PM – 10:00 PM' }],
        instagram: 'https://www.instagram.com/', facebook: 'https://www.facebook.com/', tiktok: 'https://www.tiktok.com/'
      },
      nextRes: 10, nextMenu: MENU_SEED.length + 1
    };
  }

  var db;
  function load() {
    try { var raw = localStorage.getItem(KEY); if (raw) { var x = JSON.parse(raw); if (x && x.menu && x.orders && x.reservations && x.settings) return x; } } catch (e) {}
    return seedData();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }

  /* ================= Helpers ================= */
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n) { return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 }); }
  function ic(n) { return '<svg class="ico" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function total(o) { return o.items.reduce(function (s, l) { return s + l.price * l.qty; }, 0); }
  function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function tfmt(t) { return new Date(t).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); }
  function when(t) {
    var d = new Date(t), n = new Date(), y = new Date(); y.setDate(n.getDate() - 1);
    if (sameDay(d, n)) return 'Today, ' + tfmt(t);
    if (sameDay(d, y)) return 'Yesterday, ' + tfmt(t);
    return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }) + ', ' + tfmt(t);
  }
  function t12(hhmm) { var p = hhmm.split(':'), h = +p[0]; return ((h + 11) % 12 + 1) + ':' + p[1] + ' ' + (h >= 12 ? 'PM' : 'AM'); }
  function itemsSummary(o) { return o.items.map(function (l) { return l.qty + '× ' + l.name; }).join(', '); }
  function statusPill(s, map) { return '<span class="status status--' + s + '">' + (map || STATUS)[s] + '</span>'; }
  function pills(list, active, act) {
    return '<div class="pills" role="group">' + list.map(function (p) {
      return '<button type="button" class="pill-btn' + (p[0] === active ? ' is-active' : '') + '" data-act="' + act + '" data-v="' + p[0] + '" aria-pressed="' + (p[0] === active) + '">' + esc(p[1]) + (p[2] != null ? ' <span class="pill-btn__count">' + p[2] + '</span>' : '') + '</button>';
    }).join('') + '</div>';
  }
  var toastT;
  function toast(msg) {
    var old = $('.toast'); if (old) old.remove();
    var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = msg;
    document.body.appendChild(el); clearTimeout(toastT); toastT = setTimeout(function () { el.remove(); }, 2800);
  }

  /* ================= Modal ================= */
  var lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    var root = $('#modal-root');
    root.innerHTML = '<div class="modal" data-act="modal-bg"><div class="modal__dialog" role="dialog" aria-modal="true">' +
      '<button type="button" class="icon-btn modal__close" data-act="close-modal" aria-label="Close">' + ic('x') + '</button>' + html + '</div></div>';
    var f = $('input, select, textarea', root); if (f && !('ontouchstart' in window)) f.focus();
  }
  function closeModal() { $('#modal-root').innerHTML = ''; if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {} }
  function confirmBox(title, text, label, cb, cancelLabel) {
    confirmBox.cb = cb;
    openModal('<h3>' + esc(title) + '</h3><p class="modal__sub">' + esc(text) + '</p><div class="modal__actions"><button type="button" class="button button--ghost" data-act="close-modal">' + esc(cancelLabel || 'Keep it') + '</button><button type="button" class="button" data-act="confirm-yes">' + esc(label) + '</button></div>');
  }

  /* ================= State ================= */
  var S = { page: 'overview', ordersFilter: 'all', ordersQ: '', ordersLimit: 12, menuFilter: 'all', menuQ: '', resFilter: 'all', range: 7 };
  var TITLES = { overview: 'Overview', orders: 'Orders', menu: 'Menu', reservations: 'Reservations', settings: 'Settings' };

  /* ================= Analytics ================= */
  function liveOrders() { return db.orders.filter(function (o) { return o.status !== 'cancelled'; }); }
  function revenueByDay(days) {
    var out = [], now = new Date();
    for (var i = days - 1; i >= 0; i--) { var d = new Date(now); d.setDate(now.getDate() - i); out.push({ d: d, v: 0 }); }
    liveOrders().forEach(function (o) { var od = new Date(o.t); out.forEach(function (x) { if (sameDay(x.d, od)) x.v += total(o); }); });
    return out;
  }
  function chartSVG(days) {
    var data = revenueByDay(days), max = Math.max.apply(null, data.map(function (x) { return x.v; }).concat([1]));
    var steps = [50, 100, 200, 250, 500, 1000, 2000, 5000], step = 5000;
    for (var i = 0; i < steps.length; i++) { if (steps[i] * 4 >= max) { step = steps[i]; break; } }
    var top = step * 4, W = 680, H = 270, L = 52, R = 10, T = 14, B = 32, pw = W - L - R, ph = H - T - B, slot = pw / data.length, bw = Math.min(46, slot * 0.62);
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Revenue for the last ' + days + ' days">';
    for (var g = 0; g <= 4; g++) {
      var y = T + ph - (ph * g / 4);
      s += '<line class="grid-line" x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '"/><text x="' + (L - 10) + '" y="' + (y + 4) + '" text-anchor="end">$' + (step * g).toLocaleString('en-US') + '</text>';
    }
    data.forEach(function (x, i) {
      var h = Math.max(x.v ? 4 : 0, ph * x.v / top), bx = L + slot * i + (slot - bw) / 2, isToday = i === data.length - 1;
      s += '<rect class="bar' + (isToday ? ' bar--today' : '') + '" x="' + bx + '" y="' + (T + ph - h) + '" width="' + bw + '" height="' + h + '" rx="' + Math.min(8, bw / 2) + '"><title>' + x.d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }) + ': ' + money(x.v) + '</title></rect>';
      if (days <= 7 || i % 5 === data.length % 5 || isToday) {
        s += '<text x="' + (bx + bw / 2) + '" y="' + (H - 10) + '" text-anchor="middle"' + (isToday ? ' style="font-weight:700;opacity:1"' : '') + '>' + (days <= 7 ? x.d.toLocaleDateString('en-US', { weekday: 'short' }) : x.d.getDate()) + '</text>';
      }
    });
    return s + '</svg>';
  }

  /* ================= Pages ================= */
  function pageOverview() {
    var now = new Date(), y = new Date(); y.setDate(now.getDate() - 1);
    var live = liveOrders();
    var tdy = live.filter(function (o) { return sameDay(new Date(o.t), now); });
    var yst = live.filter(function (o) { return sameDay(new Date(o.t), y); });
    var rt = tdy.reduce(function (s, o) { return s + total(o); }, 0), ry = yst.reduce(function (s, o) { return s + total(o); }, 0);
    var avg = live.length ? live.reduce(function (s, o) { return s + total(o); }, 0) / live.length : 0;
    function delta(a, b) { if (!b) return '<div class="stat__sub">No data yesterday</div>'; var p = Math.round((a - b) / b * 100); return '<div class="stat__sub ' + (p >= 0 ? 'up' : 'down') + '">' + (p >= 0 ? '+' : '') + p + '% vs yesterday</div>'; }
    var newCount = db.orders.filter(function (o) { return o.status === 'new'; }).length;
    var pend = db.reservations.filter(function (r) { return r.status === 'pending'; }).length;
    var todayRes = db.reservations.filter(function (r) { return r.date === dateStr(0) && r.status !== 'cancelled'; }).length;
    var h = now.getHours(), greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    var msg = (newCount || pend) ? 'You have <strong>' + newCount + ' new order' + (newCount === 1 ? '' : 's') + '</strong> waiting and <strong>' + pend + ' reservation' + (pend === 1 ? '' : 's') + '</strong> to confirm.' : 'You’re all caught up. Nothing is waiting for you right now.';

    var sold = {};
    live.forEach(function (o) { if (now - o.t <= 30 * 864e5) o.items.forEach(function (l) { sold[l.name] = (sold[l.name] || 0) + l.qty; }); });
    var top = Object.keys(sold).map(function (k) { return [k, sold[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5), topMax = top.length ? top[0][1] : 1;

    var recent = db.orders.slice().sort(function (a, b) { return b.t - a.t; }).slice(0, 6);
    var upcoming = db.reservations.filter(function (r) { return r.status !== 'cancelled' && (r.date + r.time) >= (dateStr(0) + '00:00'); }).sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); }).slice(0, 5);

    return '<section class="banner"><div><h2>' + greet + ', Chef.</h2><p>' + msg + '</p></div>' +
      '<div class="banner__actions"><a class="button button--light" href="#orders">View orders</a><a class="button button--ghost" href="#reservations">Reservations</a></div></section>' +
      '<div class="stats">' +
      '<div class="card stat"><span class="stat__icon">' + ic('dollar') + '</span><div><div class="stat__label">Revenue today</div><div class="stat__value">' + money(rt) + '</div>' + delta(rt, ry) + '</div></div>' +
      '<div class="card stat"><span class="stat__icon">' + ic('bag') + '</span><div><div class="stat__label">Orders today</div><div class="stat__value">' + tdy.length + '</div>' + delta(tdy.length, yst.length) + '</div></div>' +
      '<div class="card stat"><span class="stat__icon">' + ic('chart') + '</span><div><div class="stat__label">Average order</div><div class="stat__value">' + money(Math.round(avg * 100) / 100) + '</div><div class="stat__sub">Last 30 days</div></div></div>' +
      '<div class="card stat"><span class="stat__icon">' + ic('users') + '</span><div><div class="stat__label">Bookings today</div><div class="stat__value">' + todayRes + '</div><div class="stat__sub">' + pend + ' pending</div></div></div>' +
      '</div>' +
      '<div class="grid-2 grid-2--a">' +
      '<section class="card"><div class="card__head"><div><h3 class="card__title">Revenue</h3><p class="card__sub">Completed and active orders</p></div>' +
      pills([['7', '7 days'], ['30', '30 days']], String(S.range), 'range') + '</div><div class="card__body">' + chartSVG(S.range) + '</div></section>' +
      '<section class="card"><div class="card__head"><div><h3 class="card__title">Top sellers</h3><p class="card__sub">Last 30 days</p></div></div><div class="card__body"><div class="rank">' +
      (top.length ? top.map(function (t) { return '<div class="rank__row"><span class="rank__name">' + esc(t[0]) + '</span><span class="rank__qty">' + t[1] + ' sold</span><div class="rank__bar"><i style="width:' + Math.round(t[1] / topMax * 100) + '%"></i></div></div>'; }).join('') : '<p class="card__sub">No sales yet.</p>') +
      '</div></div></section></div>' +
      '<div class="grid-2 grid-2--b">' +
      '<section class="card"><div class="card__head"><div><h3 class="card__title">Latest orders</h3><p class="card__sub">Tap an order to manage it</p></div><a class="button button--ghost button--sm" href="#orders">See all</a></div><div class="card__body"><div class="mini">' +
      recent.map(function (o) { return '<div class="mini__row"><div class="mini__main"><strong>#' + o.id + ' · ' + esc(o.customer) + '</strong><span>' + esc(itemsSummary(o)) + '</span></div><span class="price">' + money(total(o)) + '</span>' + statusPill(o.status) + '<button type="button" class="icon-btn" data-act="view-order" data-id="' + o.id + '" aria-label="View order ' + o.id + '">' + ic('search') + '</button></div>'; }).join('') +
      '</div></div></section>' +
      '<section class="card"><div class="card__head"><div><h3 class="card__title">Upcoming tables</h3><p class="card__sub">Next reservations</p></div><a class="button button--ghost button--sm" href="#reservations">Manage</a></div><div class="card__body"><div class="mini">' +
      (upcoming.length ? upcoming.map(function (r) { return '<div class="mini__row"><div class="mini__main"><strong>' + esc(r.name) + '</strong><span>' + rdate(r.date) + ' · ' + t12(r.time) + ' · ' + r.guests + ' guests</span></div>' + statusPill(r.status, RES_STATUS) + '</div>'; }).join('') : '<p class="card__sub">No upcoming reservations.</p>') +
      '</div></div></section></div>';
  }
  function rdate(ds) {
    if (ds === dateStr(0)) return 'Today'; if (ds === dateStr(1)) return 'Tomorrow';
    var p = ds.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  /* Orders */
  function filteredOrders() {
    var q = S.ordersQ.trim().toLowerCase();
    return db.orders.filter(function (o) {
      if (S.ordersFilter !== 'all' && o.status !== S.ordersFilter) return false;
      if (!q) return true;
      return ('#' + o.id + ' ' + o.customer + ' ' + itemsSummary(o)).toLowerCase().indexOf(q) > -1;
    }).sort(function (a, b) { return b.t - a.t; });
  }
  function ordersTable() {
    var list = filteredOrders(), shown = list.slice(0, S.ordersLimit);
    if (!list.length) return '<div class="empty"><strong>No orders found</strong>Try another filter or search term.</div>';
    return '<table class="tbl"><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Type</th><th>Total</th><th>Placed</th><th>Status</th><th></th></tr></thead><tbody>' +
      shown.map(function (o) {
        var nx = NEXT[o.status];
        return '<tr><td data-label="Order"><strong>#' + o.id + '</strong></td><td data-label="Customer">' + esc(o.customer) + '</td><td data-label="Items" class="td-items">' + esc(itemsSummary(o)) + '</td><td data-label="Type">' + TYPE[o.type] + '</td><td data-label="Total"><span class="price">' + money(total(o)) + '</span></td><td data-label="Placed">' + when(o.t) + '</td><td data-label="Status">' + statusPill(o.status) + '</td>' +
          '<td class="td-actions">' + (nx ? '<button type="button" class="button button--sm" data-act="advance" data-id="' + o.id + '">' + nx[1] + '</button>' : '') + '<button type="button" class="icon-btn" data-act="view-order" data-id="' + o.id + '" aria-label="View order ' + o.id + '">' + ic('search') + '</button></td></tr>';
      }).join('') + '</tbody></table>' +
      (list.length > shown.length ? '<div class="more"><button type="button" class="button button--ghost button--sm" data-act="more-orders">Show more (' + (list.length - shown.length) + ')</button></div>' : '');
  }
  function pageOrders() {
    var c = { all: db.orders.length }; Object.keys(STATUS).forEach(function (k) { c[k] = db.orders.filter(function (o) { return o.status === k; }).length; });
    var f = [['all', 'All', c.all]].concat(Object.keys(STATUS).map(function (k) { return [k, STATUS[k], c[k]]; }));
    return '<div class="toolbar"><label class="search">' + ic('search') + '<input class="input" id="orders-q" type="search" placeholder="Search order, customer or dish" value="' + esc(S.ordersQ) + '" aria-label="Search orders" /></label>' + pills(f, S.ordersFilter, 'orders-filter') + '</div>' +
      '<section class="card table-card" id="orders-list">' + ordersTable() + '</section>';
  }
  function openOrder(id) {
    var o = db.orders.filter(function (x) { return x.id === +id; })[0]; if (!o) return;
    openModal('<h3>Order #' + o.id + '</h3><p class="modal__sub">' + esc(o.customer) + ' · ' + TYPE[o.type] + ' · ' + when(o.t) + '</p>' +
      '<div class="lines">' + o.items.map(function (l) { return '<div class="lines__row"><span class="lines__name">' + l.qty + '× ' + esc(l.name) + '</span><span class="lines__dots"></span><span class="price">' + money(l.price * l.qty) + '</span></div>'; }).join('') +
      '<div class="lines__row lines__total"><span>Total</span><span class="lines__dots"></span><span class="price">' + money(total(o)) + '</span></div></div>' +
      '<div class="field"><span>Status</span>' + pills(Object.keys(STATUS).map(function (k) { return [k, STATUS[k]]; }), o.status, 'set-status').replace(/data-act="set-status"/g, 'data-act="set-status" data-id="' + o.id + '"') + '</div>');
  }

  /* Menu */
  function filteredMenu() {
    var q = S.menuQ.trim().toLowerCase();
    return db.menu.filter(function (m) {
      if (S.menuFilter !== 'all' && m.cat !== S.menuFilter) return false;
      return !q || (m.name + ' ' + m.desc).toLowerCase().indexOf(q) > -1;
    });
  }
  function menuGrid() {
    var list = filteredMenu();
    if (!list.length) return '<div class="card empty"><strong>No dishes found</strong>Try another category or add a new dish.</div>';
    return '<div class="menu-grid">' + list.map(function (m) {
      return '<article class="card item' + (m.available ? '' : ' is-off') + '"><div class="item__media">' +
        (m.img ? '<img class="item__img" loading="lazy" alt="' + esc(m.name) + '" src="' + esc(m.img) + '" onerror="this.style.display=\'none\'" />' : '') +
        '<span class="item__ph" aria-hidden="true">' + esc(m.name.charAt(0)) + '</span>' +
        (m.img ? '' : '') + '<span class="item__tag">' + CATNAME[m.cat] + '</span>' + (m.badge ? '<span class="item__badge">' + esc(m.badge) + '</span>' : '') + '<span class="item__soldout">Sold out</span></div>' +
        '<div class="item__body"><div class="item__top"><h3 class="item__name">' + esc(m.name) + '</h3><span class="price">' + money(m.price) + '</span></div><p class="item__text">' + esc(m.desc) + '</p>' +
        '<div class="item__foot"><label class="switch"><input type="checkbox" data-act="toggle-item" data-id="' + m.id + '"' + (m.available ? ' checked' : '') + ' /><span class="switch__track"></span><span>Available</span></label>' +
        '<div class="item__btns"><button type="button" class="icon-btn" data-act="edit-item" data-id="' + m.id + '" aria-label="Edit ' + esc(m.name) + '">' + ic('edit') + '</button><button type="button" class="icon-btn icon-btn--danger" data-act="delete-item" data-id="' + m.id + '" aria-label="Delete ' + esc(m.name) + '">' + ic('trash') + '</button></div></div></div></article>';
    }).join('') + '</div>';
  }
  function pageMenu() {
    var f = [['all', 'All', db.menu.length]].concat(CATS.map(function (c) { return [c[0], c[1], db.menu.filter(function (m) { return m.cat === c[0]; }).length]; }));
    return '<div class="toolbar"><label class="search">' + ic('search') + '<input class="input" id="menu-q" type="search" placeholder="Search dishes" value="' + esc(S.menuQ) + '" aria-label="Search dishes" /></label>' + pills(f, S.menuFilter, 'menu-filter') +
      '<span class="spacer"></span><button type="button" class="button" data-act="add-item">' + ic('plus') + 'Add dish</button></div><div id="menu-list">' + menuGrid() + '</div>';
  }
  function itemForm(m) {
    m = m || { name: '', cat: 'pizza', price: '', desc: '', img: '', badge: '' };
    return '<h3>' + (m.id ? 'Edit dish' : 'Add a dish') + '</h3><p class="modal__sub">' + (m.id ? 'Changes are saved to your menu instantly.' : 'New dishes appear in your menu list right away.') + '</p>' +
      '<form data-form="item"><input type="hidden" name="id" value="' + esc(m.id || '') + '" /><div class="form-grid">' +
      '<label class="field full"><span>Name</span><input class="input" name="name" required maxlength="60" value="' + esc(m.name) + '" /></label>' +
      '<label class="field"><span>Category</span><select class="select" name="cat">' + CATS.map(function (c) { return '<option value="' + c[0] + '"' + (m.cat === c[0] ? ' selected' : '') + '>' + c[1] + '</option>'; }).join('') + '</select></label>' +
      '<label class="field"><span>Price ($)</span><input class="input" name="price" type="number" min="0" step="0.5" required value="' + esc(m.price) + '" /></label>' +
      '<label class="field full"><span>Badge</span><select class="select" name="badge">' + BADGES.map(function (b) { return '<option value="' + b + '"' + (m.badge === b ? ' selected' : '') + '>' + (b || 'None') + '</option>'; }).join('') + '</select></label>' +
      '<label class="field full"><span>Image URL</span><input class="input" name="img" type="url" placeholder="https://…" value="' + esc(m.img) + '" /></label>' +
      '<label class="field full"><span>Description</span><textarea class="textarea" name="desc" maxlength="160">' + esc(m.desc) + '</textarea></label></div>' +
      '<div class="modal__actions"><button type="button" class="button button--ghost" data-act="close-modal">Cancel</button><button type="submit" class="button">' + (m.id ? 'Save changes' : 'Add dish') + '</button></div></form>';
  }

  /* Reservations */
  function resList() {
    var list = db.reservations.filter(function (r) { return S.resFilter === 'all' || r.status === S.resFilter; })
      .sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
    if (!list.length) return '<div class="card empty"><strong>No reservations</strong>Nothing matches this filter.</div>';
    return '<div class="res-grid">' + list.map(function (r) {
      var p = r.date.split('-'), dt = new Date(+p[0], +p[1] - 1, +p[2]);
      return '<article class="card res' + (r.status === 'cancelled' ? ' is-cancelled' : '') + '"><div class="res__top"><div class="res__date"><b>' + dt.getDate() + '</b><small>' + dt.toLocaleDateString('en-US', { month: 'short' }) + '</small></div>' +
        '<div class="res__who"><strong>' + esc(r.name) + '</strong><span>' + rdate(r.date) + '</span></div>' + statusPill(r.status, RES_STATUS) + '</div>' +
        '<div class="res__meta"><span class="chip">' + ic('clock') + t12(r.time) + '</span><span class="chip">' + ic('users') + r.guests + ' guests</span><span class="chip">' + ic('phone') + esc(r.phone) + '</span></div>' +
        (r.note ? '<p class="res__note">' + esc(r.note) + '</p>' : '') +
        '<div class="res__actions">' + (r.status !== 'confirmed' && r.status !== 'cancelled' ? '<button type="button" class="button button--sm" data-act="res-status" data-id="' + r.id + '" data-v="confirmed">Confirm</button>' : '') +
        (r.status !== 'cancelled' ? '<button type="button" class="button button--ghost button--sm" data-act="res-status" data-id="' + r.id + '" data-v="cancelled">Cancel</button>' : '<button type="button" class="button button--ghost button--sm" data-act="res-status" data-id="' + r.id + '" data-v="pending">Restore</button>') +
        '<span class="spacer"></span><button type="button" class="icon-btn icon-btn--danger" data-act="delete-res" data-id="' + r.id + '" aria-label="Delete reservation">' + ic('trash') + '</button></div></article>';
    }).join('') + '</div>';
  }
  function pageReservations() {
    var f = [['all', 'All', db.reservations.length]].concat(Object.keys(RES_STATUS).map(function (k) { return [k, RES_STATUS[k], db.reservations.filter(function (r) { return r.status === k; }).length]; }));
    return '<div class="toolbar">' + pills(f, S.resFilter, 'res-filter') + '<span class="spacer"></span><button type="button" class="button" data-act="add-res">' + ic('plus') + 'New reservation</button></div><div id="res-list">' + resList() + '</div>';
  }
  function resForm() {
    return '<h3>New reservation</h3><p class="modal__sub">Add a booking taken by phone or in person.</p><form data-form="res"><div class="form-grid">' +
      '<label class="field full"><span>Guest name</span><input class="input" name="name" required maxlength="60" /></label>' +
      '<label class="field"><span>Phone</span><input class="input" name="phone" type="tel" required /></label>' +
      '<label class="field"><span>Guests</span><input class="input" name="guests" type="number" min="1" max="30" value="2" required /></label>' +
      '<label class="field"><span>Date</span><input class="input" name="date" type="date" min="' + dateStr(0) + '" value="' + dateStr(0) + '" required /></label>' +
      '<label class="field"><span>Time</span><input class="input" name="time" type="time" value="19:30" required /></label>' +
      '<label class="field full"><span>Notes</span><textarea class="textarea" name="note" maxlength="160"></textarea></label></div>' +
      '<div class="modal__actions"><button type="button" class="button button--ghost" data-act="close-modal">Cancel</button><button type="submit" class="button">Save reservation</button></div></form>';
  }

  /* Settings */
  function pageSettings() {
    var s = db.settings;
    return '<div class="settings">' +
      '<form class="card" data-form="settings"><div class="card__head"><div><h3 class="card__title">Restaurant details</h3><p class="card__sub">Keep these in sync with the footer of your website.</p></div></div><div class="card__body">' +
      '<div class="form-grid"><label class="field"><span>Name</span><input class="input" name="name" value="' + esc(s.name) + '" required /></label>' +
      '<label class="field"><span>Phone</span><input class="input" name="phone" value="' + esc(s.phone) + '" /></label>' +
      '<label class="field"><span>Email</span><input class="input" name="email" type="email" value="' + esc(s.email) + '" /></label>' +
      '<label class="field"><span>Address</span><input class="input" name="address" value="' + esc(s.address) + '" /></label></div>' +
      '<div class="field"><span>Opening hours</span></div>' +
      s.hours.map(function (h, i) { return '<div class="hours-row"><input class="input" name="days' + i + '" value="' + esc(h.days) + '" aria-label="Days" /><input class="input" name="time' + i + '" value="' + esc(h.time) + '" aria-label="Hours" /></div>'; }).join('') +
      '<div class="form-grid"><label class="field"><span>Instagram</span><input class="input" name="instagram" type="url" value="' + esc(s.instagram) + '" /></label>' +
      '<label class="field"><span>Facebook</span><input class="input" name="facebook" type="url" value="' + esc(s.facebook) + '" /></label>' +
      '<label class="field full"><span>TikTok</span><input class="input" name="tiktok" type="url" value="' + esc(s.tiktok) + '" /></label></div>' +
      '<div class="save-row"><button class="button" type="submit">Save changes</button></div></div></form>' +
      '<form class="card" data-form="password"><div class="card__head"><div><h3 class="card__title">Password</h3><p class="card__sub">Used to sign in to this dashboard.</p></div></div><div class="card__body"><div class="form-grid">' +
      '<label class="field"><span>New password</span><input class="input" name="p1" type="password" minlength="6" autocomplete="new-password" required /></label>' +
      '<label class="field"><span>Confirm password</span><input class="input" name="p2" type="password" minlength="6" autocomplete="new-password" required /></label></div>' +
      '<div class="save-row"><button class="button" type="submit">Update password</button></div></div></form>' +
      '</div>';
  }

  var PAGES = { overview: pageOverview, orders: pageOrders, menu: pageMenu, reservations: pageReservations, settings: pageSettings };

  /* ================= Render ================= */
  var lastPage = null;
  function badges() {
    var n = db.orders.filter(function (o) { return o.status === 'new'; }).length, r = db.reservations.filter(function (x) { return x.status === 'pending'; }).length;
    $$('[data-badge="orders"]').forEach(function (el) { el.textContent = n; el.hidden = !n; });
    $$('[data-badge="reservations"]').forEach(function (el) { el.textContent = r; el.hidden = !r; });
  }
  function render() {
    var page = (location.hash || '#overview').slice(1);
    if (!PAGES[page]) page = 'overview';
    S.page = page;
    $('#view').innerHTML = PAGES[page]();
    $('#page-title').textContent = TITLES[page];
    $('#page-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $$('[data-page]').forEach(function (a) { var on = a.getAttribute('data-page') === page; a.classList.toggle('is-active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    $('#accepting').checked = !!db.settings.accepting;
    $('#accepting-label').textContent = db.settings.accepting ? 'Accepting orders' : 'Orders paused';
    badges();
    if (lastPage !== page) { window.scrollTo(0, 0); lastPage = page; }
  }
  function refreshList() {
    if (S.page === 'orders') $('#orders-list').innerHTML = ordersTable();
    else if (S.page === 'menu') $('#menu-list').innerHTML = menuGrid();
  }

  /* ================= Actions ================= */
  function byId(arr, id) { return arr.filter(function (x) { return String(x.id) === String(id); })[0]; }
  var ACT = {
    'range': function (el) { S.range = +el.dataset.v; render(); },
    'orders-filter': function (el) { S.ordersFilter = el.dataset.v; S.ordersLimit = 12; render(); },
    'more-orders': function () { S.ordersLimit += 12; refreshList(); },
    'menu-filter': function (el) { S.menuFilter = el.dataset.v; render(); },
    'res-filter': function (el) { S.resFilter = el.dataset.v; render(); },
    'view-order': function (el) { openOrder(el.dataset.id); },
    'advance': function (el) {
      var o = byId(db.orders, el.dataset.id); if (!o || !NEXT[o.status]) return;
      o.status = NEXT[o.status][0]; save(); render(); toast('Order #' + o.id + ' · ' + STATUS[o.status]);
    },
    'set-status': function (el) {
      var o = byId(db.orders, el.dataset.id); if (!o) return;
      o.status = el.dataset.v; save(); render(); openOrder(o.id); toast('Order #' + o.id + ' · ' + STATUS[o.status]);
    },
    'add-item': function () { openModal(itemForm()); },
    'edit-item': function (el) { openModal(itemForm(byId(db.menu, el.dataset.id))); },
    'delete-item': function (el) {
      var m = byId(db.menu, el.dataset.id); if (!m) return;
      confirmBox('Delete “' + m.name + '”?', 'This removes the dish from your menu list. You can’t undo this.', 'Delete dish', function () {
        db.menu = db.menu.filter(function (x) { return x.id !== m.id; }); save(); render(); toast('Dish deleted');
      });
    },
    'add-res': function () { openModal(resForm()); },
    'res-status': function (el) {
      var r = byId(db.reservations, el.dataset.id); if (!r) return;
      r.status = el.dataset.v; save(); render(); toast('Reservation ' + RES_STATUS[r.status].toLowerCase());
    },
    'delete-res': function (el) {
      var r = byId(db.reservations, el.dataset.id); if (!r) return;
      confirmBox('Delete this reservation?', r.name + ' · ' + rdate(r.date) + ' at ' + t12(r.time), 'Delete', function () {
        db.reservations = db.reservations.filter(function (x) { return x.id !== r.id; }); save(); render(); toast('Reservation deleted');
      });
    },
    'close-modal': function () { closeModal(); },
    'confirm-yes': function () { var cb = confirmBox.cb; closeModal(); if (cb) cb(); },
    'logout': function () {
      confirmBox('Sign out?', 'Are you sure you want to sign out of the admin dashboard?', 'Sign out', function () {
        try { sessionStorage.removeItem(SESS); } catch (e) {} showLogin();
      }, 'Cancel');
    }
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var act = el.dataset.act;
    if (act === 'modal-bg') { if (e.target === el) closeModal(); return; }
    if (el.tagName === 'INPUT') return; // handled on change
    if (ACT[act]) ACT[act](el);
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.act === 'toggle-item') {
      var m = byId(db.menu, el.dataset.id); if (!m) return;
      m.available = el.checked; save(); $('#menu-list').innerHTML = menuGrid(); toast(m.name + (m.available ? ' is available' : ' marked as sold out'));
    }
    if (el.id === 'accepting') {
      db.settings.accepting = el.checked; save(); $('#accepting-label').textContent = el.checked ? 'Accepting orders' : 'Orders paused'; toast(el.checked ? 'Now accepting orders' : 'Orders paused');
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'orders-q') { S.ordersQ = e.target.value; S.ordersLimit = 12; refreshList(); }
    if (e.target.id === 'menu-q') { S.menuQ = e.target.value; refreshList(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('.modal')) closeModal(); });

  document.addEventListener('submit', function (e) {
    var f = e.target, kind = f.dataset && f.dataset.form; if (!kind) return;
    e.preventDefault();
    var d = {}; new FormData(f).forEach(function (v, k) { d[k] = typeof v === 'string' ? v.trim() : v; });
    if (kind === 'item') {
      var price = parseFloat(d.price); if (!d.name || isNaN(price)) return;
      if (d.id) {
        var m = byId(db.menu, d.id); if (m) { m.name = d.name; m.cat = d.cat; m.price = price; m.badge = d.badge; m.img = d.img; m.desc = d.desc; }
        toast('Dish updated');
      } else {
        db.menu.unshift({ id: 'm' + (db.nextMenu++), name: d.name, cat: d.cat, price: price, badge: d.badge, img: d.img, desc: d.desc, available: true }); toast('Dish added');
      }
      save(); closeModal(); render();
    } else if (kind === 'res') {
      db.reservations.push({ id: 'r' + (db.nextRes++), name: d.name, phone: d.phone, guests: +d.guests || 2, date: d.date, time: d.time, note: d.note, status: 'confirmed' });
      save(); closeModal(); render(); toast('Reservation saved');
    } else if (kind === 'settings') {
      var s = db.settings; ['name', 'phone', 'email', 'address', 'instagram', 'facebook', 'tiktok'].forEach(function (k) { s[k] = d[k] || ''; });
      s.hours = s.hours.map(function (h, i) { return { days: d['days' + i] || h.days, time: d['time' + i] || h.time }; });
      save(); toast('Settings saved');
    } else if (kind === 'password') {
      if (d.p1 !== d.p2) { toast('Passwords don’t match'); return; }
      db.settings.password = d.p1; save(); f.reset(); toast('Password updated');
    }
  });

  /* ================= Auth & boot ================= */
  function showLogin() { $('#app').hidden = true; $('#login').hidden = false; $('#login-form').reset(); }
  function showApp() { $('#login').hidden = true; $('#app').hidden = false; render(); }
  $('#login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    if (f.elements.user.value.trim().toLowerCase() === 'admin' && f.elements.pass.value === db.settings.password) {
      try { sessionStorage.setItem(SESS, '1'); } catch (err) {}
      $('#login-error').textContent = ''; showApp();
    } else { $('#login-error').textContent = 'Wrong username or password.'; }
  });
  window.addEventListener('hashchange', function () { if (!$('#app').hidden) { closeModal(); render(); } });

  db = load();
  var authed = false; try { authed = sessionStorage.getItem(SESS) === '1'; } catch (e) {}
  if (authed) showApp(); else showLogin();
})();
