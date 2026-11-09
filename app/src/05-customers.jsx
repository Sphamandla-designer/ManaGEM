// ===== CUSTOMERS LIST =====
const CUSTOMERS = [
  { code: "C-1042", name: "Orion Property Group (Pty) Ltd", type: "Credit", status: "Active", sage: "ORN001", contact: "Palesa Radebe", phone: "+27 11 000 0100" },
  { code: "C-1041", name: "Highlands Estates", type: "Credit", status: "Active", sage: "HIL001", contact: "Dean Botha", phone: "+27 21 000 0101" },
  { code: "C-1040", name: "Riverside Sports", type: "Credit", status: "Active", sage: "RBH002", contact: "Coach P. Govender", phone: "+27 31 000 0102" },
  { code: "C-1039", name: "Oakwood Primary School", type: "Cash", status: "Active", sage: "GPS001", contact: "Mrs. L. Jansen", phone: "+27 21 000 0103" },
  { code: "C-1038", name: "Fish Eagle Lodge", type: "Cash", status: "Active", sage: "BCL003", contact: "Lwazi Cele", phone: "+27 13 000 0104" },
  { code: "C-1037", name: "Meridian Holdings", type: "Credit", status: "Active", sage: "VST004", contact: "Nicole Baloyi", phone: "+27 11 000 0105" },
  { code: "C-1036", name: "Seaview Body Corporate", type: "Credit", status: "Dormant", sage: "WCC011", contact: "—", phone: "—" },
  { code: "C-1035", name: "Thembeka Construct CC", type: "Cash", status: "Active", sage: "MZN007", contact: "Bongani Zulu", phone: "+27 11 000 0106" },
  { code: "C-1034", name: "Jacaranda Property Trust", type: "Credit", status: "Active", sage: "LPT008", contact: "Fatima Isaacs", phone: "+27 12 000 0107" },
  { code: "C-1033", name: "Harbour Line Yachts", type: "Cash", status: "Dormant", sage: "—", contact: "—", phone: "—" }
];

const Customers = ({ onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [chips, setChips] = React.useState([{ label: 'Type', value: 'Credit' }, { label: 'Status', value: 'Active' }]);
  const [selected, setSelected] = React.useState(new Set());
  const filtered = CUSTOMERS.filter(c =>
    !search || (c.name + c.code + c.contact).toLowerCase().includes(search.toLowerCase())
  );
  const toggle = (code) => {
    const n = new Set(selected); n.has(code) ? n.delete(code) : n.add(code); setSelected(n);
  };
  const allSel = filtered.length > 0 && filtered.every(c => selected.has(c.code));
  const toggleAll = () => {
    setSelected(allSel ? new Set() : new Set(filtered.map(c => c.code)));
  };

  return (
    <>
      <PageHeader
        title="Customers"
        sub="243 customers total"
        actions={<>
          <button className="btn btn-secondary"><Icon name="refresh" size={14}/> Import from SageOne</button>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> New Customer</button>
        </>}
      />
      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={chips}
        onChipRemove={(i) => setChips(chips.filter((_,idx)=>idx!==i))}
        onAddFilter={() => setChips([...chips, { label: 'Area', value: 'Gauteng' }])}
      />
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="data responsive-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}><Checkbox checked={allSel} onChange={toggleAll}/></th>
                <th className="sortable">Code</th>
                <th className="sortable">Name</th>
                <th>Account Type</th>
                <th>Status</th>
                <th>Sage Link</th>
                <th>Primary Contact</th>
                <th>Phone</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.code} className={selected.has(c.code) ? 'selected' : ''} onClick={() => onNavigate('customer-detail')} style={{ cursor: 'pointer' }}>
                  <td onClick={(e)=>e.stopPropagation()}><Checkbox checked={selected.has(c.code)} onChange={() => toggle(c.code)}/></td>
                  <td data-label="Code" className="cell-mono">{c.code}</td>
                  <td data-label="Name" className="cell-bold full">{c.name}</td>
                  <td data-label="Type"><span className={`badge badge-${c.type==='Credit'?'sky':'slate'}`} style={{textTransform:'none', letterSpacing:0}}>{c.type}</span></td>
                  <td data-label="Status"><StatusBadge status={c.status}/></td>
                  <td data-label="Sage">{c.sage !== '—' ? <a href="#" onClick={(e)=>e.preventDefault()}>{c.sage}</a> : <span style={{color:'var(--slate-400)'}}>—</span>}</td>
                  <td data-label="Contact">{c.contact}</td>
                  <td data-label="Phone" className="cell-mono">{c.phone}</td>
                  <td className="actions">
                    <RowMenu items={[
                      { icon: 'pencil', label: 'Edit' },
                      { icon: 'eye', label: 'View Details' },
                      { divider: true },
                      { icon: 'trash', label: 'Delete', danger: true }
                    ]}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager total={243} page={1}/>
      </div>
      {selected.size > 0 && (
        <div className={`bulk-bar open`}>
          <span className="ct">{selected.size} customer{selected.size>1?'s':''} selected</span>
          <button className="btn btn-sm danger">Delete Selected</button>
          <button className="btn btn-sm">Export Selected</button>
          <button className="btn btn-sm" onClick={() => setSelected(new Set())}>Cancel</button>
        </div>
      )}
    </>
  );
};

window.Customers = Customers;
