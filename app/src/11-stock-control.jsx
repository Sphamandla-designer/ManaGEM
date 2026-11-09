// ===== STOCK CONTROL =====

const SUPPLIERS = [
  { code:'SUP-001', name:'Apex Coatings',            contact:'Grant Muller',  email:'sales@apexcoatings.example',       phone:'+27 11 000 0108', terms:'30 days', balance: 184000, status:'Active' },
  { code:'SUP-002', name:'Bondline',             contact:'Megan Erasmus',email:'orders@bondline.example',    phone:'+27 11 000 0109', terms:'30 days', balance: 42000,  status:'Active' },
  { code:'SUP-003', name:'HydroShield',          contact:'Kevin Moodley',  email:'sales@hydroshield.example',  phone:'+27 21 000 0110', terms:'COD',     balance: 0,      status:'Active' },
  { code:'SUP-004', name:"Trade Depot",  contact:'Craig Abrahams',  email:'jhb@tradedepot.example',phone:'+27 11 000 0111',terms:'7 days', balance: 12800,  status:'Active' },
  { code:'SUP-005', name:'SteelForm',            contact:'Tumi Mabaso',email:'orders@steelform.example',   phone:'+27 16 000 0112', terms:'30 days', balance: 68000,  status:'Active' },
  { code:'SUP-006', name:'Coastline Chemicals',           contact:'Anika Kruger',    email:'sales@coastline.example',   phone:'+27 21 000 0113', terms:'30 days', balance: 0,      status:'Dormant' }
];

const PURCHASE_ORDERS = [
  { po:'PO-2026-184', supplier:'Apex Coatings',      date:'02 May 2026', store:'Main Hardware',     items:8, total:182400, status:'Open' },
  { po:'PO-2026-183', supplier:'Apex Coatings',      date:'01 May 2026', store:'Main Hardware',     items:4, total:96800,  status:'Received' },
  { po:'PO-2026-182', supplier:'Bondline',       date:'28 Apr 2026', store:'Durban Store',   items:12,total:42000,  status:'Open' },
  { po:'PO-2026-181', supplier:'SteelForm',      date:'25 Apr 2026', store:'Main Hardware',     items:3, total:68000,  status:'Partial' },
  { po:'PO-2026-180', supplier:"Trade Depot", date:'20 Apr 2026', store:'Main Hardware',items:6, total:12800,  status:'Received' },
  { po:'PO-2026-179', supplier:'HydroShield',    date:'18 Apr 2026', store:'Polokwane Store',  items:2, total:18400,  status:'Cancelled' }
];

const WAREHOUSES = [
  { code:'WH-001', name:'Main Hardware Store', type:'Hardware',       address:'8 Turbine St, Midrand', manager:'Sizwe Maseko', bays:42, capacity:'78%' },
  { code:'WH-002', name:'Durban Store',     type:'Hardware',       address:'Pinetown Industrial',     manager:'Johan Fourie',bays:18, capacity:'52%' },
  { code:'WH-003', name:'Polokwane Store',    type:'Site Container', address:'Polokwane',             manager:'Kagiso Molefe', bays:6,  capacity:'34%' },
  { code:'WH-004', name:'Vehicle — Bakkie 1',  type:'Vehicle',        address:'Rolling',                manager:'Sizwe Maseko', bays:4,  capacity:'68%' },
  { code:'WH-005', name:'Vehicle — Bakkie 2',  type:'Vehicle',        address:'Rolling',                manager:'Kagiso Molefe', bays:4,  capacity:'40%' }
];

const STORE_BAYS = [
  { bay:'A-01', store:'Main Hardware Store', category:'Membranes',  items:6,  cap:'80%' },
  { bay:'A-02', store:'Main Hardware Store', category:'Membranes',  items:4,  cap:'45%' },
  { bay:'A-03', store:'Main Hardware Store', category:'Primers',    items:8,  cap:'90%' },
  { bay:'B-01', store:'Main Hardware Store', category:'Sealants',   items:12, cap:'72%' },
  { bay:'B-02', store:'Main Hardware Store', category:'Tools',      items:18, cap:'60%' },
  { bay:'C-01', store:'Main Hardware Store', category:'Flashings',  items:5,  cap:'85%' },
  { bay:'DBN-A1',store:'Durban Store',     category:'Membranes',  items:4,  cap:'50%' },
  { bay:'DBN-B1',store:'Durban Store',     category:'Sealants',   items:3,  cap:'40%' }
];

const STOCK_MOVEMENTS = [
  { date:'02 May 2026', ref:'MV-0184', type:'Receive',  item:'MB-101 Acrylic 5L',          qty:'+24', store:'Main Hardware', staff:'Sizwe M.' },
  { date:'02 May 2026', ref:'MV-0183', type:'Dispatch', item:'MB-103 Bitumen torch-on',    qty:'-12', store:'Main Hardware', staff:'Kagiso M.' },
  { date:'01 May 2026', ref:'MV-0182', type:'Transfer', item:'SL-301 PU sealant',          qty:'-30', store:'Main → DBN',     staff:'Johan F.' },
  { date:'30 Apr 2026', ref:'MV-0181', type:'Return',   item:'PR-201 Bonding primer',      qty:'+4',  store:'Main Hardware', staff:'Sizwe M.' },
  { date:'30 Apr 2026', ref:'MV-0180', type:'Stock Take',item:'FL-501 Galv flashing',       qty:'-2',  store:'Main Hardware', staff:'Sizwe M.' },
  { date:'29 Apr 2026', ref:'MV-0179', type:'Sell',     item:'TS-401 Roller set',          qty:'-6',  store:'Durban',     staff:'Johan F.' },
  { date:'28 Apr 2026', ref:'MV-0178', type:'Dispatch', item:'MB-102 Acrylic 20L',         qty:'-8',  store:'Main Hardware', staff:'Kagiso M.' }
];

const RECEIVES = [
  { date:'02 May 2026', ref:'RCV-0042', po:'PO-2026-184', supplier:'Apex Coatings', items:8, status:'Received',  store:'Main Hardware' },
  { date:'01 May 2026', ref:'RCV-0041', po:'PO-2026-183', supplier:'Apex Coatings', items:4, status:'Received',  store:'Main Hardware' },
  { date:'25 Apr 2026', ref:'RCV-0040', po:'PO-2026-181', supplier:'SteelForm', items:2, status:'Partial',   store:'Main Hardware' },
  { date:'20 Apr 2026', ref:'RCV-0039', po:'PO-2026-180', supplier:"Trade Depot", items:6, status:'Received', store:'Main Hardware' }
];

const TRANSFERS = [
  { date:'01 May 2026', ref:'TFR-0028', from:'Main Hardware', to:'Durban Store', items:3, status:'Completed',  staff:'Johan F.' },
  { date:'28 Apr 2026', ref:'TFR-0027', from:'Main Hardware', to:'Bakkie 1',         items:6, status:'In Transit', staff:'Sizwe M.' },
  { date:'24 Apr 2026', ref:'TFR-0026', from:'Durban',     to:'Polokwane',       items:2, status:'Completed',  staff:'Johan F.' },
  { date:'18 Apr 2026', ref:'TFR-0025', from:'Main Hardware', to:'Bakkie 2',         items:4, status:'Completed',  staff:'Kagiso M.' }
];

const STOCK_DISPATCHES = [
  { date:'02 May 2026', ref:'DSP-2603', desc:'3 × PU 5L, 50 × rivets',  store:'Main Hardware', project:'L07/25-135 Riverside', staff:'Sizwe M.' },
  { date:'02 May 2026', ref:'DSP-2602', desc:'12 × acrylic 20L',         store:'Main Hardware', project:'L04/26-124 ORN',  staff:'Kagiso M.' },
  { date:'01 May 2026', ref:'DSP-2601', desc:'8 × PU sealant 600ml',     store:'Durban',     project:'L04/26-119 Highlands',staff:'Johan F.' },
  { date:'28 Apr 2026', ref:'DSP-2600', desc:'60m² torch-on bitumen',    store:'Main Hardware', project:'L04/26-105 Meridian',staff:'Kagiso M.' }
];

const SELLS = [
  { date:'02 May 2026', ref:'SEL-0084', customer:'Marula DIY',         items:4, total: 1280, store:'Main Hardware', staff:'Sizwe M.' },
  { date:'01 May 2026', ref:'SEL-0083', customer:'Walk-in — Cash',     items:2, total: 480,  store:'Main Hardware', staff:'Sizwe M.' },
  { date:'29 Apr 2026', ref:'SEL-0082', customer:'Stonebridge Properties',    items:6, total: 3240, store:'Durban',     staff:'Johan F.' },
  { date:'27 Apr 2026', ref:'SEL-0081', customer:'Walk-in — Cash',     items:1, total: 165,  store:'Main Hardware', staff:'Sizwe M.' }
];

const RETURNS = [
  { date:'30 Apr 2026', ref:'RTN-0018', source:'L04/26-115 Oakwood', item:'PR-201 Bonding primer × 4', reason:'Site overrun', store:'Main Hardware', staff:'Sizwe M.' },
  { date:'25 Apr 2026', ref:'RTN-0017', source:'L04/26-108 Riverside',       item:'MB-101 Acrylic × 2',        reason:'Wrong colour', store:'Main Hardware', staff:'Kagiso M.' },
  { date:'22 Apr 2026', ref:'RTN-0016', source:'SUP — Apex Coatings',         item:'MB-104 Liquid PU × 6 (faulty batch)', reason:'Damaged on receipt', store:'Main Hardware', staff:'Sizwe M.' },
  { date:'18 Apr 2026', ref:'RTN-0015', source:'L04/26-091 Harbour Line',    item:'SL-301 PU sealant × 12',    reason:'Over-ordered', store:'Durban',     staff:'Johan F.' }
];

const STOCK_TAKES = [
  { date:'30 Apr 2026', ref:'ST-2026-04', store:'Main Hardware', items:184, variance:-8,  status:'Completed', staff:'Sizwe M.' },
  { date:'30 Apr 2026', ref:'ST-2026-03', store:'Durban',     items:62,  variance:+2,  status:'Completed', staff:'Johan F.' },
  { date:'30 Apr 2026', ref:'ST-2026-02', store:'Polokwane',    items:24,  variance:0,   status:'Completed', staff:'Kagiso M.' },
  { date:'29 Apr 2026', ref:'ST-2026-01', store:'Bakkie 1',      items:18,  variance:-1,  status:'In Progress',staff:'Sizwe M.' }
];

const tickC = (v) => v ? <Icon name="check" size={14} style={{color:'var(--emerald)'}}/> : <span style={{color:'var(--slate-300)'}}>—</span>;

const StockControl = ({ tab = 'dashboard', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind:'preset', preset:'month' });

  const subTabs = [
    { id:'dashboard',   label:'Dashboard',         route:'stock',            ct: null },
    { id:'suppliers',   label:'Suppliers',         route:'stock-suppliers',  ct: SUPPLIERS.length },
    { id:'pos',         label:'Purchase Orders',   route:'stock-pos',        ct: PURCHASE_ORDERS.length },
    { id:'warehouses',  label:'Stores / Warehouses', route:'stock-warehouses', ct: WAREHOUSES.length },
    { id:'bays',        label:'Store Bays',        route:'stock-bays',       ct: STORE_BAYS.length },
    { id:'movements',   label:'Stock Movements',   route:'stock-movements',  ct: STOCK_MOVEMENTS.length },
    { id:'receive',     label:'Receive',           route:'stock-receive',    ct: RECEIVES.length },
    { id:'transfer',    label:'Transfer',          route:'stock-transfer',   ct: TRANSFERS.length },
    { id:'dispatch',    label:'Dispatch',          route:'stock-dispatch',   ct: STOCK_DISPATCHES.length },
    { id:'sell',        label:'Sell',              route:'stock-sell',       ct: SELLS.length },
    { id:'returns',     label:'Returns',           route:'stock-returns',    ct: RETURNS.length },
    { id:'stocktake',   label:'Stock Take',        route:'stock-take',       ct: STOCK_TAKES.length }
  ];

  const titles = {
    dashboard:'Stock Control',
    suppliers:'Suppliers', pos:'Purchase Orders', warehouses:'Stores & Warehouses',
    bays:'Store Bays', movements:'Stock Movements', receive:'Stock Receive',
    transfer:'Stock Transfer', dispatch:'Stock Dispatch', sell:'Counter Sales',
    returns:'Stock Returns', stocktake:'Stock Take'
  };
  const subs = {
    dashboard:'Overview of stock activity, low stock alerts and recent movement',
    suppliers:'Vendor accounts and supplier balances',
    pos:'Outstanding and completed purchase orders',
    warehouses:'Physical and rolling stock locations',
    bays:'Bay-level layout within each store',
    movements:'Every stock change across the business',
    receive:'Goods receiving against purchase orders',
    transfer:'Inter-store stock transfers',
    dispatch:'Material dispatched to projects',
    sell:'Direct counter / walk-in sales',
    returns:'Returns from customers, projects and to suppliers',
    stocktake:'Periodic stock counts and variances'
  };

  const primary = {
    dashboard:  null,
    suppliers:  <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('supplier-new')}><Icon name="plus" size={14}/> New Supplier</button>,
    pos:        <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('po-new')}><Icon name="plus" size={14}/> New PO</button>,
    warehouses: <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('warehouse-new')}><Icon name="plus" size={14}/> New Store</button>,
    bays:       <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('bay-new')}><Icon name="plus" size={14}/> New Bay</button>,
    movements:  null,
    receive:    <button className="btn btn-primary"><Icon name="download" size={14}/> Receive Goods</button>,
    transfer:   <button className="btn btn-primary"><Icon name="truck" size={14}/> New Transfer</button>,
    dispatch:   <button className="btn btn-primary"><Icon name="truck" size={14}/> Dispatch Stock</button>,
    sell:       <button className="btn btn-primary"><Icon name="plus" size={14}/> New Sale</button>,
    returns:    <button className="btn btn-primary"><Icon name="refresh" size={14}/> New Return</button>,
    stocktake:  <button className="btn btn-primary"><Icon name="check-circle" size={14}/> Start Stock Take</button>
  };

  return (
    <>
      <PageHeader title={titles[tab]} sub={subs[tab]} actions={primary[tab]}/>

      <div className="subtabs" style={{marginBottom:14, overflowX:'auto', flexWrap:'nowrap'}}>
        {subTabs.map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={()=>onNavigate&&onNavigate(t.route)}>
            {t.label}{t.ct !== null && <span className="ct">{t.ct}</span>}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === 'dashboard' && (
        <>
          <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
            <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="package" size={16}/></div><div className="kpi-label">Total SKUs</div><div className="kpi-value">486</div><div className="kpi-delta up"><Icon name="arrow-up" size={12}/> 12 this month</div></div>
            <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="boxes" size={16}/></div><div className="kpi-label">Stock Value</div><div className="kpi-value">R 1.84M</div><div className="kpi-delta up"><Icon name="arrow-up" size={12}/> 4.2% MTD</div></div>
            <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Low Stock Items</div><div className="kpi-value">14</div><div className="kpi-delta" style={{color:'var(--amber)'}}>Requires reorder</div></div>
            <div className="kpi"><div className="kpi-icon" style={{background:'var(--purple-light)',color:'var(--purple)'}}><Icon name="receipt" size={16}/></div><div className="kpi-label">Open POs</div><div className="kpi-value">{PURCHASE_ORDERS.filter(p=>p.status==='Open' || p.status==='Partial').length}</div><div className="kpi-delta muted">{fmtR(PURCHASE_ORDERS.filter(p=>p.status==='Open'||p.status==='Partial').reduce((s,p)=>s+p.total,0))}</div></div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'minmax(0,1.5fr) minmax(0,1fr)', gap:16, marginBottom:16}} className="stock-row">
            <div className="card">
              <div className="card-hd"><h3>Recent Stock Movements</h3><a href="#" onClick={(e)=>{e.preventDefault();onNavigate&&onNavigate('stock-movements');}}>View all →</a></div>
              <div>
                {STOCK_MOVEMENTS.slice(0,6).map((m,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',borderBottom: i<5?'1px solid var(--border)':'none', fontSize:12.5}}>
                    <span className="mono" style={{color:'var(--sky)', minWidth:80, fontSize:11.5}}>{m.ref}</span>
                    <Badge variant={m.type==='Receive'?'emerald':m.type==='Dispatch'?'sky':m.type==='Transfer'?'purple':m.type==='Return'?'amber':m.type==='Sell'?'sky':'slate'}>{m.type}</Badge>
                    <span style={{flex:1, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{m.item}</span>
                    <span className="mono" style={{minWidth:50, textAlign:'right', fontWeight:600, color: m.qty.startsWith('+')?'var(--emerald)':'var(--red)'}}>{m.qty}</span>
                    <span style={{color:'var(--slate-500)', fontSize:11.5, minWidth:80, textAlign:'right'}}>{m.date}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-hd"><h3>Warehouse Capacity</h3><a href="#" onClick={(e)=>{e.preventDefault();onNavigate&&onNavigate('stock-warehouses');}}>View all →</a></div>
              <div style={{padding:'14px 18px'}}>
                {WAREHOUSES.map((w,i)=>{
                  const pct = parseInt(w.capacity);
                  return (
                    <div key={i} style={{marginBottom: i<WAREHOUSES.length-1 ? 14 : 0}}>
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12.5}}>
                        <span style={{fontWeight:500}}>{w.name}</span>
                        <span className="mono" style={{fontWeight:600, color: pct>80?'var(--amber)':'var(--slate-700)'}}>{w.capacity}</span>
                      </div>
                      <div style={{height:6, background:'var(--slate-100)', borderRadius:999, overflow:'hidden'}}>
                        <div style={{width:w.capacity, height:'100%', background: pct>80?'var(--amber)':'var(--sky)', borderRadius:999}}/>
                      </div>
                      <div style={{fontSize:11, color:'var(--slate-500)', marginTop:2}}>{w.bays} bays · {w.type}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16}} className="stock-row">
            <div className="card">
              <div className="card-hd"><h3>Open Purchase Orders</h3><a href="#" onClick={(e)=>{e.preventDefault();onNavigate&&onNavigate('stock-pos');}}>View all →</a></div>
              <div>
                {PURCHASE_ORDERS.filter(p=>p.status==='Open'||p.status==='Partial').map((p,i,arr)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',borderBottom: i<arr.length-1?'1px solid var(--border)':'none', fontSize:12.5}}>
                    <span className="mono" style={{color:'var(--sky)', minWidth:110, fontSize:11.5, fontWeight:600}}>{p.po}</span>
                    <span style={{flex:1, fontWeight:500}}>{p.supplier}</span>
                    <Badge variant={p.status==='Open'?'sky':'amber'}>{p.status}</Badge>
                    <span className="mono" style={{minWidth:90, textAlign:'right', fontWeight:600}}>{fmtR(p.total)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-hd"><h3>Low Stock Alerts</h3><a href="#" onClick={(e)=>{e.preventDefault();onNavigate&&onNavigate('stock-pos');}}>Reorder →</a></div>
              <div>
                {[
                  { code:'MB-104', desc:'Liquid PU membrane 5L', current:18, min:25 },
                  { code:'PR-202', desc:'Damp-tolerant epoxy primer 4kg', current:6,  min:10 },
                  { code:'FL-503', desc:'Aluminium edge trim 25mm', current:12, min:20 },
                  { code:'SL-302', desc:'Tile adhesive sealant 290ml', current:4,  min:15 }
                ].map((s,i,arr)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',borderBottom: i<arr.length-1?'1px solid var(--border)':'none', fontSize:12.5}}>
                    <span className="mono" style={{minWidth:70}}>{s.code}</span>
                    <span style={{flex:1, fontWeight:500}}>{s.desc}</span>
                    <span style={{fontSize:11, color:'var(--slate-500)'}}>min {s.min}</span>
                    <span style={{minWidth:36, textAlign:'right', fontWeight:700, color:'var(--amber)'}}>{s.current}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="qa-grid">
            {[
              { i:'download', t:'Receive Goods',  s:'Log new stock arrivals',     go:'stock-receive' },
              { i:'truck',    t:'Dispatch Stock', s:'Send material to job',       go:'stock-dispatch' },
              { i:'refresh',  t:'Transfer Stock', s:'Move between stores',        go:'stock-transfer' },
              { i:'check-circle', t:'Stock Take', s:'Run a stock count',          go:'stock-take' }
            ].map((q,i)=>(
              <div className="qa-card" key={i} onClick={()=>onNavigate&&onNavigate(q.go)}>
                <div className="qa-icon"><Icon name={q.i} size={18}/></div>
                <div><div className="ttl">{q.t}</div><div className="sub">{q.s}</div></div>
              </div>
            ))}
          </div>

          <style>{`@media (max-width:900px){ .stock-row{ grid-template-columns: 1fr !important; } }`}</style>
        </>
      )}

      {tab !== 'dashboard' && (
        <FilterToolbar search={search} setSearch={setSearch}
          chips={[{label:'Store',value:'All'},{label:'Status',value:'All'}]}
          onChipRemove={()=>{}} extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>
      )}

      {/* SUPPLIERS */}
      {tab === 'suppliers' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Code</th><th>Name</th><th>Contact</th><th>Email</th><th>Phone</th><th>Terms</th>
            <th style={{textAlign:'right'}}>Balance</th><th>Status</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{SUPPLIERS.map(s=>(
            <tr key={s.code}>
              <td data-label="Code" className="cell-mono link" style={{fontWeight:600}}>{s.code}</td>
              <td data-label="Name" className="cell-bold full">{s.name}</td>
              <td data-label="Contact" style={{fontSize:12.5}}><div className="av-row"><Avatar name={s.contact}/><span>{s.contact}</span></div></td>
              <td data-label="Email" className="cell-mono" style={{fontSize:11.5}}>{s.email}</td>
              <td data-label="Phone" className="cell-mono" style={{fontSize:12}}>{s.phone}</td>
              <td data-label="Terms" style={{color:'var(--slate-600)', fontSize:12}}>{s.terms}</td>
              <td data-label="Balance" className="cell-num" style={{fontWeight:600, color: s.balance>0?'var(--text)':'var(--slate-400)'}}>{s.balance>0?fmtR(s.balance):'—'}</td>
              <td data-label="Status"><Badge variant={s.status==='Active'?'emerald':'slate'}>{s.status}</Badge></td>
              <td className="actions"><RowMenu items={[
                {icon:'eye', label:'View'},
                {icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('supplier-edit')},
                {divider:true},{icon:'trash', label:'Delete', danger:true}
              ]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* PURCHASE ORDERS */}
      {tab === 'pos' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>PO No</th><th>Date</th><th>Supplier</th><th>Store</th>
            <th style={{textAlign:'right'}}>Items</th><th style={{textAlign:'right'}}>Total</th>
            <th>Status</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{PURCHASE_ORDERS.map(p=>(
            <tr key={p.po}>
              <td data-label="PO" className="cell-mono link" style={{fontWeight:600}}>{p.po}</td>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12}}>{p.date}</td>
              <td data-label="Supplier" className="cell-bold full">{p.supplier}</td>
              <td data-label="Store" style={{color:'var(--slate-700)'}}>{p.store}</td>
              <td data-label="Items" className="cell-num">{p.items}</td>
              <td data-label="Total" className="cell-num" style={{fontWeight:600}}>{fmtR(p.total)}</td>
              <td data-label="Status"><Badge variant={p.status==='Received'?'emerald':p.status==='Open'?'sky':p.status==='Partial'?'amber':'red'}>{p.status}</Badge></td>
              <td className="actions"><RowMenu items={[
                {icon:'eye', label:'View'},
                {icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('po-edit')},
                {icon:'download', label:'Download PDF'},
                {divider:true},{icon:'trash', label:'Cancel', danger:true}
              ]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* WAREHOUSES */}
      {tab === 'warehouses' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Code</th><th>Name</th><th>Type</th><th>Address</th><th>Manager</th>
            <th style={{textAlign:'right'}}>Bays</th><th>Capacity</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{WAREHOUSES.map(w=>(
            <tr key={w.code}>
              <td data-label="Code" className="cell-mono link" style={{fontWeight:600}}>{w.code}</td>
              <td data-label="Name" className="cell-bold full">{w.name}</td>
              <td data-label="Type"><Badge variant={w.type==='Vehicle'?'purple':w.type==='Site Container'?'amber':'sky'}>{w.type}</Badge></td>
              <td data-label="Address" style={{color:'var(--slate-700)'}}>{w.address}</td>
              <td data-label="Manager"><div className="av-row"><Avatar name={w.manager}/><span style={{fontSize:12.5}}>{w.manager}</span></div></td>
              <td data-label="Bays" className="cell-num">{w.bays}</td>
              <td data-label="Capacity">
                <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}>
                  <div style={{flex:1, height:6, background:'var(--slate-100)', borderRadius:999, overflow:'hidden', minWidth:60}}>
                    <div style={{width:w.capacity, height:'100%', background:'var(--sky)', borderRadius:999}}/>
                  </div>
                  <span className="mono" style={{color:'var(--slate-700)', fontWeight:600}}>{w.capacity}</span>
                </div>
              </td>
              <td className="actions"><RowMenu items={[
                {icon:'eye', label:'View'},
                {icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('warehouse-edit')},
                {divider:true},{icon:'trash', label:'Delete', danger:true}
              ]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* STORE BAYS */}
      {tab === 'bays' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Bay</th><th>Store</th><th>Category</th>
            <th style={{textAlign:'right'}}>Items</th><th>Capacity</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{STORE_BAYS.map((b,i)=>(
            <tr key={i}>
              <td data-label="Bay" className="cell-mono" style={{fontWeight:600}}>{b.bay}</td>
              <td data-label="Store" className="cell-bold full">{b.store}</td>
              <td data-label="Category" style={{color:'var(--slate-700)'}}>{b.category}</td>
              <td data-label="Items" className="cell-num">{b.items}</td>
              <td data-label="Capacity">
                <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12}}>
                  <div style={{flex:1, height:6, background:'var(--slate-100)', borderRadius:999, overflow:'hidden', minWidth:60}}>
                    <div style={{width:b.cap, height:'100%', background: parseInt(b.cap)>80?'var(--amber)':'var(--sky)', borderRadius:999}}/>
                  </div>
                  <span className="mono" style={{color:'var(--slate-700)', fontWeight:600}}>{b.cap}</span>
                </div>
              </td>
              <td className="actions"><RowMenu items={[
                {icon:'pencil', label:'Edit', onClick:()=>onNavigate&&onNavigate('bay-edit')},
                {divider:true},{icon:'trash', label:'Delete', danger:true}
              ]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* MOVEMENTS */}
      {tab === 'movements' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>Type</th><th>Item</th>
            <th style={{textAlign:'right'}}>Qty</th><th>Store</th><th>Staff</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{STOCK_MOVEMENTS.map((m,i)=>(
            <tr key={i}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{m.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{m.ref}</td>
              <td data-label="Type"><Badge variant={
                m.type==='Receive'?'emerald':m.type==='Dispatch'?'sky':m.type==='Transfer'?'purple':
                m.type==='Return'?'amber':m.type==='Sell'?'sky':'slate'}>{m.type}</Badge></td>
              <td data-label="Item" className="cell-bold full">{m.item}</td>
              <td data-label="Qty" className="cell-num" style={{fontWeight:600, color: m.qty.startsWith('+')?'var(--emerald)':'var(--red)'}}>{m.qty}</td>
              <td data-label="Store" style={{color:'var(--slate-700)'}}>{m.store}</td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={m.staff} size={22}/><span>{m.staff}</span></div></td>
              <td className="actions"><RowMenu items={[{icon:'eye', label:'View'},{icon:'download', label:'Download'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* RECEIVE */}
      {tab === 'receive' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>PO No</th><th>Supplier</th>
            <th style={{textAlign:'right'}}>Items</th><th>Store</th><th>Status</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{RECEIVES.map(r=>(
            <tr key={r.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{r.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{r.ref}</td>
              <td data-label="PO" className="cell-mono link">{r.po}</td>
              <td data-label="Supplier" className="cell-bold full">{r.supplier}</td>
              <td data-label="Items" className="cell-num">{r.items}</td>
              <td data-label="Store" style={{color:'var(--slate-700)'}}>{r.store}</td>
              <td data-label="Status"><Badge variant={r.status==='Received'?'emerald':'amber'}>{r.status}</Badge></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'View'},{icon:'download',label:'GRN PDF'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* TRANSFER */}
      {tab === 'transfer' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>From</th><th>To</th>
            <th style={{textAlign:'right'}}>Items</th><th>Staff</th><th>Status</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{TRANSFERS.map(t=>(
            <tr key={t.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{t.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{t.ref}</td>
              <td data-label="From" style={{fontWeight:500}}>{t.from}</td>
              <td data-label="To" className="full" style={{fontWeight:500}}><Icon name="arrow-up" size={11} style={{transform:'rotate(90deg)', color:'var(--slate-400)', marginRight:4}}/>{t.to}</td>
              <td data-label="Items" className="cell-num">{t.items}</td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={t.staff} size={22}/><span>{t.staff}</span></div></td>
              <td data-label="Status"><Badge variant={t.status==='Completed'?'emerald':'amber'}>{t.status}</Badge></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'View'},{icon:'check',label:'Mark Complete'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* DISPATCH */}
      {tab === 'dispatch' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>Description</th><th>Store</th><th>Project</th><th>Staff</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{STOCK_DISPATCHES.map(d=>(
            <tr key={d.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{d.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{d.ref}</td>
              <td data-label="Description" className="cell-bold full">{d.desc}</td>
              <td data-label="Store"><Badge variant="slate">{d.store}</Badge></td>
              <td data-label="Project" className="cell-mono link" style={{fontSize:12}}>{d.project}</td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={d.staff} size={22}/><span>{d.staff}</span></div></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'PDF receipt'},{icon:'download',label:'Download'},{icon:'refresh',label:'Return Stock'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* SELL */}
      {tab === 'sell' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>Customer</th>
            <th style={{textAlign:'right'}}>Items</th><th style={{textAlign:'right'}}>Total</th>
            <th>Store</th><th>Staff</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{SELLS.map(s=>(
            <tr key={s.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{s.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{s.ref}</td>
              <td data-label="Customer" className="cell-bold full">{s.customer}</td>
              <td data-label="Items" className="cell-num">{s.items}</td>
              <td data-label="Total" className="cell-num" style={{fontWeight:600}}>{fmtR(s.total)}</td>
              <td data-label="Store" style={{color:'var(--slate-700)'}}>{s.store}</td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={s.staff} size={22}/><span>{s.staff}</span></div></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'View'},{icon:'download',label:'Receipt PDF'},{icon:'refresh',label:'Refund'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* RETURNS */}
      {tab === 'returns' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>Source</th><th>Item</th><th>Reason</th><th>Store</th><th>Staff</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{RETURNS.map(r=>(
            <tr key={r.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{r.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{r.ref}</td>
              <td data-label="Source" style={{fontWeight:500}}>{r.source}</td>
              <td data-label="Item" className="full">{r.item}</td>
              <td data-label="Reason" style={{color:'var(--slate-600)', fontSize:12}}>{r.reason}</td>
              <td data-label="Store"><Badge variant="slate">{r.store}</Badge></td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={r.staff} size={22}/><span>{r.staff}</span></div></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'View'},{icon:'pencil',label:'Edit'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}

      {/* STOCK TAKE */}
      {tab === 'stocktake' && (
        <div className="table-wrap"><div className="table-scroll"><table className="data responsive-table">
          <thead><tr>
            <th>Date</th><th>Ref</th><th>Store</th>
            <th style={{textAlign:'right'}}>Items</th><th style={{textAlign:'right'}}>Variance</th>
            <th>Status</th><th>Staff</th><th style={{width:40}}></th>
          </tr></thead>
          <tbody>{STOCK_TAKES.map(st=>(
            <tr key={st.ref}>
              <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12, whiteSpace:'nowrap'}}>{st.date}</td>
              <td data-label="Ref" className="cell-mono link" style={{fontWeight:600}}>{st.ref}</td>
              <td data-label="Store" className="cell-bold full">{st.store}</td>
              <td data-label="Items" className="cell-num">{st.items}</td>
              <td data-label="Variance" className="cell-num" style={{fontWeight:600, color: st.variance===0?'var(--slate-500)':st.variance<0?'var(--red)':'var(--emerald)'}}>
                {st.variance > 0 ? '+' : ''}{st.variance}
              </td>
              <td data-label="Status"><Badge variant={st.status==='Completed'?'emerald':'amber'}>{st.status}</Badge></td>
              <td data-label="Staff" style={{fontSize:12.5}}><div className="av-row"><Avatar name={st.staff} size={22}/><span>{st.staff}</span></div></td>
              <td className="actions"><RowMenu items={[{icon:'eye',label:'View'},{icon:'pencil',label:'Edit'},{icon:'download',label:'PDF'}]}/></td>
            </tr>
          ))}</tbody>
        </table></div></div>
      )}
    </>
  );
};

// ===== FORMS =====
const SupplierForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('stock-suppliers')}><Icon name="arrow-left" size={14}/> Back to Suppliers</button>
        {isEdit && <span className="mono" style={{fontSize:14,fontWeight:600}}>SUP-001</span>}
      </div>
      <PageHeader title={isEdit?'Edit Supplier':'New Supplier'} sub={isEdit?'Update supplier details.':'Add a new supplier vendor.'}/>
      <div className="card" style={{padding:24}}>
        <div className="field-row">
          <div className="field"><label>Code *</label><input defaultValue={isEdit?'SUP-001':''} placeholder="e.g. SUP-001"/></div>
          <div className="field"><label>Name *</label><input defaultValue={isEdit?'Apex Coatings':''}/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Contact Person</label><input defaultValue={isEdit?'Grant Muller':''}/></div>
          <div className="field"><label>Payment Terms</label><select><option>COD</option><option>7 days</option><option>30 days</option><option>60 days</option></select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Email</label><input type="email" defaultValue={isEdit?'sales@apexcoatings.example':''}/></div>
          <div className="field"><label>Phone</label><input defaultValue={isEdit?'+27 11 000 0108':''}/></div>
        </div>
        <div className="field"><label>Address</label><textarea rows={2}/></div>
        <div className="field" style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:0,padding:'12px 14px',background:'var(--slate-50)',border:'1px solid var(--border)',borderRadius:8}}>
          <label style={{margin:0,fontWeight:500}}>Active</label><Toggle on={true}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('stock-suppliers')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('stock-suppliers')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Supplier'}</button>
        </div>
      </div>
    </>
  );
};

const POForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('stock-pos')}><Icon name="arrow-left" size={14}/> Back to Purchase Orders</button>
        {isEdit && <span className="mono" style={{fontSize:14,fontWeight:600}}>PO-2026-184</span>}
      </div>
      <PageHeader title={isEdit?'Edit Purchase Order':'New Purchase Order'} sub={isEdit?'Update items and quantities.':'Place a new order with a supplier.'}/>
      <div className="card" style={{padding:24}}>
        <div className="field-row">
          <div className="field"><label>Supplier *</label><select><option value="">— Select —</option>{SUPPLIERS.map(s=><option key={s.code}>{s.name}</option>)}</select></div>
          <div className="field"><label>Store *</label><select>{WAREHOUSES.map(w=><option key={w.code}>{w.name}</option>)}</select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>PO Date *</label><input type="date" defaultValue="2026-05-27"/></div>
          <div className="field"><label>Expected Delivery</label><input type="date"/></div>
        </div>
        <div className="field"><label>Notes</label><textarea rows={3}/></div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('stock-pos')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('stock-pos')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save PO'}</button>
        </div>
      </div>
    </>
  );
};

const WarehouseForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('stock-warehouses')}><Icon name="arrow-left" size={14}/> Back to Warehouses</button>
      </div>
      <PageHeader title={isEdit?'Edit Store / Warehouse':'New Store / Warehouse'} sub="Physical or rolling stock location."/>
      <div className="card" style={{padding:24}}>
        <div className="field-row">
          <div className="field"><label>Code *</label><input defaultValue={isEdit?'WH-001':''}/></div>
          <div className="field"><label>Type *</label><select><option>Hardware</option><option>Site Container</option><option>Vehicle</option></select></div>
        </div>
        <div className="field"><label>Name *</label><input defaultValue={isEdit?'Main Hardware Store':''}/></div>
        <div className="field"><label>Address</label><textarea rows={2}/></div>
        <div className="field"><label>Manager</label><select>{['Sizwe Maseko','Kagiso Molefe','Johan Fourie'].map(s=><option key={s}>{s}</option>)}</select></div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('stock-warehouses')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('stock-warehouses')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Store'}</button>
        </div>
      </div>
    </>
  );
};

const BayForm = ({ mode='new', onNavigate }) => {
  const isEdit = mode==='edit';
  return (
    <>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('stock-bays')}><Icon name="arrow-left" size={14}/> Back to Bays</button>
      </div>
      <PageHeader title={isEdit?'Edit Bay':'New Bay'} sub="Assign a bay within a store."/>
      <div className="card" style={{padding:24}}>
        <div className="field-row">
          <div className="field"><label>Bay Code *</label><input defaultValue={isEdit?'A-01':''} placeholder="e.g. A-01"/></div>
          <div className="field"><label>Store *</label><select>{WAREHOUSES.map(w=><option key={w.code}>{w.name}</option>)}</select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Category</label><select><option>Membranes</option><option>Primers</option><option>Sealants</option><option>Tools</option><option>Flashings</option></select></div>
          <div className="field"><label>Capacity (units)</label><input type="number" defaultValue={isEdit?20:10}/></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',gap:8,marginTop:24,paddingTop:18,borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={()=>onNavigate&&onNavigate('stock-bays')}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('stock-bays')}><Icon name="check" size={14}/> {isEdit?'Save Changes':'Save Bay'}</button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { StockControl, SupplierForm, POForm, WarehouseForm, BayForm });
