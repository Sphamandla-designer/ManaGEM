// ===== SALES ENQUIRIES =====
const ENQUIRIES = [
  { ref: "L04/26-124", quote: "Q-2603", date: "29 Apr 2026", customer: "Orion Group", subject: "Roof waterproofing — block A & B", area: "Sandton", type: "Repeat Customer", status: "Deposit Paid", rep: "Ethan Jacobs", warranty: true, stage: "Deposit Paid" },
  { ref: "L04/26-119", quote: "Q-2598", date: "28 Apr 2026", customer: "Highlands Estates", subject: "Balcony membrane replacement (12 units)", area: "Cape Town", type: "Home Owner", status: "Scheduled", rep: "Zanele Sibiya", warranty: false, stage: "Quoted" },
  { ref: "L04/26-115", quote: "—", date: "27 Apr 2026", customer: "Oakwood Schools", subject: "Hall ceiling leak inspection", area: "Cape Town", type: "Warranty Claim", status: "Not Quoted", rep: "Ethan Jacobs", warranty: true, stage: "New Lead" },
  { ref: "L04/26-111", quote: "Q-2592", date: "26 Apr 2026", customer: "Fish Eagle Lodge", subject: "Pool deck and surrounds", area: "Mpumalanga", type: "New Customer", status: "Scheduled", rep: "Johan Fourie", warranty: false, stage: "Quoted" },
  { ref: "L04/26-108", quote: "Q-2588", date: "24 Apr 2026", customer: "Riverside Sports", subject: "Hockey pavilion roof rebuild", area: "Johannesburg", type: "Repeat Customer", status: "Invoiced", rep: "Ethan Jacobs", warranty: true, stage: "Invoiced" },
  { ref: "L04/26-105", quote: "Q-2584", date: "23 Apr 2026", customer: "Meridian Holdings", subject: "Parking deck membrane", area: "Pretoria", type: "Repeat Customer", status: "In Progress", rep: "Zanele Sibiya", warranty: false, stage: "In Progress" },
  { ref: "L04/26-102", quote: "Q-2580", date: "22 Apr 2026", customer: "Thembeka Construct", subject: "New build — full waterproofing pkg", area: "Johannesburg", type: "New Customer", status: "Quoted", rep: "Johan Fourie", warranty: false, stage: "Quoted" },
  { ref: "L04/26-099", quote: "—", date: "21 Apr 2026", customer: "Jacaranda Property", subject: "Damp inspection — block 4", area: "Pretoria", type: "Warranty Claim", status: "Not Quoted", rep: "Zanele Sibiya", warranty: true, stage: "New Lead" },
  { ref: "L04/26-095", quote: "Q-2575", date: "19 Apr 2026", customer: "Seaview BC", subject: "Re-coat external walls", area: "Johannesburg", type: "Repeat Customer", status: "Cancelled", rep: "Ethan Jacobs", warranty: false, stage: "Quoted" },
  { ref: "L04/26-091", quote: "Q-2571", date: "18 Apr 2026", customer: "Harbour Line", subject: "Hull deck waterproofing", area: "Western Cape", type: "Home Owner", status: "Deposit Paid", rep: "Johan Fourie", warranty: false, stage: "Deposit Paid" }
];

const TAB_FILTERS = {
  open:   (e) => e.status !== 'Cancelled' && e.status !== 'Invoiced',
  notq:   (e) => e.status === 'Not Quoted',
  opp:    (e) => e.status === 'Quoted' || e.status === 'Scheduled',
  all:    () => true,
  closed: (e) => e.status === 'Cancelled' || e.status === 'Invoiced'
};

const TAB_META = {
  open:   { title: 'Open Enquiries',          sub: 'Active leads in your pipeline' },
  notq:   { title: 'Not Quoted',              sub: 'Enquiries awaiting a quote' },
  opp:    { title: 'Opportunities',           sub: 'Quoted and scheduled — ready to close' },
  all:    { title: 'All Sales',               sub: 'Every enquiry across all stages' },
  closed: { title: 'Closed (Won / Cancelled)',sub: 'Invoiced or cancelled enquiries' }
};

const Enquiries = ({ onNavigate }) => {
  const [tab, setTab] = React.useState('open');
  const [stage, setStage] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });

  const stages = [
    { id: 'New Lead', label: 'New Lead', ct: 12 },
    { id: 'Quoted', label: 'Quoted', ct: 18 },
    { id: 'Deposit Paid', label: 'Deposit Paid', ct: 9 },
    { id: 'In Progress', label: 'In Progress', ct: 6 },
    { id: 'Invoiced', label: 'Invoiced', ct: 6 }
  ];

  const tabCounts = {
    open: ENQUIRIES.filter(TAB_FILTERS.open).length + 41,
    notq: ENQUIRIES.filter(TAB_FILTERS.notq).length + 10,
    opp:  ENQUIRIES.filter(TAB_FILTERS.opp).length + 4,
    all:  ENQUIRIES.length + 178,
    closed: ENQUIRIES.filter(TAB_FILTERS.closed).length + 92
  };

  let filtered = ENQUIRIES.filter(TAB_FILTERS[tab]);
  if (stage && tab === 'open') filtered = filtered.filter(e => e.stage === stage);
  if (search) filtered = filtered.filter(e => (e.ref + e.customer + e.subject).toLowerCase().includes(search.toLowerCase()));

  const showPipeline = tab === 'open';
  const meta = TAB_META[tab];

  return (
    <>
      <PageHeader
        title={meta.title}
        sub={meta.sub}
        actions={<button className="btn btn-primary" onClick={() => onNavigate && onNavigate('new-enquiry')}><Icon name="plus" size={14}/> New Enquiry</button>}
      />
      <div className="tabs">
        {[
          { id: 'open', l: 'Open' },
          { id: 'notq', l: 'Not Quoted' },
          { id: 'opp', l: 'Opportunities' },
          { id: 'all', l: 'All Sales' },
          { id: 'closed', l: 'Closed' }
        ].map(t => (
          <button key={t.id} className={`tab${tab===t.id?' active':''}`} onClick={() => { setTab(t.id); setStage(null); }}>
            {t.l}<span className="ct">{tabCounts[t.id]}</span>
          </button>
        ))}
      </div>

      {showPipeline && (
        <div className="pipeline">
          {stages.map((s, i) => (
            <div key={s.id} className={`pipeline-cell${stage===s.id?' active':''}`} onClick={() => setStage(stage===s.id?null:s.id)}>
              <div className="lbl">{s.label}</div>
              <div className="ct">{s.ct}</div>
              {i < stages.length-1 && <span className="arrow"/>}
            </div>
          ))}
        </div>
      )}

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={[
          { label: 'Sales Rep', value: 'All' },
          { label: 'Area', value: 'All' },
          { label: 'Type', value: 'All' }
        ]}
        onChipRemove={() => {}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}
      />

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}><Checkbox/></th>
                <th>Ref No</th>
                <th>Quote No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Subject</th>
                <th>Area</th>
                <th>Type</th>
                <th>Warr.</th>
                <th>Status</th>
                <th>Sales Rep</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.ref} onClick={() => onNavigate('enquiry-detail')} style={{ cursor: 'pointer' }}>
                  <td onClick={(ev)=>ev.stopPropagation()}><Checkbox/></td>
                  <td data-label="Ref" className="cell-mono link" style={{ fontWeight: 600 }}>{e.ref}</td>
                  <td data-label="Quote" className="cell-mono">{e.quote}</td>
                  <td data-label="Date" style={{ color: 'var(--slate-600)' }}>{e.date}</td>
                  <td data-label="Customer" className="cell-bold full">{e.customer}</td>
                  <td data-label="Subject" title={e.subject} style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--slate-700)' }}>{e.subject}</td>
                  <td data-label="Area" style={{ color: 'var(--slate-600)' }}>{e.area}</td>
                  <td data-label="Type"><TypeBadge type={e.type}/></td>
                  <td data-label="Warr.">{e.warranty ? <Icon name="shield-check" size={14} style={{ color: 'var(--emerald)' }}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                  <td data-label="Status"><StatusBadge status={e.status}/></td>
                  <td data-label="Rep"><div className="av-row"><Avatar name={e.rep}/><span style={{fontSize:12.5}}>{e.rep}</span></div></td>
                  <td className="actions">
                    <RowMenu items={[
                      { icon: 'pencil', label: 'Edit Enquiry' },
                      { icon: 'eye', label: 'View Quote' },
                      { icon: 'file-text', label: 'Create Invoice' },
                      { divider: true },
                      { icon: 'trash', label: 'Delete', danger: true }
                    ]}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={tabCounts[tab]} page={1}/>
      </div>
    </>
  );
};

window.Enquiries = Enquiries;
