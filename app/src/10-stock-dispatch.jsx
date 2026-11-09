// ===== STOCK DISPATCH =====
const DISPATCHES = [
  { no: "0247", date: "29 Apr 2026 11:12", ref: "DSP-2603", src: "Dispatched — Riverside Hockey", desc: "3 × white polyurethane, 50 × blind rivets", store: "Main Hardware Store", project: "L07/25-135 Riverside College Hockey Pavilion", supplier: "Apex Coatings", staff: "Sizwe Maseko", returnable: true },
  { no: "0246", date: "29 Apr 2026 09:48", ref: "DSP-2602", src: "Dispatched — Orion Block A", desc: "12 × acrylic membrane 20L, primer 5L × 4", store: "Main Hardware Store", project: "L04/26-124 Orion Group", supplier: "Apex Coatings", staff: "Kagiso Molefe", returnable: true },
  { no: "0245", date: "28 Apr 2026 16:30", ref: "DSP-2601", src: "Dispatched — Highlands", desc: "8 × PU sealant 600ml, 24m flashing tape", store: "Durban Store", project: "L04/26-119 Highlands Estates", supplier: "Bondline", staff: "Johan Fourie", returnable: false },
  { no: "0244", date: "28 Apr 2026 14:05", ref: "DSP-2600", src: "Returned — site overrun", desc: "2 × acrylic 5L (returned)", store: "Main Hardware Store", project: "L04/26-115 Oakwood", supplier: "Apex Coatings", staff: "Sizwe Maseko", returnable: false },
  { no: "0243", date: "28 Apr 2026 09:12", ref: "DSP-2599", src: "Dispatched — Meridian deck", desc: "60m² torch-on bitumen, 2 × torches", store: "Main Hardware Store", project: "L04/26-105 Meridian Holdings", supplier: "Apex Coatings", staff: "Kagiso Molefe", returnable: true },
  { no: "0242", date: "27 Apr 2026 15:22", ref: "DSP-2598", src: "Dispatched — Fish Eagle pool", desc: "Pool deck membrane kit × 1", store: "Polokwane Store", project: "L04/26-111 Fish Eagle Lodge", supplier: "HydroShield", staff: "Johan Fourie", returnable: true },
  { no: "0241", date: "27 Apr 2026 11:00", ref: "DSP-2597", src: "Dispatched — Thembeka build", desc: "Sundries pack — full job", store: "Main Hardware Store", project: "L04/26-102 Thembeka Construct", supplier: "Trade Depot", staff: "Kagiso Molefe", returnable: true },
  { no: "0240", date: "26 Apr 2026 16:45", ref: "DSP-2596", src: "Dispatched — Seaview", desc: "Re-coat materials block 1-3", store: "Main Hardware Store", project: "L04/26-095 Seaview BC", supplier: "Apex Coatings", staff: "Sizwe Maseko", returnable: false }
];

const Stock = () => {
  const [search, setSearch] = React.useState('');
  return (
    <>
      <PageHeader
        title="Stock Dispatch"
        sub="247 records this period"
        actions={<button className="btn btn-primary"><Icon name="truck" size={14}/> Dispatch Stock</button>}
      />
      <div className="card card-pad" style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }} className="filter-grid">
          <div className="field" style={{margin:0}}><label>From Store</label><select><option>All Stores</option><option>Main Hardware Store</option><option>Durban Store</option><option>Polokwane Store</option></select></div>
          <div className="field" style={{margin:0}}><label>Staff Member</label><select><option>All Staff</option><option>Sizwe Maseko</option><option>Kagiso Molefe</option><option>Johan Fourie</option></select></div>
          <div className="field" style={{margin:0}}><label>Project</label><select><option>All Projects</option></select></div>
          <div className="field" style={{margin:0}}><label>Job / Build</label><select><option>All Jobs</option></select></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: 10, alignItems: 'flex-end' }} className="filter-grid">
          <div className="field" style={{margin:0}}><label>Date From</label><input type="date" defaultValue="2026-04-01"/></div>
          <div className="field" style={{margin:0}}><label>Date To</label><input type="date" defaultValue="2026-04-30"/></div>
          <div className="field" style={{margin:0}}><label>Search</label>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search ref, item, project…"/>
          </div>
          <button className="btn btn-primary"><Icon name="search" size={14}/> Search</button>
        </div>
        <style>{`@media (max-width: 720px){ .filter-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>

      <div className="summary-strip">
        <span><strong>247</strong> <span className="lbl">records</span></span>
        <span><span className="lbl">Total dispatched value:</span> <strong>R 48,320.00</strong></span>
        <span><span className="lbl">Filter:</span> <strong>Main Hardware Store · Apr 2026</strong></span>
        <span style={{ marginLeft: 'auto' }} className="export-group">
          <button className="btn btn-ghost btn-sm">CSV</button>
          <button className="btn btn-ghost btn-sm">Excel</button>
          <button className="btn btn-ghost btn-sm">PDF</button>
        </span>
      </div>

      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead>
              <tr>
                <th>No</th><th>Date</th><th>Ref No</th><th>Source</th>
                <th>Description</th><th>Store</th><th>Project</th>
                <th>Staff</th><th style={{width:40}}></th>
              </tr>
            </thead>
            <tbody>
              {DISPATCHES.map(d => (
                <tr key={d.no}>
                  <td data-label="No" className="cell-mono" style={{ color: 'var(--slate-500)' }}>{d.no}</td>
                  <td data-label="Date" style={{ fontSize: 12, color: 'var(--slate-600)', whiteSpace: 'nowrap' }}>{d.date}</td>
                  <td data-label="Ref" className="cell-mono link">{d.ref}</td>
                  <td data-label="Source">{d.src}</td>
                  <td data-label="Item" className="full" style={{ fontWeight: 500 }}>{d.desc}</td>
                  <td data-label="Store"><Badge variant="slate">{d.store}</Badge></td>
                  <td data-label="Project"><a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize: 12.5 }}>{d.project}</a></td>
                  <td data-label="Staff"><div className="av-row"><Avatar name={d.staff}/><span style={{fontSize:12.5}}>{d.staff}</span></div></td>
                  <td className="actions">
                    <RowMenu items={[
                      { icon: 'eye', label: 'View PDF receipt' },
                      { icon: 'download', label: 'Download record' },
                      ...(d.returnable ? [{ divider: true }, { icon: 'refresh', label: 'Return Stock', danger: false }] : [])
                    ]}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={247}/>
      </div>
    </>
  );
};

window.Stock = Stock;
