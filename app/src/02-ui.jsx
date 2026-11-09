// ===== Shared building blocks =====

const Badge = ({ variant = "slate", children, dot = false }) => (
  <span className={`badge badge-${variant}${dot ? ' badge-dot' : ''}`}>{children}</span>
);

const Avatar = ({ name = "", size = 22, color }) => {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  const colors = ["#0EA5E9","#10B981","#8B5CF6","#F59E0B","#EF4444","#6366F1","#EC4899","#14B8A6"];
  const seed = name.split('').reduce((a,c)=>a + c.charCodeAt(0), 0);
  const bg = color || colors[seed % colors.length];
  return (
    <span className="av-sm" style={{ width: size, height: size, fontSize: size * 0.42, background: bg }}>
      {initials}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    "Active": "emerald", "Dormant": "slate", "Scheduled": "sky",
    "Paid": "emerald", "Deposit Paid": "emerald", "Overdue": "red", "Pending": "amber",
    "Invoiced": "slate", "Not Quoted": "amber", "Cancelled": "red",
    "In Progress": "sky", "Completed": "emerald", "Delayed": "amber",
    "In Build": "sky", "QC": "purple", "Ready": "emerald",
    "Inactive": "slate", "Won": "emerald", "Lost": "red", "Open": "sky",
    "Quoted": "sky", "New Lead": "purple"
  };
  return <Badge variant={map[status] || "slate"}>{status}</Badge>;
};

const TypeBadge = ({ type }) => {
  const map = {
    "Repeat Customer": "purple", "Home Owner": "sky",
    "Warranty Claim": "amber", "New Customer": "emerald"
  };
  return <Badge variant={map[type] || "slate"}>{type}</Badge>;
};

const Checkbox = ({ checked, onChange }) => (
  <span className={`checkbox${checked ? ' checked' : ''}`} onClick={(e)=>{e.stopPropagation(); onChange && onChange(!checked);}}>
    <Icon name="check" size={10}/>
  </span>
);

const RowMenu = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block' }} className="row-actions">
      <button className="row-actions-btn" onClick={(e)=>{e.stopPropagation(); setOpen(!open);}}>
        <Icon name="more-horizontal" size={16}/>
      </button>
      {open && (
        <div className="menu-pop" style={{ right: 0, top: 32 }} onClick={(e)=>e.stopPropagation()}>
          {items.map((it, i) => it.divider ? <div key={i} className="menu-divider"/> : (
            <button key={i} className={`menu-item${it.danger ? ' danger' : ''}`} onClick={()=>{setOpen(false); it.onClick && it.onClick();}}>
              <Icon name={it.icon} size={14}/> {it.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
};

const PageHeader = ({ title, sub, actions }) => (
  <div className="page-header">
    <div>
      <h1 className="page-title">{title}</h1>
      {sub && <div className="page-sub">{sub}</div>}
    </div>
    {actions && <div className="page-actions">{actions}</div>}
  </div>
);

const FilterToolbar = ({ search, setSearch, chips = [], onAddFilter, onChipRemove, exports = true, extra }) => (
  <div className="toolbar">
    <div className="input-search">
      <Icon name="search" size={14}/>
      <input value={search || ''} onChange={(e)=>setSearch && setSearch(e.target.value)} placeholder="Search…"/>
    </div>
    {chips.map((c, i) => (
      <span className="chip" key={i}>
        <span><span style={{color:'var(--slate-500)'}}>{c.label}:</span> {c.value}</span>
        <button className="x" onClick={() => onChipRemove && onChipRemove(i)}><Icon name="x" size={12}/></button>
      </span>
    ))}
    <button className="chip-add" onClick={onAddFilter}>
      <Icon name="plus" size={11}/> Add filter
    </button>
    <div className="toolbar-right">
      {extra}
      {exports && (
        <span className="export-group">
          <button className="btn btn-ghost btn-sm">CSV</button>
          <button className="btn btn-ghost btn-sm">Excel</button>
          <button className="btn btn-ghost btn-sm">PDF</button>
        </span>
      )}
    </div>
  </div>
);

const Pager = ({ total = 243, page = 1, perPage = 10, onPage }) => {
  const pages = Math.max(1, Math.ceil(total/perPage));
  const view = [];
  const cur = Math.min(page, pages);
  const start = (cur-1)*perPage + 1;
  const end = Math.min(cur*perPage, total);
  for (let p of [1,2,3]) if (p<=pages) view.push(p);
  if (pages > 5) view.push('…');
  if (pages > 3) view.push(pages);
  return (
    <div className="pager">
      <span>Showing {start}–{end} of {total} results</span>
      <div className="pager-pages">
        <select defaultValue={perPage}><option>10</option><option>25</option><option>50</option></select>
        <button><Icon name="chevron-left" size={14}/></button>
        {view.map((p,i) => p === '…'
          ? <span key={i} style={{padding:'0 4px'}}>…</span>
          : <button key={i} className={p===cur?'active':''} onClick={()=>onPage&&onPage(p)}>{p}</button>)}
        <button><Icon name="chevron-right" size={14}/></button>
      </div>
    </div>
  );
};

const EmptyState = ({ icon = "inbox", title, sub, action }) => (
  <div className="empty">
    <div className="empty-icon"><Icon name={icon} size={28}/></div>
    <h3>{title}</h3>
    {sub && <p>{sub}</p>}
    {action}
  </div>
);

const Drawer = ({ open, onClose, title, children, footer, width = 480 }) => (
  <>
    <div className={`drawer-bg${open ? ' open' : ''}`} onClick={onClose}/>
    <div className={`drawer${open ? ' open' : ''}`} style={{ width }}>
      <div className="drawer-hd">
        <h3>{title}</h3>
        <button className="row-actions-btn" onClick={onClose}><Icon name="x" size={16}/></button>
      </div>
      <div className="drawer-bd">{children}</div>
      {footer && <div className="drawer-ft">{footer}</div>}
    </div>
  </>
);

const Toggle = ({ on, onChange }) => (
  <span className={`toggle${on ? ' on' : ''}`} onClick={()=>onChange&&onChange(!on)}/>
);

Object.assign(window, { Badge, Avatar, StatusBadge, TypeBadge, Checkbox, RowMenu, PageHeader, FilterToolbar, Pager, EmptyState, Drawer, Toggle });
