// ===== MASTER DATA + USERS + LOGIN =====
const MASTER_CATEGORIES = {
  "Customers": [
    { id:'acct', label:'Account Types', items: [{d:'Cash'},{d:'Credit'},{d:'Pre-Pay'}] },
    { id:'cust', label:'Customer Types', items: [{d:'Repeat Customer'},{d:'Home Owner'},{d:'Warranty Claim'},{d:'New Customer'}] },
    { id:'cstat', label:'Customer Status', items: [{d:'Active'},{d:'Dormant'},{d:'Archived'}] }
  ],
  "Sales": [
    { id:'tgt', label:'Sales Target Types', items: [{d:'Monthly'},{d:'Quarterly'},{d:'Annual'}] },
    { id:'logo', label:'Quote Logos', items: [{d:'Ridgeway Default'},{d:'Ridgeway Premier'},{d:'Ridgeway Light'}] },
    { id:'area', label:'Areas', items: [{d:'Sandton'},{d:'Cape Town'},{d:'Johannesburg'},{d:'Pretoria'},{d:'Mpumalanga'},{d:'Western Cape'}] },
    { id:'src', label:'Sources', items: [{d:'Website'},{d:'Referral'},{d:'Walk-in'},{d:'Repeat'}] }
  ],
  "Projects": [
    { id:'pst', label:'Project Stages', items: [{d:'Scheduled'},{d:'In Progress'},{d:'Completed'},{d:'Delayed'}] },
    { id:'dept', label:'Departments', items: [{d:'Waterproofing'},{d:'Pool'},{d:'Roofing'}] }
  ],
  "Factory": [
    { id:'bt', label:'Build Types', items: [{d:'Custom'},{d:'Stock'},{d:'Prototype'}] },
    { id:'fdept', label:'Factory Departments', items: [{d:'Waterproofing'},{d:'Pool'}] }
  ],
  "Stock": [
    { id:'stt', label:'Store Types', items: [{d:'Hardware'},{d:'Site Container'},{d:'Vehicle'}] },
    { id:'sup', label:'Suppliers', items: [{d:'Apex Coatings'},{d:'Bondline'},{d:'HydroShield'},{d:'SteelForm'},{d:"Trade Depot"}] }
  ]
};

const MasterData = () => {
  const [active, setActive] = React.useState('cust');
  let activeCat = null;
  Object.values(MASTER_CATEGORIES).forEach(arr => arr.forEach(c => { if (c.id === active) activeCat = c; }));

  return (
    <>
      <PageHeader title="Master Data" sub="System reference tables and lookup values"/>
      <div className="md-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, alignItems: 'flex-start' }}>
        <div className="card" style={{ padding: '8px 0' }}>
          {Object.entries(MASTER_CATEGORIES).map(([group, cats]) => (
            <div key={group} style={{ marginBottom: 6 }}>
              <div style={{ padding: '8px 14px 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--slate-500)' }}>{group}</div>
              {cats.map(c => (
                <button key={c.id}
                  onClick={() => setActive(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', textAlign: 'left',
                    padding: '8px 14px',
                    borderLeft: active === c.id ? '3px solid var(--sky)' : '3px solid transparent',
                    background: active === c.id ? 'var(--sky-50)' : 'transparent',
                    fontSize: 13, fontWeight: active === c.id ? 600 : 400,
                    color: active === c.id ? 'var(--text)' : 'var(--slate-700)'
                  }}>
                  <span>{c.label}</span>
                  <span style={{ fontSize: 11, padding: '0 6px', background: 'var(--slate-100)', borderRadius: 999, color: 'var(--slate-600)' }}>{c.items.length}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-hd">
            <h3>{activeCat?.label}</h3>
            <button className="btn btn-primary btn-sm"><Icon name="plus" size={12}/> Add New</button>
          </div>
          <table className="data">
            <thead><tr><th>Description</th><th style={{width:120, textAlign:'right'}}>Actions</th></tr></thead>
            <tbody>
              {activeCat?.items.map((it, i) => (
                <tr key={i}>
                  <td>{it.d}</td>
                  <td style={{textAlign:'right'}}>
                    <button className="row-actions-btn" style={{opacity:1}}><Icon name="pencil" size={13}/></button>
                    <button className="row-actions-btn" style={{opacity:1, color:'var(--red)'}}><Icon name="trash" size={13}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .md-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
};

// ===== USERS =====
const USERS = [
  { fn:"Thabo", ln:"Ndlovu", username:"tndlovu", email:"thabo@ridgeway.example", role:"Admin", login:"Today at 09:14", active:true },
  { fn:"Ethan", ln:"Jacobs", username:"ejacobs", email:"ethan@ridgeway.example", role:"Manager", login:"Today at 08:45", active:true },
  { fn:"Zanele", ln:"Sibiya", username:"zsibiya", email:"zanele@ridgeway.example", role:"Sales Rep", login:"2 hours ago", active:true },
  { fn:"Johan", ln:"Fourie", username:"jfourie", email:"johan@ridgeway.example", role:"Sales Rep", login:"Yesterday at 16:22", active:true },
  { fn:"Sizwe", ln:"Maseko", username:"smaseko", email:"sizwe@ridgeway.example", role:"Viewer", login:"3 days ago", active:true },
  { fn:"Kagiso", ln:"Molefe", username:"kmolefe", email:"kagiso@ridgeway.example", role:"Viewer", login:"Today at 07:30", active:true },
  { fn:"Megan", ln:"Petersen", username:"mpetersen", email:"megan@ridgeway.example", role:"Sales Rep", login:"3 weeks ago", active:false },
  { fn:"Craig", ln:"Abrahams", username:"cabrahams", email:"craig@ridgeway.example", role:"Manager", login:"Last login: never", active:false }
];

const Users = () => {
  const [drawer, setDrawer] = React.useState(null);
  const roleVar = { Admin:'purple', Manager:'sky', 'Sales Rep':'emerald', Viewer:'slate' };
  return (
    <>
      <PageHeader title="Users" sub="8 users · 6 active"
        actions={<button className="btn btn-primary" onClick={() => setDrawer({ mode:'invite' })}><Icon name="mail" size={14}/> Invite User</button>}/>
      <FilterToolbar
        chips={[{label:'Role',value:'All'},{label:'Status',value:'All'}]}
        onChipRemove={()=>{}} exports={false}/>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead><tr>
              <th>User</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th><th style={{width:40}}></th>
            </tr></thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.username} className={!u.active?'muted':''}>
                  <td data-label="User" className="full">
                    <div className="av-row">
                      <Avatar name={u.fn+' '+u.ln} size={28}/>
                      <div>
                        <div style={{fontWeight:600}}>{u.fn} {u.ln}</div>
                        <div style={{fontSize:11.5, color:'var(--slate-500)'}}>@{u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Email" className="cell-mono" style={{fontSize:12, color:'var(--slate-600)'}}>{u.email}</td>
                  <td data-label="Role"><Badge variant={roleVar[u.role]}>{u.role}</Badge></td>
                  <td data-label="Login" style={{color:'var(--slate-600)', fontSize:12}}>{u.login}</td>
                  <td data-label="Status">
                    <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12.5}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:u.active?'var(--emerald)':'var(--slate-300)'}}/>
                      {u.active?'Active':'Inactive'}
                    </span>
                  </td>
                  <td className="actions">
                    <RowMenu items={[
                      { icon:'pencil', label:'Edit User', onClick: () => setDrawer({ mode:'edit', user:u }) },
                      { icon:'key', label:'Reset Password' },
                      { icon:'refresh', label: u.active?'Deactivate':'Reactivate' },
                      { divider:true },
                      { icon:'trash', label:'Delete', danger:true }
                    ]}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Drawer open={!!drawer} onClose={() => setDrawer(null)}
        title={drawer?.mode === 'edit' ? 'Edit User' : 'Invite New User'}
        footer={<>
          <button className="btn btn-ghost" onClick={() => setDrawer(null)}>Cancel</button>
          <button className="btn btn-primary">{drawer?.mode==='edit'?'Save Changes':<><Icon name="send" size={14}/> Send Invite</>}</button>
        </>}>
        <div className="field-row">
          <div className="field"><label>First Name</label><input defaultValue={drawer?.user?.fn||''}/></div>
          <div className="field"><label>Last Name</label><input defaultValue={drawer?.user?.ln||''}/></div>
        </div>
        <div className="field"><label>Email</label><input type="email" defaultValue={drawer?.user?.email||''}/></div>
        <div className="field"><label>Role</label>
          <select defaultValue={drawer?.user?.role||'Sales Rep'}>
            <option>Admin</option><option>Manager</option><option>Sales Rep</option><option>Viewer</option>
          </select>
        </div>
        {drawer?.mode==='edit' ? (
          <>
            <div className="field" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <label style={{margin:0}}>Active</label><Toggle on={drawer?.user?.active}/>
            </div>
            <button className="btn btn-secondary"><Icon name="key" size={14}/> Reset Password</button>
          </>
        ) : (
          <div className="field" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <label style={{margin:0}}>Send invitation email</label><Toggle on={true}/>
          </div>
        )}
      </Drawer>
    </>
  );
};

// ===== LOGIN (separate page) =====
// Placeholder for unbuilt nav items
const Placeholder = ({ title, sub }) => (
  <>
    <PageHeader title={title} sub={sub}/>
    <div className="card">
      <EmptyState icon="info" title={`${title} module`}
        sub="This module follows the same patterns established across the system. Use the sidebar to explore other modules."
        action={<button className="btn btn-secondary">Documentation</button>}/>
    </div>
  </>
);

Object.assign(window, { MasterData, Users, Placeholder });
