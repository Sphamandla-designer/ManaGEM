// ===== CUSTOMER CONTACTS, WARRANTIES, NEW ENQUIRY, CLOSED ENQUIRIES, INVOICES, SAGE =====

const CONTACTS = [
  { name:'Carla Ferreira', co:'Orion Group', role:'Procurement Manager', email:'carla@oriongroup.example', phone:'+27 82 000 0123', last:'2 days ago', primary:true },
  { name:'Ruan Hendricks', co:'Highlands Estates', role:'Operations Director', email:'ruan.h@highlands.example', phone:'+27 83 000 0124', last:'4 days ago', primary:true },
  { name:'Palesa Mthembu', co:'Oakwood Schools', role:'Facilities Lead', email:'palesa@oakwood.example', phone:'+27 71 000 0116', last:'1 week ago', primary:false },
  { name:'Riaan Coetzee', co:'Meridian Holdings', role:'Project Manager', email:'pj@meridian.example', phone:'+27 84 000 0117', last:'2 weeks ago', primary:true },
  { name:'Ayanda Shabalala', co:'Fish Eagle Lodge', role:'Owner', email:'ayanda@fisheagle.example', phone:'+27 82 000 0118', last:'3 days ago', primary:true },
  { name:'Craig Abrahams', co:'Riverside Sports', role:'Treasurer', email:'c.abrahams@riverside.example', phone:'+27 83 000 0119', last:'5 days ago', primary:false },
  { name:'Megan Nel', co:'Orion Group', role:'Accounts Payable', email:'megan@oriongroup.example', phone:'+27 82 000 0120', last:'Yesterday', primary:false },
  { name:'Tumi Mabaso', co:'Marula Properties', role:'Director', email:'lwazi@marulaprop.example', phone:'+27 71 000 0121', last:'2 days ago', primary:true }
];

const CustomerContacts = ({ onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const filtered = CONTACTS.filter(c => !search || (c.name+c.co+c.email).toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeader title="Customer Contacts" sub={`${CONTACTS.length} contacts across ${new Set(CONTACTS.map(c=>c.co)).size} customers`}
        actions={<button className="btn btn-primary"><Icon name="plus" size={14}/> Add Contact</button>}/>
      <FilterToolbar search={search} setSearch={setSearch}
        chips={[{label:'Customer',value:'All'},{label:'Role',value:'All'}]} onChipRemove={()=>{}}/>
      <div className="table-wrap">
        <table className="data responsive-table">
          <thead><tr><th>Contact</th><th>Customer</th><th>Role</th><th>Email</th><th>Phone</th><th>Last Contact</th><th style={{width:40}}></th></tr></thead>
          <tbody>
            {filtered.map((c,i)=>(
              <tr key={i}>
                <td data-label="Contact" className="full">
                  <div className="av-row">
                    <Avatar name={c.name} size={28}/>
                    <div>
                      <div style={{fontWeight:600, display:'flex', alignItems:'center', gap:6}}>
                        {c.name} {c.primary && <span style={{fontSize:10, padding:'1px 6px', background:'var(--sky-light)', color:'#0369A1', borderRadius:999, fontWeight:500}}>Primary</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td data-label="Customer" style={{fontWeight:500}}>{c.co}</td>
                <td data-label="Role" style={{color:'var(--slate-600)'}}>{c.role}</td>
                <td data-label="Email" className="cell-mono" style={{fontSize:12}}><a href={`mailto:${c.email}`}>{c.email}</a></td>
                <td data-label="Phone" className="cell-mono" style={{fontSize:12, color:'var(--slate-700)'}}>{c.phone}</td>
                <td data-label="Last" style={{color:'var(--slate-500)', fontSize:12}}>{c.last}</td>
                <td className="actions"><RowMenu items={[
                  {icon:'mail', label:'Send Email'}, {icon:'phone', label:'Log Call'},
                  {icon:'pencil', label:'Edit'}, {divider:true}, {icon:'trash', label:'Delete', danger:true}
                ]}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ===== WARRANTIES =====
const WARRANTIES = [
  { ref:'W26-018', cust:'Orion Group',          warranty:'10-Year Roofing',     job:'HQ Roof Refurb',          start:'12 Mar 2024', end:'12 Mar 2034', maint:'Up to date',  maintStatus:'ok' },
  { ref:'W26-017', cust:'Highlands Estates',    warranty:'5-Year Membrane',     job:'Block A Waterproofing',   start:'04 Feb 2024', end:'04 Feb 2029', maint:'Due 04 Feb 27',maintStatus:'soon' },
  { ref:'W26-016', cust:'Riverside Sports',        warranty:'10-Year Roofing',     job:'Hockey Pavilion',         start:'22 Jan 2024', end:'22 Jan 2034', maint:'Up to date',  maintStatus:'ok' },
  { ref:'W26-015', cust:'Oakwood Schools', warranty:'2-Year Standard',     job:'Primary School Roof',     start:'18 Nov 2023', end:'18 Nov 2025', maint:'Overdue',     maintStatus:'overdue' },
  { ref:'W26-014', cust:'Meridian Holdings',     warranty:'10-Year Roofing',     job:'Fourways Residence',     start:'05 Sep 2023', end:'05 Sep 2033', maint:'Up to date',  maintStatus:'ok' },
  { ref:'W26-013', cust:'Fish Eagle Lodge',   warranty:'5-Year Pool Deck',    job:'Pool Deck Resurface',     start:'11 Jul 2022', end:'11 Jul 2027', maint:'Due 11 Jul 26',maintStatus:'soon' },
  { ref:'W26-012', cust:'Marula Properties',  warranty:'5-Year Membrane',     job:'Office Block C',          start:'08 Apr 2020', end:'08 Apr 2025', maint:'Expired',     maintStatus:'expired' },
  { ref:'W26-011', cust:'Orion Group',          warranty:'5-Year Membrane',     job:'Warehouse Roof',          start:'14 Feb 2020', end:'14 Feb 2025', maint:'Expired',     maintStatus:'expired' }
];

const Warranties = () => {
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'year' });
  const stats = {
    active: WARRANTIES.filter(w => new Date(w.end) > new Date()).length,
    soon:   WARRANTIES.filter(w => w.maintStatus === 'soon').length,
    overdue:WARRANTIES.filter(w => w.maintStatus === 'overdue').length,
    expired:WARRANTIES.filter(w => w.maintStatus === 'expired').length
  };
  const maintColor = { ok:'emerald', soon:'amber', overdue:'red', expired:'slate' };
  return (
    <>
      <PageHeader title="Warranties" sub="Track product warranties and maintenance schedule"
        actions={<button className="btn btn-primary"><Icon name="plus" size={14}/> Issue Warranty</button>}/>
      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="shield" size={16}/></div><div className="kpi-label">Active Warranties</div><div className="kpi-value">{stats.active}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="clock" size={16}/></div><div className="kpi-label">Maintenance Due Soon</div><div className="kpi-value">{stats.soon}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Maintenance Overdue</div><div className="kpi-value">{stats.overdue}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--slate-100)',color:'var(--slate-500)'}}><Icon name="receipt" size={16}/></div><div className="kpi-label">Expired</div><div className="kpi-value">{stats.expired}</div></div>
      </div>
      <FilterToolbar
        chips={[{label:'Customer',value:'All'},{label:'Warranty Type',value:'All'},{label:'Maintenance',value:'All'}]}
        onChipRemove={()=>{}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
      <div className="table-wrap">
        <table className="data responsive-table">
          <thead><tr><th>Ref No</th><th>Customer</th><th>Warranty</th><th>Job</th><th>Start</th><th>End</th><th>Maintenance</th><th style={{width:40}}></th></tr></thead>
          <tbody>
            {WARRANTIES.map(w=>{
              const expired = new Date(w.end) < new Date();
              return (
                <tr key={w.ref}>
                  <td data-label="Ref No"><span className="mono cell-mono link">{w.ref}</span></td>
                  <td data-label="Customer" className="full" style={{fontWeight:600}}>{w.cust}</td>
                  <td data-label="Warranty"><Badge variant="sky">{w.warranty}</Badge></td>
                  <td data-label="Job" style={{color:'var(--slate-700)'}}>{w.job}</td>
                  <td data-label="Start" style={{color:'var(--slate-600)', fontSize:12}}>{w.start}</td>
                  <td data-label="End" style={{color: expired ? 'var(--red)' : 'var(--slate-600)', fontSize:12, fontWeight: expired ? 600 : 400}}>{w.end}</td>
                  <td data-label="Maintenance"><Badge variant={maintColor[w.maintStatus]}>{w.maint}</Badge></td>
                  <td className="actions"><RowMenu items={[
                    {icon:'eye',label:'View Certificate'},{icon:'download',label:'Download PDF'},
                    {icon:'calendar',label:'Schedule Maintenance'},{icon:'alert-triangle',label:'Log Claim'},
                    {divider:true},{icon:'pencil',label:'Edit'},{icon:'trash',label:'Delete',danger:true}
                  ]}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ===== NEW ENQUIRY (FORM) =====
const NewEnquiry = ({ onNavigate }) => {
  const [step, setStep] = React.useState(1);
  const Step = ({ n, label }) => (
    <div style={{display:'flex',alignItems:'center',gap:10,flex:1}}>
      <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
        background: step>=n?'var(--sky)':'var(--slate-100)',
        color: step>=n?'white':'var(--slate-500)', fontWeight:600, fontSize:12}}>{step>n?<Icon name="check" size={14}/>:n}</div>
      <div>
        <div style={{fontSize:11, color:'var(--slate-500)', fontWeight:500}}>STEP {n}</div>
        <div style={{fontSize:13, fontWeight: step===n?600:400}}>{label}</div>
      </div>
      {n<4 && <div style={{flex:1, height:2, background:step>n?'var(--sky)':'var(--border)'}}/>}
    </div>
  );
  return (
    <>
      <PageHeader title="New Enquiry" sub="Capture a new sales lead"
        actions={<button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('enquiries')}>Cancel</button>}/>
      <div className="card" style={{padding:24, marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Step n={1} label="Customer"/><Step n={2} label="Site & Scope"/><Step n={3} label="Schedule"/><Step n={4} label="Review"/>
        </div>
      </div>
      <div className="card" style={{padding:24}}>
        {step===1 && (
          <>
            <h3 style={{margin:'0 0 18px'}}>Customer Information</h3>
            <div className="field-row">
              <div className="field"><label>Customer Type *</label>
                <select><option>Repeat Customer</option><option>Home Owner</option><option>Warranty Claim</option><option>New Customer</option></select>
              </div>
              <div className="field"><label>Source</label>
                <select><option>Website</option><option>Referral</option><option>Walk-in</option><option>Repeat</option></select>
              </div>
            </div>
            <div className="field"><label>Customer / Company Name *</label><input placeholder="Search or create new..."/></div>
            <div className="field-row">
              <div className="field"><label>Contact Person *</label><input placeholder="Full name"/></div>
              <div className="field"><label>Role</label><input placeholder="e.g. Project Manager"/></div>
            </div>
            <div className="field-row">
              <div className="field"><label>Email *</label><input type="email" placeholder="email@example.com"/></div>
              <div className="field"><label>Phone *</label><input placeholder="+27 ..."/></div>
            </div>
          </>
        )}
        {step===2 && (
          <>
            <h3 style={{margin:'0 0 18px'}}>Site & Scope</h3>
            <div className="field"><label>Site Address *</label><input placeholder="Street, suburb, city"/></div>
            <div className="field-row">
              <div className="field"><label>Area</label><select><option>Sandton</option><option>Cape Town</option><option>Johannesburg</option><option>Pretoria</option></select></div>
              <div className="field"><label>Department</label><select><option>Waterproofing</option><option>Pool</option><option>Roofing</option></select></div>
            </div>
            <div className="field"><label>Description of Work *</label><textarea rows={5} placeholder="Describe the scope of work, surface area, materials..."></textarea></div>
            <div className="field-row">
              <div className="field"><label>Estimated Value (R)</label><input placeholder="0.00"/></div>
              <div className="field"><label>Surface Area (m²)</label><input placeholder="0"/></div>
            </div>
          </>
        )}
        {step===3 && (
          <>
            <h3 style={{margin:'0 0 18px'}}>Schedule</h3>
            <div className="field-row">
              <div className="field"><label>Preferred Site Visit Date</label><input type="date"/></div>
              <div className="field"><label>Sales Rep *</label><select><option>Thabo Ndlovu</option><option>Zanele Sibiya</option><option>Johan Fourie</option></select></div>
            </div>
            <div className="field"><label>Priority</label>
              <div style={{display:'flex',gap:8}}>
                {['Low','Normal','High','Urgent'].map(p=>(
                  <label key={p} style={{flex:1, padding:'10px 14px', border:'1px solid var(--border)', borderRadius:8, cursor:'pointer', fontSize:13, textAlign:'center'}}>{p}</label>
                ))}
              </div>
            </div>
            <div className="field"><label>Internal Notes</label><textarea rows={4} placeholder="Any notes for the team..."></textarea></div>
          </>
        )}
        {step===4 && (
          <>
            <h3 style={{margin:'0 0 18px'}}>Review & Submit</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:18}}>
              <div className="card" style={{padding:14}}><div style={{fontSize:11,color:'var(--slate-500)',textTransform:'uppercase',marginBottom:6}}>Customer</div><div style={{fontWeight:600}}>Orion Group</div><div style={{fontSize:12,color:'var(--slate-600)'}}>Carla Ferreira · Procurement</div></div>
              <div className="card" style={{padding:14}}><div style={{fontSize:11,color:'var(--slate-500)',textTransform:'uppercase',marginBottom:6}}>Site</div><div style={{fontWeight:600}}>40 Kiaat Ave, Midrand</div><div style={{fontSize:12,color:'var(--slate-600)'}}>Waterproofing · 240m²</div></div>
              <div className="card" style={{padding:14}}><div style={{fontSize:11,color:'var(--slate-500)',textTransform:'uppercase',marginBottom:6}}>Schedule</div><div style={{fontWeight:600}}>15 May 2026 · Site visit</div><div style={{fontSize:12,color:'var(--slate-600)'}}>Thabo Ndlovu · Normal</div></div>
              <div className="card" style={{padding:14}}><div style={{fontSize:11,color:'var(--slate-500)',textTransform:'uppercase',marginBottom:6}}>Estimated Value</div><div style={{fontWeight:700, fontSize:18, fontFamily:'var(--mono)'}}>R 184,500</div></div>
            </div>
            <div className="field" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <label style={{margin:0}}>Send confirmation email to customer</label><Toggle on={true}/>
            </div>
          </>
        )}
        <div style={{display:'flex',justifyContent:'space-between', marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-secondary" disabled={step===1} onClick={()=>setStep(s=>Math.max(1,s-1))}>← Back</button>
          {step<4
            ? <button className="btn btn-primary" onClick={()=>setStep(s=>s+1)}>Continue →</button>
            : <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('enquiries')}><Icon name="check" size={14}/> Create Enquiry</button>}
        </div>
      </div>
    </>
  );
};

// ===== CLOSED ENQUIRIES =====
const CLOSED = [
  { ref:'L03/26-098', cust:'Orion Group',           subject:'HQ Roof Refurb',              area:'Sandton',       contact:'Carla Ferreira',     type:'Repeat Customer', value:425000, closed:'24 Mar 2026', outcome:'Won',       rep:'Thabo N.', reason:'Quote accepted' },
  { ref:'L03/26-094', cust:'Highlands Estates',     subject:'Balcony membranes',           area:'Cape Town',     contact:'Ruan Hendricks',  type:'Home Owner',      value:182000, closed:'18 Mar 2026', outcome:'Won',       rep:'Zanele S.',    reason:'Project complete' },
  { ref:'L03/26-091', cust:'Fourways Co',        subject:'External wall re-coat',       area:'Sandton',       contact:'Tatenda Banda',      type:'New Customer',    value:96500,  closed:'14 Mar 2026', outcome:'Lost',      rep:'Riaan C.',    reason:'Price' },
  { ref:'L02/26-082', cust:'Oakwood Schools',  subject:'Hall ceiling leak',           area:'Cape Town',     contact:'Palesa Mthembu',   type:'Warranty Claim',  value:0,      closed:'28 Feb 2026', outcome:'Won',       rep:'Thabo N.', reason:'Warranty fulfilled' },
  { ref:'L02/26-079', cust:'Summit Holdings',      subject:'Phase 1 site waterproofing',  area:'Johannesburg',  contact:'Ashwin Reddy',     type:'New Customer',    value:340000, closed:'22 Feb 2026', outcome:'Lost',      rep:'Zanele S.',    reason:'Went with competitor' },
  { ref:'L02/26-074', cust:'Meridian Holdings',      subject:'Parking deck membrane',       area:'Pretoria',      contact:'Riaan Coetzee',   type:'Repeat Customer', value:215000, closed:'15 Feb 2026', outcome:'Won',       rep:'Thabo N.', reason:'Quote accepted' },
  { ref:'L01/26-061', cust:'Marula Properties',   subject:'Office Block C re-do',        area:'Sandton',       contact:'Tumi Mabaso',   type:'Repeat Customer', value:128000, closed:'30 Jan 2026', outcome:'Cancelled', rep:'Riaan C.',    reason:'Customer postponed' },
  { ref:'L01/26-055', cust:'Fish Eagle Lodge',    subject:'Pool deck',                    area:'Mpumalanga',    contact:'Ayanda Shabalala',    type:'Home Owner',      value:74500,  closed:'22 Jan 2026', outcome:'Won',       rep:'Zanele S.',    reason:'Project complete' }
];

const ClosedEnquiries = ({ onNavigate }) => {
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'quarter' });
  const won = CLOSED.filter(c=>c.outcome==='Won');
  const wonValue = won.reduce((s,c)=>s+c.value, 0);
  const lostValue = CLOSED.filter(c=>c.outcome==='Lost').reduce((s,c)=>s+c.value, 0);
  return (
    <>
      <PageHeader title="Closed Enquiries" sub="Won, lost and cancelled enquiries"
        actions={<>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('new-enquiry')}><Icon name="plus" size={14}/> Create New</button>
        </>}/>
      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="check" size={16}/></div><div className="kpi-label">Won</div><div className="kpi-value">{won.length}</div><div className="kpi-delta up">R {wonValue.toLocaleString()} value</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="x" size={16}/></div><div className="kpi-label">Lost</div><div className="kpi-value">{CLOSED.filter(c=>c.outcome==='Lost').length}</div><div className="kpi-delta down">R {lostValue.toLocaleString()} value</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--slate-100)',color:'var(--slate-500)'}}><Icon name="clock" size={16}/></div><div className="kpi-label">Cancelled</div><div className="kpi-value">{CLOSED.filter(c=>c.outcome==='Cancelled').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="bar-chart-2" size={16}/></div><div className="kpi-label">Win Rate</div><div className="kpi-value">{Math.round(won.length/CLOSED.length*100)}%</div></div>
      </div>
      <FilterToolbar
        chips={[{label:'Outcome',value:'All'},{label:'Rep',value:'All'},{label:'Area',value:'All'}]}
        onChipRemove={()=>{}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead><tr>
              <th>Ref</th><th>Customer</th><th>Subject</th><th>Area</th><th>Contact Person</th>
              <th>Type</th><th style={{textAlign:'right'}}>Value</th><th>Closed</th><th>Outcome</th><th>Reason</th><th>Rep</th>
              <th style={{width:40}}></th>
            </tr></thead>
            <tbody>
              {CLOSED.map(c=>(
                <tr key={c.ref}>
                  <td data-label="Ref" className="cell-mono link">{c.ref}</td>
                  <td data-label="Customer" className="full" style={{fontWeight:600}}>{c.cust}</td>
                  <td data-label="Subject" style={{color:'var(--slate-700)', maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} title={c.subject}>{c.subject}</td>
                  <td data-label="Area" style={{color:'var(--slate-600)', fontSize:12}}>{c.area}</td>
                  <td data-label="Contact" style={{fontSize:12.5}}>
                    <div className="av-row"><Avatar name={c.contact} size={22}/><span>{c.contact}</span></div>
                  </td>
                  <td data-label="Type"><TypeBadge type={c.type}/></td>
                  <td data-label="Value" className="cell-num">R {c.value.toLocaleString()}</td>
                  <td data-label="Closed" style={{color:'var(--slate-600)', fontSize:12}}>{c.closed}</td>
                  <td data-label="Outcome">
                    <Badge variant={c.outcome==='Won'?'emerald':c.outcome==='Lost'?'red':'slate'}>{c.outcome}</Badge>
                  </td>
                  <td data-label="Reason" style={{color:'var(--slate-600)', fontSize:12}}>{c.reason}</td>
                  <td data-label="Rep" style={{fontSize:12, color:'var(--slate-700)'}}>{c.rep}</td>
                  <td className="actions"><RowMenu items={[
                    {icon:'eye',label:'View Details'},
                    {icon:'pencil',label:'Edit'},
                    {icon:'refresh',label:'Reopen Enquiry'},
                    {divider:true},
                    {icon:'trash',label:'Delete',danger:true}
                  ]}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ===== INVOICES =====
const INVOICES = [
  { ref:'INV-2026-0142', cust:'Orion Group', proj:'HQ Roof', issued:'02 May 2026', due:'01 Jun 2026', total:425000, paid:425000, status:'Paid' },
  { ref:'INV-2026-0141', cust:'Highlands Estates', proj:'Block C', issued:'28 Apr 2026', due:'28 May 2026', total:182000, paid:50000, status:'Partial' },
  { ref:'INV-2026-0140', cust:'Riverside Sports', proj:'Hockey Pavilion', issued:'25 Apr 2026', due:'25 May 2026', total:96500, paid:0, status:'Unpaid' },
  { ref:'INV-2026-0139', cust:'Meridian Holdings', proj:'Fourways Resi', issued:'20 Apr 2026', due:'20 May 2026', total:215000, paid:215000, status:'Paid' },
  { ref:'INV-2026-0138', cust:'Oakwood Schools', proj:'Primary Roof', issued:'15 Apr 2026', due:'15 May 2026', total:74500, paid:0, status:'Overdue' },
  { ref:'INV-2026-0137', cust:'Fish Eagle Lodge', proj:'Pool Deck', issued:'10 Apr 2026', due:'10 May 2026', total:128000, paid:128000, status:'Paid' },
  { ref:'INV-2026-0136', cust:'Marula Properties', proj:'Office Block C', issued:'05 Apr 2026', due:'05 May 2026', total:340000, paid:170000, status:'Partial' },
  { ref:'INV-2026-0135', cust:'Summit Holdings', proj:'Phase 1', issued:'01 Apr 2026', due:'01 May 2026', total:62000, paid:0, status:'Overdue' }
];

const Invoices = () => {
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'year' });
  const total = INVOICES.reduce((s,i)=>s+i.total,0);
  const paid = INVOICES.reduce((s,i)=>s+i.paid,0);
  const outstanding = total-paid;
  const overdue = INVOICES.filter(i=>i.status==='Overdue').reduce((s,i)=>s+(i.total-i.paid),0);
  return (
    <>
      <PageHeader title="Invoices" sub={`${INVOICES.length} invoices · R ${outstanding.toLocaleString()} outstanding`}
        actions={<><button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button><button className="btn btn-primary"><Icon name="plus" size={14}/> New Invoice</button></>}/>
      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="receipt" size={16}/></div><div className="kpi-label">Total Billed</div><div className="kpi-value">R {(total/1000).toFixed(0)}K</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="check" size={16}/></div><div className="kpi-label">Paid</div><div className="kpi-value">R {(paid/1000).toFixed(0)}K</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="clock" size={16}/></div><div className="kpi-label">Outstanding</div><div className="kpi-value">R {(outstanding/1000).toFixed(0)}K</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Overdue</div><div className="kpi-value">R {(overdue/1000).toFixed(0)}K</div></div>
      </div>
      <FilterToolbar chips={[{label:'Status',value:'All'},{label:'Customer',value:'All'}]} onChipRemove={()=>{}} extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
      <div className="table-wrap">
        <table className="data responsive-table">
          <thead><tr><th>Invoice #</th><th>Customer / Project</th><th>Issued</th><th>Due</th><th style={{textAlign:'right'}}>Total</th><th style={{textAlign:'right'}}>Paid</th><th>Status</th><th style={{width:40}}></th></tr></thead>
          <tbody>
            {INVOICES.map(i=>(
              <tr key={i.ref}>
                <td data-label="Invoice" className="cell-mono link">{i.ref}</td>
                <td data-label="Customer" className="full">
                  <div style={{fontWeight:600}}>{i.cust}</div>
                  <div style={{fontSize:11.5, color:'var(--slate-500)'}}>{i.proj}</div>
                </td>
                <td data-label="Issued" style={{color:'var(--slate-600)', fontSize:12}}>{i.issued}</td>
                <td data-label="Due" style={{color: i.status==='Overdue' ? 'var(--red)' : 'var(--slate-600)', fontSize:12, fontWeight:i.status==='Overdue'?600:400}}>{i.due}</td>
                <td data-label="Total" className="cell-num" style={{fontWeight:600}}>R {i.total.toLocaleString()}</td>
                <td data-label="Paid" className="cell-num" style={{color:'var(--slate-600)'}}>R {i.paid.toLocaleString()}</td>
                <td data-label="Status">
                  <Badge variant={i.status==='Paid'?'emerald':i.status==='Partial'?'amber':i.status==='Overdue'?'red':'sky'}>{i.status}</Badge>
                </td>
                <td className="actions"><RowMenu items={[
                  {icon:'eye',label:'View'},{icon:'download',label:'Download PDF'},{icon:'send',label:'Send to Customer'},
                  {divider:true},{icon:'check',label:'Record Payment'},{icon:'pencil',label:'Edit'},
                  {divider:true},{icon:'trash',label:'Void',danger:true}
                ]}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// ===== SAGE INVOICES =====
const SAGE = [
  { sageRef:'SAGE-9842', linked:'INV-2026-0142', cust:'Orion Group', date:'02 May 2026', net:369565, vat:55435, total:425000, synced:'Today 09:14', status:'Synced' },
  { sageRef:'SAGE-9841', linked:'INV-2026-0141', cust:'Highlands Estates', date:'28 Apr 2026', net:158261, vat:23739, total:182000, synced:'Today 09:14', status:'Synced' },
  { sageRef:'SAGE-9840', linked:'INV-2026-0140', cust:'Riverside Sports', date:'25 Apr 2026', net:83913, vat:12587, total:96500, synced:'Today 09:14', status:'Synced' },
  { sageRef:'—', linked:'INV-2026-0143', cust:'Fourways Co', date:'06 May 2026', net:42435, vat:6365, total:48800, synced:'—', status:'Pending' },
  { sageRef:'SAGE-9839', linked:'INV-2026-0139', cust:'Meridian Holdings', date:'20 Apr 2026', net:186957, vat:28043, total:215000, synced:'Yesterday 18:00', status:'Synced' },
  { sageRef:'—', linked:'INV-2026-0144', cust:'Marula Properties', date:'07 May 2026', net:108696, vat:16304, total:125000, synced:'—', status:'Error' },
  { sageRef:'SAGE-9838', linked:'INV-2026-0138', cust:'Oakwood Schools', date:'15 Apr 2026', net:64783, vat:9717, total:74500, synced:'2 days ago', status:'Synced' },
  { sageRef:'SAGE-9837', linked:'INV-2026-0137', cust:'Fish Eagle Lodge', date:'10 Apr 2026', net:111304, vat:16696, total:128000, synced:'3 days ago', status:'Synced' }
];

const SageInvoices = () => {
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });
  const synced = SAGE.filter(s=>s.status==='Synced').length;
  const totalVAT = SAGE.reduce((s,i)=>s+i.vat,0);
  const totalNet = SAGE.reduce((s,i)=>s+i.net,0);
  return (
    <>
      <PageHeader title="Sage Invoices" sub="Synchronised with Sage Accounting"
        actions={<>
          <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,color:'var(--slate-600)',padding:'6px 12px',background:'var(--emerald-light)',borderRadius:8}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'var(--emerald)'}}/>Sage connected
          </span>
          <button className="btn btn-secondary"><Icon name="refresh" size={14}/> Sync now</button>
        </>}/>
      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="check" size={16}/></div><div className="kpi-label">Synced</div><div className="kpi-value">{synced} / {SAGE.length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="clock" size={16}/></div><div className="kpi-label">Pending</div><div className="kpi-value">{SAGE.filter(s=>s.status==='Pending').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Errors</div><div className="kpi-value">{SAGE.filter(s=>s.status==='Error').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="receipt" size={16}/></div><div className="kpi-label">VAT (Period)</div><div className="kpi-value">R {(totalVAT/1000).toFixed(0)}K</div></div>
      </div>
      <FilterToolbar chips={[{label:'Status',value:'All'}]} onChipRemove={()=>{}} extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
      <div className="table-wrap">
        <table className="data responsive-table">
          <thead><tr><th>Sage Ref</th><th>Linked Invoice</th><th>Customer</th><th>Date</th><th style={{textAlign:'right'}}>Net</th><th style={{textAlign:'right'}}>VAT</th><th style={{textAlign:'right'}}>Total</th><th>Last Sync</th><th>Status</th></tr></thead>
          <tbody>
            {SAGE.map((s,i)=>(
              <tr key={i}>
                <td data-label="Sage Ref" className="cell-mono" style={{color: s.sageRef==='—'?'var(--slate-400)':'var(--slate-700)'}}>{s.sageRef}</td>
                <td data-label="Invoice" className="cell-mono link">{s.linked}</td>
                <td data-label="Customer" className="full" style={{fontWeight:500}}>{s.cust}</td>
                <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12}}>{s.date}</td>
                <td data-label="Net" className="cell-num">R {s.net.toLocaleString()}</td>
                <td data-label="VAT" className="cell-num" style={{color:'var(--slate-600)'}}>R {s.vat.toLocaleString()}</td>
                <td data-label="Total" className="cell-num" style={{fontWeight:600}}>R {s.total.toLocaleString()}</td>
                <td data-label="Sync" style={{color:'var(--slate-500)', fontSize:11.5}}>{s.synced}</td>
                <td data-label="Status">
                  <Badge variant={s.status==='Synced'?'emerald':s.status==='Pending'?'amber':'red'}>{s.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

Object.assign(window, { CustomerContacts, Warranties, NewEnquiry, ClosedEnquiries, Invoices, SageInvoices });
