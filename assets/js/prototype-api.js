/* ManaGEM prototype API.
   Until the ManaGEM app answers at its real address, the account pages point
   <body data-auth-api> at "prototype-api" and this file answers those requests in
   the browser, with the same statuses and bodies the README lists for the app.
   Accounts and the signed-in session are kept in localStorage, and a successful
   log-in or sign-up opens the product prototype as that person and company.
   Remove this script and set data-auth-api to the app's address to go live. */
(function () {
  'use strict';
  var BASE = 'prototype-api';
  var APP = 'reference/product/managem-app.html#dashboard';
  var ACCOUNTS = 'managem.accounts', SESSION = 'managem.session', RESETS = 'managem.resetTokens';

  /* The demo account matches the prototype's default user. */
  var DEMO = { username: 'demo', password: 'demo1234', name: 'Liam Botha', email: 'liam@managem.co.za',
    company: 'ManaGEM', role: 'Sales Manager', demo: true };

  function read(key, fallback) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ } }
  function accounts() { var list = read(ACCOUNTS, []); return [DEMO].concat(list); }
  function find(id) {
    id = String(id || '').trim().toLowerCase();
    return accounts().filter(function (a) { return a.username.toLowerCase() === id || (a.email || '').toLowerCase() === id; })[0] || null;
  }
  function startSession(a) {
    write(SESSION, { name: a.name, username: a.username, email: a.email, company: a.company, role: a.role,
      trialStart: a.demo ? null : a.trialStart, signedInAt: Date.now() });
  }
  function reply(status, body) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(new Response(body === undefined ? null : JSON.stringify(body), { status: status, headers: { 'Content-Type': 'application/json' } }));
      }, 450);
    });
  }
  var USERNAME = /^[A-Za-z0-9._@-]{2,64}$/, EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var strong = function (p) { return typeof p === 'string' && p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p); };

  var routes = {
    '/login': function (b) {
      if (!USERNAME.test(b.username || '')) return reply(400, { error: 'invalid_username' });
      var a = find(b.username);
      if (!a) return reply(404, { error: 'user_not_found' });
      if (a.password !== b.password) return reply(401, { error: 'wrong_password' });
      startSession(a);
      return reply(200, { redirect: APP });
    },
    '/signup': function (b) {
      var errors = {};
      if (!String(b.name || '').trim()) errors.name = 'required';
      if (!String(b.company || '').trim()) errors.company = 'required';
      if (!EMAIL.test(String(b.email || '').trim())) errors.email = 'invalid';
      if (!USERNAME.test(b.username || '')) errors.username = 'invalid';
      if (!strong(b.password)) errors.password = 'weak';
      if (Object.keys(errors).length) return reply(422, { error: 'invalid_fields', fields: errors });
      if (find(b.username)) return reply(409, { error: 'username_taken' });
      if (find(b.email)) return reply(409, { error: 'email_taken' });
      var a = { username: b.username.trim(), password: b.password, name: b.name.trim(), email: b.email.trim(),
        company: b.company.trim(), trade: b.trade || '', team: b.team || '', role: 'Owner', trialStart: Date.now() };
      write(ACCOUNTS, read(ACCOUNTS, []).concat([a]));
      startSession(a);
      return reply(201, { redirect: APP });
    },
    '/forgot-password': function (b) {
      var a = find(b.identifier);
      if (a && !a.demo) { var t = read(RESETS, {}); t[Math.random().toString(36).slice(2)] = a.username; write(RESETS, t); }
      return reply(202);
    },
    '/reset-password': function (b) {
      var t = read(RESETS, {}), username = t[b.token];
      if (!b.token) return reply(400, { error: 'token_invalid' });
      if (!username) return reply(410, { error: 'token_expired' });
      if (!strong(b.password)) return reply(422, { error: 'weak_password', message: 'Use at least 8 characters, with a letter and a number.' });
      var list = read(ACCOUNTS, []).map(function (a) { if (a.username === username) a.password = b.password; return a; });
      write(ACCOUNTS, list); delete t[b.token]; write(RESETS, t);
      return reply(200, {});
    }
  };

  var realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (url.indexOf(BASE + '/') !== 0) return realFetch(input, init);
    var route = routes[url.slice(BASE.length)];
    if (!route) return reply(404);
    var body = {};
    try { body = JSON.parse((init && init.body) || '{}'); } catch (e) { return reply(400, {}); }
    return route(body);
  };
})();
