// ===== SESSION =====
// The prototype has no server. The signed-in person and their workspace live in
// localStorage so the journey from the website, through sign-up, into the app
// holds together across reloads. Every workspace opens on the same sample data,
// from a fictional company, until the take-on team imports the customer's own lists.

const MG_SESSION_KEY = 'managem.session';
const MG_ACCOUNTS_KEY = 'managem.accounts';

const MG_DEMO = {
  name: 'Thabo Ndlovu',
  email: 'thabo@ridgeway.example',
  company: 'Ridgeway Waterproofing',
  role: 'Sales Manager',
  trade: 'Construction and waterproofing',
  demo: true
};

const mgRead = (key, fallback) => {
  try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
};
const mgWrite = (key, value) => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* private mode: the session lasts for this page only */ }
};

let mgMemorySession = null;

const getSession = () => mgMemorySession || mgRead(MG_SESSION_KEY, null);
const setSession = (s) => { mgMemorySession = s; mgWrite(MG_SESSION_KEY, s); };
const clearSession = () => { mgMemorySession = null; mgWrite(MG_SESSION_KEY, null); };

const findAccount = (email) => {
  const list = mgRead(MG_ACCOUNTS_KEY, []);
  return list.find(a => a.email.toLowerCase() === String(email).trim().toLowerCase()) || null;
};
const saveAccount = (account) => {
  const list = mgRead(MG_ACCOUNTS_KEY, []).filter(a => a.email.toLowerCase() !== account.email.toLowerCase());
  list.push(account);
  mgWrite(MG_ACCOUNTS_KEY, list);
};

const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || 'there';
const initialsOf = (name) => String(name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase() || 'MG';
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};
const trialDaysLeft = (s) => {
  if (!s || !s.trialStart) return 14;
  const used = Math.floor((Date.now() - s.trialStart) / 86400000);
  return Math.max(0, 14 - used);
};

const useSession = () => {
  const [s, set] = React.useState(getSession);
  React.useEffect(() => {
    const onStorage = (e) => { if (e.key === MG_SESSION_KEY) set(getSession()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return s || MG_DEMO;
};

Object.assign(window, {
  MG_DEMO, getSession, setSession, clearSession, findAccount, saveAccount,
  firstName, initialsOf, greeting, trialDaysLeft, useSession
});
