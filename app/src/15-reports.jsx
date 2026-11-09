// ===== REPORTS — multi-category report hub =====
const REPORT_CATS = [
  { id: 'enquiries',         label: 'Enquiries',          icon: 'folder-open' },
  { id: 'quotes',            label: 'Quotes',             icon: 'file-text' },
  { id: 'opportunities',     label: 'Opportunities',      icon: 'target' },
  { id: 'sales',             label: 'Sales',              icon: 'receipt' },
  { id: 'product-sales',     label: 'Product Sales',      icon: 'package' },
  { id: 'repairs',           label: 'Repairs',            icon: 'settings' },
  { id: 'sales-by-product',  label: 'Sales by Product',   icon: 'boxes' },
  { id: 'sales-by-enquiries',label: 'Sales by Enquiries', icon: 'bar-chart-2' }
];

const REPORT_DATA = {
  enquiries: {
    title: 'Enquiries Report',
    sub: 'Enquiries logged in the selected period',
    columns: ['Ref','Date','Customer','Subject','Area','Type','Status','Sales Rep'],
    rows: [
      ['L04/26-124','29 Apr','Orion Group','HQ Roof refurb','Sandton','Repeat Customer','New Lead','Ethan Jacobs'],
      ['L04/26-119','28 Apr','Highlands Estates','Balcony membrane','Cape Town','Home Owner','Quoted','Zanele Sibiya'],
      ['L04/26-115','27 Apr','Oakwood Schools','Hall ceiling leak','Cape Town','Warranty Claim','Not Quoted','Ethan Jacobs'],
      ['L04/26-111','26 Apr','Fish Eagle Lodge','Pool deck','Mpumalanga','New Customer','Quoted','Johan Fourie'],
      ['L04/26-108','24 Apr','Riverside Sports','Hockey pavilion','Johannesburg','Repeat Customer','Invoiced','Ethan Jacobs'],
      ['L04/26-105','23 Apr','Meridian Holdings','Parking deck','Pretoria','Repeat Customer','In Progress','Zanele Sibiya'],
      ['L04/26-099','21 Apr','Jacaranda Property','Damp inspection','Pretoria','Warranty Claim','Not Quoted','Zanele Sibiya']
    ],
    summary: (rows) => [
      { lbl:'Enquiries', val: rows.length },
      { lbl:'New leads',  val: 12, color:'var(--sky)' },
      { lbl:'Quoted',     val: 18, color:'var(--emerald)' },
      { lbl:'Avg. response time', val: '4.2 hrs' }
    ],
    chartLabel: 'Enquiries by Type'
  },
  quotes: {
    title: 'Quotes Report',
    sub: 'Quotes issued in the selected period',
    columns: ['Ref','Quote','Date','Customer','Sales Rep','Area','Type','Status','Value'],
    rows: [
      ['L04/26-124','Q-2603','29 Apr','Orion Group','Ethan Jacobs','Sandton','Repeat Customer','Won','R 168,780'],
      ['L04/26-119','Q-2598','28 Apr','Highlands Estates','Zanele Sibiya','Cape Town','Home Owner','Open','R 92,500'],
      ['L04/26-108','Q-2588','24 Apr','Riverside Sports','Ethan Jacobs','Johannesburg','Repeat Customer','Won','R 245,000'],
      ['L04/26-105','Q-2584','23 Apr','Meridian Holdings','Zanele Sibiya','Pretoria','Repeat Customer','Won','R 134,000'],
      ['L04/26-102','Q-2580','22 Apr','Thembeka Construct','Johan Fourie','Johannesburg','New Customer','Open','R 312,000'],
      ['L04/26-095','Q-2575','19 Apr','Seaview BC','Ethan Jacobs','Johannesburg','Repeat Customer','Lost','R 88,000'],
      ['L04/26-091','Q-2571','18 Apr','Harbour Line','Johan Fourie','Western Cape','Home Owner','Won','R 64,000']
    ],
    summary: () => [
      { lbl:'Total quotes', val:47 },
      { lbl:'Value', val:'R 3,348,130', color:'var(--text)' },
      { lbl:'Won', val:'18 (R 820,000)', color:'var(--emerald)' },
      { lbl:'Lost', val:'9 (R 210,000)', color:'var(--red)' }
    ],
    chartLabel: 'Quotes by Sales Rep'
  },
  opportunities: {
    title: 'Opportunities Report',
    sub: 'Open quotes ready to close',
    columns: ['Quote','Customer','Stage','Probability','Days Open','Sales Rep','Value'],
    rows: [
      ['Q-2598','Highlands Estates','Quoted','70%','5','Zanele Sibiya','R 92,500'],
      ['Q-2592','Fish Eagle Lodge','Quoted','60%','7','Johan Fourie','R 78,000'],
      ['Q-2580','Thembeka Construct','Quoted','40%','11','Johan Fourie','R 312,000'],
      ['Q-2603','Orion Group','Negotiation','85%','1','Ethan Jacobs','R 168,780'],
      ['Q-2585','Marula Properties','Quoted','55%','9','Zanele Sibiya','R 215,000']
    ],
    summary: () => [
      { lbl:'Open opps', val:34 },
      { lbl:'Pipeline value', val:'R 34,644,096' },
      { lbl:'Weighted', val:'R 18,420,500', color:'var(--sky)' },
      { lbl:'Avg. age', val:'12 days' }
    ],
    chartLabel: 'Opportunities by Stage'
  },
  sales: {
    title: 'Sales Report',
    sub: 'Invoiced revenue',
    columns: ['Invoice','Date','Customer','Sales Rep','Net','VAT','Total'],
    rows: [
      ['INV-2026-0142','02 May','Orion Group','Ethan Jacobs','R 369,565','R 55,435','R 425,000'],
      ['INV-2026-0141','28 Apr','Highlands Estates','Zanele Sibiya','R 158,261','R 23,739','R 182,000'],
      ['INV-2026-0140','25 Apr','Riverside Sports','Ethan Jacobs','R 83,913','R 12,587','R 96,500'],
      ['INV-2026-0139','20 Apr','Meridian Holdings','Zanele Sibiya','R 186,957','R 28,043','R 215,000'],
      ['INV-2026-0138','15 Apr','Oakwood Schools','Ethan Jacobs','R 64,783','R 9,717','R 74,500'],
      ['INV-2026-0137','10 Apr','Fish Eagle Lodge','Johan Fourie','R 111,304','R 16,696','R 128,000']
    ],
    summary: () => [
      { lbl:'Invoices', val:8 },
      { lbl:'Net', val:'R 1,083,000' },
      { lbl:'VAT', val:'R 162,000' },
      { lbl:'Total billed', val:'R 1,245,000', color:'var(--emerald)' }
    ],
    chartLabel: 'Sales by Month'
  },
  'product-sales': {
    title: 'Product Sales Report',
    sub: 'Materials sold or consumed on jobs',
    columns: ['Code','Product','Category','Qty Used','Unit','Avg Price','Total'],
    rows: [
      ['MB-101','Acrylic membrane 5L white','Membrane','120','ea','R 425','R 51,000'],
      ['MB-103','Bitumen torch-on roll 4mm','Membrane','840','m²','R 410','R 344,400'],
      ['PR-201','Bonding primer 5L','Primer','62','ea','R 340','R 21,080'],
      ['SL-301','Polyurethane sealant 600ml','Sealant','185','ea','R 118','R 21,830'],
      ['FL-501','Galvanised flashing 0.6mm','Flashing','310','m','R 220','R 68,200']
    ],
    summary: () => [
      { lbl:'Line items', val:42 },
      { lbl:'Total value', val:'R 612,400', color:'var(--emerald)' },
      { lbl:'Top category', val:'Membrane' },
      { lbl:'Avg margin', val:'31%' }
    ],
    chartLabel: 'Top Selling Products'
  },
  repairs: {
    title: 'Repairs Report',
    sub: 'Warranty repairs and remedial work',
    columns: ['Job','Customer','Issue','Logged','Closed','Days','Cost','Status'],
    rows: [
      ['RPR-018','Orion Group','Parapet flashing crack','12 Apr','19 Apr','7','R 8,400','Closed'],
      ['RPR-017','Highlands Estates','Membrane uplift block C','08 Apr','—','22','R 0','Open'],
      ['RPR-016','Oakwood Schools','Hall ceiling leak','02 Apr','06 Apr','4','R 4,200','Closed'],
      ['RPR-015','Meridian Holdings','Column 4B membrane','28 Mar','04 Apr','7','R 12,600','Closed'],
      ['RPR-014','Fish Eagle Lodge','Pool coping crack','18 Mar','—','42','R 0','Open']
    ],
    summary: () => [
      { lbl:'Repairs (period)', val:12 },
      { lbl:'Open', val:2, color:'var(--amber)' },
      { lbl:'Avg resolution', val:'6.2 days' },
      { lbl:'Total cost', val:'R 25,200' }
    ],
    chartLabel: 'Repairs by Month'
  },
  'sales-by-product': {
    title: 'Sales by Product Report',
    sub: 'Revenue grouped by product',
    columns: ['Code','Product','Units Sold','Revenue','% of Total','Margin'],
    rows: [
      ['MB-103','Bitumen torch-on roll 4mm','840','R 344,400','28%','22%'],
      ['CR-510','Commercial PU membrane','560','R 291,200','24%','19%'],
      ['MB-101','Acrylic membrane 5L white','420','R 178,500','15%','33%'],
      ['FL-501','Galvanised flashing 0.6mm','310','R 68,200','6%','34%'],
      ['SL-301','PU sealant 600ml','185','R 21,830','2%','34%'],
      ['PR-201','Bonding primer 5L','62','R 21,080','2%','29%']
    ],
    summary: () => [
      { lbl:'Products sold', val:38 },
      { lbl:'Revenue', val:'R 1,218,400', color:'var(--emerald)' },
      { lbl:'Top product', val:'Bitumen torch-on' },
      { lbl:'Avg margin', val:'27%' }
    ],
    chartLabel: 'Revenue by Product'
  },
  'sales-by-enquiries': {
    title: 'Sales by Enquiries Report',
    sub: 'Revenue grouped by source enquiry',
    columns: ['Ref','Customer','Subject','Type','Quote','Invoiced','Conversion'],
    rows: [
      ['L04/26-124','Orion Group','HQ Roof','Repeat Customer','R 168,780','R 168,780','100%'],
      ['L04/26-108','Riverside Sports','Hockey pavilion','Repeat Customer','R 245,000','R 245,000','100%'],
      ['L04/26-105','Meridian Holdings','Parking deck','Repeat Customer','R 134,000','R 134,000','100%'],
      ['L04/26-091','Harbour Line','Hull deck','Home Owner','R 64,000','R 64,000','100%'],
      ['L04/26-088','Gateway Plaza BC','BC repairs','Repeat Customer','R 198,000','R 99,000','50%'],
      ['L04/26-119','Highlands Estates','Balcony membrane','Home Owner','R 92,500','R 0','0%']
    ],
    summary: () => [
      { lbl:'Enquiries closed', val:18 },
      { lbl:'Quote → invoice', val:'68%' },
      { lbl:'Total invoiced', val:'R 820,000', color:'var(--emerald)' },
      { lbl:'Avg deal size', val:'R 45,500' }
    ],
    chartLabel: 'Conversion by Type'
  }
};

const Reports = ({ onNavigate }) => {
  const [cat, setCat] = React.useState('quotes');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });
  const [run, setRun] = React.useState(true);
  const [paramsOpen, setParamsOpen] = React.useState(false);
  const [showCharts, setShowCharts] = React.useState(false);

  const data = REPORT_DATA[cat];

  React.useEffect(() => {
    if (!showCharts) return;
    const c1 = document.getElementById('rep1');
    const c2 = document.getElementById('rep2');
    if (c1 && c1._c) c1._c.destroy();
    if (c2 && c2._c) c2._c.destroy();
    if (c1) c1._c = new Chart(c1, {
      type: 'bar',
      data: {
        labels: ['Ethan Jacobs','Zanele Sibiya','Johan Fourie'],
        datasets: [{ data:[675780,480500,454000], backgroundColor:'#0EA5E9', borderRadius:4 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false}}, y:{grid:{color:'#F1F5F9'}, border:{display:false}, ticks:{color:'#64748B'}}} }
    });
    if (c2) c2._c = new Chart(c2, {
      type:'bar',
      data:{ labels:['Jan','Feb','Mar','Apr'], datasets:[{ data:[820000,950000,1100000,1284500], backgroundColor:'#10B981', borderRadius:4 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false}}, y:{grid:{color:'#F1F5F9'}, border:{display:false}, ticks:{color:'#64748B'}}} }
    });
  }, [showCharts, cat]);

  return (
    <>
      <PageHeader
        title={data.title}
        sub={data.sub}
        actions={<>
          <DateRangePicker value={period} onChange={setPeriod}/>
          <span className="export-group">
            <button className="btn btn-ghost btn-sm">CSV</button>
            <button className="btn btn-ghost btn-sm">Excel</button>
            <button className="btn btn-ghost btn-sm">PDF</button>
          </span>
          <button className="btn btn-secondary" onClick={() => onNavigate && onNavigate('report-create-' + cat)}>
            <Icon name="plus" size={14}/> Create
          </button>
          <button className="btn btn-primary" onClick={() => { setRun(true); setParamsOpen(false); }}>
            <Icon name="bar-chart-2" size={14}/> Run Report
          </button>
        </>}
      />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:8, marginBottom:16 }}>
        {REPORT_CATS.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'10px 14px',
            borderRadius:10, border:'1px solid ' + (cat===c.id ? 'var(--sky)' : 'var(--border)'),
            background: cat===c.id ? 'var(--sky-50)' : 'white',
            color: cat===c.id ? '#0369A1' : 'var(--slate-700)',
            fontWeight: cat===c.id ? 600 : 500, fontSize:12.5,
            textAlign:'left', transition:'all 120ms'
          }}>
            <Icon name={c.icon} size={14}/>
            <span style={{flex:1}}>{c.label}</span>
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-hd">
          <h3 style={{ fontSize: 11, textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--slate-500)', fontWeight:600 }}>Report Parameters</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => setParamsOpen(!paramsOpen)}>
            {paramsOpen ? 'Collapse' : 'Edit Parameters'} <Icon name={paramsOpen?'chevron-down':'chevron-right'} size={12}/>
          </button>
        </div>
        {paramsOpen && (
          <div className="card-pad">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="rep-grid">
              <div className="field" style={{margin:0}}><label>Sales Rep</label><select><option>All Reps</option><option>Ethan Jacobs</option><option>Zanele Sibiya</option><option>Johan Fourie</option></select></div>
              <div className="field" style={{margin:0}}><label>Area</label><input placeholder="e.g. Sandton"/></div>
              <div className="field" style={{margin:0}}><label>Source</label><input placeholder="Website, referral…"/></div>
              <div className="field" style={{margin:0}}><label>Status</label><select><option>All</option><option>Won</option><option>Lost</option><option>Open</option></select></div>
              <div className="field" style={{margin:0}}><label>Customer</label><input placeholder="Filter by customer"/></div>
              <div className="field" style={{margin:0}}><label>Type</label><select><option>All Types</option></select></div>
              <div className="field" style={{margin:0}}><label>Date From</label><input type="date" defaultValue="2026-04-01"/></div>
              <div className="field" style={{margin:0}}><label>Date To</label><input type="date" defaultValue="2026-04-30"/></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <button className="btn btn-primary" style={{flex:1, justifyContent:'center'}} onClick={() => { setRun(true); setParamsOpen(false); }}>Run Report</button>
              </div>
            </div>
            <a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize:12, marginTop: 10, display:'inline-block' }}>Clear all filters</a>
            <style>{`@media (max-width:720px){ .rep-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          </div>
        )}
      </div>

      {run && (
        <>
          <div className="summary-strip">
            {data.summary(data.rows).map((s,i) => (
              <span key={i}>
                <span className="lbl">{s.lbl}:</span> <strong style={{color: s.color || 'inherit'}}>{s.val}</strong>
              </span>
            ))}
          </div>

          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data responsive-table">
                <thead>
                  <tr>{data.columns.map((c,i) => <th key={i} style={{textAlign: i === data.columns.length-1 ? 'right' : 'left'}}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {data.rows.map((row,ri) => (
                    <tr key={ri}>
                      {row.map((cell,ci) => {
                        const lastCol = ci === row.length - 1;
                        const isRef = ci === 0 && /^[A-Z]{1,5}[-/]/.test(cell);
                        return (
                          <td key={ci} data-label={data.columns[ci]}
                            className={ci===1?'full ':'' + (isRef?'cell-mono link':'') + (lastCol?' cell-num':'')}
                            style={{ fontWeight: ci===1?600:(lastCol?600:400), color: lastCol?'var(--text)':'var(--slate-700)', fontFamily: lastCol?'var(--mono)':undefined }}>
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <button className="btn btn-secondary" onClick={() => setShowCharts(!showCharts)}>
              <Icon name="bar-chart-2" size={14}/> {showCharts?'Hide':'Show'} Charts <Icon name={showCharts?'chevron-down':'chevron-right'} size={12}/>
            </button>
            {showCharts && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }} className="dash-row">
                <div className="card"><div className="card-hd"><h3>{data.chartLabel}</h3></div><div style={{padding:16, height:240}}><canvas id="rep1"/></div></div>
                <div className="card"><div className="card-hd"><h3>{data.title.replace(' Report','')} by Month</h3></div><div style={{padding:16, height:240}}><canvas id="rep2"/></div></div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

// ===== SALES MASTER DATA (under Reports in Sales section) =====
const SALES_MASTER = {
  "Enquiries": [
    { id:'eft', label:'Enquiry File Type',  items:['Quote PDF','Photograph','Spec sheet','Site sketch','Approval document','Email correspondence'] },
    { id:'eti', label:'Enquiry Types',      items:['Repeat Customer','Home Owner','Warranty Claim','New Customer','Maintenance','Inspection only'] },
    { id:'est', label:'Enquiry Status',     items:['New Lead','Not Quoted','Quoted','Scheduled','Deposit Paid','In Progress','Invoiced','Cancelled'] }
  ],
  "Interactions": [
    { id:'int', label:'Interaction Types',  items:['Phone Call','Email','Site Visit','Meeting','SMS / WhatsApp','Quote Sent','Follow-up','Complaint'] }
  ],
  "Targets": [
    { id:'stt', label:'Sales Target Types', items:['Monthly Revenue','Quarterly Revenue','Annual Revenue','Quote Value','Number of Enquiries','Conversion Rate'] }
  ]
};

const SalesMasterData = ({ onNavigate }) => {
  const [active, setActive] = React.useState('eti');

  let activeCat = null;
  Object.values(SALES_MASTER).forEach(arr => arr.forEach(c => { if (c.id === active) activeCat = c; }));

  return (
    <>
      <PageHeader title="Master Data" sub="Sales & enquiry reference values used across the system"/>

      <div className="md-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, alignItems: 'flex-start' }}>
        <div className="card" style={{ padding: '8px 0' }}>
          {Object.entries(SALES_MASTER).map(([group, cats]) => (
            <div key={group} style={{ marginBottom: 6 }}>
              <div style={{ padding: '10px 14px 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--slate-500)' }}>{group}</div>
              {cats.map(c => (
                <button key={c.id}
                  onClick={() => setActive(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', textAlign: 'left',
                    padding: '9px 14px',
                    borderLeft: active === c.id ? '3px solid var(--sky)' : '3px solid transparent',
                    background: active === c.id ? 'var(--sky-50)' : 'transparent',
                    fontSize: 13, fontWeight: active === c.id ? 600 : 400,
                    color: active === c.id ? 'var(--text)' : 'var(--slate-700)'
                  }}>
                  <span>{c.label}</span>
                  <span style={{ fontSize: 11, padding: '0 7px', background: 'var(--slate-100)', borderRadius: 999, color: 'var(--slate-600)' }}>{c.items.length}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-hd">
            <h3>{activeCat?.label}</h3>
            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-ghost btn-sm"><Icon name="download" size={12}/> Export</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate && onNavigate('sales-master-new-' + active)}>
                <Icon name="plus" size={12}/> Add New
              </button>
            </div>
          </div>
          <table className="data">
            <thead><tr><th style={{width:48}}>#</th><th>Description</th><th style={{width:140, textAlign:'right'}}>Actions</th></tr></thead>
            <tbody>
              {activeCat?.items.map((it, i) => (
                <tr key={i}>
                  <td style={{color:'var(--slate-500)', fontFamily:'var(--mono)', fontSize:12}}>{String(i+1).padStart(2,'0')}</td>
                  <td>{it}</td>
                  <td style={{textAlign:'right'}}>
                    <button className="row-actions-btn" style={{opacity:1}} onClick={() => onNavigate && onNavigate('sales-master-edit-' + active)}><Icon name="pencil" size={13}/></button>
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

// ===== MASTER DATA ENTRY FORM (add / edit a lookup value) =====
const MASTER_LABELS = {
  eft: 'Enquiry File Type',
  eti: 'Enquiry Type',
  est: 'Enquiry Status',
  int: 'Interaction Type',
  stt: 'Sales Target Type'
};

const MasterDataForm = ({ catId, mode = 'new', onNavigate }) => {
  const label = MASTER_LABELS[catId] || 'Master Data';
  const isEdit = mode === 'edit';

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('sales-master-data')}>
          <Icon name="arrow-left" size={14}/> Back to Master Data
        </button>
        {isEdit && <Badge variant="sky">Editing</Badge>}
      </div>

      <PageHeader
        title={`${isEdit ? 'Edit' : 'Add'} ${label}`}
        sub={isEdit ? `Update this ${label.toLowerCase()} value.` : `Add a new ${label.toLowerCase()} to the system.`}
      />

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>{label} Details</h3>

        <div className="field">
          <label>Description *</label>
          <input defaultValue={isEdit ? 'Repeat Customer' : ''} placeholder={`e.g. ${catId === 'eti' ? 'Repeat Customer' : catId === 'est' ? 'Scheduled' : catId === 'int' ? 'Site Visit' : catId === 'eft' ? 'Quote PDF' : 'Monthly Revenue'}`}/>
        </div>

        {(catId === 'eti' || catId === 'est' || catId === 'int') && (
          <div className="field-row">
            <div className="field">
              <label>Display Order</label>
              <input type="number" defaultValue={isEdit ? '3' : '1'} placeholder="1"/>
            </div>
            <div className="field">
              <label>Colour / Badge</label>
              <select defaultValue="sky">
                <option value="sky">Sky (Default)</option>
                <option value="emerald">Emerald (Positive)</option>
                <option value="amber">Amber (Warning)</option>
                <option value="red">Red (Negative)</option>
                <option value="purple">Purple (Special)</option>
                <option value="slate">Slate (Neutral)</option>
              </select>
            </div>
          </div>
        )}

        {catId === 'eft' && (
          <div className="field">
            <label>Allowed File Extensions</label>
            <input defaultValue={isEdit ? '.pdf, .jpg, .png' : ''} placeholder=".pdf, .docx, .xlsx, .jpg, .png"/>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:4}}>Comma-separated list of allowed extensions for this file type.</div>
          </div>
        )}

        {catId === 'stt' && (
          <div className="field-row">
            <div className="field">
              <label>Period</label>
              <select defaultValue="Monthly">
                <option>Monthly</option><option>Quarterly</option><option>Annual</option><option>Custom</option>
              </select>
            </div>
            <div className="field">
              <label>Measure</label>
              <select defaultValue="Revenue">
                <option>Revenue (R)</option><option>Quote Value (R)</option><option>Count</option><option>Conversion %</option>
              </select>
            </div>
          </div>
        )}

        <div className="field">
          <label>Notes (internal)</label>
          <textarea rows={3} defaultValue={isEdit ? 'Auto-applied to customers with previous invoiced jobs.' : ''} placeholder="Any context — when this value is used, who created it, etc."/>
        </div>

        <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:0, padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8}}>
          <div>
            <label style={{margin:0, fontWeight:500}}>Active</label>
            <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>Inactive values are hidden from dropdowns but kept on existing records.</div>
          </div>
          <Toggle on={true}/>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('sales-master-data')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete
            </button>}
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('sales-master-data')}>
            <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </div>
    </>
  );
};

// ===== REPORT CREATE FORM (per category) =====
const REPORT_CREATE = {
  enquiries: {
    title: 'Create Enquiry',
    sub: 'Capture a new sales enquiry',
    fields: [
      { label:'Customer', type:'select', options:['Orion Group','Highlands Estates','Riverside Sports','Meridian Holdings'], req:true },
      { label:'Contact Person', type:'text' },
      { label:'Subject', type:'text', req:true },
      { label:'Area', type:'select', options:['Sandton','Cape Town','Johannesburg','Pretoria','Mpumalanga'] },
      { label:'Enquiry Type', type:'select', options:['Repeat Customer','Home Owner','Warranty Claim','New Customer'], req:true },
      { label:'Sales Rep', type:'select', options:['Thabo Ndlovu','Zanele Sibiya','Johan Fourie','Ethan Jacobs'], req:true },
      { label:'Date', type:'date', req:true },
      { label:'Notes', type:'textarea' }
    ]
  },
  quotes: {
    title: 'Create Quote',
    sub: 'Issue a new quote for an enquiry',
    fields: [
      { label:'Enquiry Ref', type:'text', placeholder:'L04/26-...', req:true },
      { label:'Customer', type:'text', req:true },
      { label:'Sales Rep', type:'select', options:['Thabo Ndlovu','Zanele Sibiya','Johan Fourie'], req:true },
      { label:'Quote Template', type:'select', options:['Standard Waterproofing','Pool & Deck','Commercial Roof','Residential'], req:true },
      { label:'Total Value (R)', type:'number', req:true },
      { label:'Valid Until', type:'date' },
      { label:'Notes', type:'textarea' }
    ]
  },
  opportunities: {
    title: 'Create Opportunity',
    sub: 'Log a new sales opportunity in the pipeline',
    fields: [
      { label:'Customer', type:'select', options:['Orion Group','Highlands Estates','Riverside Sports'], req:true },
      { label:'Opportunity Name', type:'text', req:true },
      { label:'Stage', type:'select', options:['New Lead','Qualified','Quoted','Negotiation','Won','Lost'], req:true },
      { label:'Probability %', type:'number' },
      { label:'Expected Value (R)', type:'number', req:true },
      { label:'Expected Close Date', type:'date' },
      { label:'Sales Rep', type:'select', options:['Thabo Ndlovu','Zanele Sibiya','Johan Fourie'], req:true },
      { label:'Notes', type:'textarea' }
    ]
  },
  sales: {
    title: 'Record Sale (Invoice)',
    sub: 'Create an invoice for a completed job',
    fields: [
      { label:'Customer', type:'select', options:['Orion Group','Highlands Estates','Riverside Sports'], req:true },
      { label:'Enquiry / Job Ref', type:'text' },
      { label:'Sales Rep', type:'select', options:['Thabo Ndlovu','Zanele Sibiya','Johan Fourie'], req:true },
      { label:'Net Amount (R)', type:'number', req:true },
      { label:'VAT %', type:'number', placeholder:'15' },
      { label:'Invoice Date', type:'date', req:true },
      { label:'Due Date', type:'date' },
      { label:'Description', type:'textarea' }
    ]
  },
  'product-sales': {
    title: 'Record Product Sale',
    sub: 'Log a product sale or job consumption',
    fields: [
      { label:'Product Code', type:'text', placeholder:'e.g. MB-101', req:true },
      { label:'Product Description', type:'text', req:true },
      { label:'Category', type:'select', options:['Membrane','Coating','Primer','Sealant','Flashing','Sundry'] },
      { label:'Customer / Job', type:'text' },
      { label:'Quantity', type:'number', req:true },
      { label:'Unit', type:'select', options:['m²','m','kg','L','ea','roll','pack'] },
      { label:'Unit Price (R)', type:'number', req:true },
      { label:'Date', type:'date', req:true }
    ]
  },
  repairs: {
    title: 'Log Repair Job',
    sub: 'Create a new repair / remedial job',
    fields: [
      { label:'Customer', type:'select', options:['Orion Group','Highlands Estates','Riverside Sports'], req:true },
      { label:'Original Job Ref', type:'text' },
      { label:'Issue Description', type:'textarea', req:true },
      { label:'Warranty Covered', type:'select', options:['Yes — full','Yes — partial','No'] },
      { label:'Priority', type:'select', options:['Low','Normal','High','Urgent'] },
      { label:'Assigned To', type:'select', options:['Sizwe Maseko','Kagiso Molefe','Johan Fourie'] },
      { label:'Logged Date', type:'date', req:true },
      { label:'Estimated Cost (R)', type:'number' }
    ]
  },
  'sales-by-product': {
    title: 'Record Product Sale',
    sub: 'Add a sale grouped under a specific product',
    fields: [
      { label:'Product', type:'text', req:true },
      { label:'Customer', type:'text' },
      { label:'Job Reference', type:'text' },
      { label:'Units Sold', type:'number', req:true },
      { label:'Revenue (R)', type:'number', req:true },
      { label:'Cost (R)', type:'number' },
      { label:'Date', type:'date', req:true },
      { label:'Notes', type:'textarea' }
    ]
  },
  'sales-by-enquiries': {
    title: 'Link Sale to Enquiry',
    sub: 'Attach an invoice to a source enquiry',
    fields: [
      { label:'Enquiry Ref', type:'text', placeholder:'L04/26-...', req:true },
      { label:'Customer', type:'text', req:true },
      { label:'Subject', type:'text' },
      { label:'Enquiry Type', type:'select', options:['Repeat Customer','Home Owner','Warranty Claim','New Customer'] },
      { label:'Quote Value (R)', type:'number' },
      { label:'Invoiced Value (R)', type:'number', req:true },
      { label:'Sales Rep', type:'select', options:['Thabo Ndlovu','Zanele Sibiya','Johan Fourie'] },
      { label:'Date', type:'date', req:true }
    ]
  }
};

const ReportCreateForm = ({ catId, onNavigate }) => {
  const cfg = REPORT_CREATE[catId];
  if (!cfg) return <Placeholder title="Create" sub="Unknown category"/>;
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('reports')}>
          <Icon name="arrow-left" size={14}/> Back to Reports
        </button>
      </div>

      <PageHeader title={cfg.title} sub={cfg.sub}/>

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Details</h3>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}} className="rep-grid">
          {cfg.fields.map((f,i) => {
            const colSpan = f.type === 'textarea' ? 'span 2' : 'span 1';
            return (
              <div key={i} className="field" style={{margin:0, gridColumn: colSpan}}>
                <label>{f.label}{f.req ? ' *' : ''}</label>
                {f.type === 'select'
                  ? <select><option value="">— Select —</option>{f.options.map(o => <option key={o}>{o}</option>)}</select>
                  : f.type === 'textarea'
                  ? <textarea rows={3} placeholder={f.placeholder || ''}/>
                  : <input type={f.type} placeholder={f.placeholder || ''}/>}
              </div>
            );
          })}
        </div>
        <style>{`@media (max-width:720px){ .rep-grid { grid-template-columns: 1fr !important; } .rep-grid .field { grid-column: span 1 !important; } }`}</style>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('reports')}>Cancel</button>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-secondary"><Icon name="save" size={14}/> Save Draft</button>
            <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('reports')}>
              <Icon name="check" size={14}/> Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Reports, SalesMasterData, MasterDataForm, ReportCreateForm });
