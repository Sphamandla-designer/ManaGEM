// ===== FACTORY =====

// Pending — Unallocated Sales / Pending Jobs (from sales side)
const FACTORY_PENDING = [
  { ref:'L04/26-119', date:'28 Apr 2026', status:'Deposit Paid', type:'Home Owner',      name:'Highlands Estates',   subject:'Balcony membrane (12 units)',  area:'Cape Town',     rep:'Zanele Sibiya', value: 182000 },
  { ref:'L04/26-115', date:'27 Apr 2026', status:'Not Quoted',   type:'Warranty Claim',  name:'Oakwood Schools',subject:'Hall ceiling leak',            area:'Cape Town',     rep:'Ethan Jacobs',     value: 0 },
  { ref:'L04/26-111', date:'26 Apr 2026', status:'Scheduled',    type:'New Customer',    name:'Fish Eagle Lodge',  subject:'Pool deck rails — custom',     area:'Mpumalanga',    rep:'Johan Fourie',value: 78000 },
  { ref:'L04/26-102', date:'22 Apr 2026', status:'Quoted',       type:'New Customer',    name:'Thembeka Construct',  subject:'Drainage outlets × 24',        area:'Johannesburg',  rep:'Johan Fourie',value: 312000 }
];

// Product Builds
const FACTORY_BUILDS = [
  { no:'PB-061', ref:'L04/26-124', desc:'Custom flashing set — block A',  product:'FL-501 Galv flashing',  stage:'In Build', dept:'Waterproofing', end:'08 May 2026', received:true,  complete:false },
  { no:'PB-060', ref:'L07/25-135', desc:'Galvanised gutters — pavilion',   product:'FL-502 Aluminium cap',  stage:'QC',       dept:'Waterproofing', end:'02 May 2026', received:true,  complete:false },
  { no:'PB-059', ref:'L04/26-119', desc:'PU membrane bulk batch',          product:'MB-104 Liquid PU 5L',   stage:'Pending',  dept:'Waterproofing', end:'10 May 2026', received:false, complete:false },
  { no:'PB-058', ref:'L04/26-105', desc:'Parking deck flashing kit',       product:'FL-501 Galv flashing',  stage:'Ready',    dept:'Waterproofing', end:'29 Apr 2026', received:true,  complete:false },
  { no:'PB-057', ref:'L04/26-111', desc:'Pool deck rails — custom',        product:'PD-310 CR coating',     stage:'In Build', dept:'Pool',          end:'12 May 2026', received:true,  complete:false },
  { no:'PB-056', ref:'L04/26-102', desc:'Drainage outlets × 24',           product:'FL-502 Aluminium cap',  stage:'Pending',  dept:'Waterproofing', end:'20 May 2026', received:false, complete:false },
  { no:'PB-055', ref:'L04/26-095', desc:'Re-coat materials kit',           product:'MB-101 Acrylic 5L',     stage:'Ready',    dept:'Waterproofing', end:'02 May 2026', received:true,  complete:true  }
];

// Current Jobs
const FACTORY_CURRENT = [
  { customer:'Orion Group',         contact:'Carla Ferreira',    ref:'L04/26-124', desc:'Custom flashing set — block A',  stage:'In Build', dept:'Waterproofing', end:'08 May 2026', invoiced:false, paid:false, complete:false },
  { customer:'Riverside Sports',       contact:'Craig Abrahams',    ref:'L07/25-135', desc:'Galvanised gutters — pavilion',   stage:'QC',       dept:'Waterproofing', end:'02 May 2026', invoiced:false, paid:false, complete:false },
  { customer:'Highlands Estates',   contact:'Ruan Hendricks', ref:'L04/26-119', desc:'PU membrane bulk batch',          stage:'Pending',  dept:'Waterproofing', end:'10 May 2026', invoiced:false, paid:false, complete:false },
  { customer:'Meridian Holdings',    contact:'Riaan Coetzee',  ref:'L04/26-105', desc:'Parking deck flashing kit',       stage:'Ready',    dept:'Waterproofing', end:'29 Apr 2026', invoiced:false, paid:false, complete:false },
  { customer:'Fish Eagle Lodge',  contact:'Ayanda Shabalala',   ref:'L04/26-111', desc:'Pool deck rails — custom',        stage:'In Build', dept:'Pool',          end:'12 May 2026', invoiced:false, paid:false, complete:false },
  { customer:'Thembeka Construct',  contact:'Ashwin Reddy',    ref:'L04/26-102', desc:'Drainage outlets × 24',           stage:'Pending',  dept:'Waterproofing', end:'20 May 2026', invoiced:false, paid:false, complete:false }
];

// Not Invoiced — completed but waiting on invoicing
const FACTORY_NOT_INVOICED = [
  { invoiced:false, paid:false, complete:true, customer:'Seaview BC',   contact:'Tatenda Banda',     ref:'L04/26-095', desc:'Re-coat materials kit',     stage:'Ready',    dept:'Waterproofing', end:'02 May 2026' },
  { invoiced:false, paid:false, complete:true, customer:'Jacaranda Property', contact:'Fatima Isaacs',  ref:'L03/26-089', desc:'Damp inspection kit',       stage:'Ready',    dept:'Waterproofing', end:'10 Apr 2026' },
  { invoiced:false, paid:false, complete:true, customer:'Marula Properties',contact:'Tumi Mabaso', ref:'L04/26-082', desc:'Office Block C — flashings',stage:'Ready',    dept:'Waterproofing', end:'18 Apr 2026' }
];

const tickCell = (v) => v ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>;

const Factory = () => {
  const [tab, setTab] = React.useState('dashboard');
  const tabs = [
    { id:'dashboard', l:'Dashboard' },
    { id:'pending',   l:'Pending',         ct: FACTORY_PENDING.length },
    { id:'builds',    l:'Product Builds',  ct: FACTORY_BUILDS.length },
    { id:'current',   l:'Current Jobs',    ct: FACTORY_CURRENT.length },
    { id:'notinv',    l:'Not Invoiced',    ct: FACTORY_NOT_INVOICED.length, warn:true },
    { id:'done',      l:'Completed' }
  ];
  const fmtZAR = (n) => 'R ' + n.toLocaleString('en-ZA');

  return (
    <>
      <PageHeader title="Factory" sub="Production & build management"
        actions={<button className="btn btn-primary"><Icon name="plus" size={14}/> New Job</button>}/>

      <div className="tabs">
        {tabs.map(t => (
          <button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={() => setTab(t.id)}>
            {t.warn && <span className="warn"/>}
            {t.l}{t.ct !== undefined && <span className="ct">{t.ct}</span>}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && (
        <>
          <div className="kpi-grid" style={{ marginBottom: 16 }}>
            {[
              { l: 'Pending Jobs', v: FACTORY_PENDING.length, i: 'inbox', c1: 'var(--amber-light)', c2: 'var(--amber)' },
              { l: 'Active Builds', v: FACTORY_BUILDS.filter(b=>!b.complete).length, i: 'factory', c1: 'var(--sky-light)', c2: 'var(--sky)' },
              { l: 'Ready to Invoice', v: FACTORY_NOT_INVOICED.length, i: 'check-circle', c1: 'var(--emerald-light)', c2: 'var(--emerald)' },
              { l: 'Completed (Apr)', v: '18', i: 'briefcase', c1: 'var(--slate-100)', c2: 'var(--slate-600)' }
            ].map((k,i)=>(
              <div className="kpi" key={i}>
                <div className="kpi-icon" style={{ background: k.c1, color: k.c2 }}><Icon name={k.i} size={16}/></div>
                <div className="kpi-label">{k.l}</div>
                <div className="kpi-value">{k.v}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-hd"><h3>Production Pipeline</h3><span style={{fontSize:12,color:'var(--slate-500)'}}>Live</span></div>
            <div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }} className="funnel">
              {[
                { l: 'Pending', ct: FACTORY_PENDING.length, fill: 30 },
                { l: 'In Build', ct: FACTORY_BUILDS.filter(b=>b.stage==='In Build').length, fill: 55 },
                { l: 'QC Check', ct: FACTORY_BUILDS.filter(b=>b.stage==='QC').length, fill: 18 },
                { l: 'Ready', ct: FACTORY_BUILDS.filter(b=>b.stage==='Ready').length, fill: 25 },
                { l: 'Invoiced', ct: 18, fill: 90 }
              ].map((s,i,arr) => (
                <div key={i} style={{ position: 'relative', paddingRight: i<arr.length-1 ? 16 : 0 }}>
                  <div style={{ background: 'var(--slate-50)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{s.l}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{s.ct}</div>
                    <div style={{ marginTop: 8, height: 4, background: 'var(--slate-200)', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: s.fill+'%', height: '100%', background: 'var(--sky)' }}/>
                    </div>
                  </div>
                  {i<arr.length-1 && <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-300)' }}>→</div>}
                </div>
              ))}
            </div>
            <style>{`@media (max-width: 720px){ .funnel { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; } }`}</style>
          </div>

          <div className="card">
            <div className="card-hd"><h3>Recent Activity</h3></div>
            <div>
              {[
                { t: 'Build PB-061 moved to In Build', who: 'Kagiso Molefe', when: '1h ago' },
                { t: 'Build PB-060 entered QC Check', who: 'Sizwe Maseko', when: '3h ago' },
                { t: 'Build PB-058 marked Ready', who: 'Sizwe Maseko', when: '5h ago' },
                { t: 'New build PB-061 created — Orion Group', who: 'Ethan Jacobs', when: 'yesterday' }
              ].map((a,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', borderBottom: i<3?'1px solid var(--border)':'none', fontSize: 13 }}>
                  <Avatar name={a.who}/>
                  <span style={{flex:1}}>{a.t} <span style={{color:'var(--slate-500)'}}>— {a.who}</span></span>
                  <span style={{ color:'var(--slate-500)', fontSize:11.5 }}>{a.when}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* PENDING — List of Unallocated Sales / Pending Jobs */}
      {tab === 'pending' && (
        <>
          <div className="card-hd" style={{padding:'10px 0 14px', border:'none'}}>
            <h3 style={{margin:0, fontSize:14, color:'var(--slate-700)'}}>List of Unallocated Sales / Pending Jobs</h3>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th>Ref No</th><th>Enquiry Date</th><th>Status</th><th>Type</th>
                  <th>Name</th><th>Subject</th><th>Area</th><th>Sales Rep</th>
                  <th style={{textAlign:'right'}}>Value</th><th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {FACTORY_PENDING.map(p => (
                    <tr key={p.ref}>
                      <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{p.ref}</td>
                      <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{p.date}</td>
                      <td data-label="Status"><StatusBadge status={p.status}/></td>
                      <td data-label="Type"><TypeBadge type={p.type}/></td>
                      <td data-label="Name" className="cell-bold full">{p.name}</td>
                      <td data-label="Subject" style={{color:'var(--slate-700)'}}>{p.subject}</td>
                      <td data-label="Area" style={{color:'var(--slate-600)', fontSize:12}}>{p.area}</td>
                      <td data-label="Rep"><div className="av-row"><Avatar name={p.rep}/><span style={{fontSize:12.5}}>{p.rep}</span></div></td>
                      <td data-label="Value" className="cell-num" style={{fontWeight:600}}>{p.value > 0 ? fmtZAR(p.value) : '—'}</td>
                      <td className="actions"><RowMenu items={[
                        { icon:'eye', label:'View Enquiry' },
                        { icon:'factory', label:'Allocate to Build' },
                        { icon:'pencil', label:'Edit' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PRODUCT BUILDS — List of Current Product Builds */}
      {tab === 'builds' && (
        <>
          <div className="card-hd" style={{padding:'10px 0 14px', border:'none'}}>
            <h3 style={{margin:0, fontSize:14, color:'var(--slate-700)'}}>List of Current Product Builds</h3>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th>No</th><th>Ref No</th><th>Description</th><th>Product</th>
                  <th>Stage</th><th>Department</th><th>End Date</th>
                  <th style={{textAlign:'center'}}>Received</th>
                  <th style={{textAlign:'center'}}>Complete</th>
                  <th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {FACTORY_BUILDS.map(b => (
                    <tr key={b.no} className={b.complete?'muted':''}>
                      <td data-label="No" className="cell-mono">{b.no}</td>
                      <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{b.ref}</td>
                      <td data-label="Description" className="full" style={{fontWeight:500}}>{b.desc}</td>
                      <td data-label="Product" style={{color:'var(--slate-700)'}}>{b.product}</td>
                      <td data-label="Stage"><StatusBadge status={b.stage}/></td>
                      <td data-label="Department" style={{color:'var(--slate-600)', fontSize:12}}>{b.dept}</td>
                      <td data-label="End" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{b.end}</td>
                      <td data-label="Received" style={{textAlign:'center'}}>{tickCell(b.received)}</td>
                      <td data-label="Complete" style={{textAlign:'center'}}>{tickCell(b.complete)}</td>
                      <td className="actions"><RowMenu items={[
                        { icon:'eye', label:'Open' },
                        { icon:'pencil', label:'Edit Stage' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* CURRENT JOBS — List of Current Job Cards */}
      {tab === 'current' && (
        <>
          <div className="card-hd" style={{padding:'10px 0 14px', border:'none'}}>
            <h3 style={{margin:0, fontSize:14, color:'var(--slate-700)'}}>List of Current Job Cards</h3>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th>Customer</th><th>Contact</th><th>Ref No</th><th>Description</th>
                  <th>Stage</th><th>Department</th><th>End Date</th>
                  <th style={{textAlign:'center'}}>Invoiced</th>
                  <th style={{textAlign:'center'}}>Paid</th>
                  <th style={{textAlign:'center'}}>Complete</th>
                  <th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {FACTORY_CURRENT.map((j,i) => (
                    <tr key={i}>
                      <td data-label="Customer" className="cell-bold">{j.customer}</td>
                      <td data-label="Contact"><div className="av-row"><Avatar name={j.contact} size={22}/><span style={{fontSize:12.5}}>{j.contact}</span></div></td>
                      <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{j.ref}</td>
                      <td data-label="Description" className="full" style={{fontWeight:500}}>{j.desc}</td>
                      <td data-label="Stage"><StatusBadge status={j.stage}/></td>
                      <td data-label="Department" style={{color:'var(--slate-600)', fontSize:12}}>{j.dept}</td>
                      <td data-label="End" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{j.end}</td>
                      <td data-label="Invoiced" style={{textAlign:'center'}}>{tickCell(j.invoiced)}</td>
                      <td data-label="Paid" style={{textAlign:'center'}}>{tickCell(j.paid)}</td>
                      <td data-label="Complete" style={{textAlign:'center'}}>{tickCell(j.complete)}</td>
                      <td className="actions"><RowMenu items={[
                        { icon:'eye', label:'Open' },
                        { icon:'pencil', label:'Edit Stage' },
                        { icon:'file-text', label:'Create Invoice' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* NOT INVOICED — List of Completed Jobs not Invoiced */}
      {tab === 'notinv' && (
        <>
          <div className="card-hd" style={{padding:'10px 0 14px', border:'none'}}>
            <h3 style={{margin:0, fontSize:14, color:'var(--slate-700)'}}>List of Completed Jobs not Invoiced</h3>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead><tr>
                  <th style={{textAlign:'center'}}>Invoiced</th>
                  <th style={{textAlign:'center'}}>Paid</th>
                  <th style={{textAlign:'center'}}>Complete</th>
                  <th>Customer</th><th>Contact</th><th>Ref No</th><th>Description</th>
                  <th>Stage</th><th>Department</th><th>End Date</th>
                  <th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {FACTORY_NOT_INVOICED.map((j,i) => (
                    <tr key={i}>
                      <td data-label="Invoiced" style={{textAlign:'center'}}>{tickCell(j.invoiced)}</td>
                      <td data-label="Paid" style={{textAlign:'center'}}>{tickCell(j.paid)}</td>
                      <td data-label="Complete" style={{textAlign:'center'}}>{tickCell(j.complete)}</td>
                      <td data-label="Customer" className="cell-bold full">{j.customer}</td>
                      <td data-label="Contact"><div className="av-row"><Avatar name={j.contact} size={22}/><span style={{fontSize:12.5}}>{j.contact}</span></div></td>
                      <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{j.ref}</td>
                      <td data-label="Description" style={{fontWeight:500}}>{j.desc}</td>
                      <td data-label="Stage"><StatusBadge status={j.stage}/></td>
                      <td data-label="Department" style={{color:'var(--slate-600)', fontSize:12}}>{j.dept}</td>
                      <td data-label="End" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{j.end}</td>
                      <td className="actions"><RowMenu items={[
                        { icon:'file-text', label:'Create Invoice' },
                        { icon:'eye', label:'Open' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* COMPLETED — same shape as current but filtered to complete */}
      {tab === 'done' && (
        <EmptyState icon="check-circle" title="Completed jobs archive"
          sub="Filter and browse historical jobs that have been invoiced and paid."
          action={<button className="btn btn-secondary">Open archive</button>}/>
      )}
    </>
  );
};

window.Factory = Factory;
