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
  var sticky = $('#stickyCta'), footer = $('.site-footer');
  if (sticky && hero && footer && 'IntersectionObserver' in window) {
    sticky.hidden = false;
    var pastHero = false, nearEnd = false;
    function syncSticky() { var show = pastHero && !nearEnd; sticky.classList.toggle('show', show); document.body.classList.toggle('has-sticky', show); }
    new IntersectionObserver(function (en) { pastHero = !en[0].isIntersecting && en[0].boundingClientRect.bottom < 0; syncSticky(); }, { threshold: 0 }).observe(hero);
    new IntersectionObserver(function (en) { nearEnd = en[0].isIntersecting; syncSticky(); }, { threshold: 0.05 }).observe(footer);
  }

  /* ---- product walkthrough: one clip per step. Each clip plays through once, then the next step
         takes over, so the whole job plays on its own. Picking a step plays that clip and loops it.
         Nothing plays until the section is on screen, and nothing autoplays under reduced motion. ---- */
  var walk = $('#walk');
  if (walk) {
    var wtabs = $$('[role="tab"]', walk), wpanels = wtabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var videos = wpanels.map(function (p) { return p.querySelector('video'); });
    var current = 0, picked = false, onScreen = false;
    function bar(i, frac) { var b = wtabs[i].querySelector('.tab-bar i'); if (b) b.style.width = (frac * 100).toFixed(1) + '%'; }
    function playCurrent() {
      var v = videos[current]; if (!v || reduce || !onScreen) return;
      v.loop = picked;
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    }
    function show(i, focus) {
      current = i;
      wtabs.forEach(function (t, k) {
        var on = k === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; wpanels[k].hidden = !on;
        if (!on) { bar(k, 0); if (videos[k]) { videos[k].pause(); } }
      });
      if (focus) wtabs[i].focus();
      var v = videos[i]; if (v) { try { v.currentTime = 0; } catch (e) {} if (v.preload !== 'auto') v.preload = 'auto'; }
      playCurrent();
    }
    wtabs.forEach(function (t, i) {
      t.addEventListener('click', function () { picked = true; show(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % wtabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + wtabs.length) % wtabs.length;
        else if (e.key === 'Home') n = 0; else if (e.key === 'End') n = wtabs.length - 1;
        if (n === null) return; e.preventDefault(); picked = true; show(n, true);
      });
    });
    videos.forEach(function (v, i) {
      if (!v) return;
      v.addEventListener('timeupdate', function () { if (i === current && v.duration) bar(i, v.currentTime / v.duration); });
      v.addEventListener('ended', function () { if (i !== current) return; if (picked) { v.currentTime = 0; playCurrent(); } else { show((i + 1) % wtabs.length); } });
      if (reduce) v.controls = true;
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        onScreen = en[0].isIntersecting;
        if (onScreen) playCurrent(); else videos.forEach(function (v) { if (v) v.pause(); });
      }, { threshold: 0.35 }).observe(walk);
    } else { onScreen = true; playCurrent(); }
    document.addEventListener('visibilitychange', function () { if (document.hidden) videos.forEach(function (v) { if (v) v.pause(); }); else playCurrent(); });
  }

  var yr = $('#year'); if (yr) yr.textContent = String(new Date().getFullYear());

  /* once the hero copy has entered, freeze it so nothing is left animated */
  setTimeout(function () { document.body.classList.add('ready'); }, reduce ? 0 : 1600);
})();
