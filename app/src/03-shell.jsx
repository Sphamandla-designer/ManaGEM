// Sidebar nav structure
const NAV = [
  { group: "Core", items: [
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" }
  ]},
  { group: "Customers", items: [
    { id: "customers", label: "Customers", icon: "users" },
    { id: "contacts", label: "Customer Contacts", icon: "contact" },
    { id: "warranties", label: "Warranties", icon: "shield" }
  ]},
  { group: "Sales", items: [
    { id: "new-enquiry", label: "New Enquiry", icon: "plus-circle" },
    { id: "enquiries", label: "Open Enquiries", icon: "folder-open", badge: 51 },
    { id: "closed", label: "Closed Enquiries", icon: "folder-check" },
    { id: "invoices", label: "Invoices", icon: "file-text" },
    { id: "sage", label: "Sage Invoices", icon: "receipt" },
    { id: "inspections", label: "Inspection Reports", icon: "clipboard-list" },
    { id: "targets", label: "Sales Targets", icon: "target" },
    { id: "templates", label: "Quote Templates", icon: "file-code" },
    { id: "reports", label: "Reports", icon: "bar-chart-2" },
    { id: "sales-master-data", label: "Master Data", icon: "database" }
  ]},
  { group: "Operations", items: [
    { id: "debtors", label: "Debtors Management", icon: "credit-card" },
    { id: "products", label: "Products & Pricing", icon: "package" },
    { id: "projects", label: "Projects Module", icon: "briefcase" },
    { id: "factory", label: "Factory", icon: "factory", badge: 3, alert: true },
    { id: "stock", label: "Stock Control", icon: "boxes" }
  ]},
  { group: "Admin", items: [
    { id: "staff", label: "Staff Records", icon: "users2" },
    { id: "companies", label: "My Companies", icon: "building2" },
    { id: "users", label: "Manage Users", icon: "user-cog" },
    { id: "master-data", label: "Master Data", icon: "database" },
    { id: "settings", label: "Settings", icon: "settings" }
  ]}
];

const PAGE_META = {
  "dashboard": { crumb: ["Home", "Dashboard"] },
  "customers": { crumb: ["Home", "Customers", "Customer List"] },
  "enquiries": { crumb: ["Home", "Sales", "Open Enquiries"] },
  "enquiry-detail": { crumb: ["Home", "Sales", "Enquiries", "L04/26-124"] },
  "products": { crumb: ["Home", "Operations", "Products & Pricing"] },
  "stock": { crumb: ["Home", "Operations", "Stock Dispatch"] },
  "projects": { crumb: ["Home", "Operations", "Project Bookings"] },
  "factory": { crumb: ["Home", "Operations", "Factory"] },
  "reports": { crumb: ["Home", "Sales", "Reports"] },
  "sales-master-data": { crumb: ["Home", "Sales", "Master Data"] },
  "master-data": { crumb: ["Home", "Admin", "Master Data"] },
  "users": { crumb: ["Home", "Admin", "Manage Users"] }
};

const Sidebar = ({ active, onNavigate, collapsed, setCollapsed, mobileOpen, setMobileOpen, session, onSignOut }) => (
  <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
    <div className="brand">
      <img className="brand-logo" src="../assets/brand/logo-reversed.png" alt="ManaGEM"/>
      <img className="brand-mark-img" src="../assets/brand/mark.png" alt="ManaGEM"/>
    </div>
    <div className="company-switcher">
      <Icon name="building2" size={14} className="building-icon"/>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.company}</span>
      <Icon name="chevron-down" size={12} className="switch-arrow"/>
    </div>
    <nav className="nav">
      {NAV.map(section => (
        <div className="nav-section" key={section.group}>
          <div className="nav-section-label">{section.group}</div>
          {section.items.map(item => (
            <div
              key={item.id}
              className={`nav-item${active === item.id ? ' active' : ''}`}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              title={collapsed ? item.label : undefined}
            >
              <Icon name={item.icon} size={16} className="nav-icon"/>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className={`nav-badge${item.alert ? ' alert' : ''}`}>{item.badge}</span>}
            </div>
          ))}
        </div>
      ))}
    </nav>
    <div className="sidebar-user">
      <div className="avatar">{initialsOf(session.name)}</div>
      <div className="user-meta">
        <div className="nm">{session.name}</div>
        <div className="rl">{session.role}</div>
      </div>
      <button className="icon-btn" title="Sign out" aria-label="Sign out" onClick={onSignOut}><Icon name="log-out" size={14}/></button>
    </div>
    <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
      <Icon name={collapsed ? "chevrons-right" : "chevrons-left"} size={14}/>
      {!collapsed && <span>Collapse</span>}
    </button>
  </aside>
);

const Topbar = ({ crumbs = [], onMenu, session }) => (
  <header className="topbar">
    <button className="menu-toggle" onClick={onMenu}><Icon name="menu" size={18}/></button>
    <div className="crumb">
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className={`sep${i===1?' first':''}`}>/</span>}
          <span className={`${i===crumbs.length-1 ? 'current' : ''} ${i===0 ? 'home' : ''}`}>{c}</span>
        </span>
      ))}
    </div>
    <div className="search">
      <Icon name="search" size={14}/>
      <input placeholder="Search anything…"/>
      <span className="kbd">⌘K</span>
    </div>
    <div className="topbar-right">
      <button className="bell"><Icon name="bell" size={16}/><span className="dot"/></button>
      <span className="avatar" title={session.name} style={{ background: 'linear-gradient(135deg,#0EA5E9,#6366F1)' }}>{initialsOf(session.name)}</span>
    </div>
  </header>
);

const SampleBanner = ({ session }) => {
  const key = 'managem.sampleBannerHidden';
  const [hidden, setHidden] = React.useState(() => { try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; } });
  if (hidden) return null;
  const hide = () => { setHidden(true); try { sessionStorage.setItem(key, '1'); } catch (e) {} };
  const days = trialDaysLeft(session);
  return (
    <div className="sample-banner" role="status">
      <Icon name="info" size={15}/>
      <span className="sample-text">
        {session.demo
          ? <><b>Demo workspace.</b> Everything here is sample data from a fictional company, so click anything.</>
          : <><b>{days} {days === 1 ? 'day' : 'days'} left in your trial.</b> You are exploring sample data from a fictional company. Our take-on team swaps it for your own customers, products and stock.</>}
      </span>
      <a className="sample-cta" href={session.demo ? '#signup' : '../index.html#start'}>{session.demo ? 'Start your free trial' : 'Book your take-on'}</a>
      <button className="sample-x" onClick={hide} aria-label="Hide this message"><Icon name="x" size={14}/></button>
    </div>
  );
};

const Shell = ({ active, onNavigate, onSignOut, children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const session = useSession();
  const meta = PAGE_META[active] || { crumb: ["Home"] };
  return (
    <div className="app">
      <div className={`sidebar-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)}/>
      <Sidebar active={active} onNavigate={onNavigate}
        collapsed={collapsed} setCollapsed={setCollapsed}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
        session={session} onSignOut={onSignOut}/>
      <div className="main">
        <Topbar crumbs={meta.crumb} onMenu={() => setMobileOpen(true)} session={session}/>
        <main className="page"><SampleBanner session={session}/>{children}</main>
      </div>
    </div>
  );
};

window.Shell = Shell;
window.NAV = NAV;
