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
  var hero = $('.hero');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav: dialog with focus kept inside while open ---- */
  var menuBtn = $('#menuBtn'), nav = $('#mobileNav'), closeBtn = $('#menuClose'), lastFocus;
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
  tablist($('.walk .tabs'));
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

  /* ---- pricing: compare table disclosure ---- */
  var cmpBtn = $('#compareBtn'), cmpBody = $('#compareTable');
  if (cmpBtn) cmpBtn.addEventListener('click', function () {
    var open = cmpBtn.getAttribute('aria-expanded') === 'true';
    cmpBtn.setAttribute('aria-expanded', String(!open)); cmpBody.hidden = open;
    cmpBtn.querySelector('span').textContent = open ? 'Compare plans in detail' : 'Hide plan comparison';
  });

  /* ---- sticky action bar on small screens: after the hero, hidden while the form or footer is on screen ---- */
  var sticky = $('#stickyCta');
  if (sticky && 'IntersectionObserver' in window) {
    sticky.hidden = false;
    var pastHero = false, formVisible = false, nearEnd = false;
    function syncSticky() { var show = pastHero && !formVisible && !nearEnd; sticky.classList.toggle('show', show); document.body.classList.toggle('has-sticky', show); }
    new IntersectionObserver(function (en) { pastHero = !en[0].isIntersecting && en[0].boundingClientRect.bottom < 0; syncSticky(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (en) { formVisible = en[0].isIntersecting; syncSticky(); }, { threshold: 0.1 }).observe($('#teams'));
    new IntersectionObserver(function (en) { nearEnd = en[0].isIntersecting; syncSticky(); }, { threshold: 0.05 }).observe($('.site-footer'));
  }

  /* ---- larger-teams form: validates, then opens the visitor's email client with the details filled in.
         There is no server behind this site, so the page never claims to have sent anything itself. ---- */
  var form = $('#teamForm');
  if (form) {
    function check(id, ok) { var el = $('#' + id); el.closest('.field').classList.toggle('invalid', !ok); el.setAttribute('aria-invalid', String(!ok)); return ok; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var a = check('fName', $('#fName').value.trim().length > 1);
      var b = check('fCo', $('#fCo').value.trim().length > 1);
      var c = check('fEmail', /^\S+@\S+\.\S+$/.test($('#fEmail').value.trim()));
      if (!(a && b && c)) { var first = $('.field.invalid input', form); if (first) first.focus(); return; }
      var to = form.getAttribute('data-to');
      var subject = 'ManaGEM: larger team enquiry from ' + $('#fCo').value.trim();
      var body = [
        'Name: ' + $('#fName').value.trim(),
        'Company: ' + $('#fCo').value.trim(),
        'Work email: ' + $('#fEmail').value.trim(),
        'Team size: ' + $('#fTeam').value,
        'What we need: ' + $('#fNeed').value,
        '', 'Sent from the ManaGEM website.'
      ].join('\n');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      $('#formBody').hidden = true; var done = $('#formDone'); done.hidden = false; done.focus();
    });
    ['fName', 'fCo', 'fEmail'].forEach(function (id) {
      $('#' + id).addEventListener('input', function () { $('#' + id).closest('.field').classList.remove('invalid'); $('#' + id).removeAttribute('aria-invalid'); });
    });
    var again = $('#formAgain');
    if (again) again.addEventListener('click', function () { $('#formDone').hidden = true; $('#formBody').hidden = false; $('#fName').focus(); });
  }

  $('#year').textContent = String(new Date().getFullYear());

  /* once the hero copy has entered, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);
})();
