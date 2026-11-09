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

  /* ---- account pages: log in, forgot password, reset password ----
         Each form sends JSON to the app at <body data-auth-api> and shows the answer on the page:
         a message under the field it concerns, or a box at the top of the form for everything else.
         Offline, an unreachable app and a slow answer each get their own message. Every state can be
         opened for review with ?state=<name> (see the README). */
  var authApi = (document.body.getAttribute('data-auth-api') || '').replace(/\/$/, '');
  var appUrl = document.body.getAttribute('data-app') || '';
  function param(name) {
    var m = query.match(new RegExp('[?&]' + name + '=([^&#~]*)'));
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }
  var preview = param('state');
  function hrefOf(sel, extra) {
    var a = $(sel); if (!a) return '';
    var h = a.getAttribute('href'); return extra ? h + (h.indexOf('?') < 0 ? '?' : '&') + extra : h;
  }
  var SUPPORT = function () { return { text: 'Contact support', href: hrefOf('#supportLink') }; };
  var COMMON = {
    offline: ['You’re offline', 'Check your internet connection, then try again. Nothing was sent.'],
    unreachable: ['We couldn’t reach ManaGEM', 'Check your connection and try again in a moment.', SUPPORT],
    timeout: ['ManaGEM is taking too long to answer', 'Nothing has changed yet. Try again in a moment.'],
    server_error: ['Something went wrong on our side', 'Try again in a moment. If it keeps happening, let us know.', SUPPORT]
  };

  /* the offline notice follows the connection while the page is open */
  var offlineNote = $('#authOffline');
  function syncOnline() {
    var online = navigator.onLine !== false, shown = $('.auth-alert[data-code="offline"]:not([hidden])');
    if (offlineNote) offlineNote.hidden = online || !!shown;
    if (online && shown) { showAlert(shown.closest('form'), 'ok', 'You’re back online', 'Try again now.'); }
  }
  if (offlineNote) { syncOnline(); window.addEventListener('online', syncOnline); window.addEventListener('offline', syncOnline); }

  function linkEl(link) { var a = document.createElement('a'); a.href = link.href; a.textContent = link.text; return a; }
  function showAlert(form, kind, title, text, link) {
    var box = $('.auth-alert', form); if (!box) return;
    box.className = 'auth-alert ' + (kind || 'err'); box.innerHTML = ''; box.removeAttribute('data-code');
    var b = document.createElement('b'); b.textContent = title; box.appendChild(b);
    var p = document.createElement('span'); p.textContent = text + (link ? ' ' : ''); if (link) p.appendChild(linkEl(link)); box.appendChild(p);
    box.hidden = false;
  }
  /* one offline message at a time: the error box replaces the passive notice */
  function showCommon(form, code) {
    var c = COMMON[code]; showAlert(form, 'err', c[0], c[1], c[2] && c[2]());
    if (code === 'offline') { $('.auth-alert', form).setAttribute('data-code', 'offline'); if (offlineNote) offlineNote.hidden = true; }
  }
  function fieldError(input, text, link) {
    var el = document.getElementById(input.id + '-err');
    el.textContent = text + (link ? ' ' : ''); if (link) el.appendChild(linkEl(link));
    el.hidden = false; input.setAttribute('aria-invalid', 'true');
  }
  function clearForm(form) {
    var box = $('.auth-alert', form); if (box) box.hidden = true;
    $$('input[aria-invalid]', form).forEach(function (i) { i.removeAttribute('aria-invalid'); });
    $$('.auth-err', form).forEach(function (p) { p.hidden = true; });
  }
  function busy(form, on, text) {
    var btn = form.querySelector('button[type="submit"]'), st = $('.auth-status', form);
    btn.disabled = on; if (st) { st.className = 'auth-status'; st.textContent = on ? text : ''; }
  }
  /* every field drops its message as soon as it is edited */
  $$('.auth-form input').forEach(function (input) {
    input.addEventListener('input', function () {
      var el = document.getElementById(input.id + '-err');
      if (el && !el.hidden) { el.hidden = true; input.removeAttribute('aria-invalid'); }
    });
  });
  $$('.auth-reveal').forEach(function (btn) {
    var input = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });
  /* restore the buttons when the page comes back from the browser's Back cache */
  window.addEventListener('pageshow', function () { $$('.auth-form').forEach(function (f) { busy(f, false); }); });

  /* POST JSON; resolves with { status, data, json } for any answer, rejects with { code } when no answer came */
  function send(path, body) {
    if (navigator.onLine === false) return Promise.reject({ code: 'offline' });
    var ctrl = window.AbortController ? new AbortController() : null, timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    return fetch(authApi + path, {
      method: 'POST', credentials: 'include', signal: ctrl ? ctrl.signal : undefined,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body)
    }).then(function (r) {
      clearTimeout(timer);
      return r.json().then(function (d) { return { status: r.status, data: d || {}, json: true }; }, function () { return { status: r.status, data: {}, json: false }; });
    }, function (e) {
      clearTimeout(timer);
      throw { code: e && e.name === 'AbortError' ? 'timeout' : navigator.onLine === false ? 'offline' : 'unreachable' };
    });
  }
  function minutes(data) { var s = Number(data && data.retry_after); return s > 0 ? Math.max(1, Math.ceil(s / 60)) : 0; }

  /* -- log in -- */
  var loginForm = $('#loginForm');
  if (loginForm) {
    var user = $('#l-user'), pass = $('#l-pass'), remember = $('input[name="remember"]', loginForm), KEY = 'managem-username';
    var USERNAME = /^[A-Za-z0-9._@-]{2,64}$/;
    try { var saved = localStorage.getItem(KEY); if (saved) { user.value = saved; remember.checked = true; } } catch (e) {}
    if (param('u')) user.value = param('u');
    var forgotFor = function () { return { text: 'Reset your password', href: hrefOf('#forgotLink', user.value.trim() ? 'u=' + encodeURIComponent(user.value.trim()) : '') }; };
    var LOGIN_ERRORS = {
      invalid_username: function () { fieldError(user, 'Check your username. It can only use letters, numbers and . _ - @, with no spaces.'); user.focus(); },
      user_not_found: function () { fieldError(user, 'We couldn’t find an account with this username. Check the spelling, or', { text: 'start a free trial', href: hrefOf('#signupLink') }); user.focus(); },
      wrong_password: function () { fieldError(pass, 'That password isn’t right. Passwords are case-sensitive.', forgotFor()); pass.focus(); pass.select(); },
      invalid_credentials: function () { showAlert(loginForm, 'err', 'The username or password isn’t right', 'Check both and try again. Passwords are case-sensitive.', forgotFor()); pass.focus(); },
      account_disabled: function (d) { showAlert(loginForm, 'err', 'This account is switched off', 'Ask an admin at your company to switch it back on, then log in again.'); },
      too_many_attempts: function (d) { var m = minutes(d); showAlert(loginForm, 'err', 'Too many attempts', 'To keep your account safe, logging in is paused' + (m ? ' for ' + m + (m === 1 ? ' minute.' : ' minutes.') : ' for a few minutes.') + ' You can still reset your password.', forgotFor()); },
      session_expired: function () { showAlert(loginForm, 'info', 'Your session has ended', 'For your security you were logged out. Log in again to carry on.'); },
      password_reset: function () { showAlert(loginForm, 'ok', 'Password changed', 'Log in with your new password.'); }
    };
    function loginError(code, data) {
      if (LOGIN_ERRORS[code]) LOGIN_ERRORS[code](data || {}); else showCommon(loginForm, COMMON[code] ? code : 'server_error');
    }
    function byStatus(s, json) {
      return s === 400 || s === 422 ? 'invalid_username' : s === 401 ? 'invalid_credentials' : s === 403 ? 'account_disabled'
        : s === 404 ? (json ? 'user_not_found' : 'no_api') : s === 405 || s === 501 ? 'no_api' : s === 423 || s === 429 ? 'too_many_attempts' : 'server_error';
    }
    /* until the app answers at data-auth-api, the form posts to the app itself, as a plain log-in form */
    function plainPost() { busy(loginForm, true, 'Logging you in…'); HTMLFormElement.prototype.submit.call(loginForm); }
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); clearForm(loginForm);
      var u = user.value.trim(), missing = false;
      if (!u) { fieldError(user, 'Enter your username.'); missing = true; }
      else if (!USERNAME.test(u)) { loginError('invalid_username'); return; }
      if (!pass.value) { fieldError(pass, 'Enter your password.'); missing = true; }
      if (missing) { (u ? pass : user).focus(); return; }
      try { if (remember.checked) localStorage.setItem(KEY, u); else localStorage.removeItem(KEY); } catch (err) {}
      if (navigator.onLine === false) { showCommon(loginForm, 'offline'); return; }
      if (!authApi) { plainPost(); return; }
      busy(loginForm, true, 'Checking your details…');
      send('/login', { username: u, password: pass.value, remember: remember.checked }).then(function (r) {
        if (r.status >= 200 && r.status < 300) { busy(loginForm, true, 'Logging you in…'); window.location.assign(r.data.redirect || appUrl); return; }
        var code = r.data.error || byStatus(r.status, r.json);
        if (code === 'no_api') { plainPost(); return; }
        busy(loginForm, false); loginError(code, r.data);
      }, function (err) {
        if (err.code === 'unreachable') { plainPost(); return; }
        busy(loginForm, false); loginError(err.code);
      });
    });
    if (preview) {
      if (/username|not_found/.test(preview) && !user.value) user.value = 'kdube';
      loginError(preview);
    }
  }

  /* -- forgot password: ask for a reset link by email -- */
  var forgotForm = $('#forgotForm');
  if (forgotForm) {
    var ident = $('#r-ident'), step = $('#forgotStep'), sent = $('#forgotSent'), resendForm = $('#resendForm');
    var resendBtn = resendForm.querySelector('button'), resendLabel = resendBtn.textContent, cooldown;
    if (param('u')) ident.value = param('u');
    var resetUrl = window.location.href.split(/[?#]/)[0].replace(/[^\/]*$/, 'reset-password.html');
    function startCooldown(n) {
      clearInterval(cooldown); resendBtn.disabled = true;
      function tick() {
        if (n <= 0) { clearInterval(cooldown); resendBtn.disabled = false; resendBtn.textContent = resendLabel; return; }
        resendBtn.textContent = 'Send again in ' + (n--) + 's';
      }
      tick(); cooldown = setInterval(tick, 1000);
    }
    var forgotTitle = document.title;
    function showSent(to) {
      $('#sentTo').textContent = to; step.hidden = true; sent.hidden = false; sent.focus(); startCooldown(30);
      document.title = 'Check your email · ManaGEM';
    }
    function forgotError(form, code, data) {
      if (code === 'too_many_attempts') { var m = minutes(data); showAlert(form, 'err', 'Too many requests', 'Wait ' + (m ? m + (m === 1 ? ' minute' : ' minutes') : 'a few minutes') + ' before asking for another link, and check your inbox for the last one.'); return; }
      if (code === 'invalid_identifier') { fieldError(ident, 'Check this. Usernames and email addresses don’t contain spaces.'); ident.focus(); return; }
      showCommon(form, COMMON[code] ? code : 'server_error');
    }
    function request(form, value, done) {
      if (navigator.onLine === false) { forgotError(form, 'offline'); return; }
      busy(form, true, 'Sending…');
      send('/forgot-password', { identifier: value, reset_url: resetUrl }).then(function (r) {
        busy(form, false);
        /* the answer is the same whether or not an account matches, so nobody can test which usernames exist */
        if ((r.status >= 200 && r.status < 300) || r.data.error === 'user_not_found') { done(); return; }
        var s = r.status, code = r.data.error || (s === 400 || s === 422 ? 'invalid_identifier' : s === 429 ? 'too_many_attempts' : s === 404 || s === 405 || s === 501 ? 'unreachable' : 'server_error');
        forgotError(form, code, r.data);
      }, function (err) { busy(form, false); forgotError(form, err.code); });
    }
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault(); clearForm(forgotForm);
      var v = ident.value.trim();
      if (!v) { fieldError(ident, 'Enter your username or email address.'); ident.focus(); return; }
      if (/\s/.test(v)) { forgotError(forgotForm, 'invalid_identifier'); return; }
      request(forgotForm, v, function () { showSent(v); });
    });
    resendForm.addEventListener('submit', function (e) {
      e.preventDefault(); clearForm(resendForm);
      request(resendForm, $('#sentTo').textContent, function () {
        showAlert(resendForm, 'ok', 'Sent again', 'Use the link in the newest email; earlier links stop working.'); startCooldown(30);
      });
    });
    $('#changeIdent').addEventListener('click', function () { sent.hidden = true; step.hidden = false; document.title = forgotTitle; clearForm(forgotForm); ident.focus(); ident.select(); });
    if (preview === 'sent') showSent(ident.value || 'kdube');
    else if (preview) forgotError(forgotForm, preview);
  }

  /* -- reset password: the link in the email opens reset-password.html?token=… -- */
  var resetForm = $('#resetForm');
  if (resetForm) {
    var npass = $('#n-pass'), confirmPass = $('#n-confirm'), token = param('token');
    var RULES = { length: function (v) { return v.length >= 8; }, mix: function (v) { return /[A-Za-z]/.test(v) && /\d/.test(v); } };
    function checkRules() {
      var ok = true;
      $$('#n-reqs li').forEach(function (li) { var pass = RULES[li.getAttribute('data-req')](npass.value); li.classList.toggle('met', pass); ok = ok && pass; });
      return ok;
    }
    npass.addEventListener('input', checkRules);
    /* the confirmation screens replace the form; the tab title follows */
    function view(id) {
      ['resetStep', 'resetDone', 'resetInvalid'].forEach(function (v) { document.getElementById(v).hidden = v !== id; });
      if (id === 'resetStep') return;
      var el = document.getElementById(id); el.focus();
      document.title = el.querySelector('h1').textContent + ' · ManaGEM';
    }
    function resetError(code, data) {
      if (code === 'token_invalid' || code === 'token_expired') { view('resetInvalid'); return; }
      if (code === 'weak_password') { fieldError(npass, (data && data.message) || 'Choose a stronger password: longer, and not one you use elsewhere.'); npass.focus(); return; }
      if (code === 'mismatch') { fieldError(confirmPass, 'The passwords don’t match. Type the new password again.'); confirmPass.focus(); return; }
      if (code === 'too_many_attempts') { showAlert(resetForm, 'err', 'Too many attempts', 'Wait a few minutes, then try again.'); return; }
      showCommon(resetForm, COMMON[code] ? code : 'server_error');
    }
    if (!token && !preview) view('resetInvalid');
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault(); clearForm(resetForm);
      var v = npass.value;
      if (!v) { fieldError(npass, 'Enter a new password.'); npass.focus(); return; }
      if (!checkRules()) { fieldError(npass, 'Use at least 8 characters, with a letter and a number.'); npass.focus(); return; }
      if (!confirmPass.value) { fieldError(confirmPass, 'Type the new password again.'); confirmPass.focus(); return; }
      if (confirmPass.value !== v) { resetError('mismatch'); return; }
      if (navigator.onLine === false) { resetError('offline'); return; }
      busy(resetForm, true, 'Saving…');
      send('/reset-password', { token: token, password: v }).then(function (r) {
        busy(resetForm, false);
        if (r.status >= 200 && r.status < 300) { view('resetDone'); return; }
        var s = r.status, code = r.data.error || (s === 410 ? 'token_expired' : s === 400 ? 'token_invalid' : s === 422 ? 'weak_password' : s === 429 ? 'too_many_attempts' : s === 404 || s === 405 || s === 501 ? 'unreachable' : 'server_error');
        resetError(code, r.data);
      }, function (err) { busy(resetForm, false); resetError(err.code); });
    });
    if (preview === 'done') view('resetDone');
    else if (preview === 'expired' || preview === 'token_invalid') view('resetInvalid');
    else if (preview) resetError(preview);
  }

  var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());

  /* once the hero copy has entered, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);
})();
