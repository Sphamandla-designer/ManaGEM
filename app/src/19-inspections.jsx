// ===== INSPECTION REPORTS =====
const INSPECTIONS = [
  { ref:'IR-2026-042', desc:'Orion Group — HQ Roof inspection', comments:'Minor cracking detected on parapet flashings. Recommend re-coat.', inspector:'Sizwe Maseko',  start:'02 May 2026', end:'02 May 2026', status:'Submitted',  files:3, customer:'Orion Group',          site:'40 Kiaat Ave, Midrand' },
  { ref:'IR-2026-041', desc:'Highlands Estates — Block C balconies', comments:'12 balconies inspected. Membrane intact. No remedial action required.', inspector:'Kagiso Molefe', start:'30 Apr 2026', end:'30 Apr 2026', status:'Submitted',  files:8, customer:'Highlands Estates',    site:'Block C, Highlands JHB' },
  { ref:'IR-2026-040', desc:'Oakwood Schools — Hall ceiling',   comments:'Active leak from valley gutter. Photographs attached.', inspector:'Sizwe Maseko',     start:'28 Apr 2026', end:'29 Apr 2026', status:'Draft',      files:5, customer:'Oakwood Schools', site:'Durbanville, CT' },
  { ref:'IR-2026-039', desc:'Meridian Holdings — Parking deck',       comments:'Membrane uplift at column 4-B. Quote attached.', inspector:'Johan Fourie',           start:'24 Apr 2026', end:'25 Apr 2026', status:'Submitted',  files:6, customer:'Meridian Holdings',      site:'Fourways' },
  { ref:'IR-2026-038', desc:'Fish Eagle Lodge — Pool surrounds',   comments:'Cracking on pool coping. Re-seal scheduled.', inspector:'Kagiso Molefe',                start:'20 Apr 2026', end:'20 Apr 2026', status:'Submitted',  files:4, customer:'Fish Eagle Lodge',    site:'Stellenbosch' },
  { ref:'IR-2026-037', desc:'Riverside Sports — Hockey Pavilion',       comments:'Annual maintenance — clean and re-seal expansion joints.', inspector:'Sizwe Maseko',  start:'15 Apr 2026', end:'16 Apr 2026', status:'Approved',   files:7, customer:'Riverside Sports',         site:'Pinelands, CT' },
  { ref:'IR-2026-036', desc:'Marula Properties — Office Block C',  comments:'No defects observed. Warranty maintained.', inspector:'Johan Fourie',                     start:'10 Apr 2026', end:'10 Apr 2026', status:'Approved',   files:2, customer:'Marula Properties',  site:'Sandton' },
  { ref:'IR-2026-035', desc:'Orion Group — Warehouse Roof',          comments:'Multiple ponding areas. Drainage modification recommended.', inspector:'Kagiso Molefe', start:'05 Apr 2026', end:'06 Apr 2026', status:'Rejected',   files:9, customer:'Orion Group',           site:'Midrand' }
];

const InspectionReports = ({ onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });
  const filtered = INSPECTIONS.filter(r =>
    !search || (r.ref + r.desc + r.inspector + r.customer).toLowerCase().includes(search.toLowerCase())
  );
  const statusBadge = (s) => {
    const map = { 'Submitted':'sky', 'Draft':'amber', 'Approved':'emerald', 'Rejected':'red' };
    return <Badge variant={map[s] || 'slate'}>{s}</Badge>;
  };
  return (
    <>
      <PageHeader title="Inspection Reports" sub={`${INSPECTIONS.length} reports · ${INSPECTIONS.filter(r=>r.status==='Draft').length} drafts`}
        actions={<>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('inspection-new')}>
            <Icon name="plus" size={14}/> Create Inspection Report
          </button>
        </>}/>

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={[{label:'Status',value:'All'},{label:'Inspector',value:'All'},{label:'Customer',value:'All'}]}
        onChipRemove={()=>{}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Description</th>
                <th>Comments</th>
                <th>Inspector</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th style={{width:40}}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.ref} style={{cursor:'pointer'}} onClick={() => onNavigate && onNavigate('inspection-view')}>
                  <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{r.ref}</td>
                  <td data-label="Description" className="full" style={{fontWeight:500}}>
                    {r.desc}
                    {r.files > 0 && <div style={{fontSize:11, color:'var(--slate-500)', marginTop:2, display:'inline-flex', alignItems:'center', gap:4}}>
                      <Icon name="file-text" size={10}/> {r.files} attached
                    </div>}
                  </td>
                  <td data-label="Comments" style={{color:'var(--slate-600)', fontSize:12, maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} title={r.comments}>{r.comments}</td>
                  <td data-label="Inspector" style={{fontSize:12.5}}>
                    <div className="av-row"><Avatar name={r.inspector} size={22}/><span>{r.inspector}</span></div>
                  </td>
                  <td data-label="Start" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{r.start}</td>
                  <td data-label="End" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{r.end}</td>
                  <td data-label="Status">{statusBadge(r.status)}</td>
                  <td className="actions" onClick={(e)=>e.stopPropagation()}>
                    <RowMenu items={[
                      { icon:'eye',   label:'View',     onClick: () => onNavigate && onNavigate('inspection-view') },
                      { icon:'pencil',label:'Edit',     onClick: () => onNavigate && onNavigate('inspection-edit') },
                      { icon:'save',  label:'Save copy' },
                      { icon:'download', label:'Download PDF' },
                      { divider:true },
                      { icon:'trash', label:'Delete', danger:true }
                    ]}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={INSPECTIONS.length} page={1}/>
      </div>
    </>
  );
};

// ===== INSPECTION REPORT FORM (Create / Edit / View modes) =====
const InspectionReportForm = ({ mode = 'new', onNavigate }) => {
  // mode: 'new' | 'edit' | 'view' — view starts read-only with an Edit toggle
  const [editing, setEditing] = React.useState(mode !== 'view');
  const [files, setFiles] = React.useState(mode === 'new' ? [] : [
    { name: 'site-photo-roof-north.jpg', size: '2.4 MB', type: 'image' },
    { name: 'flashing-detail.png',       size: '1.8 MB', type: 'image' },
    { name: 'measurement-sketch.pdf',    size: '420 KB', type: 'pdf'   }
  ]);
  const fileInputRef = React.useRef();

  const seed = mode === 'new'
    ? { ref:'IR-2026-043 (new)', customer:'', site:'', desc:'', comments:'', inspector:'', startDate:'', endDate:'', findings:'', recommendation:'' }
    : { ref:'IR-2026-042', customer:'Orion Group', site:'40 Kiaat Ave, Midrand',
        desc:'Orion Group — HQ Roof inspection',
        comments:'Minor cracking detected on parapet flashings. Recommend re-coat.',
        inspector:'Sizwe Maseko',
        startDate:'2026-05-02', endDate:'2026-05-02',
        findings:'Hairline cracks observed along parapet flashings on the north and east elevations. No active water ingress at time of inspection. Existing acrylic coating showing UV degradation at sun-exposed areas.',
        recommendation:'Recommend full re-coat of parapet flashings with 2-coat system within next 90 days. Photographic evidence attached.' };

  const onFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...list.map(f => ({
      name: f.name,
      size: (f.size/1024 > 1024 ? (f.size/1024/1024).toFixed(1)+' MB' : Math.round(f.size/1024)+' KB'),
      type: f.type.startsWith('image') ? 'image' : 'pdf'
    }))]);
  };

  const title = mode === 'new' ? 'Create Inspection Report'
              : mode === 'edit' ? `Edit Inspection Report · ${seed.ref}`
              : `Inspection Report · ${seed.ref}`;

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('inspections')}>
          <Icon name="arrow-left" size={14}/> Back to Inspection Reports
        </button>
        {mode !== 'new' && <span className="mono" style={{fontSize:14, fontWeight:600}}>{seed.ref}</span>}
        {mode === 'view' && <Badge variant="sky">Submitted</Badge>}
        <span style={{marginLeft:'auto', display:'flex', gap:8, flexWrap:'wrap'}}>
          {mode === 'view' && !editing && (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              <Icon name="pencil" size={14}/> Edit
            </button>
          )}
          {(mode === 'view' || mode === 'edit') && (
            <button className="btn btn-secondary"><Icon name="download" size={14}/> Download PDF</button>
          )}
        </span>
      </div>

      <PageHeader title={title} sub={mode === 'new' ? 'Fill in inspection details and attach supporting documents.' : seed.desc}/>

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Inspection Details</h3>
        <div className="field-row">
          <div className="field">
            <label>Customer *</label>
            <input defaultValue={seed.customer} placeholder="Search customer..." disabled={!editing}/>
          </div>
          <div className="field">
            <label>Site Address *</label>
            <input defaultValue={seed.site} placeholder="Street, suburb, city" disabled={!editing}/>
          </div>
        </div>
        <div className="field">
          <label>Description *</label>
          <input defaultValue={seed.desc} placeholder="Short title of the inspection" disabled={!editing}/>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Inspector *</label>
            <select defaultValue={seed.inspector} disabled={!editing}>
              <option value="">— Select inspector —</option>
              <option>Sizwe Maseko</option>
              <option>Kagiso Molefe</option>
              <option>Johan Fourie</option>
              <option>Zanele Sibiya</option>
            </select>
          </div>
          <div className="field">
            <label>Status</label>
            <select defaultValue="Draft" disabled={!editing}>
              <option>Draft</option><option>Submitted</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Start Date *</label>
            <input type="date" defaultValue={seed.startDate} disabled={!editing}/>
          </div>
          <div className="field">
            <label>End Date *</label>
            <input type="date" defaultValue={seed.endDate} disabled={!editing}/>
          </div>
        </div>

        <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Findings & Recommendations</h3>
        <div className="field">
          <label>Comments / Summary</label>
          <textarea rows={3} defaultValue={seed.comments} placeholder="One-line summary visible in the inspection list." disabled={!editing}/>
        </div>
        <div className="field">
          <label>Detailed Findings</label>
          <textarea rows={6} defaultValue={seed.findings} placeholder="Describe what was observed during the inspection..." disabled={!editing}/>
        </div>
        <div className="field">
          <label>Recommendation</label>
          <textarea rows={4} defaultValue={seed.recommendation} placeholder="Recommended remedial action, timeline, materials..." disabled={!editing}/>
        </div>

        <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Attachments</h3>
        <div style={{display:'grid', gap:8, marginBottom:editing?14:0}}>
          {files.length === 0 && (
            <div style={{padding:'18px', textAlign:'center', color:'var(--slate-500)', fontSize:12, border:'1px dashed var(--border)', borderRadius:8}}>
              No files attached yet.
            </div>
          )}
          {files.map((f,i)=>(
            <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 14px', border:'1px solid var(--border)', borderRadius:8, background:'var(--slate-50)'}}>
              <div style={{width:32, height:32, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center',
                background: f.type === 'image' ? 'var(--sky-light)' : 'var(--amber-light)',
                color: f.type === 'image' ? 'var(--sky)' : 'var(--amber)'}}>
                <Icon name={f.type === 'image' ? 'eye' : 'file-text'} size={14}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.name}</div>
                <div style={{fontSize:11, color:'var(--slate-500)'}}>{f.size} · {f.type === 'image' ? 'Image' : 'PDF'}</div>
              </div>
              <button className="row-actions-btn" title="Download" style={{opacity:1}}><Icon name="download" size={13}/></button>
              {editing && <button className="row-actions-btn" title="Remove" style={{opacity:1, color:'var(--red)'}} onClick={() => setFiles(files.filter((_,j)=>j!==i))}><Icon name="trash" size={13}/></button>}
            </div>
          ))}
        </div>
        {editing && (
          <>
            <input ref={fileInputRef} type="file" multiple accept="image/png,image/jpeg,application/pdf" style={{display:'none'}} onChange={onFiles}/>
            <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
              <Icon name="upload" size={14}/> Upload PNG, JPEG or PDF
            </button>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:6}}>Drag &amp; drop also supported. Max 10MB per file.</div>
          </>
        )}

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('inspections')}>Cancel</button>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {editing && <button className="btn btn-secondary"><Icon name="save" size={14}/> Save Draft</button>}
            {editing && <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('inspections')}>
              <Icon name="check" size={14}/> {mode === 'new' ? 'Save Report' : 'Save Changes'}
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { InspectionReports, InspectionReportForm });
