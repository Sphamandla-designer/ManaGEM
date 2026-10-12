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

  /* ---- pricing ---- */
  var sw = $('#billSwitch'), yearly = false, plans = $$('.plan'), planBtn = $('#planBtn');
  var planName = $('#planName'), planUsers = $('#planUsers');
  function fmt(n) { return 'R' + n.toLocaleString('en-ZA'); }
  function renderPrices() {
    plans.forEach(function (p) {
      var base = parseInt(p.dataset.price, 10); if (!base) return;
      var price = $('.price', p);
      if (yearly) price.innerHTML = fmt(base * 10) + '<small>per year · 2 months free</small>';
      else price.innerHTML = fmt(base) + '<small>per month</small>';
    });
    $('#lblMonthly').classList.toggle('on', !yearly);
    $('#lblYearly').classList.toggle('on', yearly);
  }
  sw.addEventListener('click', function () { yearly = !yearly; sw.setAttribute('aria-checked', String(yearly)); renderPrices(); });
  function selectPlan(p) {
    plans.forEach(function (x) { var on = x === p; x.classList.toggle('selected', on); x.setAttribute('aria-checked', String(on)); });
    planName.textContent = p.dataset.name; planUsers.textContent = p.dataset.users;
    var custom = !p.dataset.price;
    planBtn.textContent = custom ? 'Talk to us about ' + p.dataset.name.toLowerCase() : 'Start free trial on ' + p.dataset.name;
    planBtn.setAttribute('data-start', custom ? 'demo' : 'trial');
  }
  plans.forEach(function (p, i) {
    p.addEventListener('click', function () { selectPlan(p); });
    p.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0; if (!n) return;
      e.preventDefault(); var nx = plans[(i + n + plans.length) % plans.length]; nx.focus(); selectPlan(nx);
    });
  });

  /* ---- links that preset the form's "how to start" ---- */
  var startSel = $('#fStart'), submit = $('#fSubmit');
  var labels = { trial: 'Start free trial', pilot: 'Request my pilot', demo: 'Book a walkthrough' };
  function syncSubmit() { submit.textContent = labels[startSel.value] || labels.trial; }
  startSel.addEventListener('change', syncSubmit);
  $$('[data-start]').forEach(function (a) {
    a.addEventListener('click', function () { startSel.value = a.getAttribute('data-start'); syncSubmit(); });
  });

  /* ---- trial form (prototype: validates and confirms, sends nothing) ---- */
  var form = $('#trial');
  function check(id, ok) { var f = $('#' + id).closest('.field'); f.classList.toggle('invalid', !ok); $('#' + id).setAttribute('aria-invalid', String(!ok)); return ok; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var a = check('fName', $('#fName').value.trim().length > 1);
    var b = check('fCo', $('#fCo').value.trim().length > 1);
    var c = check('fEmail', /^\S+@\S+\.\S+$/.test($('#fEmail').value.trim()));
    if (!(a && b && c)) { var first = $('.field.invalid input', form); if (first) first.focus(); return; }
    var mode = startSel.value;
    $('#doneMsg').textContent = mode === 'pilot'
      ? 'The ManaGEM team will call to plan your 30-day pilot on three live jobs, including your foremen’s phones.'
      : mode === 'demo' ? 'The ManaGEM team will be in touch to book a walkthrough at a time that suits you.'
      : 'Check your inbox for your login link. The team will call to help you load your first job.';
    $('#formBody').hidden = true; var done = $('#formDone'); done.hidden = false; done.focus();
  });
  ['fName', 'fCo', 'fEmail'].forEach(function (id) {
    $('#' + id).addEventListener('input', function () { $('#' + id).closest('.field').classList.remove('invalid'); });
  });

  $('#year').textContent = String(new Date().getFullYear());

  /* once the hero entrance has played, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);
})();
