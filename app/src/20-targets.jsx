// ===== SALES TARGETS =====
const TARGETS = [
  { id:'ST-2026-018', type:'Monthly',   year:2026, month:'May', salesTarget: 1200000, quoteTarget: 4500000, rep:'Thabo Ndlovu',  actualSales: 955202,  actualQuotes: 3348130, status:'Active' },
  { id:'ST-2026-017', type:'Monthly',   year:2026, month:'May', salesTarget:  850000, quoteTarget: 3200000, rep:'Zanele Sibiya',  actualSales: 612400,  actualQuotes: 2480500, status:'Active' },
  { id:'ST-2026-016', type:'Monthly',   year:2026, month:'May', salesTarget:  900000, quoteTarget: 3000000, rep:'Johan Fourie', actualSales: 1042000, actualQuotes: 3210800, status:'Active' },
  { id:'ST-2026-015', type:'Monthly',   year:2026, month:'Apr', salesTarget: 1100000, quoteTarget: 4200000, rep:'Thabo Ndlovu',  actualSales: 1284500, actualQuotes: 4380000, status:'Achieved' },
  { id:'ST-2026-014', type:'Quarterly', year:2026, month:'Q2',  salesTarget: 3600000, quoteTarget:13500000, rep:'Thabo Ndlovu',  actualSales: 2812000, actualQuotes:10240000, status:'Active' },
  { id:'ST-2026-013', type:'Quarterly', year:2026, month:'Q2',  salesTarget: 2700000, quoteTarget: 9800000, rep:'Zanele Sibiya',  actualSales: 1840000, actualQuotes: 7120000, status:'Active' },
  { id:'ST-2026-012', type:'Annual',    year:2026, month:'—',   salesTarget:14400000, quoteTarget:48000000, rep:'Thabo Ndlovu',  actualSales: 4520000, actualQuotes:15820000, status:'Active' },
  { id:'ST-2025-088', type:'Monthly',   year:2025, month:'Dec', salesTarget: 1400000, quoteTarget: 5000000, rep:'Johan Fourie', actualSales: 1218000, actualQuotes: 4640000, status:'Missed' }
];

const fmtZAR = (n) => 'R ' + n.toLocaleString('en-ZA');

const SalesTargets = ({ onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'year' });

  const filtered = TARGETS.filter(t =>
    !search || (t.id + t.rep + t.month + t.year).toLowerCase().includes(search.toLowerCase())
  );

  const totalSalesTarget = TARGETS.reduce((s,t)=>s+t.salesTarget,0);
  const totalActualSales = TARGETS.reduce((s,t)=>s+t.actualSales,0);
  const overallProgress = Math.round((totalActualSales / totalSalesTarget) * 100);

  const statusBadge = (s) => {
    const map = { 'Active':'sky', 'Achieved':'emerald', 'Missed':'red', 'Draft':'amber' };
    return <Badge variant={map[s] || 'slate'}>{s}</Badge>;
  };

  return (
    <>
      <PageHeader title="Sales Targets" sub={`${TARGETS.length} targets · ${overallProgress}% overall progress`}
        actions={<>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('target-new')}>
            <Icon name="plus" size={14}/> New Target
          </button>
        </>}/>

      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="target" size={16}/></div><div className="kpi-label">Active Targets</div><div className="kpi-value">{TARGETS.filter(t=>t.status==='Active').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="check" size={16}/></div><div className="kpi-label">Achieved</div><div className="kpi-value">{TARGETS.filter(t=>t.status==='Achieved').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Missed</div><div className="kpi-value">{TARGETS.filter(t=>t.status==='Missed').length}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="bar-chart-2" size={16}/></div><div className="kpi-label">Total Target Value</div><div className="kpi-value">R {(totalSalesTarget/1e6).toFixed(1)}M</div></div>
      </div>

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={[{label:'Type',value:'All'},{label:'Sales Rep',value:'All'},{label:'Status',value:'All'}]}
        onChipRemove={()=>{}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Type</th>
                <th>Year</th>
                <th>Month / Period</th>
                <th style={{textAlign:'right'}}>Sales Target</th>
                <th style={{textAlign:'right'}}>Quote Target</th>
                <th>Sales Rep</th>
                <th>Progress</th>
                <th>Status</th>
                <th style={{width:40}}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t=>{
                const progress = Math.min(100, Math.round((t.actualSales / t.salesTarget) * 100));
                const barColor = progress >= 100 ? 'var(--emerald)' : progress >= 70 ? 'var(--sky)' : progress >= 40 ? 'var(--amber)' : 'var(--red)';
                return (
                  <tr key={t.id}>
                    <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{t.id}</td>
                    <td data-label="Type">
                      <Badge variant={t.type==='Annual'?'purple':t.type==='Quarterly'?'sky':'slate'}>{t.type}</Badge>
                    </td>
                    <td data-label="Year" style={{color:'var(--slate-700)'}}>{t.year}</td>
                    <td data-label="Month" style={{color:'var(--slate-700)'}}>{t.month}</td>
                    <td data-label="Sales Target" className="cell-num" style={{fontWeight:600}}>{fmtZAR(t.salesTarget)}</td>
                    <td data-label="Quote Target" className="cell-num" style={{color:'var(--slate-600)'}}>{fmtZAR(t.quoteTarget)}</td>
                    <td data-label="Rep" className="full">
                      <div className="av-row"><Avatar name={t.rep} size={22}/><span style={{fontSize:12.5}}>{t.rep}</span></div>
                    </td>
                    <td data-label="Progress" style={{minWidth:140}}>
                      <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12}}>
                        <div style={{flex:1, height:6, background:'var(--slate-100)', borderRadius:999, overflow:'hidden'}}>
                          <div style={{width:progress+'%', height:'100%', background:barColor, borderRadius:999}}/>
                        </div>
                        <span className="mono" style={{color:'var(--slate-700)', fontWeight:600, minWidth:36, textAlign:'right'}}>{progress}%</span>
                      </div>
                    </td>
                    <td data-label="Status">{statusBadge(t.status)}</td>
                    <td className="actions">
                      <RowMenu items={[
                        { icon:'eye',   label:'View Details' },
                        { icon:'pencil',label:'Edit Target', onClick: () => onNavigate && onNavigate('target-edit') },
                        { icon:'bar-chart-2', label:'View Progress Report' },
                        { divider:true },
                        { icon:'trash', label:'Delete Record', danger:true }
                      ]}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pager total={TARGETS.length} page={1}/>
      </div>
    </>
  );
};

// ===== SALES TARGET FORM (new / edit) =====
const SalesTargetForm = ({ mode = 'new', onNavigate }) => {
  const seed = mode === 'new'
    ? { id:'(auto-generated)', type:'Monthly', year:'2026', month:'May', salesTarget:'', quoteTarget:'', rep:'', status:'Active', notes:'' }
    : { id:'ST-2026-018', type:'Monthly', year:'2026', month:'May', salesTarget:1200000, quoteTarget:4500000, rep:'Thabo Ndlovu', status:'Active', notes:'Stretch goal — assumes Highlands renewal closes in May.' };

  const isEdit = mode === 'edit';
  const monthOptions = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const quarterOptions = ['Q1','Q2','Q3','Q4'];

  const [type, setType] = React.useState(seed.type);
  const periodOptions = type === 'Monthly' ? monthOptions : type === 'Quarterly' ? quarterOptions : ['—'];

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('targets')}>
          <Icon name="arrow-left" size={14}/> Back to Sales Targets
        </button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>{seed.id}</span>}
        {isEdit && <Badge variant="sky">Active</Badge>}
      </div>

      <PageHeader
        title={isEdit ? 'Edit Sales Target' : 'New Sales Target'}
        sub={isEdit ? 'Update the target values, period or assigned rep.' : 'Define a new revenue or quote target for the period.'}
      />

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Target Details</h3>

        <div className="field-row">
          <div className="field">
            <label>Type *</label>
            <select value={type} onChange={(e)=>setType(e.target.value)}>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annual</option>
            </select>
          </div>
          <div className="field">
            <label>Year *</label>
            <select defaultValue={seed.year}>
              {[2024,2025,2026,2027].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Month / Period {type === 'Annual' ? '' : '*'}</label>
            <select defaultValue={seed.month} disabled={type === 'Annual'}>
              {periodOptions.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Sales Rep *</label>
            <select defaultValue={seed.rep}>
              <option value="">— Select rep —</option>
              <option>Thabo Ndlovu</option>
              <option>Zanele Sibiya</option>
              <option>Johan Fourie</option>
              <option>Ethan Jacobs</option>
              <option>All Reps (team target)</option>
            </select>
          </div>
        </div>

        <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Target Values</h3>

        <div className="field-row">
          <div className="field">
            <label>Sales Target (R) *</label>
            <input type="number" defaultValue={seed.salesTarget || ''} placeholder="0"/>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:4}}>Total revenue expected to be invoiced in the period.</div>
          </div>
          <div className="field">
            <label>Quote Target (R) *</label>
            <input type="number" defaultValue={seed.quoteTarget || ''} placeholder="0"/>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:4}}>Total value of quotes expected to be issued.</div>
          </div>
        </div>

        <div className="field">
          <label>Status</label>
          <select defaultValue={seed.status}>
            <option>Draft</option>
            <option>Active</option>
            <option>Achieved</option>
            <option>Missed</option>
          </select>
        </div>

        <div className="field" style={{margin:0}}>
          <label>Notes (internal)</label>
          <textarea rows={4} defaultValue={seed.notes} placeholder="Any context — stretch assumptions, dependencies, etc."/>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('targets')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete Record
            </button>}
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-secondary"><Icon name="save" size={14}/> Save Draft</button>
            <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('targets')}>
              <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save Target'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { SalesTargets, SalesTargetForm });
