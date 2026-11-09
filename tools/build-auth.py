#!/usr/bin/env python3
"""Write the account pages: login.html, forgot-password.html and reset-password.html.

    python3 tools/build-auth.py

The three pages share one layout: the brand panel (customer quote over flowing
teal lines) on the left and the form on the right. Their behaviour is in
assets/js/site.js and their styles under "log in" in assets/css/site.css.

The pages talk to the ManaGEM app through the address on <body data-auth-api>
(see the README for the requests and answers each page expects). Every state a
page can show can also be opened directly for review with ?state=<name>,
for example login.html?state=wrong_password.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUTH_API = 'https://app.managem.co.za/api/auth'
APP = 'https://app.managem.co.za/'
SIGNUP = 'https://app.managem.co.za/signup'
DEMO = 'reference/product/managem-app.html#dashboard'
SITE = 'https://sphamandla-designer.github.io/ManaGEM/'

ICON = {
    'back': '<path d="M15 18l-6-6 6-6"/>',
    'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'lock': '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    'eye': '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    'check': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    'demo': '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M10 8.5l4 2.5-4 2.5z"/>',
    'wifi-off': '<path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5.2-2.8M19 13a10 10 0 0 0-2-1.5M2 8.8a15 15 0 0 1 4.2-2.7M10.7 5.1A15 15 0 0 1 22 8.8"/><circle cx="12" cy="20" r=".8" fill="currentColor"/>',
    'mail-sent': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/><path d="M16 17l2 2 4-4"/>',
    'link-off': '<path d="M9 17H7a5 5 0 0 1 0-10h2M15 7h2a5 5 0 0 1 4 8M8 12h3M3 3l18 18"/>',
    'shield': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
}


def svg(name, cls='', width=2):
    c = f' class="{cls}"' if cls else ''
    return (f'<svg{c} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{width}" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')


def paths(position):
    """The flowing lines: 36 curves per side, each drawn in and out by CSS (see .auth-paths)."""
    out = ['      <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" focusable="false">']
    for i in range(36):
        a, b = 380 - i * 5 * position, 189 + i * 6
        c, d, e, f = 312 - i * 5 * position, 216 - i * 6, 152 - i * 5 * position, 343 - i * 6
        g, h, k, m = 616 - i * 5 * position, 470 - i * 6, 684 - i * 5 * position, 875 - i * 6
        o = f'{0.06 + i * 0.018:.3f}'
        out.append(f'        <path d="M-{a} -{b}C-{a} -{b} -{c} {d} {e} {f}C{g} {h} {k} {m} {k} {m}" pathLength="1" '
                   f'stroke-width="{round(0.5 + i * 0.03, 2):g}" stroke-opacity="{o}" '
                   f'style="--o:{o};--d:{20 + (i % 6) * 2}s;--dl:{-round(i * 0.7, 1):g}s"/>')
    out.append('      </svg>')
    return '\n'.join(out)


def password_field(fid, name, label, autocomplete, extra=''):
    return f'''          <div class="auth-field">
            <label for="{fid}">{label}</label>
            <div class="auth-input">
              {svg('lock')}
              <input id="{fid}" name="{name}" type="password" autocomplete="{autocomplete}" required aria-describedby="{fid}-err{extra}">
              <button class="auth-reveal" type="button" aria-controls="{fid}" aria-pressed="false" aria-label="Show password">
                {svg('eye', 'i-show')}
                {svg('eye-off', 'i-hide')}
              </button>
            </div>
            <p class="auth-err" id="{fid}-err" hidden></p>
          </div>'''


ALERT = '<div class="auth-alert" role="alert" tabindex="-1" hidden></div>'
OFFLINE = (f'<p class="auth-offline" id="authOffline" hidden>{svg("wifi-off")}'
           '<span><b>You’re offline.</b> Check your internet connection. This page will be ready when you’re back.</span></p>')

LOGIN = f'''        <a class="auth-logo" href="index.html"><img src="assets/brand/logo.png" alt="ManaGEM home" width="137" height="24"></a>
        <div class="auth-head">
          <h1>Log in to ManaGEM</h1>
          <p>Welcome back. Enter your username and password to continue.</p>
        </div>
        {OFFLINE}

        <form id="loginForm" class="auth-form" method="post" action="{APP}" novalidate>
          {ALERT}
          <div class="auth-field">
            <label for="l-user">Username</label>
            <div class="auth-input">
              {svg('user')}
              <input id="l-user" name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required aria-describedby="l-user-err">
            </div>
            <p class="auth-err" id="l-user-err" hidden></p>
          </div>
{password_field('l-pass', 'password', 'Password', 'current-password')}
          <div class="auth-row">
            <label class="auth-check"><input type="checkbox" name="remember" value="1"><span class="auth-box" aria-hidden="true">{svg('check', width=3)}</span>Remember me</label>
            <a class="auth-link" id="forgotLink" href="forgot-password.html">Forgot password?</a>
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Log in</button>
          <p class="auth-status" role="status" aria-live="polite"></p>
        </form>

        <div class="auth-divider" role="presentation"><span>or</span></div>

        <a class="btn btn-outline btn-lg btn-block" href="{DEMO}">{svg('demo')}Try the demo</a>

        <p class="auth-signup">Don’t have an account? <a class="auth-link" id="signupLink" href="{SIGNUP}" data-signup>Start free trial</a></p>'''

FORGOT = f'''        <a class="auth-logo" href="index.html"><img src="assets/brand/logo.png" alt="ManaGEM home" width="137" height="24"></a>
        <div class="auth-step" id="forgotStep">
          <div class="auth-head">
            <h1>Reset your password</h1>
            <p>Enter the username or email address on your ManaGEM account. We’ll email you a link to choose a new password.</p>
          </div>
          {OFFLINE}
          <form id="forgotForm" class="auth-form" novalidate>
            {ALERT}
            <div class="auth-field">
              <label for="r-ident">Username or email address</label>
              <div class="auth-input">
                {svg('mail')}
                <input id="r-ident" name="identifier" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required aria-describedby="r-ident-err">
              </div>
              <p class="auth-err" id="r-ident-err" hidden></p>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit">Email me a reset link</button>
            <p class="auth-status" role="status" aria-live="polite"></p>
          </form>
          <a class="auth-back" href="login.html">{svg('back')}Back to log in</a>
        </div>

        <div class="auth-view" id="forgotSent" tabindex="-1" hidden>
          <span class="auth-badge">{svg('mail-sent')}</span>
          <div class="auth-head">
            <h1>Check your email</h1>
            <p>If an account matches <b id="sentTo"></b>, we’ve sent it a link to reset your password. Open the email from ManaGEM and follow the link to choose a new password.</p>
          </div>
          <ul class="auth-tips">
            <li>Not there after a few minutes? Check your spam or junk folder.</li>
            <li>The link works once. If it has stopped working, ask for a new one.</li>
          </ul>
          <form id="resendForm" class="auth-form" novalidate>
            {ALERT}
            <button class="btn btn-outline btn-lg btn-block" type="submit">Send the email again</button>
            <p class="auth-status" role="status" aria-live="polite"></p>
          </form>
          <p class="auth-signup"><button class="auth-textbtn" type="button" id="changeIdent">Use a different username or email</button></p>
          <a class="auth-back" href="login.html">{svg('back')}Back to log in</a>
        </div>'''

RESET = f'''        <a class="auth-logo" href="index.html"><img src="assets/brand/logo.png" alt="ManaGEM home" width="137" height="24"></a>
        <div class="auth-step" id="resetStep">
          <div class="auth-head">
            <h1>Choose a new password</h1>
            <p>Pick a password you don’t use anywhere else. You’ll use it the next time you log in.</p>
          </div>
          {OFFLINE}
          <form id="resetForm" class="auth-form" novalidate>
            {ALERT}
{password_field('n-pass', 'password', 'New password', 'new-password', ' n-reqs')}
            <ul class="auth-reqs" id="n-reqs" aria-label="Your new password needs">
              <li data-req="length">{svg('check', width=3)}At least 8 characters</li>
              <li data-req="mix">{svg('check', width=3)}A letter and a number</li>
            </ul>
{password_field('n-confirm', 'confirm', 'Confirm new password', 'new-password')}
            <button class="btn btn-primary btn-lg btn-block" type="submit">Save new password</button>
            <p class="auth-status" role="status" aria-live="polite"></p>
          </form>
          <a class="auth-back" href="login.html">{svg('back')}Back to log in</a>
        </div>

        <div class="auth-view" id="resetDone" tabindex="-1" hidden>
          <span class="auth-badge auth-badge-ok">{svg('shield')}</span>
          <div class="auth-head">
            <h1>Password changed</h1>
            <p>Your new password is saved. Log in with it to carry on where you left off.</p>
          </div>
          <a class="btn btn-primary btn-lg btn-block" href="login.html?state=password_reset">Log in</a>
        </div>

        <div class="auth-view" id="resetInvalid" tabindex="-1" hidden>
          <span class="auth-badge auth-badge-warn">{svg('link-off')}</span>
          <div class="auth-head">
            <h1>This link doesn’t work any more</h1>
            <p>Reset links work once and stop working after a while. Ask for a new one and use the latest email we send.</p>
          </div>
          <a class="btn btn-primary btn-lg btn-block" href="forgot-password.html">Send me a new link</a>
          <a class="auth-back" href="login.html">{svg('back')}Back to log in</a>
        </div>'''

PAGES = [
    ('login.html', 'Log in · ManaGEM', 'Log in to ManaGEM with your username and password, or try the demo.', LOGIN),
    ('forgot-password.html', 'Reset your password · ManaGEM', 'Reset your ManaGEM password. We’ll email you a link to choose a new one.', FORGOT),
    ('reset-password.html', 'Choose a new password · ManaGEM', 'Choose a new password for your ManaGEM account.', RESET),
]


def page(name, title, description, card):
    return f'''<!DOCTYPE html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="{SITE}{name}">
<meta name="theme-color" content="#0B1222">
<link rel="icon" type="image/png" sizes="32x32" href="assets/brand/ManaGEM-favicon-32.png">
<link rel="apple-touch-icon" href="assets/brand/ManaGEM-favicon-180.png">
<link rel="preload" href="assets/fonts/outfit-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
</head>
<body class="auth-body" data-signup="{SIGNUP}" data-app="{APP}" data-auth-api="{AUTH_API}">
<a class="skip" href="#main">Skip to the form</a>
<div class="auth">
  <aside class="auth-art">
    <a class="auth-brand" href="index.html"><img src="assets/brand/logo-reversed.png" alt="ManaGEM home" width="160" height="28"></a>
    <div class="auth-paths" aria-hidden="true">
{paths(1)}
{paths(-1)}
    </div>
    <figure class="auth-quote">
      <blockquote><p>“We used to chase job status on WhatsApp and spreadsheets. Now the office sees every quote, job and invoice in one place.”</p></blockquote>
      <figcaption>Operations manager, waterproofing contractor<span>Gauteng · 6 users</span></figcaption>
    </figure>
  </aside>

  <main id="main" class="auth-main">
    <a class="auth-home" href="index.html">{svg('back')}Home</a>

    <div class="auth-center">
      <div class="auth-card">
{card}
      </div>
    </div>

    <nav class="auth-foot" aria-label="Terms, privacy and support">
      <a href="mailto:info@gemis.co.za?subject=ManaGEM%20terms%20of%20use">Terms of use</a>
      <a href="mailto:info@gemis.co.za?subject=ManaGEM%20privacy%20notice">Privacy</a>
      <a href="support.html" id="supportLink">Support</a>
      <span>© <span id="year">2026</span> GEM Information Systems</span>
    </nav>
  </main>
</div>
<script src="assets/js/site.js" defer></script>
</body>
</html>
'''


if __name__ == '__main__':
    for name, title, description, card in PAGES:
        (ROOT / name).write_text(page(name, title, description, card))
    print('written:', ', '.join(p[0] for p in PAGES))
