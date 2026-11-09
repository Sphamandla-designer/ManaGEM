// ===== PROJECTS MODULE =====
const JOBS = [
  { id:'J-2026-0042', customer:'Orion Group',         desc:'HQ Roof refurb',          foreman:'Kagiso M.', start:'01 May 2026', end:'12 May 2026', progress:78,  status:'Current',  area:'Sandton' },
  { id:'J-2026-0041', customer:'Riverside Sports',       desc:'Hockey Pavilion',         foreman:'Sizwe M.',  start:'02 May 2026', end:'18 May 2026', progress:45,  status:'Current',  area:'JHB' },
  { id:'J-2026-0040', customer:'Highlands Estates',   desc:'Block C balconies',       foreman:'Willem V.',  start:'28 Apr 2026', end:'08 May 2026', progress:92,  status:'Current',  area:'CT' },
  { id:'J-2026-0039', customer:'Meridian Holdings',    desc:'Parking deck membrane',   foreman:'Kagiso M.', start:'24 Apr 2026', end:'15 May 2026', progress:60,  status:'Current',  area:'Pretoria' },
  { id:'J-2026-0038', customer:'Oakwood Schools',desc:'Hall ceiling repair',     foreman:null,         start:'06 May 2026', end:'10 May 2026', progress:0,   status:'Pending',  area:'CT' },
  { id:'J-2026-0037', customer:'Fish Eagle Lodge',  desc:'Pool deck resurface',     foreman:null,         start:'08 May 2026', end:'14 May 2026', progress:0,   status:'Pending',  area:'Mpumalanga' },
  { id:'J-2026-0036', customer:'Marula Properties', desc:'Office Block C',          foreman:'Willem V.',  start:'10 Apr 2026', end:'22 Apr 2026', progress:100, status:'Closed',   area:'Sandton' },
  { id:'J-2026-0035', customer:'Seaview BC',     desc:'External re-coat',        foreman:'Sizwe M.',  start:'02 Apr 2026', end:'18 Apr 2026', progress:100, status:'Closed',   area:'JHB' },
  { id:'J-2026-0030', customer:'Fourways Co',      desc:'Wall re-coat',            foreman:'—',          start:'—',           end:'—',           progress:0,   status:'Deleted',  area:'Sandton' }
];

const PROJECT_BOOKINGS = [
  { id:'B-2026-0084', customer:'Orion Group',         start:'01 May 2026', days:8,  foreman:'Kagiso M.', address:'40 Kiaat Ave, Midrand',     status:'Scheduled', sage:'Imported' },
  { id:'B-2026-0083', customer:'Riverside Sports',       start:'02 May 2026', days:14, foreman:'Sizwe M.',  address:'Riverside College Hockey Pavilion',      status:'Scheduled', sage:'Imported' },
  { id:'B-2026-0082', customer:'Highlands Estates',   start:'28 Apr 2026', days:10, foreman:'Willem V.',  address:'Highlands Block C',           status:'In Progress', sage:'Imported' },
  { id:'B-2026-0081', customer:'Meridian Holdings',    start:'05 May 2026', days:7,  foreman:'Kagiso M.', address:'9 Meridian Close, Fourways',  status:'Scheduled', sage:'Pending' },
  { id:'B-2026-0080', customer:'Oakwood Schools',start:'06 May 2026', days:4,  foreman:null,         address:'Oakwood Primary School', status:'Awaiting Foreman', sage:'Pending' },
  { id:'B-2026-0079', customer:'Fish Eagle Lodge',  start:'08 May 2026', days:6,  foreman:null,         address:'Fish Eagle Lodge',          status:'Awaiting Foreman', sage:'Not synced' }
];

const ProjectsModule = ({ tab = 'current', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind:'preset', preset:'month' });

  // group 1 — Jobs
  const jobsTabs = [
    { id:'current',  label:'Current Jobs',     route:'projects-current',  ct: JOBS.filter(j=>j.status==='Current').length },
    { id:'pending',  label:'Pending',          route:'projects-pending',  ct: JOBS.filter(j=>j.status==='Pending').length },
    { id:'closed',   label:'Closed',           route:'projects-closed',   ct: JOBS.filter(j=>j.status==='Closed').length },
    { id:'deleted',  label:'Deleted',          route:'projects-deleted',  ct: JOBS.filter(j=>j.status==='Deleted').length },
    { id:'reports',  label:'Projects Reports', route:'projects-reports',  ct: null }
  ];
  // group 2 — Bookings
  const bookingsTabs = [
    { id:'bookings',         label:'Bookings',          route:'bookings',          ct: PROJECT_BOOKINGS.length },
    { id:'booking-reports',  label:'Booking Reports',   route:'bookings-reports',  ct: null },
    { id:'calendar',         label:'Calendar',          route:'bookings-calendar', ct: null },
    { id:'sage-imports',     label:'Sage Imports',      route:'bookings-sage',     ct: PROJECT_BOOKINGS.filter(b=>b.sage==='Pending').length || null },
    { id:'sage-settings',    label:'Sage Settings',     route:'bookings-settings', ct: null }
  ];

  const inJobs = jobsTabs.some(t => t.id === tab);
  const inBookings = bookingsTabs.some(t => t.id === tab);

  const title = inJobs
    ? (tab==='reports' ? 'Projects Reports' : tab==='current' ? 'Current Jobs' : tab==='pending' ? 'Pending Jobs' : tab==='closed' ? 'Closed Jobs' : 'Deleted Jobs')
    : tab === 'bookings' ? 'Bookings'
    : tab === 'booking-reports' ? 'Booking Reports'
    : tab === 'calendar' ? 'Calendar'
    : tab === 'sage-imports' ? 'Sage Imports'
    : 'Sage Settings';

  const sub = inJobs ? 'Project work currently active or in the pipeline' : 'Scheduled bookings, calendar and Sage Accounting sync';

  const filteredJobs = JOBS.filter(j => {
    if (tab==='current' && j.status !== 'Current') return false;
    if (tab==='pending' && j.status !== 'Pending') return false;
    if (tab==='closed'  && j.status !== 'Closed')  return false;
    if (tab==='deleted' && j.status !== 'Deleted') return false;
    if (!search) return true;
    return (j.id+j.customer+j.desc+(j.foreman||'')).toLowerCase().includes(search.toLowerCase());
  });

  const primary = tab === 'bookings'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('booking-new')}><Icon name="plus" size={14}/> New Booking</button>
    : tab === 'sage-imports'
    ? <button className="btn btn-primary"><Icon name="refresh" size={14}/> Import from Sage</button>
    : tab === 'sage-settings' || tab === 'calendar' || tab === 'reports' || tab === 'booking-reports'
    ? null
    : <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('job-new')}><Icon name="plus" size={14}/> New Job</button>;

  return (
    <>
      <PageHeader title={title} sub={sub} actions={primary}/>

      {/* GROUP SELECTOR */}
      <div style={{display:'flex', gap:0, marginBottom:14, background:'var(--slate-100)', padding:3, borderRadius:8, width:'fit-content'}}>
        <button onClick={()=>onNavigate&&onNavigate('projects-current')} style={{padding:'7px 14px', borderRadius:6, fontSize:12.5, fontWeight:600, background: inJobs ? 'white':'transparent', color: inJobs ? 'var(--text)':'var(--slate-600)', boxShadow: inJobs ? '0 1px 2px rgba(15,23,42,0.06)':'none'}}>Jobs</button>
        <button onClick={()=>onNavigate&&onNavigate('bookings')} style={{padding:'7px 14px', borderRadius:6, fontSize:12.5, fontWeight:600, background: inBookings ? 'white':'transparent', color: inBookings ? 'var(--text)':'var(--slate-600)', boxShadow: inBookings ? '0 1px 2px rgba(15,23,42,0.06)':'none'}}>Bookings &amp; Calendar</button>
      </div>

      <div className="subtabs" style={{marginBottom:14}}>
        {(inJobs ? jobsTabs : bookingsTabs).map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={()=>onNavigate&&onNavigate(t.route)}>
            {t.label}{t.ct !== null && t.ct !== undefined && <span className="ct">{t.ct}</span>}
          </button>
        ))}
      </div>

      {(tab==='current' || tab==='pending' || tab==='closed' || tab==='deleted') && (
        <>
          <FilterToolbar search={search} setSearch={setSearch}
            chips={[{label:'Foreman',value:'All'},{label:'Area',value:'All'}]}
            onChipRemove={()=>{}} extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th>Job No</th><th>Customer</th><th>Description</th><th>Area</th>
                  <th>Foreman</th><th>Start</th><th>End</th><th>Progress</th>
                  <th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {filteredJobs.map(j=>(
                    <tr key={j.id} className={j.status==='Deleted'?'muted':''}>
                      <td data-label="Job" className="cell-mono link" style={{fontWeight:600}}>{j.id}</td>
                      <td data-label="Customer" className="cell-bold full">{j.customer}</td>
                      <td data-label="Description" style={{color:'var(--slate-700)'}}>{j.desc}</td>
                      <td data-label="Area" style={{color:'var(--slate-600)', fontSize:12}}>{j.area}</td>
                      <td data-label="Foreman">{j.foreman ? <div className="av-row"><Avatar name={j.foreman}/><span style={{fontSize:12.5}}>{j.foreman}</span></div> : <Badge variant="amber">Awaiting</Badge>}</td>
                      <td data-label="Start" style={{color:'var(--slate-600)', fontSize:12}}>{j.start}</td>
                      <td data-label="End" style={{color:'var(--slate-600)', fontSize:12}}>{j.end}</td>
                      <td data-label="Progress" style={{minWidth:140}}>
                        <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12}}>
                          <div style={{flex:1, height:6, background:'var(--slate-100)', borderRadius:999, overflow:'hidden'}}>
                            <div style={{width:j.progress+'%', height:'100%', background: j.progress===100?'var(--emerald)':'var(--sky)', borderRadius:999}}/>
                          </div>
                          <span className="mono" style={{color:'var(--slate-700)', fontWeight:600, minWidth:32, textAlign:'right'}}>{j.progress}%</span>
                        </div>
                      </td>
                      <td className="actions"><RowMenu items={[
                        { icon:'eye', label:'View' },
                        { icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('job-edit') },
                        { icon:'user', label:'Reassign Foreman' },
                        { divider:true },
                        { icon:'trash', label: j.status==='Deleted' ? 'Restore' : 'Delete', danger:j.status!=='Deleted' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'reports' && (
        <div className="card" style={{padding:24}}>
          <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Projects Report Parameters</h3>
          <div className="field-row">
            <div className="field"><label>Foreman</label><select><option>All Foremen</option><option>Kagiso M.</option><option>Sizwe M.</option><option>Willem V.</option></select></div>
            <div className="field"><label>Area</label><select><option>All Areas</option></select></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Status</label><select><option>All</option><option>Current</option><option>Pending</option><option>Closed</option></select></div>
            <div className="field"><label>Customer</label><input placeholder="Filter by customer"/></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Date From</label><input type="date" defaultValue="2026-04-01"/></div>
            <div className="field"><label>Date To</label><input type="date" defaultValue="2026-05-31"/></div>
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:18}}>
            <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
            <button className="btn btn-primary"><Icon name="bar-chart-2" size={14}/> Run Report</button>
          </div>
        </div>
      )}

      {tab === 'bookings' && (
        <>
          <FilterToolbar search={search} setSearch={setSearch}
            chips={[{label:'Foreman',value:'All'},{label:'Status',value:'All'}]}
            onChipRemove={()=>{}} extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th>Booking</th><th>Customer</th><th>Address</th><th>Start</th>
                  <th style={{textAlign:'right'}}>Days</th><th>Foreman</th><th>Status</th>
                  <th>Sage</th><th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {PROJECT_BOOKINGS.filter(b => !search || (b.id+b.customer+b.address).toLowerCase().includes(search.toLowerCase())).map(b=>(
                    <tr key={b.id}>
                      <td data-label="Booking" className="cell-mono link" style={{fontWeight:600}}>{b.id}</td>
                      <td data-label="Customer" className="cell-bold">{b.customer}</td>
                      <td data-label="Address" className="full" style={{color:'var(--slate-700)'}}>{b.address}</td>
                      <td data-label="Start" style={{color:'var(--slate-600)', fontSize:12}}>{b.start}</td>
                      <td data-label="Days" className="cell-num">{b.days}</td>
                      <td data-label="Foreman">{b.foreman ? <div className="av-row"><Avatar name={b.foreman}/><span style={{fontSize:12.5}}>{b.foreman}</span></div> : <Badge variant="amber">Awaiting</Badge>}</td>
                      <td data-label="Status"><StatusBadge status={b.status==='Awaiting Foreman'?'Pending':b.status}/></td>
                      <td data-label="Sage"><Badge variant={b.sage==='Imported'?'emerald':b.sage==='Pending'?'amber':'slate'}>{b.sage}</Badge></td>
                      <td className="actions"><RowMenu items={[
                        { icon:'eye', label:'View' },
                        { icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('booking-edit') },
                        { divider:true },
                        { icon:'trash', label:'Delete', danger:true }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === 'booking-reports' && (
        <div className="card" style={{padding:24}}>
          <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Booking Report Parameters</h3>
          <div className="field-row">
            <div className="field"><label>Foreman</label><select><option>All</option><option>Kagiso M.</option><option>Sizwe M.</option></select></div>
            <div className="field"><label>Customer</label><input/></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Status</label><select><option>All</option><option>Scheduled</option><option>In Progress</option><option>Completed</option></select></div>
            <div className="field"><label>Area</label><select><option>All</option></select></div>
          </div>
          <div className="field-row">
            <div className="field"><label>Date From</label><input type="date" defaultValue="2026-04-01"/></div>
            <div className="field"><label>Date To</label><input type="date" defaultValue="2026-05-31"/></div>
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:18}}>
            <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
            <button className="btn btn-primary"><Icon name="bar-chart-2" size={14}/> Run Report</button>
          </div>
        </div>
      )}

      {tab === 'calendar' && (
        <div className="card" style={{padding:18}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
            <h3 style={{margin:0, fontSize:16, fontWeight:600}}>May 2026</h3>
            <div style={{display:'flex', gap:4}}>
              <button className="row-actions-btn"><Icon name="chevron-left" size={14}/></button>
              <button className="row-actions-btn"><Icon name="chevron-right" size={14}/></button>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:8, overflow:'hidden'}}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>(
              <div key={d} style={{background:'var(--slate-50)', padding:'6px 10px', fontSize:11, fontWeight:600, textTransform:'uppercase', color:'var(--slate-500)'}}>{d}</div>
            ))}
            {Array.from({length:35}).map((_,i)=>{
              const day = i - 3;
              const show = day >= 1 && day <= 31;
              const events = [];
              if (day === 1) events.push({c:'Orion · 40 Kiaat', color:'#0EA5E9'});
              if (day === 2) events.push({c:'Riverside Hockey', color:'#10B981'});
              if (day === 5) events.push({c:'Meridian Close', color:'#8B5CF6'});
              if (day === 6) events.push({c:'OW Primary', color:'#F59E0B'});
              if (day === 8) events.push({c:'Fish Eagle', color:'#EF4444'});
              return (
                <div key={i} style={{background:'white', minHeight:88, padding:6}}>
                  <div style={{fontSize:11, color: show?'var(--slate-600)':'var(--slate-300)', marginBottom:4}}>{show?day:''}</div>
                  {events.map((e,j)=>(<div key={j} style={{background:e.color, color:'white', fontSize:10, padding:'3px 6px', borderRadius:4, marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{e.c}</div>))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'sage-imports' && (
        <>
          <div className="summary-strip">
            <span><strong>{PROJECT_BOOKINGS.filter(b=>b.sage==='Imported').length}</strong> <span className="lbl">imported</span></span>
            <span><strong style={{color:'var(--amber)'}}>{PROJECT_BOOKINGS.filter(b=>b.sage==='Pending').length}</strong> <span className="lbl">pending import</span></span>
            <span style={{marginLeft:'auto', color:'var(--slate-600)'}}>Last import: <strong>Today 09:14</strong></span>
          </div>
          <div className="table-wrap">
            <table className="data responsive-table">
              <thead><tr>
                <th>Booking</th><th>Customer</th><th>Start</th><th>Status</th><th>Sage Status</th><th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {PROJECT_BOOKINGS.map(b=>(
                  <tr key={b.id}>
                    <td data-label="Booking" className="cell-mono link">{b.id}</td>
                    <td data-label="Customer" className="cell-bold full">{b.customer}</td>
                    <td data-label="Start" style={{color:'var(--slate-600)', fontSize:12}}>{b.start}</td>
                    <td data-label="Status"><StatusBadge status={b.status==='Awaiting Foreman'?'Pending':b.status}/></td>
                    <td data-label="Sage"><Badge variant={b.sage==='Imported'?'emerald':b.sage==='Pending'?'amber':'slate'}>{b.sage}</Badge></td>
                    <td className="actions"><RowMenu items={[
                      { icon:'refresh', label:'Re-import' },
                      { icon:'eye', label:'View Sage Record' }
                    ]}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'sage-settings' && (
        <div className="card" style={{padding:24}}>
          <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Sage Integration Settings</h3>
          <div style={{display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'var(--emerald-light)', borderRadius:8, marginBottom:18, fontSize:12.5}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'var(--emerald)'}}/>
            <strong>Sage Accounting connected</strong> · Company: Ridgeway Waterproofing · Last sync: Today 09:14
          </div>
          <div className="field-row">
            <div className="field"><label>Sync Direction</label>
              <select><option>Two-way (ManaGEM ↔ Sage)</option><option>ManaGEM → Sage only</option><option>Sage → ManaGEM only</option></select>
            </div>
            <div className="field"><label>Sync Frequency</label>
              <select><option>Every 15 minutes</option><option>Hourly</option><option>Every 4 hours</option><option>Daily</option><option>Manual only</option></select>
            </div>
          </div>
          <div className="field-row">
            <div className="field"><label>Default Sage Sales Account</label><input defaultValue="3010-Membranes"/></div>
            <div className="field"><label>Default Customer Account Prefix</label><input defaultValue="CUST-"/></div>
          </div>
          <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8}}>
            <div><label style={{margin:0, fontWeight:500}}>Auto-import bookings on creation</label>
              <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>New bookings push to Sage Accounting immediately.</div>
            </div>
            <Toggle on={true}/>
          </div>
          <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8, margin:0}}>
            <div><label style={{margin:0, fontWeight:500}}>Pull customer updates from Sage</label>
              <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>Customer record changes in Sage flow back to ManaGem.</div>
            </div>
            <Toggle on={true}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:20, paddingTop:18, borderTop:'1px solid var(--border)'}}>
            <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>Disconnect Sage</button>
            <button className="btn btn-primary"><Icon name="save" size={14}/> Save Settings</button>
          </div>
        </div>
      )}
    </>
  );
};

const JobForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('projects-current')}><Icon name="arrow-left" size={14}/> Back to Jobs</button>
        {isEdit && <span className="mono" style={{fontSize:14,fontWeight:600}}>J-2026-0042</span>}
      </div>
      <PageHeader title={isEdit?'Edit Job':'New Job'} sub={isEdit?'Update job details and assignment.':'Create a new project / job.'}/>
      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Job Details</h3>
        <div className="field-row">
          <div className="field"><label>Customer *</label><select><option value="">— Select customer —</option>{JOBS.map(j=><option key={j.id}>{j.customer}</option>)}</select></div>
          <div className="field"><label>Status *</label><select defaultValue="Pending"><option>Pending</option><option>Current</option><option>Closed</option></select></div>
        </div>
        <div className="field"><label>Description *</label><input defaultValue={isEdit?'HQ Roof refurb':''} placeholder="e.g. HQ Roof refurb"/></div>
        <div className="field-row">
          <div className="field"><label>Foreman</label><select><option value="">— Awaiting —</option><option>Kagiso M.</option><option>Sizwe M.</option><option>Willem V.</option></select></div>
          <div className="field"><label>Area</label><select><option>Sandton</option><option>Cape Town</option><option>Johannesburg</option><option>Pretoria</option></select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Start Date *</label><input type="date" defaultValue="2026-05-26"/></div>
          <div className="field"><label>End Date *</label><input type="date" defaultValue="2026-06-05"/></div>
        </div>
        <div className="field"><label>Notes</label><textarea rows={3} placeholder="Internal notes..."/></div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('projects-current')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('projects-current')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Job'}</button>
        </div>
      </div>
    </>
  );
};

const BookingForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('bookings')}><Icon name="arrow-left" size={14}/> Back to Bookings</button>
        {isEdit && <span className="mono" style={{fontSize:14,fontWeight:600}}>B-2026-0084</span>}
      </div>
      <PageHeader title={isEdit?'Edit Booking':'New Booking'} sub={isEdit?'Update booking schedule and foreman.':'Schedule a new project booking.'}/>
      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Booking Details</h3>
        <div className="field-row">
          <div className="field"><label>Customer *</label><select><option value="">— Select —</option>{PROJECT_BOOKINGS.map(b=><option key={b.id}>{b.customer}</option>)}</select></div>
          <div className="field"><label>Foreman</label><select><option value="">— Awaiting —</option><option>Kagiso M.</option><option>Sizwe M.</option><option>Willem V.</option></select></div>
        </div>
        <div className="field"><label>Site Address *</label><input defaultValue={isEdit?'40 Kiaat Ave, Midrand':''}/></div>
        <div className="field-row">
          <div className="field"><label>Start Date *</label><input type="date" defaultValue="2026-05-26"/></div>
          <div className="field"><label>Number of Days *</label><input type="number" defaultValue={isEdit?8:1}/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Status</label><select><option>Scheduled</option><option>Awaiting Foreman</option><option>In Progress</option><option>Completed</option></select></div>
          <div className="field"><label>Push to Sage</label>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'9px 0'}}><Toggle on={true}/><span style={{fontSize:12, color:'var(--slate-600)'}}>Import on save</span></div>
          </div>
        </div>
        <div className="field"><label>Notes</label><textarea rows={3}/></div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('bookings')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('bookings')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Booking'}</button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { ProjectsModule, JobForm, BookingForm });
