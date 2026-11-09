// ===== DASHBOARD =====
const PERIOD_DATA = {
  today:     { label: 'Today',         enquiries: 3,  quotes: 142800,   sales: 41200,    opps: 1200000,    deltaQ: '+5%',  deltaS: '+2%',  deltaE: '+1' },
  yesterday: { label: 'Yesterday',     enquiries: 5,  quotes: 218400,   sales: 67800,    opps: 1180000,    deltaQ: '-2%',  deltaS: '-3%',  deltaE: '0' },
  '7d':      { label: 'Last 7 days',   enquiries: 14, quotes: 892400,   sales: 312500,   opps: 8240000,    deltaQ: '+12%', deltaS: '+9%',  deltaE: '+3' },
  '30d':     { label: 'Last 30 days',  enquiries: 41, quotes: 3348130,  sales: 955202,   opps: 34644096,   deltaQ: '+8%',  deltaS: '-2%',  deltaE: '+5' },
  month:     { label: 'This month',    enquiries: 41, quotes: 3348130,  sales: 955202,   opps: 34644096,   deltaQ: '+8%',  deltaS: '-2%',  deltaE: '+5' },
  quarter:   { label: 'This quarter',  enquiries: 118,quotes: 9842000,  sales: 2814000,  opps: 38120000,   deltaQ: '+14%', deltaS: '+11%', deltaE: '+22' },
  year:      { label: 'This year',     enquiries: 384,quotes: 31562000, sales: 9420800,  opps: 41280000,   deltaQ: '+18%', deltaS: '+15%', deltaE: '+72' }
};

const fmtR = (n) => 'R ' + n.toLocaleString('en-ZA');

const SALES_DATA = {
  daily:   { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], open: [4,6,5,8,7,3,2], won: [2,3,4,5,6,2,1], title: 'Daily Sales Summary', sub: 'Last 7 days' },
  monthly: { labels: ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'], open: [32,38,41,45,42,48,44,49,47,52,50,51], won: [18,21,25,22,28,30,27,32,30,34,36,38], title: 'Monthly Sales Summary', sub: 'Last 12 months' },
  annual:  { labels: ['2020','2021','2022','2023','2024','2025','2026'], open: [310,365,402,458,489,528,561], won: [180,215,248,290,320,358,384], title: 'Annual Sales Summary', sub: 'Last 7 years' }
};

const monthName = (m) => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m];
const fmtDate = (d) => d.getDate() + ' ' + monthName(d.getMonth()) + ' ' + d.getFullYear();

const DateRangePicker = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => {
    const d = value.date || new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const presets = [
    ['today','Today'], ['yesterday','Yesterday'],
    ['7d','Last 7 days'], ['30d','Last 30 days'],
    ['month','This month'], ['quarter','This quarter'], ['year','This year']
  ];

  const label = value.kind === 'date'
    ? fmtDate(value.date)
    : (PERIOD_DATA[value.preset]?.label || 'This month');

  // calendar grid
  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (d) => d && view.y === today.getFullYear() && view.m === today.getMonth() && d === today.getDate();
  const isSelected = (d) => d && value.kind === 'date' && value.date.getFullYear() === view.y && value.date.getMonth() === view.m && value.date.getDate() === d;

  const navMonth = (delta) => {
    const m = view.m + delta;
    if (m < 0) setView({ y: view.y - 1, m: 11 });
    else if (m > 11) setView({ y: view.y + 1, m: 0 });
    else setView({ y: view.y, m });
  };
  const years = []; for (let y = today.getFullYear() - 5; y <= today.getFullYear() + 1; y++) years.push(y);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button className="btn btn-secondary" onClick={() => setOpen(!open)}>
        <Icon name="calendar" size={14} /> {label} <Icon name="chevron-down" size={12} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 50,
          background: 'white', border: '1px solid var(--border)', borderRadius: 12,
          boxShadow: 'var(--shadow-lg)', display: 'flex', overflow: 'hidden', minWidth: 540
        }}>
          {/* Presets */}
          <div style={{ background: 'var(--slate-50)', padding: 8, borderRight: '1px solid var(--border)', minWidth: 150 }}>
            {presets.map(([k, l]) => (
              <button key={k} onClick={() => { onChange({ kind: 'preset', preset: k }); setOpen(false); }} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', borderRadius: 6, fontSize: 12.5,
                background: value.kind === 'preset' && value.preset === k ? 'var(--sky-light)' : 'transparent',
                color: value.kind === 'preset' && value.preset === k ? '#0369A1' : 'var(--slate-700)',
                fontWeight: value.kind === 'preset' && value.preset === k ? 600 : 400
              }}>{l}</button>
            ))}
          </div>
          {/* Calendar */}
          <div style={{ padding: 14, minWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <button onClick={() => navMonth(-1)} style={{ width: 24, height: 24, borderRadius: 6, color: 'var(--slate-500)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              <select value={view.m} onChange={(e) => setView({ ...view, m: +e.target.value })} style={{ flex: 1, fontWeight: 600, fontSize: 13, padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 6, background: 'white' }}>
                {Array.from({length: 12}, (_, i) => <option key={i} value={i}>{['January','February','March','April','May','June','July','August','September','October','November','December'][i]}</option>)}
              </select>
              <select value={view.y} onChange={(e) => setView({ ...view, y: +e.target.value })} style={{ fontWeight: 600, fontSize: 13, padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 6, background: 'white' }}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <button onClick={() => navMonth(1)} style={{ width: 24, height: 24, borderRadius: 6, color: 'var(--slate-500)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, fontSize: 10, fontWeight: 600, color: 'var(--slate-500)', textAlign: 'center', marginBottom: 4 }}>
              {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{ padding: '4px 0' }}>{d}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
              {cells.map((d, i) => d === null ? <div key={i}/> : (
                <button key={i} onClick={() => { onChange({ kind: 'date', date: new Date(view.y, view.m, d) }); setOpen(false); }} style={{
                  height: 32, borderRadius: 6, fontSize: 12,
                  background: isSelected(d) ? 'var(--sky)' : (isToday(d) ? 'var(--sky-light)' : 'transparent'),
                  color: isSelected(d) ? 'white' : (isToday(d) ? '#0369A1' : 'var(--text)'),
                  fontWeight: isSelected(d) || isToday(d) ? 600 : 400
                }}>{d}</button>
              ))}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, color: 'var(--slate-500)' }}>
              <span>{value.kind === 'date' ? fmtDate(value.date) : (PERIOD_DATA[value.preset]?.label || '')}</span>
              <button onClick={() => { onChange({ kind: 'preset', preset: 'month' }); setOpen(false); }} style={{ color: 'var(--sky)', fontSize: 12, fontWeight: 500 }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ onNavigate }) => {
  const [salesRange, setSalesRange] = React.useState('monthly');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });

  const kpi = period.kind === 'preset'
    ? PERIOD_DATA[period.preset]
    : (() => {
        // synthesize values for an exact date — small day-scale figures
        const d = period.date;
        const seed = (d.getDate() * 7 + d.getMonth() * 31 + d.getFullYear()) % 100;
        return {
          label: fmtDate(d),
          enquiries: 1 + (seed % 6),
          quotes: 80000 + seed * 4200,
          sales: 22000 + seed * 1800,
          opps: 1100000 + seed * 9200,
          deltaQ: (seed % 2 ? '+' : '-') + (3 + seed % 8) + '%',
          deltaS: (seed % 3 ? '+' : '-') + (2 + seed % 6) + '%',
          deltaE: (seed % 2 ? '+' : '-') + (seed % 4)
        };
      })();

  React.useEffect(() => {
    const trendCtx = document.getElementById('trendChart');
    const donutCtx = document.getElementById('donutChart');
    if (trendCtx && trendCtx._chart) trendCtx._chart.destroy();
    if (donutCtx && donutCtx._chart) donutCtx._chart.destroy();
    if (trendCtx) {
      const d = SALES_DATA[salesRange];
      trendCtx._chart = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: d.labels,
          datasets: [
          { label: 'Open', data: d.open, borderColor: '#0EA5E9', backgroundColor: 'rgba(14,165,233,0.10)', fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 4, borderWidth: 2 },
          { label: 'Closed/Won', data: d.won, borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.08)', fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 4, borderWidth: 2 }]

        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 8, boxHeight: 8, font: { size: 11 } } } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#64748B' } },
            y: { grid: { color: '#F1F5F9' }, border: { display: false }, ticks: { font: { size: 11 }, color: '#64748B' } }
          }
        }
      });
    }
    if (donutCtx) {
      donutCtx._chart = new Chart(donutCtx, {
        type: 'bar',
        data: {
          labels: ['Sales Opportunities', 'Quotes Sent Out', 'Quotes Target', 'Sales', 'Sales Target'],
          datasets: [{
            label: 'Value (R)',
            data: [34644096, 3348130, 4500000, 955202, 1200000],
            backgroundColor: ['#8B5CF6', '#0EA5E9', '#94A3B8', '#10B981', '#94A3B8'],
            borderRadius: 6,
            borderSkipped: false,
            barThickness: 18
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => 'R ' + ctx.parsed.x.toLocaleString()
              }
            }
          },
          scales: {
            x: {
              grid: { color: '#F1F5F9' },
              border: { display: false },
              ticks: {
                font: { size: 10 }, color: '#64748B',
                callback: (v) => v >= 1e6 ? 'R' + (v/1e6).toFixed(1) + 'M' : 'R' + (v/1e3).toFixed(0) + 'K'
              }
            },
            y: { grid: { display: false }, border: { display: false }, ticks: { font: { size: 11 }, color: '#334155' } }
          }
        }
      });
    }
  }, [salesRange]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        sub={`${greeting()}, ${firstName(useSession().name)}`}
        actions={<DateRangePicker value={period} onChange={setPeriod} />} />

      <div style={{
        background: '#FEE2E2',
        border: '1px solid #FECACA',
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
        <Icon name="mail" size={14} style={{ color: '#DC2626' }} />
        <span style={{ fontWeight: 600, fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#991B1B' }}>Messages</span>
        <span style={{ flex: 1, color: '#991B1B', fontSize: 13 }}>You have 4 new messages</span>
        <button style={{ color: '#991B1B', fontSize: 16, lineHeight: 1, padding: 4 }}>×</button>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 16 }}>
        <div className="kpi">
          <div className="kpi-icon" style={{ background: 'var(--sky-light)', color: 'var(--sky)' }}><Icon name="folder-open" size={16} /></div>
          <div className="kpi-label">ENQUIRIES</div>
          <div className="kpi-value">{kpi.enquiries}</div>
          <div className={'kpi-delta ' + (kpi.deltaE.startsWith('-') ? 'down' : 'up')}><Icon name={kpi.deltaE.startsWith('-') ? 'arrow-down' : 'arrow-up'} size={12} /> {kpi.deltaE} vs prior</div>
        </div>
        <div className="kpi">
          <div className="kpi-icon" style={{ background: 'var(--emerald-light)', color: 'var(--emerald)' }}><Icon name="receipt" size={16} /></div>
          <div className="kpi-label">QUOTES</div>
          <div className="kpi-value">{fmtR(kpi.quotes)}</div>
          <div className={'kpi-delta ' + (kpi.deltaQ.startsWith('-') ? 'down' : 'up')}><Icon name={kpi.deltaQ.startsWith('-') ? 'arrow-down' : 'arrow-up'} size={12} /> {kpi.deltaQ} vs prior</div>
        </div>
        <div className="kpi">
          <div className="kpi-icon" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}><Icon name="briefcase" size={16} /></div>
          <div className="kpi-label">SALES</div>
          <div className="kpi-value">{fmtR(kpi.sales)}</div>
          <div className={'kpi-delta ' + (kpi.deltaS.startsWith('-') ? 'down' : 'up')}><Icon name={kpi.deltaS.startsWith('-') ? 'arrow-down' : 'arrow-up'} size={12} /> {kpi.deltaS} vs prior</div>
        </div>
        <div className="kpi">
          <div className="kpi-icon" style={{ background: 'var(--slate-100)', color: 'var(--slate-500)' }}><Icon name="alert-triangle" size={16} /></div>
          <div className="kpi-label">OPPORTUNITIES</div>
          <div className="kpi-value">{fmtR(kpi.opps)}</div>
          <div className="kpi-delta" style={{ color: 'var(--slate-500)' }}>Value of Outstanding Quotes</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.85fr) minmax(0, 1fr)', gap: 16 }} className="dash-row">
          <div className="card">
            <div className="card-hd">
              <h3>Sales Summary</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--slate-500)' }}>{SALES_DATA[salesRange].sub}</span>
                <div style={{ display: 'inline-flex', background: 'var(--slate-100)', borderRadius: 8, padding: 3 }}>
                  {[['daily','Daily'],['monthly','Monthly'],['annual','Annual']].map(([k,l]) => (
                    <button key={k} onClick={() => setSalesRange(k)} style={{
                      padding: '5px 12px', fontSize: 12, fontWeight: 500, borderRadius: 6,
                      background: salesRange === k ? 'white' : 'transparent',
                      color: salesRange === k ? 'var(--text)' : 'var(--slate-600)',
                      boxShadow: salesRange === k ? '0 1px 2px rgba(15,23,42,0.06)' : 'none',
                      transition: 'all 120ms'
                    }}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '8px 18px 0', fontSize: 13, fontWeight: 600, color: 'var(--slate-700)' }}>{SALES_DATA[salesRange].title}</div>
            <div style={{ padding: 16, height: 260 }}>
              <canvas id="trendChart"></canvas>
            </div>
          </div>
          <div className="card">
            <div className="card-hd"><h3>Monthly Performance</h3></div>
            <div style={{ padding: 16, height: 280 }}>
              <canvas id="donutChart"></canvas>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-hd">
            <h3>Current Projects</h3>
            <a href="#" onClick={(e) => {e.preventDefault();onNavigate('projects');}}>View all projects →</a>
          </div>
          <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }} className="proj-grid">
            {[
              { ref: 'P26-042', name: 'Orion Group HQ Roof', addr: '40 Kiaat Ave, Midrand', foreman: 'Kagiso M.', progress: 78, due: '08 May', status: 'On Track', stage: 'Application', accent: '#10B981' },
              { ref: 'P26-038', name: 'Riverside College Hockey Pavilion', addr: 'Pinelands, CT', foreman: 'Sizwe M.', progress: 45, due: '14 May', status: 'On Track', stage: 'Prep', accent: '#0EA5E9' },
              { ref: 'P26-035', name: 'Highlands Estates Block C', addr: 'Highlands, JHB', foreman: 'Willem V.', progress: 92, due: '02 May', status: 'Final QC', stage: 'Inspection', accent: '#8B5CF6' },
              { ref: 'P26-031', name: 'Meridian Fourways Resi', addr: '9 Meridian Close', foreman: 'Kagiso M.', progress: 22, due: '24 May', status: 'Delayed', stage: 'Awaiting Stock', accent: '#F59E0B' },
              { ref: 'P26-028', name: 'Oakwood Primary', addr: 'Durbanville, CT', foreman: 'Sizwe M.', progress: 60, due: '12 May', status: 'On Track', stage: 'Application', accent: '#10B981' },
              { ref: 'P26-024', name: 'Fish Eagle Lodge', addr: 'Stellenbosch', foreman: 'Willem V.', progress: 15, due: '30 May', status: 'Scheduled', stage: 'Mobilising', accent: '#94A3B8' }
            ].map((p, i) => (
              <div key={i} onClick={() => onNavigate('projects')} style={{
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: 14,
                cursor: 'pointer',
                background: 'white',
                transition: 'all 150ms',
                position: 'relative',
                overflow: 'hidden'
              }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--sky)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                 onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: p.accent }}></div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="mono" style={{ color: 'var(--sky)', fontSize: 11 }}>{p.ref}</div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--slate-500)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.addr}</div>
                  </div>
                  <span className={'badge ' + (p.status === 'Delayed' ? 'badge-amber' : p.status === 'Final QC' ? 'badge-purple' : p.status === 'Scheduled' ? 'badge-slate' : 'badge-emerald')} style={{ flexShrink: 0 }}>{p.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--slate-500)', marginTop: 10, marginBottom: 6 }}>
                  <span style={{ fontWeight: 500, color: 'var(--slate-700)' }}>{p.stage}</span>
                  <span>{p.progress}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--slate-100)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: p.progress + '%', background: p.accent, borderRadius: 999, transition: 'width 300ms' }}></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Avatar name={p.foreman} size={20} />
                    <span style={{ fontSize: 11.5, color: 'var(--slate-600)' }}>{p.foreman}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--slate-600)' }}>
                    <Icon name="calendar" size={11} />
                    <span>Due {p.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="dash-row">
          <div className="card">
            <div className="card-hd">
              <h3>Recent Sales Activity</h3>
              <a href="#" onClick={(e) => {e.preventDefault();onNavigate('enquiries');}}>View all sales →</a>
            </div>
            <div>
              {[
              { ref: 'L04/26-124', name: 'Orion Group', type: 'Repeat Customer', status: 'Deposit Paid', date: '29 Apr' },
              { ref: 'L04/26-119', name: 'Highlands Estates', type: 'Home Owner', status: 'Scheduled', date: '28 Apr' },
              { ref: 'L04/26-115', name: 'Oakwood Schools', type: 'Warranty Claim', status: 'Not Quoted', date: '27 Apr' },
              { ref: 'L04/26-111', name: 'Fish Eagle Lodge', type: 'New Customer', status: 'Scheduled', date: '26 Apr' },
              { ref: 'L04/26-108', name: 'Riverside Hockey', type: 'Repeat Customer', status: 'Invoiced', date: '24 Apr' }].
              map((r, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}
              onClick={() => onNavigate('enquiry-detail')}>
                  <span className="mono" style={{ color: 'var(--sky)', minWidth: 90, fontSize: 12 }}>{r.ref}</span>
                  <span style={{ flex: 1, fontWeight: 500 }}>{r.name}</span>
                  <TypeBadge type={r.type} />
                  <StatusBadge status={r.status} />
                  <span style={{ color: 'var(--slate-500)', fontSize: 12, minWidth: 50, textAlign: 'right' }}>{r.date}</span>
                </div>
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-hd">
              <h3>Open Bookings This Week</h3>
              <a href="#" onClick={(e) => {e.preventDefault();onNavigate('projects');}}>View calendar →</a>
            </div>
            <div>
              {[
              { d: '01', m: 'May', addr: '40 Kiaat Ave, Midrand', foreman: 'Kagiso M.', cust: 'Orion Group' },
              { d: '02', m: 'May', addr: 'Riverside College Hockey Pavilion', foreman: 'Sizwe M.', cust: 'Riverside Sports' },
              { d: '03', m: 'May', addr: 'Highlands Estates Block C', foreman: 'Willem V.', cust: 'Highlands Estates' },
              { d: '05', m: 'May', addr: '9 Meridian Close, Fourways', foreman: 'Kagiso M.', cust: 'Meridian Holdings' },
              { d: '06', m: 'May', addr: 'Oakwood Primary School', foreman: 'Sizwe M.', cust: 'OW Schools' }].
              map((r, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 44, textAlign: 'center', background: 'var(--slate-50)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 0' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{r.d}</div>
                    <div style={{ fontSize: 10, color: 'var(--slate-500)', textTransform: 'uppercase', marginTop: 2 }}>{r.m}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.addr}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--slate-500)' }}>{r.cust}</div>
                  </div>
                  <div className="av-row" style={{ fontSize: 12 }}>
                    <Avatar name={r.foreman} size={22} />
                    <span style={{ color: 'var(--slate-600)' }}>{r.foreman}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="qa-grid">
          {[
          { i: 'plus-circle', t: 'New Enquiry', s: 'Capture a sales lead', go: 'enquiries' },
          { i: 'truck', t: 'Dispatch Stock', s: 'Send material to job', go: 'stock' },
          { i: 'file-text', t: 'Create Invoice', s: 'Bill a completed job', go: 'enquiries' },
          { i: 'bar-chart-2', t: 'View Reports', s: 'Sales & operations', go: 'reports' }].
          map((q, i) =>
          <div className="qa-card" key={i} onClick={() => onNavigate(q.go)}>
              <div className="qa-icon"><Icon name={q.i} size={18} /></div>
              <div>
                <div className="ttl">{q.t}</div>
                <div className="sub">{q.s}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>);

};

Object.assign(window, { Dashboard, DateRangePicker, fmtDate });