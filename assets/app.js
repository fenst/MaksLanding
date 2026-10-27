/* Страница собирается из config.js. Здесь ничего менять не нужно. */
(function () {
  var S = window.SITE;
  if (!S) {
    document.body.insertAdjacentHTML("afterbegin", '<p style="padding:24px;font:16px sans-serif;color:#c8432f">Ошибка в файле config.js: проверьте запятые и кавычки в последней правке.</p>');
    return;
  }
  var $ = function (id) { return document.getElementById(id); };
  var fmt = new Intl.NumberFormat("ru-RU");
  var money = function (n) { return fmt.format(n) + " " + S.currency; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var daysLeft = function (iso) { return Math.ceil((new Date(iso + "T23:59:59") - new Date()) / 864e5); };
  var plural = function (n, a, b, c) { var m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };
  var daysText = function (iso) { var d = daysLeft(iso); return d > 0 ? "осталось " + d + " " + plural(d, "день", "дня", "дней") : "срок прошёл"; };
  var ICON = {
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6L2.9 10.8c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.8-1.4-1.4zM9.4 13.6l8.3-5.2c.4-.2.7-.1.4.2l-6.9 6.2-.3 3.2-1.5-4.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    clinic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 8v6M9 11h6"/></svg>',
    fund: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>',
    doctor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 3v6a4 4 0 008 0V3M10 13v2a5 5 0 0010 0v-2"/><circle cx="20" cy="11" r="2"/></svg>',
    placeholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3"><rect x="4" y="4" width="16" height="16" rx="4"/></svg>',
    site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>'
  };

  /* ---------- аналитика ---------- */
  var A = S.analytics || {};
  var sent = {};
  var dbg;
  function track(name, params, once) {
    if (once) { if (sent[name]) return; sent[name] = 1; }
    try { if (A.yandexMetrikaId && window.ym) ym(A.yandexMetrikaId, "reachGoal", name, params || {}); } catch (e) {}
    try { if (window.goatcounter && goatcounter.count) goatcounter.count({ path: "event/" + name, title: name, event: true }); } catch (e) {}
    if (A.debug) {
      if (!dbg) { dbg = document.createElement("div"); dbg.className = "debug"; dbg.setAttribute("aria-hidden", "true"); document.body.appendChild(dbg); dbg.log = []; }
      dbg.log.unshift(name); dbg.log = dbg.log.slice(0, 5);
      dbg.innerHTML = "<b>событие аналитики</b>" + dbg.log.map(esc).join("<br>");
    }
  }
  if (A.yandexMetrikaId) {
    (function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); }; m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a); })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(A.yandexMetrikaId, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }
  if (A.goatcounter) {
    var g = document.createElement("script"); g.async = true; g.src = "https://gc.zgo.at/count.js"; g.setAttribute("data-goatcounter", A.goatcounter); document.head.appendChild(g);
  }

  /* ---------- шапка ---------- */
  $("heroImg").src = S.heroPhoto; $("heroImg").alt = S.heroAlt;
  $("title").innerHTML = esc(S.name) + ", " + S.age + " " + plural(S.age, "год", "года", "лет") + "<small>" + esc(S.diagnosis) + "</small>";
  $("headline").textContent = S.headline;

  /* ---------- прогресс ---------- */
  function bar(raised, target, big) {
    var pct = target ? Math.min(100, raised / target * 100) : 0;
    var label = raised > 0 ? money(raised) : "0 " + S.currency;
    var inside = pct >= 34;
    return '<div class="bar' + (big ? " big" : "") + '" role="progressbar" aria-valuemin="0" aria-valuemax="' + target + '" aria-valuenow="' + raised + '" aria-label="Собрано ' + label + ' из ' + money(target) + '">' +
      '<div class="bar-fill" style="width:0" data-w="' + pct.toFixed(1) + '%"></div>' +
      '<span class="bar-label ' + (inside ? "in" : "out") + '" style="' + (inside ? "right:calc(" + (100 - pct).toFixed(1) + "% + 12px)" : "left:calc(" + pct.toFixed(1) + "% + 10px)") + '">' + label + "</span></div>";
  }
  var totalTarget = 0, totalRaised = 0;
  S.goals.forEach(function (g) { totalTarget += g.target; totalRaised += Math.min(g.raised, g.target); });
  var totalPct = Math.round(totalRaised / totalTarget * 100);
  $("total").innerHTML =
    '<div class="total-top"><span class="eyebrow">Собрано</span><span class="total-of">цель <b class="num">' + money(totalTarget) + "</b></span></div>" +
    '<div class="total-raised num">' + money(totalRaised) + "</div>" +
    bar(totalRaised, totalTarget, true) +
    '<div class="meta"><span><b>' + totalPct + "%</b> от суммы</span><span>Нужно ещё <b class=\"num\">" + money(totalTarget - totalRaised) + "</b></span><span>Операция: <b>" + esc(S.deadlineText) + "</b>, " + daysText(S.deadline) + "</span></div>" +
    '<div class="actions"><a class="btn btn-primary" href="#help" data-ev="cta_hero">Помочь Максиму</a><button class="btn btn-ghost" id="share" type="button" aria-label="Поделиться">' + ICON.share + "</button></div>";

  var prioName = { 1: "Срочно", 2: "Следующий шаг", 3: "После операции" };
  $("goals").innerHTML = S.goals.slice().sort(function (a, b) { return a.priority - b.priority; }).map(function (g) {
    var done = g.raised >= g.target;
    return '<article class="goal' + (done ? " done" : "") + '">' +
      '<div class="goal-head"><h3>' + esc(g.title) + '</h3><span class="prio p' + g.priority + '">' + (done ? "Собрано" : prioName[g.priority] || "Цель " + g.priority) + "</span></div>" +
      (g.note ? "<p>" + esc(g.note) + "</p>" : "") +
      bar(Math.min(g.raised, g.target), g.target) +
      '<div class="goal-foot"><span>из <b class="num">' + money(g.target) + "</b></span><span>" + esc(g.deadlineText) + " · " + daysText(g.deadline) + "</span></div></article>";
  }).join("");
  $("updated").textContent = "Суммы обновлены " + new Date(S.updated).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

  /* ---------- текст ---------- */
  var stories = S.stories || (S.story ? [S.story] : []), pn = 0;
  $("story").innerHTML = stories.map(function (st) {
    return '<div class="story-block"><h2>' + esc(st.title) + "</h2>" + st.paragraphs.map(function (p) { pn++; return '<p data-read="' + pn + '">' + esc(p) + "</p>"; }).join("") + "</div>";
  }).join("");

  function btnRow(list, ev) {
    if (!list.length) return "";
    return '<div class="btn-row">' + list.map(function (b, i) {
      return '<a class="btn btn-ghost" href="' + esc(b.url) + '" data-ev="' + ev + "_link_" + (i + 1) + '">' + esc(b.title) + "</a>";
    }).join("") + "</div>";
  }

  /* ---------- клиника ---------- */
  if (S.clinic) {
    var k = S.clinic;
    $("clinic").innerHTML = "<h2>" + esc(k.title) + '</h2><div class="clinic"><div class="clinic-head"><span class="link-ico">' + ICON.clinic + "</span><span><b>" + esc(k.name) + "</b><span>" + esc(k.place) + "</span></span></div>" +
      k.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      btnRow(k.buttons || (k.url ? [{ title: k.button || "Сайт клиники", url: k.url }] : []), "clinic") + "</div>";
  } else $("clinic-sec").hidden = true;

  /* ---------- доктор ---------- */
  if (S.doctor) {
    var dr = S.doctor;
    $("doctor").innerHTML = "<h2>" + esc(dr.title) + '</h2><div class="doctor">' +
      (dr.photo ? '<img class="doctor-photo" src="' + esc(dr.photo) + '" alt="' + esc(dr.name) + '" loading="lazy">' : "") +
      '<div class="doctor-body"><b class="doctor-name">' + esc(dr.name) + "</b>" + (dr.role ? '<span class="doctor-role">' + esc(dr.role) + "</span>" : "") +
      "<p>" + esc(dr.description) + "</p></div>" + btnRow(dr.links || [], "doctor") + "</div>";
  } else $("doctor-sec").hidden = true;

  /* ---------- карусели ---------- */
  function carousel(root, items, kind, rows) {
    rows = rows || 1;
    var cols = Math.ceil(items.length / rows);
    root.innerHTML = '<div class="track' + (rows > 1 ? " rows" + rows : "") + '" tabindex="0" aria-label="' + (kind === "photo" ? "Фотографии" : "Документы") + '">' +
      items.map(function (it, i) {
        return '<button class="slide" type="button" data-i="' + i + '" aria-label="Открыть ' + esc(it.alt || it.title) + '"><img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '" loading="lazy">' +
          (it.title ? '<span class="slide-cap">' + esc(it.title) + "</span>" : "") + "</button>";
      }).join("") + "</div>" +
      '<div class="wrap car-bar"><span class="counter"></span><span class="dots">' + new Array(cols + 1).join("<i></i>") + '</span><span class="arrows"><button class="arrow prev" type="button" aria-label="Назад">' + ICON.arrowL + '</button><button class="arrow next" type="button" aria-label="Вперёд">' + ICON.arrowR + "</button></span></div>";
    var track = root.querySelector(".track"), slides = track.children, dots = root.querySelectorAll(".dots i"), counter = root.querySelector(".counter");
    var prev = root.querySelector(".prev"), next = root.querySelector(".next"), maxSeen = 0;
    function current() {
      var x = track.scrollLeft, best = 0, bd = 1e9;
      for (var i = 0; i < slides.length; i++) { var d = Math.abs(slides[i].offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft) - x); if (d < bd) { bd = d; best = i; } }
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = slides.length - 1;
      return best;
    }
    function update() {
      var c = current();
      var col = Math.floor(c / rows);
      counter.textContent = rows > 1 ? items.length + " фото" : (c + 1) + " / " + items.length;
      dots.forEach(function (d, i) { d.classList.toggle("on", i === col); });
      prev.disabled = track.scrollLeft < 4; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (c > maxSeen) { maxSeen = c; track.dataset.seen = c; track_(kind + "_swipe", { seen: c + 1 }); if (c === items.length - 1) track_(kind + "_seen_all", null, true); }
    }
    var t; track.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(update, 80); }, { passive: true });
    function go(dir) { var c = current() - current() % rows + dir * rows; c = Math.max(0, Math.min(items.length - 1, c)); track.scrollTo({ left: slides[c].offsetLeft - slides[0].offsetLeft, behavior: "smooth" }); track_(kind + "_arrow"); }
    prev.onclick = function () { go(-1); }; next.onclick = function () { go(1); };
    track.addEventListener("click", function (e) { var s = e.target.closest(".slide"); if (s) openLightbox(items, +s.dataset.i, kind); });
    update();
  }
  var track_ = function (n, p, once) { track(n, p, once); };
  carousel($("photos"), S.photos, "photo", S.photoRows || 2);
  carousel($("docs"), S.documents, "doc");

  /* ---------- просмотр на весь экран ---------- */
  var lb = null;
  function openLightbox(items, start, kind) {
    track(kind + "_open", { index: start + 1 });
    lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = '<div class="lb-top"><span class="counter"></span><button class="lb-close" type="button" aria-label="Закрыть">×</button></div>' +
      '<div class="lb-track">' + items.map(function (it) { return '<div class="lb-slide"><img src="' + esc(it.src) + '" alt="' + esc(it.alt || it.title) + '"></div>'; }).join("") + "</div>" +
      '<div class="lb-bottom"><button class="arrow prev" type="button" aria-label="Назад">' + ICON.arrowL + '</button><span class="lb-cap"></span><button class="arrow next" type="button" aria-label="Вперёд">' + ICON.arrowR + "</button></div>";
    document.body.appendChild(lb); document.body.style.overflow = "hidden";
    var tr = lb.querySelector(".lb-track"), cnt = lb.querySelector(".counter"), cap = lb.querySelector(".lb-cap");
    function idx() { return Math.round(tr.scrollLeft / tr.clientWidth); }
    function upd() {
      var i = idx(), it = items[i];
      cnt.textContent = (i + 1) + " / " + items.length;
      cap.innerHTML = it.pdf ? '<a href="' + esc(it.pdf) + '" target="_blank" rel="noopener" data-ev="doc_pdf">Открыть PDF</a>' : esc(it.title || it.alt || "");
    }
    requestAnimationFrame(function () { tr.scrollLeft = start * tr.clientWidth; upd(); });
    var t; tr.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(function () { upd(); track(kind + "_lightbox_swipe"); }, 100); }, { passive: true });
    lb.querySelector(".prev").onclick = function () { tr.scrollTo({ left: (idx() - 1) * tr.clientWidth, behavior: "smooth" }); };
    lb.querySelector(".next").onclick = function () { tr.scrollTo({ left: (idx() + 1) * tr.clientWidth, behavior: "smooth" }); };
    lb.querySelector(".lb-close").onclick = closeLightbox;
    lb.querySelector(".lb-close").focus();
  }
  function closeLightbox() { if (!lb) return; lb.remove(); lb = null; document.body.style.overflow = ""; }
  document.addEventListener("keydown", function (e) {
    if (!lb) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lb.querySelector(".next").click();
    if (e.key === "ArrowLeft") lb.querySelector(".prev").click();
  });

  /* ---------- видео ---------- */
  if (!S.videos || !S.videos.length) $("video-sec").hidden = true;
  else $("videos").innerHTML = S.videos.map(function (v, i) {
    var player = v.type === "file"
      ? '<video controls playsinline preload="metadata" data-v="' + (i + 1) + '"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : "") + '><source src="' + esc(v.src) + '" type="video/mp4"></video>'
      : '<iframe src="' + esc(v.src) + '" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="' + esc(v.title) + '"></iframe>';
    return '<div><div class="video">' + player + "</div>" + (v.title ? '<div class="video-title">' + esc(v.title) + "</div>" : "") + "</div>";
  }).join("");
  document.querySelectorAll("video[data-v]").forEach(function (el) {
    var n = el.dataset.v, marks = { 25: 0, 50: 0, 100: 0 };
    el.addEventListener("play", function () { track("video" + n + "_play", null, true); });
    el.addEventListener("timeupdate", function () {
      var p = el.currentTime / el.duration * 100;
      [25, 50].forEach(function (m) { if (p >= m && !marks[m]) { marks[m] = 1; track("video" + n + "_" + m); } });
    });
    el.addEventListener("ended", function () { if (!marks[100]) { marks[100] = 1; track("video" + n + "_complete"); } });
  });
  // во встроенных плеерах VK/Rutube считаем клик по видео
  window.addEventListener("blur", function () { setTimeout(function () { var a = document.activeElement; if (a && a.tagName === "IFRAME") track("video_embed_click", null, true); }, 0); });

  /* ---------- реквизиты ---------- */
  function renderPay(i) {
    var p = S.payments[i];
    document.querySelectorAll(".tab").forEach(function (t, j) {
      t.setAttribute("aria-selected", j === i);
      if (j === i) { var tb = $("tabs"); tb.scrollLeft = t.offsetLeft - tb.offsetLeft - 16; }
    });
    var fieldHtml = function (f, j) {
      if (f.important) return '<div class="field field-important"><span class="field-label">' + esc(f.label) + ' обязателен</span><span class="field-value">«' + esc(f.value) + '»</span><button class="copy" type="button" data-copy="' + j + '">Скопировать</button><span class="field-why">Пожалуйста, вставьте этот текст в поле «Сообщение получателю» при переводе</span></div>';
      return '<div class="field"><span class="field-label">' + esc(f.label) + '</span><span class="field-value">' + esc(f.value) + '</span><button class="copy" type="button" data-copy="' + j + '">Скопировать</button></div>';
    };
    var html = '<div class="pay" role="tabpanel">' + (p.note ? '<p class="pay-note">' + esc(p.note) + "</p>" : "");
    if (p.type === "fund") {
      html += '<a class="btn btn-primary fund-btn" href="' + esc(p.url) + '" target="_blank" rel="noopener" data-ev="fund_open">' + esc(p.button || "Открыть сбор") + "</a>" +
        (p.groups || []).map(function (g) {
          return '<div class="pay-group"><h3>' + esc(g.title) + "</h3>" + (g.text ? "<p>" + esc(g.text) + "</p>" : "") +
            (g.steps ? '<ol class="steps">' + g.steps.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ol>" : "") +
            (g.items && g.items.length ? '<ul class="methods">' + g.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
        }).join("") +
        (p.fields && p.fields.length ? '<h3 class="pay-sub">Данные фонда</h3>' + p.fields.map(fieldHtml).join("") : "") + "</div>";
    } else {
      html += p.fields.map(fieldHtml).join("") + '<button class="btn btn-ghost copy-all" type="button" data-copy="all">Скопировать все реквизиты</button></div>';
    }
    $("pay").innerHTML = html;
  }
  $("tabs").innerHTML = S.payments.map(function (p, i) { return '<button class="tab" role="tab" type="button" data-tab="' + i + '">' + esc(p.tab) + "</button>"; }).join("");
  var payIdx = 0;
  S.payments.forEach(function (p, i) { if (p.id && location.hash === "#" + p.id) payIdx = i; });
  renderPay(payIdx);
  var companyIdx = -1; S.payments.forEach(function (p, i) { if (p.id === "company") companyIdx = i; });
  if (companyIdx >= 0) {
    var cl = document.createElement("button"); cl.type = "button"; cl.className = "company-link";
    cl.innerHTML = esc(S.companyLink || "Вы представляете компанию? Оплата по счёту") + " <b>→</b>";
    cl.onclick = function () { payIdx = companyIdx; renderPay(payIdx); track("company_link"); };
    $("tabs").parentNode.insertBefore(cl, $("tabs"));
  }
  if (location.hash && payIdx > 0) setTimeout(function () { $("help").scrollIntoView(); }, 300);
  $("tabs").addEventListener("click", function (e) { var t = e.target.closest(".tab"); if (t) { payIdx = +t.dataset.tab; renderPay(payIdx); track("pay_tab_" + (payIdx + 1)); } });

  function toast(msg) {
    var el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); el.textContent = msg;
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 2200);
  }
  function copyText(text, btn, done) {
    function ok() { if (btn) { var o = btn.textContent; btn.textContent = "Скопировано"; btn.classList.add("ok"); setTimeout(function () { btn.textContent = o; btn.classList.remove("ok"); }, 1800); } done && done(); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var r = false; try { r = document.execCommand("copy"); } catch (e) {}
      ta.remove(); r ? ok() : toast("Выделите текст и скопируйте вручную");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
  }
  $("pay").addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]"); if (!b) return;
    var p = S.payments[payIdx], k = b.dataset.copy;
    var text = k === "all" ? p.fields.map(function (f) { return f.label + ": " + f.value; }).join("\n") : p.fields[+k].value;
    copyText(text, b);
    track("copy_" + (payIdx + 1) + "_" + (k === "all" ? "all" : p.fields[+k].label), null);
    track("copy_any", null, true);
  });

  /* ---------- ссылки ---------- */
  $("links").innerHTML = S.links.map(function (l, i) {
    return '<a class="link" href="' + esc(l.url) + '" target="_blank" rel="noopener" data-ev="link_' + esc(l.kind) + "_" + (i + 1) + '"><span class="link-ico">' + (ICON[l.kind] || ICON.site) + "</span><span><b>" + esc(l.title) + "</b>" + (l.sub ? "<span>" + esc(l.sub) + "</span>" : "") + '</span><span class="chev">' + ICON.arrowR + "</span></a>";
  }).join("");

  /* ---------- FAQ ---------- */
  $("faq").innerHTML = S.faq.map(function (f, i) { return '<details data-faq="' + (i + 1) + '"><summary>' + esc(f.q) + '</summary><div class="answer"><p>' + esc(f.a) + "</p></div></details>"; }).join("");
  document.querySelectorAll("details[data-faq]").forEach(function (d) { d.addEventListener("toggle", function () { if (d.open) track("faq_open_" + d.dataset.faq); }); });

  /* ---------- подвал ---------- */
  var c = S.contact || {};
  $("footer").innerHTML = (c.telegram ? '<a class="btn btn-ghost" href="' + esc(c.telegram) + '" target="_blank" rel="noopener" data-ev="contact_telegram">Написать нам в Телеграм</a>' : "") +
    "<span>" + esc(c.text || "") + "</span><span>Спасибо, что вы с Максимом.</span>";

  /* ---------- поделиться ---------- */
  $("share").addEventListener("click", function () {
    track("share_click");
    var data = { title: document.title, text: S.headline, url: location.href };
    if (navigator.share) navigator.share(data).then(function () { track("share_done"); }, function () {});
    else copyText(location.href, null, function () { toast("Ссылка скопирована, отправьте её друзьям"); });
  });

  /* ---------- все внешние ссылки открываются в новом окне ---------- */
  function externalLinks() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      if (a.hostname && a.hostname !== location.hostname) { a.target = "_blank"; a.rel = "noopener"; }
    });
  }
  externalLinks();
  $("pay").addEventListener("click", function () { setTimeout(externalLinks, 0); });
  $("tabs").addEventListener("click", function () { setTimeout(externalLinks, 0); });

  /* ---------- клики по кнопкам и ссылкам ---------- */
  document.addEventListener("click", function (e) { var a = e.target.closest("[data-ev]"); if (a) track(a.dataset.ev); });

  /* ---------- анимация полос, когда их видно ---------- */
  var fillObs = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.style.width = en.target.dataset.w; fillObs.unobserve(en.target); } }); }, { threshold: .3 });
  document.querySelectorAll(".bar-fill").forEach(function (f) { if ("IntersectionObserver" in window) fillObs.observe(f); else f.style.width = f.dataset.w; });

  /* ---------- просмотр блоков и чтение текста ---------- */
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) track("view_" + en.target.dataset.track, null, true); }); }, { threshold: .35 });
    document.querySelectorAll("[data-track]").forEach(function (s) { secObs.observe(s); });

    // абзац считается прочитанным, если был на экране 4 секунды
    var timers = {}, read = {};
    var paras = document.querySelectorAll("[data-read]");
    var readObs = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var n = en.target.dataset.read;
        if (en.isIntersecting && !read[n]) timers[n] = setTimeout(function () {
          read[n] = 1; track("read_story_p" + n, null, true);
          if (Object.keys(read).length === paras.length) track("read_story_all", null, true);
        }, 4000);
        else clearTimeout(timers[n]);
      });
    }, { threshold: .6 });
    paras.forEach(function (p) { readObs.observe(p); });

    // липкая кнопка прячется, когда реквизиты на экране
    var sticky = $("sticky");
    new IntersectionObserver(function (es) { sticky.classList.toggle("hide", es[0].isIntersecting); }, { threshold: 0.05 }).observe($("help"));
    new IntersectionObserver(function (es) { sticky.classList.toggle("show", !es[0].isIntersecting && es[0].boundingClientRect.top < 0); }).observe($("total"));
  }

  // глубина прокрутки
  var depths = [25, 50, 75, 100];
  window.addEventListener("scroll", function () {
    var h = document.documentElement, p = (h.scrollTop + innerHeight) / h.scrollHeight * 100;
    depths.forEach(function (d) { if (p >= d - 1) track("scroll_" + d, null, true); });
  }, { passive: true });
})();
