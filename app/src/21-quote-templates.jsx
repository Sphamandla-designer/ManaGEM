// ===== QUOTE TEMPLATES (host with sub-tabs: Templates / Items / Logos) =====

const QT_TEMPLATES = [
  { id:'QT-001', description:'Standard Waterproofing Quote',   tcs:'Standard 12-month',  layout:'Classic A4',  logo:'Ridgeway Default',  heading:'Waterproofing Services Quote' },
  { id:'QT-002', description:'Pool & Deck Restoration',         tcs:'Standard 12-month',  layout:'Modern A4',   logo:'Ridgeway Premier',  heading:'Pool Deck Restoration Quote' },
  { id:'QT-003', description:'Warranty Claim Inspection',       tcs:'Warranty-only',      layout:'Classic A4',  logo:'Ridgeway Default',  heading:'Warranty Inspection Quote' },
  { id:'QT-004', description:'Commercial Roof Refurbishment',   tcs:'Commercial 24-month',layout:'Modern A4',   logo:'Ridgeway Premier',  heading:'Commercial Roof Quote' },
  { id:'QT-005', description:'Residential Single Storey',       tcs:'Standard 12-month',  layout:'Compact A4',  logo:'Ridgeway Light',    heading:'Residential Quote' },
  { id:'QT-006', description:'Industrial — Factory Floors',     tcs:'Industrial',         layout:'Landscape',   logo:'Ridgeway Premier',  heading:'Industrial Coatings Quote' }
];

const QT_ITEMS = [
  { id:'QI-101', template:'QT-001', sequence:1, product:'Acrylic Membrane',        description:'Acrylic membrane application — primer + 2 coats',  itemType:'Material', bold:true  },
  { id:'QI-102', template:'QT-001', sequence:2, product:'Torch-on bitumen 4mm',         description:'Bituminous torch-on — 4mm membrane bonded to substrate', itemType:'Material', bold:false },
  { id:'QI-103', template:'QT-001', sequence:3, product:'Site Inspection',          description:'Site inspection & moisture testing',                itemType:'Labour',   bold:false },
  { id:'QI-104', template:'QT-002', sequence:1, product:'CR Coating',               description:'Pool deck Chlorinated Rubber coating',              itemType:'Material', bold:true  },
  { id:'QI-105', template:'QT-002', sequence:2, product:'Slip Additive',            description:'Slip-resistant additive',                           itemType:'Material', bold:false },
  { id:'QI-106', template:'QT-004', sequence:1, product:'PU Membrane',              description:'Commercial polyurethane membrane',                  itemType:'Material', bold:true  },
  { id:'QI-107', template:'QT-004', sequence:2, product:'XPS Insulation 50mm',      description:'Insulation board — 50mm XPS',                       itemType:'Material', bold:false },
  { id:'QI-108', template:'QT-005', sequence:1, product:'Acrylic Re-coat',          description:'Standard acrylic re-coat — residential',            itemType:'Material', bold:true  }
];

const QT_LOGOS = [
  { id:'LG-01', name:'Ridgeway Default',  desc:'Standard wordmark on white',     orientation:'Landscape', usedBy:3, primary:true,  swatch:'#0F172A' },
  { id:'LG-02', name:'Ridgeway Premier',  desc:'Gold accent — for commercial',   orientation:'Landscape', usedBy:2, primary:false, swatch:'#B45309' },
  { id:'LG-03', name:'Ridgeway Light',    desc:'Light variant for dark backgrounds', orientation:'Square', usedBy:1, primary:false, swatch:'#0EA5E9' },
  { id:'LG-04', name:'Ridgeway Mono',     desc:'Black & white print version',    orientation:'Landscape', usedBy:0, primary:false, swatch:'#475569' }
];

const QuoteTemplatesHost = ({ tab = 'templates', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const subTabs = [
    { id:'templates', label:'Quote Templates', route:'templates',       ct:QT_TEMPLATES.length },
    { id:'items',     label:'Quote Items',     route:'template-items',  ct:QT_ITEMS.length },
    { id:'logos',     label:'Quote Logos',     route:'template-logos',  ct:QT_LOGOS.length }
  ];

  const title = tab === 'items' ? 'Quote Template Items'
              : tab === 'logos' ? 'Quote Logos'
              : 'Quote Templates';
  const sub   = tab === 'items' ? 'Reusable line items linked to templates'
              : tab === 'logos' ? 'Logo variants available on quote layouts'
              : 'Reusable quote layouts with T&Cs and headings';

  const primaryAction = tab === 'items'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('item-new')}><Icon name="plus" size={14}/> New Item</button>
    : tab === 'logos'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('logo-new')}><Icon name="plus" size={14}/> Upload Logo</button>
    : <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('template-new')}><Icon name="plus" size={14}/> New Template</button>;

  return (
    <>
      <PageHeader title={title} sub={sub}
        actions={<>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
          {primaryAction}
        </>}/>

      <div className="subtabs" style={{marginBottom:16}}>
        {subTabs.map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={() => onNavigate && onNavigate(t.route)}>
            {t.label} <span className="ct">{t.ct}</span>
          </button>
        ))}
      </div>

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={tab === 'templates' ? [{label:'Layout',value:'All'},{label:'Logo',value:'All'}]
             : tab === 'items'     ? [{label:'Template',value:'All'},{label:'Category',value:'All'}]
             :                       [{label:'Orientation',value:'All'}]}
        onChipRemove={()=>{}}
        exports={false}/>

      {tab === 'templates' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead><tr>
                <th>Reference</th><th>Description</th><th>Ts &amp; Cs</th><th>Layout</th><th>Logo</th><th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {QT_TEMPLATES.filter(t => !search || (t.id+t.description+t.layout+t.logo).toLowerCase().includes(search.toLowerCase())).map(t=>(
                  <tr key={t.id} style={{cursor:'pointer'}} onClick={()=>onNavigate&&onNavigate('template-edit')}>
                    <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{t.id}</td>
                    <td data-label="Description" className="full" style={{fontWeight:500}}>{t.description}</td>
                    <td data-label="Ts & Cs"><Badge variant="sky">{t.tcs}</Badge></td>
                    <td data-label="Layout" style={{color:'var(--slate-700)'}}>{t.layout}</td>
                    <td data-label="Logo" style={{color:'var(--slate-700)'}}>{t.logo}</td>
                    <td className="actions" onClick={(e)=>e.stopPropagation()}>
                      <RowMenu items={[
                        { icon:'eye',    label:'Preview' },
                        { icon:'pencil', label:'Edit Template', onClick: () => onNavigate && onNavigate('template-edit') },
                        { icon:'save',   label:'Duplicate' },
                        { divider:true },
                        { icon:'trash',  label:'Delete', danger:true }
                      ]}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'items' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead><tr>
                <th>Template</th>
                <th style={{textAlign:'center', width:80}}>Sequence</th>
                <th>Product</th>
                <th>Description</th>
                <th style={{textAlign:'center', width:80}}>Bold</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {QT_ITEMS.filter(i => {
                  if (!search) return true;
                  const tplName = QT_TEMPLATES.find(t=>t.id===i.template)?.description || '';
                  return (i.id+i.product+i.description+tplName).toLowerCase().includes(search.toLowerCase());
                }).map(i=>{
                  const tplName = QT_TEMPLATES.find(t=>t.id===i.template)?.description || i.template;
                  return (
                    <tr key={i.id} style={{cursor:'pointer'}} onClick={()=>onNavigate&&onNavigate('item-edit')}>
                      <td data-label="Template" className="full">
                        <div style={{fontWeight:600}}>{tplName}</div>
                        <div className="mono" style={{fontSize:11, color:'var(--slate-500)', marginTop:2}}>{i.template}</div>
                      </td>
                      <td data-label="Sequence" style={{textAlign:'center'}}>
                        <span className="mono" style={{display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:24, background:'var(--slate-100)', borderRadius:6, fontWeight:600, fontSize:12}}>{i.sequence}</span>
                      </td>
                      <td data-label="Product" style={{fontWeight:500}}>{i.product}</td>
                      <td data-label="Description" style={{color:'var(--slate-700)', fontWeight: i.bold ? 700 : 400}}>{i.description}</td>
                      <td data-label="Bold" style={{textAlign:'center'}}>
                        {i.bold
                          ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/>
                          : <span style={{color:'var(--slate-300)'}}>—</span>}
                      </td>
                      <td className="actions" onClick={(e)=>e.stopPropagation()}>
                        <RowMenu items={[
                          { icon:'pencil', label:'Edit Item', onClick: () => onNavigate && onNavigate('item-edit') },
                          { icon:'save',   label:'Duplicate' },
                          { divider:true },
                          { icon:'trash',  label:'Delete', danger:true }
                        ]}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'logos' && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:14}}>
          {QT_LOGOS.filter(l => !search || (l.id+l.name+l.desc).toLowerCase().includes(search.toLowerCase())).map(l=>(
            <div key={l.id} className="card" style={{padding:16}}>
              <div style={{height:120, background:l.swatch, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:32, letterSpacing:'-0.02em', marginBottom:12, position:'relative'}}>
                RW
                {l.primary && <span style={{position:'absolute', top:8, right:8, fontSize:10, padding:'2px 8px', background:'rgba(255,255,255,0.18)', borderRadius:999, fontWeight:500, letterSpacing:'0.04em'}}>PRIMARY</span>}
              </div>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8}}>
                <div style={{minWidth:0, flex:1}}>
                  <div style={{fontWeight:600, fontSize:14}}>{l.name}</div>
                  <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>{l.desc}</div>
                  <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
                    <Badge variant="slate">{l.orientation}</Badge>
                    <Badge variant="sky">Used by {l.usedBy} template{l.usedBy===1?'':'s'}</Badge>
                  </div>
                </div>
                <RowMenu items={[
                  { icon:'eye',    label:'Preview' },
                  { icon:'pencil', label:'Edit Logo', onClick: () => onNavigate && onNavigate('logo-edit') },
                  { icon:'download', label:'Download' },
                  { divider:true },
                  { icon:'trash', label:'Delete', danger:true }
                ]}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ===== EDIT/CREATE QUOTE TEMPLATE FORM =====
const QuoteTemplateForm = ({ mode = 'new', onNavigate }) => {
  const isEdit = mode === 'edit';
  const seed = isEdit
    ? { id:'QT-001', description:'Standard Waterproofing Quote', comment:'Used for most acrylic membrane jobs.', tcsGroup:'Standard 12-month', format:'Classic A4', logo:'Ridgeway Default', heading:'Waterproofing Services Quote' }
    : { id:'(auto-generated)', description:'', comment:'', tcsGroup:'Standard 12-month', format:'Classic A4', logo:'Ridgeway Default', heading:'' };

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('templates')}>
          <Icon name="arrow-left" size={14}/> Back to Quote Templates
        </button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>{seed.id}</span>}
      </div>

      <PageHeader
        title={isEdit ? 'Edit Quote Template' : 'New Quote Template'}
        sub={isEdit ? 'Update layout, T&Cs, logo and heading for this template.' : 'Define a reusable quote layout.'}
      />

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Template Details</h3>

        <div className="field">
          <label>Description *</label>
          <input defaultValue={seed.description} placeholder="e.g. Standard Waterproofing Quote"/>
        </div>

        <div className="field">
          <label>Comment</label>
          <textarea rows={3} defaultValue={seed.comment} placeholder="Internal note about when to use this template..."/>
        </div>

        <div className="field-row">
          <div className="field">
            <label>T &amp; C Group *</label>
            <select defaultValue={seed.tcsGroup}>
              <option>Standard 12-month</option>
              <option>Commercial 24-month</option>
              <option>Industrial</option>
              <option>Warranty-only</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="field">
            <label>Format *</label>
            <select defaultValue={seed.format}>
              <option>Classic A4</option>
              <option>Modern A4</option>
              <option>Compact A4</option>
              <option>Landscape</option>
            </select>
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Logo *</label>
            <select defaultValue={seed.logo}>
              <option>Ridgeway Default</option>
              <option>Ridgeway Premier</option>
              <option>Ridgeway Light</option>
              <option>Ridgeway Mono</option>
            </select>
          </div>
          <div className="field">
            <label>Heading *</label>
            <input defaultValue={seed.heading} placeholder="Title shown at the top of the quote"/>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('templates')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete Template
            </button>}
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-secondary"><Icon name="eye" size={14}/> Preview</button>
            <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('templates')}>
              <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save Template'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== EDIT/CREATE QUOTE TEMPLATE ITEM FORM =====
const QuoteItemForm = ({ mode = 'new', onNavigate }) => {
  const isEdit = mode === 'edit';
  const seed = isEdit
    ? { id:'QI-101', template:'QT-001', displayOrder:1, itemType:'Material', description:'Acrylic membrane application — primer + 2 coats', bold:true }
    : { id:'(auto-generated)', template:'', displayOrder:1, itemType:'Material', description:'', bold:false };

  const [bold, setBold] = React.useState(seed.bold);

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('template-items')}>
          <Icon name="arrow-left" size={14}/> Back to Quote Items
        </button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>{seed.id}</span>}
      </div>

      <PageHeader
        title={isEdit ? 'Edit Quote Template Item' : 'Create Quote Template Item'}
        sub={isEdit ? 'Update this line item on the selected quote template.' : 'Add a reusable line item to a quote template.'}
      />

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Item Details</h3>

        <div className="field">
          <label>Quote Template *</label>
          <select defaultValue={seed.template}>
            <option value="">— Select template —</option>
            {QT_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.description} ({t.id})</option>)}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Display Order *</label>
            <input type="number" min="1" defaultValue={seed.displayOrder} placeholder="1"/>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:4}}>Lower numbers appear first on the quote.</div>
          </div>
          <div className="field">
            <label>Item Type *</label>
            <select defaultValue={seed.itemType}>
              <option>Material</option>
              <option>Labour</option>
              <option>Sub-contractor</option>
              <option>Equipment</option>
              <option>Heading</option>
              <option>Note</option>
              <option>Sundry</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>Description *</label>
          <textarea rows={4} defaultValue={seed.description} placeholder="The line item text shown on the quote..."
            style={{fontWeight: bold ? 700 : 400}}/>
        </div>

        <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:0, padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8}}>
          <div>
            <label style={{margin:0, fontWeight:500}}>Bold</label>
            <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>Render this line in bold on the quote PDF.</div>
          </div>
          <Toggle on={bold} onChange={setBold}/>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('template-items')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete Item
            </button>}
          </div>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('template-items')}>
            <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save Item'}
          </button>
        </div>
      </div>
    </>
  );
};

// ===== EDIT/UPLOAD QUOTE LOGO =====
const QuoteLogoForm = ({ mode = 'new', onNavigate }) => {
  const isEdit = mode === 'edit';
  const seed = isEdit
    ? { id:'LG-01', name:'Ridgeway Default', desc:'Standard wordmark on white', orientation:'Landscape', primary:true }
    : { id:'(new)', name:'', desc:'', orientation:'Landscape', primary:false };
  const fileInputRef = React.useRef();

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('template-logos')}>
          <Icon name="arrow-left" size={14}/> Back to Quote Logos
        </button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>{seed.id}</span>}
      </div>

      <PageHeader
        title={isEdit ? 'Edit Logo' : 'Upload Logo'}
        sub={isEdit ? 'Update the logo file or its metadata.' : 'Upload a logo to use on quote layouts.'}
      />

      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Logo File</h3>
        <div style={{display:'flex', gap:18, alignItems:'flex-start', flexWrap:'wrap', marginBottom:18}}>
          <div style={{width:180, height:120, background:'var(--slate-100)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--slate-400)', flexShrink:0}}>
            {isEdit ? <span style={{fontWeight:700, fontSize:28, color:'var(--text)'}}>RW</span> : <Icon name="upload" size={24}/>}
          </div>
          <div style={{flex:1, minWidth:200}}>
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml" style={{display:'none'}}/>
            <button className="btn btn-secondary" onClick={()=>fileInputRef.current?.click()}>
              <Icon name="upload" size={14}/> {isEdit ? 'Replace File' : 'Upload PNG / JPEG / SVG'}
            </button>
            <div style={{fontSize:11, color:'var(--slate-500)', marginTop:8}}>Recommended: transparent PNG or SVG, at least 600px wide.</div>
          </div>
        </div>

        <h3 style={{margin:'8px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Details</h3>
        <div className="field-row">
          <div className="field">
            <label>Logo Name *</label>
            <input defaultValue={seed.name} placeholder="e.g. Ridgeway Premier"/>
          </div>
          <div className="field">
            <label>Orientation</label>
            <select defaultValue={seed.orientation}>
              <option>Landscape</option><option>Portrait</option><option>Square</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>Description</label>
          <input defaultValue={seed.desc} placeholder="Short note about when to use this variant"/>
        </div>
        <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:0}}>
          <label style={{margin:0}}>Set as primary logo</label>
          <Toggle on={seed.primary}/>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('template-logos')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete Logo
            </button>}
          </div>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('template-logos')}>
            <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save Logo'}
          </button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { QuoteTemplatesHost, QuoteTemplateForm, QuoteItemForm, QuoteLogoForm });
