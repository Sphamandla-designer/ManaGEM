/* ManaGEM site behaviour. No dependencies. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- header: switch to light surface once the dark hero scrolls away ---- */
  var header = $('#siteHeader');
  var hero = $('.hero');
  function onScroll() {
    var past = window.scrollY > 24;
    header.classList.toggle('scrolled', past);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav ---- */
  var menuBtn = $('#menuBtn'), nav = $('#mobileNav'), closeBtn = $('#menuClose'), lastFocus;
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
    if (lastFocus) lastFocus.focus();
  }
  menuBtn.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  nav.addEventListener('click', function (e) { if (e.target === nav || e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !nav.hidden) closeNav(); });

  /* ---- marquee: duplicate items so the loop is seamless ---- */
  var mq = $('#marquee');
  if (mq && !reduce) { mq.innerHTML += mq.innerHTML; }

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

  /* ---- product tour tabs ---- */
  var tabs = $$('.tab'), view = $('#tourView'), urlEl = $('.browser .url');
  var urls = { 'tab-dash': 'dashboard', 'tab-enq': 'enquiries', 'tab-proj': 'projects', 'tab-debt': 'debtors', 'tab-stock': 'stock' };
  var alts = {
    'tab-dash': 'ManaGEM dashboard: enquiries, quotes, sales and opportunities totals, a 12-month sales chart, monthly performance and current projects',
    'tab-enq': 'Open enquiries: pipeline totals by stage and a list of enquiries with status, area and sales rep',
    'tab-proj': 'Projects module: current jobs with customer, foreman, start and end dates and progress',
    'tab-debt': 'Debtors management: outstanding, overdue and unallocated totals with an aged debtors list',
    'tab-stock': 'Stock control: SKUs, stock value and low-stock items with recent movements and warehouse capacity'
  };
  var cache = {};
  function preload(src) { if (!cache[src]) { var i = new Image(); i.src = src; cache[src] = i; } }
  tabs.forEach(function (t) { preload(t.dataset.shot); });
  function selectTab(t) {
    tabs.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
    var old = $('img.on', view);
    if (old && old.getAttribute('src') === t.dataset.shot) return;
    var img = document.createElement('img');
    img.src = t.dataset.shot; img.alt = alts[t.id] || ''; img.width = 1800; img.height = 1125;
    view.appendChild(img);
    var swap = function () {
      img.classList.add('on');
      if (old) { old.classList.remove('on'); setTimeout(function () { old.remove(); }, reduce ? 0 : 650); }
    };
    if (img.complete) requestAnimationFrame(swap); else img.onload = function () { requestAnimationFrame(swap); };
    urlEl.textContent = 'app.managem.co.za/' + (urls[t.id] || '');
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!n) return;
      e.preventDefault(); var nx = tabs[(i + n + tabs.length) % tabs.length]; nx.focus(); selectTab(nx);
    });
  });

  /* ---- how it works: step highlight follows hover/focus, and cycles gently until touched ---- */
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
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { startCycle(); sio.disconnect(); } }, { threshold: 0.4 });
    sio.observe($('#steps'));
  }

  /* ---- pricing: billing toggle swaps every amount ---- */
  var sw = $('#billSwitch'), yearly = false;
  function fmt(n) { return n.toLocaleString('en-ZA'); }
  function renderPrices() {
    $$('.pprice .amt[data-m]').forEach(function (el) { el.textContent = fmt(parseInt(yearly ? el.dataset.y : el.dataset.m, 10)); });
    $$('.per-lbl').forEach(function (el) { el.textContent = yearly ? 'per year' : 'per month'; });
    $('#lblMonthly').classList.toggle('on', !yearly);
    $('#lblYearly').classList.toggle('on', yearly);
  }
  if (sw) sw.addEventListener('click', function () { yearly = !yearly; sw.setAttribute('aria-checked', String(yearly)); renderPrices(); });

  /* ---- AI take-on console: play the mapping once it scrolls into view ---- */
  var takeon = $('#takeon');
  if (takeon) {
    var rows = $$('.to-row', takeon), statusTxt = $('.to-status-txt', takeon);
    function playTakeon() {
      if (reduce) { rows.forEach(function (r) { r.classList.add('go', 'ok'); }); takeon.classList.add('done'); statusTxt.textContent = 'Ready for review'; return; }
      rows.forEach(function (r, i) {
        setTimeout(function () { r.classList.add('go'); }, 300 + i * 650);
        setTimeout(function () { r.classList.add('ok'); }, 300 + i * 650 + 1000);
      });
      setTimeout(function () { takeon.classList.add('done'); statusTxt.textContent = 'Ready for review'; }, 300 + (rows.length - 1) * 650 + 1300);
    }
    if ('IntersectionObserver' in window) {
      var tio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { playTakeon(); tio.disconnect(); } }, { threshold: 0.45 });
      tio.observe(takeon);
    } else playTakeon();
  }

  /* ---- customer stories: vertical tabs ---- */
  var stabs = $$('.story-tab'), spanels = $$('.story-panel');
  function selectStory(t) {
    stabs.forEach(function (x) { var on = x === t; x.classList.toggle('on', on); x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; });
    spanels.forEach(function (p) { var on = p.id === t.getAttribute('aria-controls'); p.hidden = !on; p.classList.toggle('on', on); });
  }
  stabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectStory(t); });
    t.addEventListener('keydown', function (e) {
      var n = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0; if (!n) return;
      e.preventDefault(); var nx = stabs[(i + n + stabs.length) % stabs.length]; nx.focus(); selectStory(nx);
    });
  });

  /* ---- larger-teams form (prototype: validates and confirms, sends nothing) ---- */
  var form = $('#teamForm');
  if (form) {
    function check(id, ok) { var f = $('#' + id).closest('.field'); f.classList.toggle('invalid', !ok); $('#' + id).setAttribute('aria-invalid', String(!ok)); return ok; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var a = check('fName', $('#fName').value.trim().length > 1);
      var b = check('fCo', $('#fCo').value.trim().length > 1);
      var c = check('fEmail', /^\S+@\S+\.\S+$/.test($('#fEmail').value.trim()));
      if (!(a && b && c)) { var first = $('.field.invalid input', form); if (first) first.focus(); return; }
      $('#formBody').hidden = true; var done = $('#formDone'); done.hidden = false; done.focus();
    });
    ['fName', 'fCo', 'fEmail'].forEach(function (id) {
      $('#' + id).addEventListener('input', function () { $('#' + id).closest('.field').classList.remove('invalid'); });
    });
  }

  $('#year').textContent = String(new Date().getFullYear());

  /* once the hero copy has entered, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);

  /* ---- hero video: honour reduced motion and data saver ---- */
  var vid = $('#heroVideo');
  if (vid) {
    var saver = navigator.connection && navigator.connection.saveData;
    if (reduce || saver) { vid.removeAttribute('autoplay'); vid.pause(); vid.removeAttribute('loop'); }
    else { var play = vid.play(); if (play && play.catch) play.catch(function () {}); }
    document.addEventListener('visibilitychange', function () { if (reduce) return; if (document.hidden) vid.pause(); else vid.play().catch(function () {}); });
  }

  /* ---- hero stage: pointer parallax by depth (fine pointers only) ---- */
  var stage = $('.stage');
  if (stage && !reduce && window.matchMedia('(pointer:fine)').matches) {
    var shots = $$('.shot', stage), tx = 0, ty = 0, cx = 0, cy = 0, raf;
    function tick() {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      shots.forEach(function (s) {
        var d = parseFloat(s.dataset.depth || 1);
        s.style.setProperty('--px', (cx * 14 * d).toFixed(2) + 'px');
        s.style.setProperty('--py', (cy * 10 * d).toFixed(2) + 'px');
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick); else raf = 0;
    }
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
  }

  /* ---- stats: count up when the strip scrolls into view ---- */
  var counters = $$('.count');
  function fmt(n) { return n.toLocaleString('en-ZA'); }
  function runCounter(el) {
    var to = parseFloat(el.dataset.to), dur = parseInt(el.dataset.dur || '1500', 10), t0;
    if (reduce) { el.textContent = fmt(to); return; }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(2, -10 * p); if (p === 1) e = 1;
      el.textContent = fmt(Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { cio.observe(c); });
    } else { counters.forEach(runCounter); }
  }
})();
