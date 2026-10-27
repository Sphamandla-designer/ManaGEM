/* ManaGEM site behaviour. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- trial sign-up address: set once on <body data-signup>, applied to every trial button ---- */
  var signup = document.body.getAttribute('data-signup');
  if (signup) $$('a[data-signup]').forEach(function (a) { a.href = signup; });

  /* ---- header: switch to light surface once the dark hero scrolls away ---- */
  var header = $('#siteHeader');
  var hero = $('.hero') || $('.page-hero');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 24); }
  if (header) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

  /* ---- mobile nav: dialog with focus kept inside while open ---- */
  var menuBtn = $('#menuBtn'), nav = $('#mobileNav'), closeBtn = $('#menuClose'), lastFocus;
  if (menuBtn && nav) {
    function focusables() {
      return $$('a[href], button:not([disabled])', nav).filter(function (el) { return el.offsetParent !== null; });
    }
    function openNav() {
      lastFocus = document.activeElement;
      nav.hidden = false; nav.setAttribute('open', '');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function closeNav() {
      nav.removeAttribute('open'); nav.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    menuBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    nav.addEventListener('click', function (e) { if (e.target === nav || e.target.closest('a')) closeNav(); });
    document.addEventListener('keydown', function (e) {
      if (nav.hidden) return;
      if (e.key === 'Escape') { closeNav(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---- reveal on scroll ---- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- tabs: one controller for the walkthrough and the trades.
         Each tab names its panel in aria-controls; arrow keys, Home and End move between tabs. ---- */
  function tablist(list, onClass) {
    if (!list) return null;
    var tabs = $$('[role="tab"]', list);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(t, focus) {
      tabs.forEach(function (x, i) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        if (onClass) x.classList.toggle(onClass, on);
        if (panels[i]) { panels[i].hidden = !on; if (onClass) panels[i].classList.toggle(onClass, on); }
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault(); select(tabs[n], true);
      });
    });
    return { select: select, tabs: tabs };
  }
  var trades = tablist($('.trade-tabs'), 'on');
  /* footer trade links open the matching trade before scrolling */
  if (trades) $$('a[data-trade]').forEach(function (a) {
    a.addEventListener('click', function () {
      var t = document.getElementById(a.getAttribute('data-trade')); if (t) trades.select(t);
    });
  });

  /* ---- getting started: step highlight follows hover/focus, and cycles gently until touched ---- */
  var steps = $$('#steps li'), stepIdx = 0, stepTimer;
  function setStep(i) { steps.forEach(function (s, k) { s.classList.toggle('active', k === i); }); stepIdx = i; }
  function startCycle() {
    if (reduce) return;
    stepTimer = setInterval(function () { setStep((stepIdx + 1) % steps.length); }, 3200);
  }
  steps.forEach(function (s, i) {
    s.addEventListener('mouseenter', function () { clearInterval(stepTimer); setStep(i); });
    s.addEventListener('focusin', function () { clearInterval(stepTimer); setStep(i); });
  });
  if (steps.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { startCycle(); sio.disconnect(); } }, { threshold: 0.4 });
    sio.observe($('#steps'));
  }

  /* ---- features mega menu: CSS opens it on hover and focus; this keeps aria-expanded true to state and lets Escape close it ---- */
  $$('.has-mega').forEach(function (item) {
    var link = item.querySelector('a');
    function set(open) { link.setAttribute('aria-expanded', String(open)); }
    item.addEventListener('mouseenter', function () { item.classList.remove('closed'); set(true); });
    item.addEventListener('mouseleave', function () { item.classList.remove('closed'); set(item.contains(document.activeElement)); });
    item.addEventListener('focusin', function () { if (!item.classList.contains('closed')) set(true); });
    item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) { item.classList.remove('closed'); set(false); } });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || link.getAttribute('aria-expanded') !== 'true') return;
      var inside = item.contains(document.activeElement);
      item.classList.add('closed'); set(false);
      if (inside) link.focus();
    });
    $$('.mega a', item).forEach(function (a) {
      a.addEventListener('click', function () { item.classList.add('closed'); set(false); });
    });
  });

  /* ---- trust marks: moving row with a pause control (hover and focus also pause it) ---- */
  var mq = $('#trustMarquee'), mqBtn = $('#marqueeBtn');
  if (mq && mqBtn) {
    var PAUSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
    var PLAY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>';
    mqBtn.addEventListener('click', function () {
      var paused = mq.classList.toggle('paused');
      mqBtn.setAttribute('aria-pressed', String(paused));
      mqBtn.innerHTML = paused ? PLAY : PAUSE;
    });
  }

  /* ---- sticky action bar on small screens: after the hero, hidden while the form or footer is on screen ---- */
  var sticky = $('#stickyCta'), footer = $('.site-footer');
  if (sticky && hero && footer && 'IntersectionObserver' in window) {
    sticky.hidden = false;
    var pastHero = false, nearEnd = false;
    function syncSticky() { var show = pastHero && !nearEnd; sticky.classList.toggle('show', show); document.body.classList.toggle('has-sticky', show); }
    new IntersectionObserver(function (en) { pastHero = !en[0].isIntersecting && en[0].boundingClientRect.bottom < 0; syncSticky(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (en) { nearEnd = en[0].isIntersecting; syncSticky(); }, { threshold: 0.05 }).observe(footer);
  }

  /* ---- product walkthrough, light on data: no clip downloads until the tour is on screen, and only the
         active step's clip is ever loaded. Picking a step swaps the source; the old one is unloaded.
         Clips loop, and a visible Pause button stops them (WCAG 2.2.2). Under reduced motion nothing
         plays until Play is pressed. ---- */
  var walk = $('#walk');
  if (walk) {
    var wtabs = $$('[role="tab"]', walk), wpanels = wtabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var videos = wpanels.map(function (p) { return p.querySelector('video'); });
    var pauseBtns = $$('.walk-pause', walk);
    var current = 0, onScreen = false, userPaused = reduce;
    var AV1 = 'video/webm; codecs="av01.0.08M.08"';
    function bar(i, frac) { var b = wtabs[i].querySelector('.tab-bar i'); if (b) b.style.width = (frac * 100).toFixed(1) + '%'; }
    function attach(v) {
      if (!v || v.getAttribute('data-on')) return;
      [[v.getAttribute('data-webm'), AV1], [v.getAttribute('data-mp4'), 'video/mp4']].forEach(function (s) {
        if (!s[0]) return; var el = document.createElement('source'); el.src = s[0]; el.type = s[1]; v.appendChild(el);
      });
      v.setAttribute('data-on', '1'); v.preload = 'auto'; v.load();
    }
    function detach(v) {
      if (!v || !v.getAttribute('data-on')) return;
      v.pause(); $$('source', v).forEach(function (el) { el.remove(); });
      v.removeAttribute('data-on'); v.preload = 'none'; v.load();
    }
    function syncButtons() {
      pauseBtns.forEach(function (b) {
        b.querySelector('span').textContent = userPaused ? 'Play' : 'Pause';
        b.classList.toggle('is-paused', userPaused);
      });
    }
    function play() {
      var v = videos[current]; if (!v || !onScreen || userPaused || document.hidden) return;
      attach(v);
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    }
    function show(i, focus) {
      wtabs.forEach(function (t, k) {
        var on = k === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; wpanels[k].hidden = !on;
        if (!on) { bar(k, 0); detach(videos[k]); }
      });
      current = i;
      if (focus) wtabs[i].focus();
      play();
    }
    function pick(i, focus) { if (!reduce) userPaused = false; syncButtons(); show(i, focus); }
    wtabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % wtabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + wtabs.length) % wtabs.length;
        else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = wtabs.length - 1;
        if (n === null) return; e.preventDefault(); pick(n, true);
      });
    });
    pauseBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        userPaused = !userPaused; syncButtons();
        if (userPaused) { var v = videos[current]; if (v) v.pause(); } else { onScreen = true; play(); }
      });
    });
    videos.forEach(function (v, i) {
      if (!v) return;
      v.addEventListener('timeupdate', function () { if (i === current && v.duration) bar(i, v.currentTime / v.duration); });
    });
    syncButtons();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        onScreen = en[0].isIntersecting;
        if (onScreen) play(); else videos.forEach(function (v) { if (v) v.pause(); });
      }, { threshold: 0.35 }).observe(walk);
    } else { onScreen = true; play(); }
    document.addEventListener('visibilitychange', function () { if (document.hidden) videos.forEach(function (v) { if (v) v.pause(); }); else play(); });
  }

  /* ---- phone menu: Product and Industries open and close in place ---- */
  $$('.m-toggle').forEach(function (b) {
    var sub = document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click', function () { var open = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!open)); sub.hidden = open; });
  });

  /* ---- WhatsApp: set the number once on <body data-whatsapp="27…">; empty keeps every WhatsApp link hidden ---- */
  var wa = (document.body.getAttribute('data-whatsapp') || '').replace(/\D/g, '');
  $$('[data-wa]').forEach(function (el) {
    if (!wa) { el.hidden = true; return; }
    var a = el.matches('a') ? el : el.querySelector('a');
    if (a) a.href = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(el.getAttribute('data-wa-text') || 'Hi, I have a question about ManaGEM.');
    el.hidden = false;
  });

  /* ---- copy buttons for the email address and phone number ---- */
  $$('.copy-btn').forEach(function (b) {
    var label = b.querySelector('span');
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done(ok) { label.textContent = ok ? 'Copied' : 'Select and copy'; setTimeout(function () { label.textContent = 'Copy'; }, 2200); }
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); }); return; }
      var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} t.remove(); done(ok);
    });
  });

  /* ---- sales and support forms. With data-endpoint set, the form posts there (FormData, so the
         screenshot is included) and reports the result on the page. With no endpoint, it opens the
         visitor's email app with every field filled in, and says so. ---- */
  /* a link can pre-fill the sales form: contact.html?enquiry=accountant */
  var PREFILL = {
    accountant: 'I am an accountant or bookkeeper, and I would like to set up a client on ManaGEM.',
    'accountant-demo': 'I am an accountant or bookkeeper, and I would like a ManaGEM demo for one of my clients.'
  };
  var query = location.search;
  var need = $('#f-need'), enq = (query.match(/[?&]enquiry=([a-z-]+)/) || [])[1];
  if (need && enq && PREFILL[enq] && !need.value) need.value = PREFILL[enq];
  /* ...and the support form: support.html?topic=password (the log-in page's Forgot password? link) */
  var TOPIC = { password: ['Log in and access', 'I have forgotten my password and need to reset it. My username is: '] };
  var topic = TOPIC[(query.match(/[?&]topic=([a-z-]+)/) || [])[1]], cat = $('#f-category'), desc = $('#f-description');
  if (topic && cat && desc) { cat.value = topic[0]; if (!desc.value) desc.value = topic[1]; }

  $$('form[data-form]').forEach(function (form) {
    var endpoint = (form.getAttribute('data-endpoint') || '').trim();
    var status = $('.form-status', form), note = $('.form-note', form), btn = form.querySelector('button[type="submit"]');
    if (note) note.textContent = note.getAttribute(endpoint ? 'data-endpoint-note' : 'data-mailto-note');
    function say(msg, cls) { status.textContent = msg; status.className = 'form-status ' + (cls || ''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (endpoint) {
        btn.disabled = true; say('Sending…');
        fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(String(r.status)); form.reset(); say(form.getAttribute('data-ok'), 'ok'); })
          .catch(function () { say(form.getAttribute('data-fail'), 'err'); })
          .then(function () { btn.disabled = false; });
        return;
      }
      var lines = [];
      $$('[name]', form).forEach(function (el) {
        var label = el.getAttribute('data-label') || el.name;
        if (el.type === 'file') {
          if (el.files && el.files.length) lines.push(label + ': ' + Array.prototype.map.call(el.files, function (f) { return f.name; }).join(', ') + ' (please attach it to this email)');
          return;
        }
        lines.push(label + ': ' + (el.value.trim() || '-'));
      });
      var subject = form.getAttribute('data-subject');
      var cat = form.querySelector('[name="category"]'); if (cat && cat.value) subject += ': ' + cat.value;
      window.location.href = 'mailto:' + form.getAttribute('data-to') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      say(form.getAttribute('data-mailto-ok'), 'ok');
    });
  });

  /* ---- log in: show or hide the password, say what is missing beside the field, and remember the
         username on this device when Remember me is ticked. The form then posts to its action. ---- */
  var login = $('#loginForm');
  if (login) {
    var user = $('#l-user', login), pass = $('#l-pass', login), remember = $('input[name="remember"]', login);
    var reveal = $('.auth-reveal', login), loginBtn = login.querySelector('button[type="submit"]'), loginStatus = $('.auth-status', login);
    var KEY = 'managem-username';
    try { var saved = localStorage.getItem(KEY); if (saved) { user.value = saved; remember.checked = true; } } catch (e) {}
    reveal.addEventListener('click', function () {
      var show = pass.type === 'password';
      pass.type = show ? 'text' : 'password';
      reveal.setAttribute('aria-pressed', String(show));
      reveal.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
    function mark(input, bad) {
      input.setAttribute('aria-invalid', String(bad));
      document.getElementById(input.getAttribute('aria-describedby')).hidden = !bad;
    }
    [user, pass].forEach(function (input) {
      input.addEventListener('input', function () { if (input.value.trim()) mark(input, false); });
    });
    login.addEventListener('submit', function (e) {
      var missing = [user, pass].filter(function (input) { var bad = !input.value.trim(); mark(input, bad); return bad; });
      if (missing.length) { e.preventDefault(); missing[0].focus(); return; }
      try { if (remember.checked) localStorage.setItem(KEY, user.value.trim()); else localStorage.removeItem(KEY); } catch (err) {}
      loginBtn.disabled = true; loginStatus.className = 'auth-status'; loginStatus.textContent = 'Logging you in…';
    });
    /* coming back to this page with Back: let the button be used again */
    window.addEventListener('pageshow', function () { loginBtn.disabled = false; loginStatus.textContent = ''; });
  }

  var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());

  /* once the hero copy has entered, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);
})();
