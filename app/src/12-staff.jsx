// ===== STAFF RECORDS =====

const STAFF_MEMBERS = [
  { id:'EMP-001', name:'Thabo Ndlovu',  jobTitle:'Sales Manager',     type:'Permanent',   dept:'Sales',         joined:'12 Jan 2020', phone:'+27 82 000 0114', email:'thabo@ridgeway.example', status:'Active' },
  { id:'EMP-002', name:'Ethan Jacobs',      jobTitle:'Sales Manager',     type:'Permanent',   dept:'Sales',         joined:'04 Apr 2021', phone:'+27 83 000 0115', email:'ethan@ridgeway.example',      status:'Active' },
  { id:'EMP-003', name:'Zanele Sibiya',  jobTitle:'Sales Rep',         type:'Permanent',   dept:'Sales',         joined:'18 Sep 2022', phone:'+27 71 000 0116', email:'zanele@ridgeway.example',    status:'Active' },
  { id:'EMP-004', name:'Johan Fourie', jobTitle:'Sales Rep',         type:'Fixed-term',  dept:'Sales',         joined:'02 Feb 2023', phone:'+27 84 000 0117', email:'johan@ridgeway.example',    status:'Active' },
  { id:'EMP-005', name:'Sizwe Maseko',  jobTitle:'Foreman',           type:'Permanent',   dept:'Operations',    joined:'15 Mar 2019', phone:'+27 82 000 0118', email:'sizwe@ridgeway.example',    status:'Active' },
  { id:'EMP-006', name:'Kagiso Molefe',  jobTitle:'Foreman',           type:'Permanent',   dept:'Operations',    joined:'08 Aug 2021', phone:'+27 83 000 0119', email:'kagiso@ridgeway.example',   status:'Active' },
  { id:'EMP-007', name:'Willem Venter',  jobTitle:'Foreman',           type:'Contractor',  dept:'Operations',    joined:'22 Oct 2020', phone:'+27 82 000 0120', email:'willemv@ridgeway.example',   status:'Active' },
  { id:'EMP-008', name:'Megan Petersen', jobTitle:'Bookkeeper',        type:'Permanent',   dept:'Admin',         joined:'10 Jun 2018', phone:'+27 71 000 0121', email:'megan@ridgeway.example',    status:'Active' },
  { id:'EMP-009', name:'Craig Abrahams',    jobTitle:'Factory Lead',      type:'Permanent',   dept:'Factory',       joined:'01 Feb 2017', phone:'+27 83 000 0122', email:'craig@ridgeway.example',    status:'Active' }
];

const STAFF_DELETED = [
  { id:'EMP-010', name:'Tatenda Banda',     role:'Sales Rep',         dept:'Sales',         joined:'12 May 2019', exit:'30 Sep 2024', reason:'Resigned',  status:'Inactive' },
  { id:'EMP-011', name:'Ashwin Reddy',    role:'Foreman',           dept:'Operations',    joined:'04 Mar 2020', exit:'15 Jan 2025', reason:'Retrenched',status:'Deleted' },
  { id:'EMP-012', name:'Anika Kruger',      role:'Sales Rep',         dept:'Sales',         joined:'18 Nov 2021', exit:'02 Mar 2026', reason:'Resigned',  status:'Inactive' }
];

const STAFF_FILES = [
  { id:'F-2026-042', employee:'Sizwe Maseko',  type:'Contract',     name:'Employment Contract 2024.pdf',  size:'420 KB', uploaded:'12 Jan 2024' },
  { id:'F-2026-041', employee:'Thabo Ndlovu',  type:'ID Document',  name:'ID-Copy.pdf',                   size:'180 KB', uploaded:'12 Jan 2020' },
  { id:'F-2026-040', employee:'Zanele Sibiya',  type:'Qualification',name:'Diploma-Sales.pdf',             size:'1.2 MB', uploaded:'18 Sep 2022' },
  { id:'F-2026-039', employee:'Johan Fourie', type:'Medical',      name:'Annual-Medical-2026.pdf',       size:'840 KB', uploaded:'12 Mar 2026' },
  { id:'F-2026-038', employee:'Kagiso Molefe',  type:'Certification',name:'Safety-Cert-2026.pdf',          size:'520 KB', uploaded:'08 Feb 2026' },
  { id:'F-2026-037', employee:'Sizwe Maseko',  type:'Disciplinary', name:'Verbal-Warning-Mar26.pdf',      size:'48 KB',  uploaded:'18 Mar 2026' },
  { id:'F-2026-036', employee:'Craig Abrahams',    type:'Contract',     name:'Renewal-2026.pdf',              size:'380 KB', uploaded:'01 Feb 2026' }
];

const PROJECT_RATES = [
  { id:'PR-001', role:'Foreman',          type:'Hourly',    baseRate: 320, otRate: 480, perDiem: 280, mileage: 4.50, effective:'01 Jan 2026' },
  { id:'PR-002', role:'Senior Foreman',   type:'Hourly',    baseRate: 420, otRate: 630, perDiem: 320, mileage: 4.50, effective:'01 Jan 2026' },
  { id:'PR-003', role:'Site Worker',      type:'Daily',     baseRate: 180, otRate: 270, perDiem: 220, mileage: 0,    effective:'01 Jan 2026' },
  { id:'PR-004', role:'Apprentice',       type:'Daily',     baseRate: 120, otRate: 180, perDiem: 180, mileage: 0,    effective:'01 Jan 2026' },
  { id:'PR-005', role:'Driver',           type:'Hourly',    baseRate: 220, otRate: 330, perDiem: 220, mileage: 4.50, effective:'01 Jan 2026' },
  { id:'PR-006', role:'Inspector',        type:'Fixed Fee', baseRate: 485, otRate: 728, perDiem: 320, mileage: 4.50, effective:'01 Jan 2026' }
];

const STAFF_MASTER = {
  "Organisation": [
    { id:'dept',  label:'Departments',        items:['Sales','Operations','Factory','Admin','Workshop'] }
  ],
  "Skills": [
    { id:'qual',  label:'Qualifications',     items:['Matric','National Diploma','Bachelor Degree','Trade Certificate','SAQA Level 4','SAQA Level 5'] },
    { id:'skl',   label:'Skills',             items:['Waterproofing','Roofing','Pool installation','Sealant application','Site supervision','Quality control','Estimating'] }
  ],
  "Staff": [
    { id:'sty',   label:'Staff Types',        items:['Permanent','Fixed-term','Casual','Contractor','Apprentice','Sub-contractor'] }
  ],
  "Documents": [
    { id:'uft',   label:'Upload File Types',  items:['Contract','ID Document','Qualification','Medical','Certification','Disciplinary','Leave','Payroll','Reference letter','Tax certificate'] }
  ]
};

const StaffRecords = ({ tab = 'members', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [activeMaster, setActiveMaster] = React.useState('dept');

  const subTabs = [
    { id:'members',  label:'Staff Members', route:'staff',         ct: STAFF_MEMBERS.length },
    { id:'files',    label:'Staff Files',   route:'staff-files',   ct: STAFF_FILES.length },
    { id:'rates',    label:'Project Rates', route:'staff-rates',   ct: PROJECT_RATES.length },
    { id:'inactive', label:'Inactive / Deleted', route:'staff-inactive', ct: STAFF_DELETED.length },
    { id:'master',   label:'Master Data',   route:'staff-master',  ct: null }
  ];

  const titles = {
    members:'Staff Members',
    files:'Staff Files',
    rates:'Project Rates',
    inactive:'Inactive / Deleted Staff',
    master:'Staff Master Data'
  };
  const subs = {
    members:'Active employees and contractors',
    files:'Documents and records attached to each employee',
    rates:'Day rates, overtime and travel allowances by role',
    inactive:'Staff who have exited or been removed',
    master:'Lookup values used across the Staff module'
  };

  const primary = {
    members:  <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff-new')}><Icon name="plus" size={14}/> New Staff Member</button>,
    files:    <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff-file-new')}><Icon name="upload" size={14}/> Upload File</button>,
    rates:    <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff-rate-new')}><Icon name="plus" size={14}/> New Rate</button>,
    inactive: null,
    master:   null
  };

  let activeMasterCat = null;
  Object.values(STAFF_MASTER).forEach(arr => arr.forEach(c => { if (c.id === activeMaster) activeMasterCat = c; }));

  return (
    <>
      <PageHeader title={titles[tab]} sub={subs[tab]} actions={primary[tab]}/>

      <div className="subtabs" style={{marginBottom:14, overflowX:'auto', flexWrap:'nowrap'}}>
        {subTabs.map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={()=>onNavigate&&onNavigate(t.route)}>
            {t.label}{t.ct !== null && <span className="ct">{t.ct}</span>}
          </button>
        ))}
      </div>

      {tab !== 'master' && (
        <FilterToolbar search={search} setSearch={setSearch}
          chips={tab==='members' ? [{label:'Department',value:'All'},{label:'Role',value:'All'}]
               : tab==='files' ? [{label:'Type',value:'All'},{label:'Employee',value:'All'}]
               : tab==='rates' ? [{label:'Role',value:'All'}]
               : [{label:'Reason',value:'All'}]}
          onChipRemove={()=>{}}/>
      )}

      {/* MEMBERS */}
      {tab === 'members' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>ID</th><th>Department</th><th>Type</th><th>Job Title</th><th>Name</th><th>Phone</th>
            <th style={{width:40}}></th>
          </tr></thead>
          <tbody>
            {STAFF_MEMBERS.filter(s=>!search||(s.id+s.name+s.jobTitle+s.dept+s.phone).toLowerCase().includes(search.toLowerCase())).map(s=>(
              <tr key={s.id} style={{cursor:'pointer'}} onClick={()=>onNavigate&&onNavigate('staff-edit')}>
                <td data-label="ID" className="cell-mono link" style={{fontWeight:600}}>{s.id}</td>
                <td data-label="Department"><Badge variant={s.dept==='Sales'?'sky':s.dept==='Operations'?'emerald':s.dept==='Factory'?'purple':'slate'}>{s.dept}</Badge></td>
                <td data-label="Type"><Badge variant={s.type==='Permanent'?'emerald':s.type==='Contractor'?'purple':'amber'}>{s.type}</Badge></td>
                <td data-label="Job Title" style={{fontWeight:500}}>{s.jobTitle}</td>
                <td data-label="Name" className="full">
                  <div className="av-row"><Avatar name={s.name} size={28}/><span style={{fontWeight:600}}>{s.name}</span></div>
                </td>
                <td data-label="Phone" className="cell-mono" style={{fontSize:12}}>{s.phone}</td>
                <td className="actions" onClick={(e)=>e.stopPropagation()}>
                  <RowMenu items={[
                    {icon:'eye', label:'View Profile'},
                    {icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('staff-edit')},
                    {icon:'file-text', label:'Files'},
                    {divider:true},
                    {icon:'trash', label:'Deactivate', danger:true}
                  ]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div></div>
      )}

      {/* FILES */}
      {tab === 'files' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Ref</th><th>Employee</th><th>Type</th><th>File Name</th>
            <th style={{textAlign:'right'}}>Size</th><th>Uploaded</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>
            {STAFF_FILES.filter(f=>!search||(f.id+f.employee+f.type+f.name).toLowerCase().includes(search.toLowerCase())).map(f=>(
              <tr key={f.id}>
                <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{f.id}</td>
                <td data-label="Employee" className="full">
                  <div className="av-row"><Avatar name={f.employee} size={22}/><span style={{fontWeight:500}}>{f.employee}</span></div>
                </td>
                <td data-label="Type"><Badge variant={
                  f.type==='Contract'?'sky':f.type==='Disciplinary'?'red':f.type==='Medical'?'amber':
                  f.type==='Qualification'?'emerald':f.type==='Certification'?'purple':'slate'}>{f.type}</Badge></td>
                <td data-label="File" style={{fontWeight:500}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                    <Icon name="file-text" size={13} style={{color:'var(--slate-500)'}}/>{f.name}
                  </span>
                </td>
                <td data-label="Size" className="cell-num" style={{color:'var(--slate-600)', fontSize:12}}>{f.size}</td>
                <td data-label="Uploaded" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{f.uploaded}</td>
                <td className="actions">
                  <RowMenu items={[
                    {icon:'eye', label:'View'},
                    {icon:'download', label:'Download'},
                    {icon:'pencil', label:'Edit Tags'},
                    {divider:true},
                    {icon:'trash', label:'Delete', danger:true}
                  ]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div></div>
      )}

      {/* RATES */}
      {tab === 'rates' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Ref</th><th>Role</th><th>Type</th>
            <th style={{textAlign:'right'}}>Base Rate</th>
            <th style={{textAlign:'right'}}>OT Rate (R/hr)</th>
            <th style={{textAlign:'right'}}>Per Diem (R)</th>
            <th style={{textAlign:'right'}}>Mileage (R/km)</th>
            <th>Effective</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>
            {PROJECT_RATES.filter(r=>!search||(r.id+r.role+r.type).toLowerCase().includes(search.toLowerCase())).map(r=>(
              <tr key={r.id}>
                <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{r.id}</td>
                <td data-label="Role" className="cell-bold full">{r.role}</td>
                <td data-label="Type"><Badge variant={r.type==='Hourly'?'sky':r.type==='Daily'?'emerald':'purple'}>{r.type}</Badge></td>
                <td data-label="Base" className="cell-num" style={{fontWeight:600}}>R {r.baseRate.toLocaleString()}</td>
                <td data-label="OT" className="cell-num">R {r.otRate.toLocaleString()}</td>
                <td data-label="Per Diem" className="cell-num">R {r.perDiem.toLocaleString()}</td>
                <td data-label="Mileage" className="cell-num">{r.mileage > 0 ? 'R ' + r.mileage.toFixed(2) : '—'}</td>
                <td data-label="Effective" style={{color:'var(--slate-600)', fontSize:12}}>{r.effective}</td>
                <td className="actions">
                  <RowMenu items={[
                    {icon:'pencil', label:'Edit Rate', onClick:()=>onNavigate&&onNavigate('staff-rate-edit')},
                    {icon:'eye', label:'Rate History'},
                    {divider:true},
                    {icon:'trash', label:'Delete', danger:true}
                  ]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div></div>
      )}

      {/* INACTIVE / DELETED */}
      {tab === 'inactive' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>ID</th><th>Name</th><th>Role</th><th>Department</th>
            <th>Joined</th><th>Exit Date</th><th>Reason</th><th>Status</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>
            {STAFF_DELETED.filter(s=>!search||(s.id+s.name+s.role+s.reason).toLowerCase().includes(search.toLowerCase())).map(s=>(
              <tr key={s.id} className="muted">
                <td data-label="ID" className="cell-mono" style={{fontWeight:600}}>{s.id}</td>
                <td data-label="Name" className="full">
                  <div className="av-row"><Avatar name={s.name} size={28}/><span style={{fontWeight:600}}>{s.name}</span></div>
                </td>
                <td data-label="Role" style={{fontWeight:500}}>{s.role}</td>
                <td data-label="Department"><Badge variant="slate">{s.dept}</Badge></td>
                <td data-label="Joined" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{s.joined}</td>
                <td data-label="Exit" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{s.exit}</td>
                <td data-label="Reason" style={{fontSize:12.5}}>{s.reason}</td>
                <td data-label="Status"><Badge variant={s.status==='Deleted'?'red':'slate'}>{s.status}</Badge></td>
                <td className="actions">
                  <RowMenu items={[
                    {icon:'eye', label:'View Record'},
                    {icon:'refresh', label:'Reactivate'},
                    {divider:true},
                    {icon:'trash', label:'Permanent Delete', danger:true}
                  ]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div></div>
      )}

      {/* MASTER DATA */}
      {tab === 'master' && (
        <div className="md-grid" style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16, alignItems:'flex-start'}}>
          <div className="card" style={{padding:'8px 0'}}>
            {Object.entries(STAFF_MASTER).map(([group, cats]) => (
              <div key={group} style={{marginBottom:6}}>
                <div style={{padding:'10px 14px 4px', fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--slate-500)'}}>{group}</div>
                {cats.map(c => (
                  <button key={c.id} onClick={()=>setActiveMaster(c.id)} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    width:'100%', textAlign:'left', padding:'9px 14px',
                    borderLeft: activeMaster === c.id ? '3px solid var(--sky)' : '3px solid transparent',
                    background: activeMaster === c.id ? 'var(--sky-50)' : 'transparent',
                    fontSize:13, fontWeight: activeMaster === c.id ? 600 : 400,
                    color: activeMaster === c.id ? 'var(--text)' : 'var(--slate-700)'
                  }}>
                    <span>{c.label}</span>
                    <span style={{fontSize:11, padding:'0 7px', background:'var(--slate-100)', borderRadius:999, color:'var(--slate-600)'}}>{c.items.length}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-hd">
              <h3>{activeMasterCat?.label}</h3>
              <button className="btn btn-primary btn-sm"><Icon name="plus" size={12}/> Add New</button>
            </div>
            <table className="data">
              <thead><tr><th style={{width:48}}>#</th><th>Description</th><th style={{width:140, textAlign:'right'}}>Actions</th></tr></thead>
              <tbody>
                {activeMasterCat?.items.map((it,i)=>(
                  <tr key={i}>
                    <td style={{color:'var(--slate-500)', fontFamily:'var(--mono)', fontSize:12}}>{String(i+1).padStart(2,'0')}</td>
                    <td>{it}</td>
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
      )}
      <style>{`@media(max-width:900px){ .md-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
};

// ===== FORMS =====
const StaffMemberForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('staff')}><Icon name="arrow-left" size={14}/> Back to Staff</button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>EMP-001</span>}
      </div>
      <PageHeader title={isEdit?'Edit Staff Member':'New Staff Member'} sub={isEdit?'Update employment details.':'Add a new employee or contractor.'}/>
      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Personal Details</h3>
        <div className="field-row">
          <div className="field"><label>First Name *</label><input defaultValue={isEdit?'Thabo':''}/></div>
          <div className="field"><label>Last Name *</label><input defaultValue={isEdit?'Ndlovu':''}/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>ID Number</label><input defaultValue={isEdit?'000000 0000 000':''}/></div>
          <div className="field"><label>Date of Birth</label><input type="date"/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Email *</label><input type="email" defaultValue={isEdit?'thabo@ridgeway.example':''}/></div>
          <div className="field"><label>Phone *</label><input defaultValue={isEdit?'+27 82 000 0114':''}/></div>
        </div>
        <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Employment</h3>
        <div className="field-row">
          <div className="field"><label>Role *</label>
            <select defaultValue={isEdit?'Sales Manager':''}><option value="">— Select —</option>
              <option>Sales Manager</option><option>Sales Rep</option><option>Foreman</option>
              <option>Site Worker</option><option>Apprentice</option><option>Driver</option>
              <option>Inspector</option><option>Bookkeeper</option><option>Factory Lead</option>
            </select>
          </div>
          <div className="field"><label>Department *</label>
            <select><option>Sales</option><option>Operations</option><option>Factory</option><option>Admin</option><option>Workshop</option></select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Employment Type</label>
            <select><option>Permanent</option><option>Fixed-term</option><option>Casual</option><option>Contractor</option><option>Apprentice</option></select>
          </div>
          <div className="field"><label>Start Date *</label><input type="date" defaultValue={isEdit?'2020-01-12':''}/></div>
        </div>
        <div className="field"><label>Address</label><textarea rows={2}/></div>
        <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:0, padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8}}>
          <div><label style={{margin:0, fontWeight:500}}>Active</label><div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>Inactive staff are hidden from assignment dropdowns.</div></div>
          <Toggle on={true}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('staff')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}><Icon name="trash" size={14}/> Deactivate</button>}
          </div>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Staff Member'}</button>
        </div>
      </div>
    </>
  );
};

const StaffFileForm = ({ onNavigate }) => {
  const fileInputRef = React.useRef();
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('staff-files')}><Icon name="arrow-left" size={14}/> Back to Staff Files</button>
      </div>
      <PageHeader title="Upload Staff File" sub="Attach a document to an employee's record."/>
      <div className="card" style={{padding:24}}>
        <div className="field"><label>Employee *</label>
          <select><option value="">— Select employee —</option>{STAFF_MEMBERS.map(s=><option key={s.id}>{s.name}</option>)}</select>
        </div>
        <div className="field-row">
          <div className="field"><label>File Type *</label>
            <select><option>Contract</option><option>ID Document</option><option>Qualification</option><option>Medical</option><option>Certification</option><option>Disciplinary</option><option>Leave</option><option>Payroll</option></select>
          </div>
          <div className="field"><label>Document Date</label><input type="date" defaultValue="2026-05-27"/></div>
        </div>
        <div className="field" style={{padding:'18px', border:'1px dashed var(--slate-300)', borderRadius:8, textAlign:'center', background:'var(--slate-50)'}}>
          <Icon name="upload" size={24} style={{color:'var(--slate-400)'}}/>
          <div style={{fontSize:13, marginTop:8, fontWeight:500}}>Drag &amp; drop file here</div>
          <div style={{fontSize:11, color:'var(--slate-500)', marginTop:4}}>PDF, PNG, JPEG up to 10MB</div>
          <input ref={fileInputRef} type="file" accept=".pdf,image/png,image/jpeg" style={{display:'none'}}/>
          <button className="btn btn-secondary btn-sm" style={{marginTop:10}} onClick={()=>fileInputRef.current?.click()}>Browse files</button>
        </div>
        <div className="field" style={{margin:0}}><label>Notes</label><textarea rows={3} placeholder="Any context about this document..."/></div>
        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('staff-files')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff-files')}><Icon name="upload" size={14}/> Upload File</button>
        </div>
      </div>
    </>
  );
};

const StaffRateForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('staff-rates')}><Icon name="arrow-left" size={14}/> Back to Project Rates</button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>PR-001</span>}
      </div>
      <PageHeader title={isEdit?'Edit Project Rate':'New Project Rate'} sub={isEdit?'Update rates for this role.':'Set a new role rate and travel allowance.'}/>
      <div className="card" style={{padding:24}}>
        <div className="field-row">
          <div className="field"><label>Role *</label>
            <select defaultValue={isEdit?'Foreman':''}><option value="">— Select —</option>
              <option>Foreman</option><option>Senior Foreman</option><option>Site Worker</option>
              <option>Apprentice</option><option>Driver</option><option>Inspector</option>
            </select>
          </div>
          <div className="field"><label>Type *</label>
            <select defaultValue={isEdit?'Hourly':'Hourly'}>
              <option>Hourly</option><option>Daily</option><option>Fixed Fee</option><option>Per Square Metre</option><option>Per Project</option>
            </select>
          </div>
        </div>
        <div className="field"><label>Effective Date *</label><input type="date" defaultValue="2026-01-01"/></div>
        <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Rates</h3>
        <div className="field-row">
          <div className="field"><label>Base Rate (R/day) *</label><input type="number" defaultValue={isEdit?320:''}/></div>
          <div className="field"><label>Overtime Rate (R/hour) *</label><input type="number" defaultValue={isEdit?480:''}/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Per Diem (R)</label><input type="number" defaultValue={isEdit?280:''}/></div>
          <div className="field"><label>Mileage (R/km)</label><input type="number" step="0.01" defaultValue={isEdit?4.50:''}/></div>
        </div>
        <div className="field"><label>Notes</label><textarea rows={3}/></div>
        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('staff-rates')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}><Icon name="trash" size={14}/> Delete</button>}
          </div>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('staff-rates')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Rate'}</button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { StaffRecords, StaffMemberForm, StaffFileForm, StaffRateForm });
