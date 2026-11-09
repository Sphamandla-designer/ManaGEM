// ===== SIGN IN / START TRIAL =====
// Email-first: one address field decides the path. A known address asks for the
// password; a new one creates the account, sets up the workspace and opens the
// dashboard. The website's trial buttons land on #signup, "Sign in" on #login.

const TRADES = ['Waterproofing', 'Roofing', 'Building and renovation', 'Manufacturing and factory', 'Maintenance and service', 'Something else'];
const TEAM_SIZES = ['Just me or 2 people', '3 to 5 people', '6 to 10 people', 'More than 10 people'];

const AuthLines = () => {
  // Line art for the brand panel: a fan of curves that sweeps across the panel.
  const paths = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 46; i++) {
      const t = i / 45;
      const y0 = 300 + t * 240;
      const c1x = 260 + t * 120, c1y = 260 + t * 120 - Math.sin(t * 3.1) * 70;
      const c2x = 520 + t * 60,  c2y = 380 + t * 240 + Math.cos(t * 2.4) * 60;
      const x3 = 700 - t * 110,  y3 = 900;
      out.push({ d: `M -20 ${y0.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x3.toFixed(1)} ${y3}`, o: 0.10 + 0.55 * Math.pow(Math.sin(t * Math.PI), 2), hi: i % 9 === 4 });
    }
    return out;
  }, []);
  return (
    <svg className="auth-lines" viewBox="0 0 720 900" preserveAspectRatio="xMinYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="authFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E2E8F0" stopOpacity="0.15"/>
          <stop offset="0.55" stopColor="#E2E8F0" stopOpacity="0.9"/>
          <stop offset="1" stopColor="#00BFA6" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g className="auth-lines-a">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.hi ? '#00BFA6' : 'url(#authFade)'} strokeOpacity={p.hi ? 0.85 : p.o} strokeWidth={p.hi ? 1.4 : 0.9}/>
        ))}
      </g>
    </svg>
  );
};

const ProviderIcon = ({ name }) => name === 'google' ? (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
) : (
  <svg width="15" height="15" viewBox="0 0 23 23" aria-hidden="true"><path fill="#F35325" d="M1 1h10v10H1z"/><path fill="#81BC06" d="M12 1h10v10H12z"/><path fill="#05A6F0" d="M1 12h10v10H1z"/><path fill="#FFBA08" d="M12 12h10v10H12z"/></svg>
);

const SETUP_STEPS = [
  'Creating your workspace',
  'Setting up customers, sales and operations',
  'Loading sample data so you can explore',
  'Opening your dashboard'
];

const Auth = ({ mode = 'login', onDone }) => {
  const [step, setStep] = React.useState('start');      // start | password | details | setup
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [account, setAccount] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [setupAt, setSetupAt] = React.useState(0);
  const [form, setForm] = React.useState({ name: '', company: '', trade: TRADES[0], team: TEAM_SIZES[1], password: '' });
  const [notice, setNotice] = React.useState('');
  const focusRef = React.useRef(null);

  React.useEffect(() => { setStep('start'); setError(''); setNotice(''); }, [mode]);
  React.useEffect(() => { if (focusRef.current) focusRef.current.focus(); }, [step]);
  React.useEffect(() => { document.title = (mode === 'signup' ? 'Start your free trial' : 'Sign in') + ' · ManaGEM'; }, [mode]);

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const continueEmail = (e) => {
    e.preventDefault();
    if (!validEmail(email)) { setError('Enter a valid email address, like name@company.co.za.'); return; }
    setError(''); setBusy(true);
    setTimeout(() => {
      setBusy(false);
      const found = findAccount(email);
      if (found) { setAccount(found); setStep('password'); }
      else { setProvider(null); setStep('details'); }
    }, 450);
  };

  const continueProvider = (p) => {
    setProvider(p); setError(''); setStep('details');
  };

  const signIn = (e) => {
    e.preventDefault();
    const pw = e.target.elements.password.value;
    if (pw !== account.password) { setError('That password does not match this account. Try again, or reset it.'); return; }
    setError(''); setBusy(true);
    setTimeout(() => { setSession({ ...account, password: undefined, signedInAt: Date.now() }); onDone(); }, 500);
  };

  const create = (e) => {
    e.preventDefault();
    const f = form;
    if (!f.name.trim() || !f.company.trim()) { setError('Add your name and your company name.'); return; }
    if (!validEmail(email)) { setError('Enter a valid work email address.'); return; }
    if (!provider && f.password.length < 8) { setError('Choose a password of at least 8 characters.'); return; }
    setError('');
    const acct = {
      name: f.name.trim(), email: email.trim(), company: f.company.trim(), trade: f.trade, team: f.team,
      role: 'Owner', password: provider ? null : f.password, provider: provider || 'email', trialStart: Date.now()
    };
    saveAccount(acct);
    setStep('setup'); setSetupAt(0);
    SETUP_STEPS.forEach((_, i) => setTimeout(() => setSetupAt(i + 1), 650 * (i + 1)));
    setTimeout(() => { setSession({ ...acct, password: undefined, signedInAt: Date.now(), fresh: true }); onDone(); }, 650 * SETUP_STEPS.length + 400);
  };

  const openDemo = (e) => {
    e.preventDefault();
    setSession({ ...MG_DEMO, signedInAt: Date.now() });
    onDone();
  };

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const heading = mode === 'signup'
    ? { h: 'Start your free trial', p: '14 days free, no card needed. Already a customer? Use the same address to sign in.' }
    : { h: 'Sign in or start a trial', p: 'Sign in to your ManaGEM workspace, or create an account.' };

  return (
    <div className="auth">
      <aside className="auth-art">
        <a className="auth-logo" href="../index.html" aria-label="ManaGEM website">
          <img src="../assets/brand/logo-reversed.png" alt="ManaGEM" width="171" height="30"/>
        </a>
        <AuthLines/>
        <figure className="auth-quote">
          <blockquote>“One record per job, from the first enquiry to the final invoice, synced with Sage.”</blockquote>
          <figcaption>~ ManaGEM, built and supported by GEMIS</figcaption>
        </figure>
      </aside>

      <main className="auth-panel">
        <a className="auth-home" href="../index.html">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          Home
        </a>
        <img className="auth-mobile-logo" src="../assets/brand/logo-reversed.png" alt="ManaGEM" width="137" height="24"/>

        <div className="auth-card" aria-live="polite">
          {step === 'start' && (
            <>
              <h1>{heading.h}</h1>
              <p className="auth-sub">{heading.p}</p>
              <div className="auth-providers">
                <button type="button" className="auth-btn" onClick={() => continueProvider('Google')}><ProviderIcon name="google"/>Continue with Google</button>
                <button type="button" className="auth-btn" onClick={() => continueProvider('Microsoft')}><ProviderIcon name="microsoft"/>Continue with Microsoft</button>
              </div>
              <div className="auth-or"><span>or</span></div>
              <form onSubmit={continueEmail} noValidate>
                <label className="auth-label first" htmlFor="authEmail">Enter your work email to sign in or create an account</label>
                <div className={`auth-input${error ? ' has-error' : ''}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                  <input id="authEmail" ref={focusRef} type="email" autoComplete="email" placeholder="you@yourcompany.co.za"
                    value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    aria-invalid={!!error} aria-describedby={error ? 'authErr' : undefined}/>
                </div>
                {error && <p className="auth-error" id="authErr" role="alert">{error}</p>}
                <button className="auth-btn auth-btn-primary" type="submit" disabled={busy}>
                  {busy ? <span className="auth-spin" aria-label="Checking"/> : 'Continue with email'}
                </button>
              </form>
              <p className="auth-fine">By continuing, you agree to the ManaGEM terms of service and privacy notice. Your data is processed in line with POPIA.</p>
              <p className="auth-alt">Just looking? <a href="#demo" onClick={openDemo}>Open the demo workspace</a></p>
            </>
          )}

          {step === 'password' && account && (
            <form onSubmit={signIn} noValidate>
              <h1>Welcome back, {firstName(account.name)}</h1>
              <p className="auth-sub">Signing in to <b>{account.company}</b> as {account.email}.</p>
              <label className="auth-label first" htmlFor="authPw">Password</label>
              <div className={`auth-input${error ? ' has-error' : ''}`}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                <input id="authPw" name="password" ref={focusRef} type={show ? 'text' : 'password'} autoComplete="current-password" onChange={() => setError('')} aria-invalid={!!error}/>
                <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}><Icon name={show ? 'eye-off' : 'eye'} size={15}/></button>
              </div>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-btn auth-btn-primary" type="submit" disabled={busy}>{busy ? <span className="auth-spin" aria-label="Signing in"/> : 'Sign in'}</button>
              {notice && <p className="auth-note">{notice}</p>}
              <div className="auth-row">
                <button type="button" className="auth-link" onClick={() => { setStep('start'); setError(''); setNotice(''); }}>Use a different email</button>
                <button type="button" className="auth-link" onClick={() => setNotice(`We have sent a reset link to ${account.email}. It expires in 30 minutes.`)}>Forgot password?</button>
              </div>
            </form>
          )}

          {step === 'details' && (
            <form onSubmit={create} noValidate>
              <button type="button" className="auth-back" onClick={() => { setStep('start'); setError(''); }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>Back
              </button>
              <h1>Create your account</h1>
              <p className="auth-sub">{provider ? `Finish signing up with ${provider}. ` : ''}Your 14-day trial starts now. No card needed.</p>
              <div className="auth-grid">
                <div>
                  <label className="auth-label" htmlFor="fName">Your name</label>
                  <div className="auth-input"><input id="fName" ref={focusRef} autoComplete="name" value={form.name} onChange={upd('name')} placeholder="Full name"/></div>
                </div>
                <div>
                  <label className="auth-label" htmlFor="fCo">Company</label>
                  <div className="auth-input"><input id="fCo" autoComplete="organization" value={form.company} onChange={upd('company')} placeholder="Company name"/></div>
                </div>
              </div>
              <label className="auth-label" htmlFor="fEmail">Work email</label>
              <div className="auth-input"><input id="fEmail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourcompany.co.za"/></div>
              <div className="auth-grid">
                <div>
                  <label className="auth-label" htmlFor="fTrade">Your trade</label>
                  <div className="auth-input"><select id="fTrade" value={form.trade} onChange={upd('trade')}>{TRADES.map(t => <option key={t}>{t}</option>)}</select></div>
                </div>
                <div>
                  <label className="auth-label" htmlFor="fTeam">People who will log in</label>
                  <div className="auth-input"><select id="fTeam" value={form.team} onChange={upd('team')}>{TEAM_SIZES.map(t => <option key={t}>{t}</option>)}</select></div>
                </div>
              </div>
              {!provider && (
                <>
                  <label className="auth-label" htmlFor="fPw">Password</label>
                  <div className="auth-input">
                    <input id="fPw" type={show ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={upd('password')} placeholder="At least 8 characters"/>
                    <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}><Icon name={show ? 'eye-off' : 'eye'} size={15}/></button>
                  </div>
                </>
              )}
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-btn auth-btn-primary" type="submit">Start my 14-day trial</button>
              <p className="auth-fine">Your workspace opens with sample data from a fictional company so you can explore every module. When you are ready, our take-on team imports your own customers, products and stock, and a person checks every line.</p>
            </form>
          )}

          {step === 'setup' && (
            <div className="auth-setup">
              <h1>Setting up {form.company.trim() || 'your workspace'}</h1>
              <p className="auth-sub">This takes a few seconds.</p>
              <ol>
                {SETUP_STEPS.map((s, i) => (
                  <li key={s} className={i < setupAt ? 'done' : i === setupAt ? 'now' : ''}>
                    <span className="tick" aria-hidden="true">{i < setupAt ? <Icon name="check" size={12}/> : null}</span>{s}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

window.Auth = Auth;
