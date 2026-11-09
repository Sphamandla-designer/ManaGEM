// ===== PRODUCTS & PRICING (host with sub-tabs) =====

const PRODUCTS = [
  // type, code, description, sageSales, price, cost, unit, tax, date, current, deposit, stock, public, minQty, kit, component
  { cat:'Membranes',       type:'Physical', code:'MB-101', desc:'Acrylic waterproofing — 5L white',     sageSales:'3010-Membranes', price:425,  cost:285, unit:'ea',   tax:'15%', date:'12 Mar 2026', current:true,  deposit:false, stock:84,  pub:true,  minQty:1, kit:false, component:false, supplier:'Apex Coatings' },
  { cat:'Membranes',       type:'Physical', code:'MB-102', desc:'Acrylic waterproofing — 20L white',    sageSales:'3010-Membranes', price:1450, cost:980, unit:'ea',   tax:'15%', date:'12 Mar 2026', current:true,  deposit:true,  stock:42,  pub:true,  minQty:1, kit:false, component:false, supplier:'Apex Coatings' },
  { cat:'Membranes',       type:'Physical', code:'MB-103', desc:'Bitumen torch-on roll 4mm',            sageSales:'3010-Membranes', price:410,  cost:320, unit:'m²',  tax:'15%', date:'02 Apr 2026', current:true,  deposit:false, stock:240, pub:true,  minQty:5, kit:false, component:false, supplier:'Apex Coatings' },
  { cat:'Membranes',       type:'Physical', code:'MB-104', desc:'Liquid PU membrane — clear 5L',        sageSales:'3010-Membranes', price:510,  cost:540, unit:'ea',   tax:'15%', date:'18 Mar 2026', current:false, deposit:false, stock:18,  pub:false, minQty:1, kit:false, component:false, supplier:'HydroShield' },
  { cat:'Membranes',       type:'Physical', code:'MB-105', desc:'Self-adhesive flashing tape 100mm',    sageSales:'3010-Membranes', price:195,  cost:145, unit:'roll',tax:'15%', date:'22 Mar 2026', current:true,  deposit:false, stock:62,  pub:true,  minQty:1, kit:false, component:true,  supplier:'HydroShield' },
  { cat:'Primers',         type:'Physical', code:'PR-201', desc:'Bonding primer — 5L',                  sageSales:'3020-Primers',   price:340,  cost:240, unit:'ea',   tax:'15%', date:'05 Apr 2026', current:true,  deposit:false, stock:118, pub:true,  minQty:1, kit:false, component:true,  supplier:'Apex Coatings' },
  { cat:'Primers',         type:'Physical', code:'PR-202', desc:'Damp-tolerant epoxy primer 4kg',       sageSales:'3020-Primers',   price:520,  cost:420, unit:'kit', tax:'15%', date:'05 Apr 2026', current:true,  deposit:false, stock:24,  pub:true,  minQty:1, kit:true,  component:false, supplier:'Apex Coatings' },
  { cat:'Sealants',        type:'Physical', code:'SL-301', desc:'Polyurethane sealant 600ml',           sageSales:'3030-Sealants',  price:118,  cost:78,  unit:'ea',   tax:'15%', date:'10 Apr 2026', current:true,  deposit:false, stock:340, pub:true,  minQty:6, kit:false, component:true,  supplier:'Bondline' },
  { cat:'Sealants',        type:'Physical', code:'SL-302', desc:'Hybrid MS sealant — grey 290ml',       sageSales:'3030-Sealants',  price:95,   cost:65,  unit:'ea',   tax:'15%', date:'10 Apr 2026', current:true,  deposit:false, stock:182, pub:true,  minQty:6, kit:false, component:false, supplier:'Bondline' },
  { cat:'Tools & Sundries',type:'Physical', code:'TS-401', desc:'Roller frame 230mm + 2 sleeves',       sageSales:'3050-Tools',     price:165,  cost:95,  unit:'set', tax:'15%', date:'01 Apr 2026', current:true,  deposit:false, stock:54,  pub:true,  minQty:1, kit:true,  component:false, supplier:"Trade Depot" },
  { cat:'Tools & Sundries',type:'Service',  code:'TS-410', desc:'Site labour — inspection (per hour)',  sageSales:'3060-Labour',    price:485,  cost:0,   unit:'hr',  tax:'15%', date:'01 Apr 2026', current:true,  deposit:false, stock:0,   pub:false, minQty:1, kit:false, component:false, supplier:'Internal' },
  { cat:'Flashings',       type:'Physical', code:'FL-501', desc:'Galvanised flashing 0.6mm × 1.2m',     sageSales:'3040-Flashings', price:220,  cost:145, unit:'m',   tax:'15%', date:'15 Mar 2026', current:true,  deposit:false, stock:128, pub:true,  minQty:2, kit:false, component:true,  supplier:'SteelForm' },
  { cat:'Flashings',       type:'Physical', code:'FL-502', desc:'Aluminium parapet capping 200mm',      sageSales:'3040-Flashings', price:330,  cost:220, unit:'m',   tax:'15%', date:'15 Mar 2026', current:true,  deposit:false, stock:86,  pub:true,  minQty:2, kit:false, component:false, supplier:'SteelForm' }
];

const PRODUCT_VARIATIONS = [
  { id:'V-101', product:'MB-101 Acrylic 5L white',     variant:'Colour — Terracotta' },
  { id:'V-102', product:'MB-101 Acrylic 5L white',     variant:'Colour — Slate Grey' },
  { id:'V-103', product:'MB-102 Acrylic 20L white',    variant:'Colour — Terracotta' },
  { id:'V-104', product:'MB-103 Bitumen torch-on',     variant:'Thickness — 3mm' },
  { id:'V-105', product:'MB-103 Bitumen torch-on',     variant:'Thickness — 5mm' },
  { id:'V-106', product:'SL-301 PU sealant 600ml',     variant:'Colour — Black' },
  { id:'V-107', product:'SL-301 PU sealant 600ml',     variant:'Colour — Grey' }
];

const PRODUCT_COMPONENTS = [
  { code:'CMP-001', parent:'MB-101 Acrylic 5L white',   compName:'Pail — 5L plastic',          components:'PKG-501', qty:1,   dimQty:1, d1:'180mm', d2:'180mm', d3:'250mm' },
  { code:'CMP-002', parent:'MB-101 Acrylic 5L white',   compName:'Acrylic resin base',         components:'RAW-101', qty:4.2, dimQty:1, d1:'—',     d2:'—',     d3:'—' },
  { code:'CMP-003', parent:'MB-101 Acrylic 5L white',   compName:'White pigment dispersion',   components:'RAW-110', qty:0.4, dimQty:1, d1:'—',     d2:'—',     d3:'—' },
  { code:'CMP-004', parent:'FL-501 Galv flashing 1.2m', compName:'Galvanised steel sheet',     components:'RAW-301', qty:1,   dimQty:1, d1:'1200mm',d2:'150mm', d3:'0.6mm' },
  { code:'CMP-005', parent:'SL-301 PU sealant 600ml',   compName:'PU base compound',           components:'RAW-201', qty:0.55,dimQty:1, d1:'—',     d2:'—',     d3:'—' },
  { code:'CMP-006', parent:'SL-301 PU sealant 600ml',   compName:'Sausage pack — 600ml',       components:'PKG-510', qty:1,   dimQty:1, d1:'60mm',  d2:'60mm',  d3:'310mm' }
];

const PRODUCT_KITS = [
  { id:'KIT-001', kit:'Pool Deck Starter Kit',          product:'PD-310 CR coating'      },
  { id:'KIT-002', kit:'Pool Deck Starter Kit',          product:'PD-315 Slip additive'   },
  { id:'KIT-003', kit:'Pool Deck Starter Kit',          product:'TS-401 Roller frame set'},
  { id:'KIT-004', kit:'Residential Re-coat Kit',        product:'MB-101 Acrylic 5L'      },
  { id:'KIT-005', kit:'Residential Re-coat Kit',        product:'PR-201 Bonding primer'  },
  { id:'KIT-006', kit:'Residential Re-coat Kit',        product:'TS-402 Trowel 250mm'    },
  { id:'KIT-007', kit:'Industrial Membrane Kit',        product:'MB-103 Bitumen torch-on'},
  { id:'KIT-008', kit:'Industrial Membrane Kit',        product:'FL-501 Galv flashing'   }
];

const PRICE_UPDATE = [
  { type:'Physical', supplier:'Apex Coatings',      code:'MB-101', desc:'Acrylic waterproofing — 5L white', priceEx:369.57, unit:'ea',  cost:285, labour:0,   gp:23 },
  { type:'Physical', supplier:'Apex Coatings',      code:'MB-102', desc:'Acrylic waterproofing — 20L white',priceEx:1260.87,unit:'ea',  cost:980, labour:0,   gp:22 },
  { type:'Physical', supplier:'Apex Coatings',      code:'MB-103', desc:'Bitumen torch-on roll 4mm',        priceEx:356.52, unit:'m²', cost:320, labour:45,  gp:22 },
  { type:'Physical', supplier:'Apex Coatings',      code:'PR-201', desc:'Bonding primer — 5L',              priceEx:295.65, unit:'ea',  cost:240, labour:0,   gp:19 },
  { type:'Physical', supplier:'Bondline',       code:'SL-301', desc:'Polyurethane sealant 600ml',       priceEx:102.61, unit:'ea',  cost:78,  labour:0,   gp:24 },
  { type:'Physical', supplier:'SteelForm',      code:'FL-501', desc:'Galvanised flashing 0.6mm',        priceEx:191.30, unit:'m',  cost:145, labour:30,  gp:24 },
  { type:'Service',  supplier:'Internal',     code:'TS-410', desc:'Site labour — inspection (per hr)',priceEx:421.74, unit:'hr',  cost:0,   labour:340, gp:24 }
];

const SAGE_SYNC = [
  { code:'MB-101', desc:'Acrylic waterproofing — 5L white',  sageLink:'STK-30101', priceEx:369.57,  unitPer:'ea',  unitCost:285,  labourCost:0,   status:'Synced' },
  { code:'MB-102', desc:'Acrylic waterproofing — 20L white', sageLink:'STK-30102', priceEx:1260.87, unitPer:'ea',  unitCost:980,  labourCost:0,   status:'Synced' },
  { code:'MB-103', desc:'Bitumen torch-on roll 4mm',         sageLink:'STK-30103', priceEx:356.52,  unitPer:'m²', unitCost:320,  labourCost:45,  status:'Synced' },
  { code:'PR-201', desc:'Bonding primer — 5L',               sageLink:'STK-30201', priceEx:295.65,  unitPer:'ea',  unitCost:240,  labourCost:0,   status:'Synced' },
  { code:'PR-202', desc:'Damp-tolerant epoxy primer 4kg',    sageLink:'—',         priceEx:452.17,  unitPer:'kit', unitCost:420,  labourCost:0,   status:'Pending' },
  { code:'SL-301', desc:'Polyurethane sealant 600ml',        sageLink:'STK-30301', priceEx:102.61,  unitPer:'ea',  unitCost:78,   labourCost:0,   status:'Synced' },
  { code:'FL-501', desc:'Galvanised flashing 0.6mm',         sageLink:'STK-30401', priceEx:191.30,  unitPer:'m',  unitCost:145,  labourCost:30,  status:'Synced' },
  { code:'TS-410', desc:'Site labour — inspection',          sageLink:'—',         priceEx:421.74,  unitPer:'hr',  unitCost:0,    labourCost:340, status:'Error' }
];

const fmtZ = (n) => 'R ' + n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Products = ({ tab = 'list', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [edits, setEdits] = React.useState({});

  const subTabs = [
    { id:'list',          label:'Product List',     route:'products',                ct: PRODUCTS.length },
    { id:'variations',    label:'Variations',       route:'product-variations',      ct: PRODUCT_VARIATIONS.length },
    { id:'components',    label:'Components',       route:'product-components',      ct: PRODUCT_COMPONENTS.length },
    { id:'kits',          label:'Kits',             route:'product-kits',            ct: PRODUCT_KITS.length },
    { id:'price-changes', label:'Price Changes',    route:'product-price-changes',   ct: PRICE_UPDATE.length },
    { id:'sync',          label:'Sync with Sage',   route:'product-sync',            ct: SAGE_SYNC.length }
  ];

  const titles = {
    list:'Products & Pricing',
    variations:'Product Variations',
    components:'Product Components',
    kits:'Product Kits',
    'price-changes':'Price Changes',
    sync:'Sync with Sage'
  };
  const subs = {
    list:'Full product catalogue',
    variations:'Colour, size and finish variants per product',
    components:'Bill-of-materials breakdown',
    kits:'Bundled product groupings',
    'price-changes':'Update pricing across the catalogue',
    sync:'Sage Accounting integration'
  };

  const primaryAction = tab === 'variations'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('variation-new')}><Icon name="plus" size={14}/> New Variation</button>
    : tab === 'components'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('component-new')}><Icon name="plus" size={14}/> New Component</button>
    : tab === 'kits'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('kit-new')}><Icon name="plus" size={14}/> New Kit</button>
    : tab === 'price-changes'
    ? <>
        <button className="btn btn-secondary"><Icon name="download" size={14}/> Download Price List</button>
        <button className="btn btn-secondary"><Icon name="upload" size={14}/> Upload New Pricing</button>
        <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('price-change-new')}><Icon name="plus" size={14}/> Adjust Prices</button>
      </>
    : tab === 'sync'
    ? <>
        <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12,color:'var(--slate-600)',padding:'6px 12px',background:'var(--emerald-light)',borderRadius:8}}>
          <span style={{width:7,height:7,borderRadius:'50%',background:'var(--emerald)'}}/>Sage connected
        </span>
        <button className="btn btn-primary"><Icon name="refresh" size={14}/> Sync Now</button>
      </>
    : <>
        <button className="btn btn-secondary"><Icon name="refresh" size={14}/> Sync with Sage</button>
        <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('product-new')}><Icon name="plus" size={14}/> New Product</button>
      </>;

  return (
    <>
      <PageHeader title={titles[tab]} sub={subs[tab]} actions={primaryAction}/>

      <div className="subtabs" style={{marginBottom:14}}>
        {subTabs.map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={()=>onNavigate&&onNavigate(t.route)}>
            {t.label} <span className="ct">{t.ct}</span>
          </button>
        ))}
      </div>

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={tab === 'list' ? [{label:'Category',value:'All'},{label:'Supplier',value:'All'},{label:'Type',value:'All'}]
             : tab === 'price-changes' ? [{label:'Type',value:'All'},{label:'Supplier',value:'All'}]
             : tab === 'sync' ? [{label:'Status',value:'All'}]
             : [{label:'Search',value:'All'}]}
        onChipRemove={()=>{}}
        exports={tab !== 'sync'}/>

      {/* PRODUCT LIST */}
      {tab === 'list' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data">
              <thead><tr>
                <th>Type</th><th>Code</th><th>Description</th><th>Sage Sales</th>
                <th style={{textAlign:'right'}}>Price</th>
                <th style={{textAlign:'right'}}>Cost</th>
                <th>Unit</th><th>Tax</th><th>Date</th>
                <th style={{textAlign:'center'}}>Current</th>
                <th style={{textAlign:'center'}}>Deposit</th>
                <th style={{textAlign:'right'}}>Stock</th>
                <th style={{textAlign:'center'}}>Public</th>
                <th style={{textAlign:'right'}}>Min Qty</th>
                <th style={{textAlign:'center'}}>Kit</th>
                <th style={{textAlign:'center'}}>Component</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {PRODUCTS.filter(p => !search || (p.code+p.desc+p.cat+p.supplier).toLowerCase().includes(search.toLowerCase())).map(p => (
                  <tr key={p.code}>
                    <td><Badge variant={p.type==='Service'?'purple':'slate'}>{p.type}</Badge></td>
                    <td className="cell-mono">{p.code}</td>
                    <td style={{minWidth:220, fontWeight:500}}>{p.desc}</td>
                    <td style={{fontSize:12, color:'var(--slate-600)'}}>{p.sageSales}</td>
                    <td className="cell-num" style={{fontWeight:600}}>{fmtZ(p.price)}</td>
                    <td className="cell-num" style={{color:'var(--slate-700)'}}>{fmtZ(p.cost)}</td>
                    <td style={{color:'var(--slate-500)', fontSize:12}}>{p.unit}</td>
                    <td style={{fontSize:12}}>{p.tax}</td>
                    <td style={{fontSize:12, color:'var(--slate-600)', whiteSpace:'nowrap'}}>{p.date}</td>
                    <td style={{textAlign:'center'}}>{p.current ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                    <td style={{textAlign:'center'}}>{p.deposit ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                    <td className="cell-num" style={{color: p.stock < 20 ? 'var(--amber)' : 'inherit', fontWeight: p.stock < 20 ? 600 : 400}}>{p.stock}</td>
                    <td style={{textAlign:'center'}}>{p.pub ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                    <td className="cell-num">{p.minQty}</td>
                    <td style={{textAlign:'center'}}>{p.kit ? <Icon name="check" size={14} style={{color:'var(--sky)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                    <td style={{textAlign:'center'}}>{p.component ? <Icon name="check" size={14} style={{color:'var(--sky)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>}</td>
                    <td>
                      <RowMenu items={[
                        { icon:'pencil', label:'Edit Product', onClick: () => onNavigate && onNavigate('product-edit') },
                        { icon:'eye', label:'Price History' },
                        { divider:true },
                        { icon:'trash', label:'Delete', danger:true }
                      ]}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VARIATIONS */}
      {tab === 'variations' && (
        <div className="table-wrap">
          <table className="data responsive-table">
            <thead><tr>
              <th>Ref</th><th>Product</th><th>Variant</th><th style={{width:40}}></th>
            </tr></thead>
            <tbody>
              {PRODUCT_VARIATIONS.filter(v => !search || (v.product+v.variant).toLowerCase().includes(search.toLowerCase())).map(v=>(
                <tr key={v.id}>
                  <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{v.id}</td>
                  <td data-label="Product" className="full" style={{fontWeight:500}}>{v.product}</td>
                  <td data-label="Variant" style={{color:'var(--slate-700)'}}>{v.variant}</td>
                  <td className="actions"><RowMenu items={[
                    { icon:'pencil', label:'Edit', onClick: () => onNavigate && onNavigate('variation-edit') },
                    { divider:true },
                    { icon:'trash', label:'Delete', danger:true }
                  ]}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* COMPONENTS */}
      {tab === 'components' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data">
              <thead><tr>
                <th>Code</th><th>Parent Product</th><th>Component Code</th><th>Component Name</th>
                <th style={{textAlign:'right'}}>Quantity</th>
                <th style={{textAlign:'right'}}>Dimension Qty</th>
                <th>Dimension 1</th><th>Dimension 2</th><th>Dimension 3</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {PRODUCT_COMPONENTS.filter(c => !search || (c.code+c.parent+c.compName).toLowerCase().includes(search.toLowerCase())).map(c=>(
                  <tr key={c.code}>
                    <td className="cell-mono link" style={{fontWeight:600}}>{c.code}</td>
                    <td style={{fontWeight:500, minWidth:200}}>{c.parent}</td>
                    <td className="cell-mono" style={{fontSize:12, color:'var(--slate-600)'}}>{c.components}</td>
                    <td>{c.compName}</td>
                    <td className="cell-num">{c.qty}</td>
                    <td className="cell-num">{c.dimQty}</td>
                    <td className="cell-mono" style={{fontSize:12}}>{c.d1}</td>
                    <td className="cell-mono" style={{fontSize:12}}>{c.d2}</td>
                    <td className="cell-mono" style={{fontSize:12}}>{c.d3}</td>
                    <td><RowMenu items={[
                      { icon:'pencil', label:'Edit', onClick: () => onNavigate && onNavigate('component-edit') },
                      { divider:true },
                      { icon:'trash', label:'Delete', danger:true }
                    ]}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KITS */}
      {tab === 'kits' && (
        <div className="table-wrap">
          <table className="data responsive-table">
            <thead><tr>
              <th>Ref</th><th>Kit</th><th>Product</th><th style={{width:40}}></th>
            </tr></thead>
            <tbody>
              {PRODUCT_KITS.filter(k => !search || (k.kit+k.product).toLowerCase().includes(search.toLowerCase())).map(k=>(
                <tr key={k.id}>
                  <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{k.id}</td>
                  <td data-label="Kit" className="full" style={{fontWeight:600}}>{k.kit}</td>
                  <td data-label="Product" style={{color:'var(--slate-700)'}}>{k.product}</td>
                  <td className="actions"><RowMenu items={[
                    { icon:'pencil', label:'Edit', onClick: () => onNavigate && onNavigate('kit-edit') },
                    { divider:true },
                    { icon:'trash', label:'Delete', danger:true }
                  ]}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRICE CHANGES grid */}
      {tab === 'price-changes' && (
        <>
          <div className="summary-strip">
            <span><strong>{PRICE_UPDATE.length}</strong> <span className="lbl">products in pricing grid</span></span>
            <span><span className="lbl">Last grid update:</span> <strong>29 Apr 2026 · Thabo Ndlovu</strong></span>
            <span style={{marginLeft:'auto'}}>{Object.keys(edits).length > 0 && <strong style={{color:'var(--sky)'}}>{Object.keys(edits).length} unsaved changes</strong>}</span>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data">
                <thead><tr>
                  <th>Type</th><th>Supplier</th><th>Code</th><th>Description</th>
                  <th style={{textAlign:'right'}}>Price (ex)</th>
                  <th>Unit</th>
                  <th style={{textAlign:'right'}}>Cost</th>
                  <th style={{textAlign:'right'}}>Labour</th>
                  <th style={{textAlign:'right'}}>GP%</th>
                </tr></thead>
                <tbody>
                  {PRICE_UPDATE.filter(p => !search || (p.code+p.desc+p.supplier).toLowerCase().includes(search.toLowerCase())).map(p=>{
                    const v = edits[p.code] !== undefined ? edits[p.code] : p.priceEx;
                    const isEdited = edits[p.code] !== undefined;
                    return (
                      <tr key={p.code}>
                        <td><Badge variant={p.type==='Service'?'purple':'slate'}>{p.type}</Badge></td>
                        <td style={{fontSize:12, color:'var(--slate-700)'}}>{p.supplier}</td>
                        <td className="cell-mono">{p.code}</td>
                        <td style={{minWidth:200, fontWeight:500}}>{p.desc}</td>
                        <td style={{textAlign:'right', padding:'4px 14px'}}>
                          <input type="number" value={v} onChange={(e)=>setEdits(s=>({...s, [p.code]:e.target.value}))}
                            style={{width:110, padding:'4px 8px', border:'1px solid '+(isEdited?'var(--sky)':'var(--border)'), borderRadius:5, textAlign:'right', fontFamily:'var(--mono)', background: isEdited ? 'var(--sky-50)' : 'white'}}/>
                        </td>
                        <td style={{color:'var(--slate-500)', fontSize:12}}>{p.unit}</td>
                        <td className="cell-num">{fmtZ(p.cost)}</td>
                        <td className="cell-num" style={{color:'var(--slate-600)'}}>{fmtZ(p.labour)}</td>
                        <td className="cell-num"><span style={{color:p.gp>=20?'var(--emerald)':p.gp>=10?'var(--amber)':'var(--red)', fontWeight:600}}>{p.gp}%</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {Object.keys(edits).length > 0 && (
            <div className="bulk-bar open">
              <span className="ct">{Object.keys(edits).length} price{Object.keys(edits).length>1?'s':''} modified</span>
              <button className="btn btn-sm" onClick={() => setEdits({})}>Discard</button>
              <button className="btn btn-sm" style={{background:'var(--sky)'}}><Icon name="save" size={12}/> Save All Changes</button>
            </div>
          )}
        </>
      )}

      {/* SYNC WITH SAGE */}
      {tab === 'sync' && (
        <>
          <div className="summary-strip">
            <span><strong>{SAGE_SYNC.filter(s=>s.status==='Synced').length}</strong> <span className="lbl">synced</span></span>
            <span><strong style={{color:'var(--amber)'}}>{SAGE_SYNC.filter(s=>s.status==='Pending').length}</strong> <span className="lbl">pending</span></span>
            <span><strong style={{color:'var(--red)'}}>{SAGE_SYNC.filter(s=>s.status==='Error').length}</strong> <span className="lbl">errors</span></span>
            <span style={{marginLeft:'auto', color:'var(--slate-600)'}}>Last sync: <strong>Today 09:14</strong></span>
          </div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data">
                <thead><tr>
                  <th>Code</th><th>Description</th><th>Sage Link</th>
                  <th style={{textAlign:'right'}}>Price (ex VAT)</th>
                  <th>Unit (per)</th>
                  <th style={{textAlign:'right'}}>Unit Cost</th>
                  <th style={{textAlign:'right'}}>Labour Cost</th>
                  <th>Status</th>
                  <th style={{width:40}}></th>
                </tr></thead>
                <tbody>
                  {SAGE_SYNC.filter(s => !search || (s.code+s.desc+s.sageLink).toLowerCase().includes(search.toLowerCase())).map(s=>(
                    <tr key={s.code}>
                      <td className="cell-mono">{s.code}</td>
                      <td style={{minWidth:200, fontWeight:500}}>{s.desc}</td>
                      <td className="cell-mono link" style={{color: s.sageLink==='—' ? 'var(--slate-400)' : 'var(--sky)'}}>{s.sageLink}</td>
                      <td className="cell-num" style={{fontWeight:600}}>{fmtZ(s.priceEx)}</td>
                      <td style={{color:'var(--slate-500)', fontSize:12}}>{s.unitPer}</td>
                      <td className="cell-num">{fmtZ(s.unitCost)}</td>
                      <td className="cell-num" style={{color:'var(--slate-600)'}}>{fmtZ(s.labourCost)}</td>
                      <td><Badge variant={s.status==='Synced'?'emerald':s.status==='Pending'?'amber':'red'}>{s.status}</Badge></td>
                      <td><RowMenu items={[
                        { icon:'pencil', label:'Edit Mapping', onClick: () => onNavigate && onNavigate('sync-edit') },
                        { icon:'refresh', label:'Re-sync' },
                        { divider:true },
                        { icon:'eye', label:'View Sage Record' }
                      ]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// ===== FORM SHELLS =====
const FormShell = ({ title, sub, back, backLabel, refTag, children, onSave, saveLabel='Save', extraFooter, onNavigate }) => (
  <>
    <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
      <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate(back)}>
        <Icon name="arrow-left" size={14}/> {backLabel}
      </button>
      {refTag && <span className="mono" style={{fontSize:14, fontWeight:600}}>{refTag}</span>}
    </div>
    <PageHeader title={title} sub={sub}/>
    <div className="card" style={{padding:24}}>
      {children}
      <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
        <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate(back)}>Cancel</button>
        <div style={{display:'flex', gap:8}}>{extraFooter}
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate(back)}>
            <Icon name="check" size={14}/> {saveLabel}
          </button>
        </div>
      </div>
    </div>
  </>
);

const ProductForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <FormShell
      title={isEdit ? 'Edit Product' : 'New Product'}
      sub={isEdit ? 'Update product details, pricing and flags.' : 'Add a new product to the catalogue.'}
      back="products" backLabel="Back to Products" refTag={isEdit ? 'MB-101' : undefined}
      saveLabel={isEdit ? 'Save Changes' : 'Save Product'} onNavigate={onNavigate}>
      <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Product Details</h3>
      <div className="field-row">
        <div className="field"><label>Product Type *</label>
          <select defaultValue="Physical">
            <option>Physical</option><option>Service</option><option>Digital</option>
            <option>Subscription</option><option>Bundle / Kit</option>
          </select>
        </div>
        <div className="field"><label>Category *</label>
          <select><option>Membranes</option><option>Primers</option><option>Sealants</option><option>Flashings</option><option>Tools & Sundries</option></select>
        </div>
      </div>
      <div className="field"><label>Product Name / Description *</label>
        <input defaultValue={isEdit ? 'Acrylic waterproofing — 5L white' : ''} placeholder="e.g. Acrylic waterproofing — 5L white"/>
      </div>
      <div className="field-row">
        <div className="field"><label>Code *</label><input defaultValue={isEdit ? 'MB-101' : ''} placeholder="e.g. MB-101"/></div>
        <div className="field"><label>Supplier</label>
          <select><option>Apex Coatings</option><option>Bondline</option><option>HydroShield</option><option>SteelForm</option><option>Internal</option></select>
        </div>
      </div>
      <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Pricing & Tax</h3>
      <div className="field-row">
        <div className="field"><label>Price (ex VAT) *</label><input type="number" defaultValue={isEdit ? 369.57 : ''} placeholder="0.00"/></div>
        <div className="field"><label>Cost *</label><input type="number" defaultValue={isEdit ? 285 : ''} placeholder="0.00"/></div>
      </div>
      <div className="field-row">
        <div className="field"><label>Unit</label>
          <select><option>ea</option><option>m²</option><option>m</option><option>kg</option><option>L</option><option>roll</option><option>hr</option></select>
        </div>
        <div className="field"><label>Tax Rate</label>
          <select><option>15%</option><option>0% (Zero-rated)</option><option>Exempt</option></select>
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Sage Sales Account</label>
          <input defaultValue={isEdit ? '3010-Membranes' : ''} placeholder="e.g. 3010-Membranes"/>
        </div>
        <div className="field"><label>Effective Date</label>
          <input type="date" defaultValue="2026-05-26"/>
        </div>
      </div>
      <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Inventory</h3>
      <div className="field-row">
        <div className="field"><label>Current Stock</label><input type="number" defaultValue={isEdit ? 84 : 0}/></div>
        <div className="field"><label>Min Qty (for reorder)</label><input type="number" defaultValue={isEdit ? 20 : 1}/></div>
      </div>
      <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Flags</h3>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}} className="flag-grid">
        {[
          ['Physical product','Tangible item shipped from stock', true],
          ['Digital product','Downloadable or licence-based', false],
          ['Service','Labour/inspection time-based', false],
          ['Current','Active on the catalogue', true],
          ['Requires deposit','Deposit needed before order', false],
          ['Public','Visible on customer portal/website', true],
          ['Kit / bundle','Includes multiple products', false],
          ['Component','Used as a sub-part of another product', false]
        ].map(([l,desc,on],i)=>(
          <label key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'10px 12px', border:'1px solid var(--border)', borderRadius:8, background:'var(--slate-50)'}}>
            <div>
              <div style={{fontWeight:500, fontSize:13}}>{l}</div>
              <div style={{fontSize:11, color:'var(--slate-500)', marginTop:1}}>{desc}</div>
            </div>
            <Toggle on={on}/>
          </label>
        ))}
      </div>
      <style>{`@media (max-width:720px){ .flag-grid{ grid-template-columns:1fr !important; } }`}</style>
    </FormShell>
  );
};

const VariationForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <FormShell title={isEdit ? 'Edit Variation' : 'New Variation'}
      sub="Define a colour, size, finish or other variant of an existing product."
      back="product-variations" backLabel="Back to Variations"
      refTag={isEdit ? 'V-101' : undefined}
      saveLabel={isEdit ? 'Save Changes' : 'Save Variation'} onNavigate={onNavigate}>
      <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Variation Details</h3>
      <div className="field"><label>Product *</label>
        <select defaultValue={isEdit ? 'MB-101' : ''}>
          <option value="">— Select base product —</option>
          {PRODUCTS.map(p => <option key={p.code} value={p.code}>{p.code} — {p.desc}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Variant Attribute *</label>
          <select><option>Colour</option><option>Size</option><option>Finish</option><option>Thickness</option><option>Pack Size</option></select>
        </div>
        <div className="field"><label>Variant Value *</label>
          <input defaultValue={isEdit ? 'Terracotta' : ''} placeholder="e.g. Terracotta, 5L, 3mm"/>
        </div>
      </div>
      <div className="field" style={{margin:0}}>
        <label>Notes</label>
        <textarea rows={3} placeholder="Optional context about this variant..."/>
      </div>
    </FormShell>
  );
};

const ComponentForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <FormShell title={isEdit ? 'Edit Component' : 'New Component'}
      sub="Bill-of-materials entry — links a sub-part to a parent product."
      back="product-components" backLabel="Back to Components"
      refTag={isEdit ? 'CMP-001' : undefined}
      saveLabel={isEdit ? 'Save Changes' : 'Save Component'} onNavigate={onNavigate}>
      <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Component Details</h3>
      <div className="field-row">
        <div className="field"><label>Code *</label><input defaultValue={isEdit ? 'CMP-001' : ''} placeholder="e.g. CMP-001"/></div>
        <div className="field"><label>Parent Product *</label>
          <select>
            <option value="">— Select parent —</option>
            {PRODUCTS.map(p => <option key={p.code}>{p.code} — {p.desc}</option>)}
          </select>
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Component (sub-part) *</label>
          <select>
            <option value="">— Select component —</option>
            <option>PKG-501 Plastic pail 5L</option>
            <option>RAW-101 Acrylic resin base</option>
            <option>RAW-110 White pigment</option>
            <option>RAW-201 PU base compound</option>
            <option>RAW-301 Galvanised steel sheet</option>
          </select>
        </div>
        <div className="field"><label>Component Name *</label>
          <input defaultValue={isEdit ? 'Pail — 5L plastic' : ''} placeholder="Display name on BOM"/>
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Quantity *</label><input type="number" step="0.01" defaultValue={isEdit ? 1 : ''} placeholder="0"/></div>
        <div className="field"><label>Dimension Quantity</label><input type="number" defaultValue={isEdit ? 1 : 1} placeholder="1"/></div>
      </div>
      <h3 style={{margin:'18px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Dimensions</h3>
      <div className="field-row" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div className="field"><label>Dimension 1</label><input defaultValue={isEdit ? '180mm' : ''} placeholder="e.g. 180mm"/></div>
        <div className="field"><label>Dimension 2</label><input defaultValue={isEdit ? '180mm' : ''} placeholder="e.g. 180mm"/></div>
        <div className="field"><label>Dimension 3</label><input defaultValue={isEdit ? '250mm' : ''} placeholder="e.g. 250mm"/></div>
      </div>
    </FormShell>
  );
};

const KitForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <FormShell title={isEdit ? 'Edit Kit Item' : 'New Kit Item'}
      sub="Add a product to a kit/bundle, or create a new kit."
      back="product-kits" backLabel="Back to Kits"
      refTag={isEdit ? 'KIT-001' : undefined}
      saveLabel={isEdit ? 'Save Changes' : 'Save Kit Item'} onNavigate={onNavigate}>
      <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Kit Details</h3>
      <div className="field"><label>Kit *</label>
        <select defaultValue={isEdit ? 'Pool Deck Starter Kit' : ''}>
          <option value="">— Select existing kit or create new —</option>
          <option>Pool Deck Starter Kit</option>
          <option>Residential Re-coat Kit</option>
          <option>Industrial Membrane Kit</option>
          <option>+ Create new kit...</option>
        </select>
      </div>
      <div className="field"><label>Product *</label>
        <select>
          <option value="">— Select product to add to kit —</option>
          {PRODUCTS.map(p => <option key={p.code}>{p.code} — {p.desc}</option>)}
        </select>
      </div>
      <div className="field-row">
        <div className="field"><label>Quantity in Kit</label><input type="number" defaultValue={1}/></div>
        <div className="field"><label>Display Order</label><input type="number" defaultValue={1}/></div>
      </div>
    </FormShell>
  );
};

const PriceChangeForm = ({ onNavigate }) => (
  <FormShell title="Adjust Prices" sub="Bulk price update by category, supplier or formula."
    back="product-price-changes" backLabel="Back to Price Changes"
    saveLabel="Apply Adjustment" onNavigate={onNavigate}>
    <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Adjustment Scope</h3>
    <div className="field-row">
      <div className="field"><label>Type</label>
        <select><option>All Products</option><option>Physical only</option><option>Service only</option></select>
      </div>
      <div className="field"><label>Supplier</label>
        <select><option>All Suppliers</option><option>Apex Coatings</option><option>Bondline</option><option>HydroShield</option><option>SteelForm</option></select>
      </div>
    </div>
    <div className="field-row">
      <div className="field"><label>Category</label>
        <select><option>All Categories</option><option>Membranes</option><option>Primers</option><option>Sealants</option><option>Flashings</option></select>
      </div>
      <div className="field"><label>Effective Date</label><input type="date" defaultValue="2026-06-01"/></div>
    </div>
    <h3 style={{margin:'22px 0 12px', fontSize:14, color:'var(--slate-700)'}}>Adjustment</h3>
    <div className="field-row">
      <div className="field"><label>Method *</label>
        <select><option>Increase by %</option><option>Decrease by %</option><option>Set to fixed amount</option><option>Round to nearest R5</option></select>
      </div>
      <div className="field"><label>Value</label><input type="number" placeholder="e.g. 5 for 5%"/></div>
    </div>
    <div className="field" style={{margin:0}}>
      <label>Notes</label>
      <textarea rows={3} placeholder="Reason for adjustment, batch reference, etc."/>
    </div>
  </FormShell>
);

const SyncEditForm = ({ onNavigate }) => (
  <FormShell title="Edit Sage Mapping" sub="Update how this product is linked to Sage."
    back="product-sync" backLabel="Back to Sync"
    refTag="MB-101" saveLabel="Save Mapping" onNavigate={onNavigate}>
    <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Sage Link</h3>
    <div className="field-row">
      <div className="field"><label>Code *</label><input defaultValue="MB-101" disabled/></div>
      <div className="field"><label>Sage Link *</label><input defaultValue="STK-30101" placeholder="e.g. STK-30101"/></div>
    </div>
    <div className="field"><label>Description</label>
      <input defaultValue="Acrylic waterproofing — 5L white"/>
    </div>
    <div className="field-row">
      <div className="field"><label>Price (ex VAT) *</label><input type="number" defaultValue={369.57}/></div>
      <div className="field"><label>Unit (per)</label>
        <select defaultValue="ea"><option>ea</option><option>m²</option><option>m</option><option>kg</option><option>hr</option></select>
      </div>
    </div>
    <div className="field-row">
      <div className="field"><label>Unit Cost</label><input type="number" defaultValue={285}/></div>
      <div className="field"><label>Labour Cost</label><input type="number" defaultValue={0}/></div>
    </div>
  </FormShell>
);

Object.assign(window, { Products, ProductForm, VariationForm, ComponentForm, KitForm, PriceChangeForm, SyncEditForm });
