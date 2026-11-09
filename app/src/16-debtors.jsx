// ===== DEBTORS MANAGEMENT (host with sub-tabs) =====

const DEBTORS = [
  { enquiry:'L04/26-124', invoice:'INV-2026-0142', ref:'REF-9842',  customer:'Orion Group',           rep:'Ethan Jacobs',     interactions:5, statement:'May 2026', date:'02 May 2026', aging:'Current',     balance: 425000 },
  { enquiry:'L04/26-119', invoice:'INV-2026-0141', ref:'REF-9841',  customer:'Highlands Estates',     rep:'Zanele Sibiya', interactions:3, statement:'May 2026', date:'28 Apr 2026', aging:'1-30 days',   balance: 132000 },
  { enquiry:'L04/26-108', invoice:'INV-2026-0140', ref:'REF-9840',  customer:'Riverside Sports',         rep:'Ethan Jacobs',     interactions:7, statement:'May 2026', date:'25 Apr 2026', aging:'1-30 days',   balance: 96500  },
  { enquiry:'L04/26-105', invoice:'INV-2026-0139', ref:'REF-9839',  customer:'Meridian Holdings',      rep:'Zanele Sibiya', interactions:2, statement:'May 2026', date:'20 Apr 2026', aging:'1-30 days',   balance: 0      },
  { enquiry:'L04/26-115', invoice:'INV-2026-0138', ref:'REF-9838',  customer:'Oakwood Schools',  rep:'Thabo Ndlovu', interactions:8, statement:'Apr 2026', date:'15 Apr 2026', aging:'31-60 days',  balance: 74500  },
  { enquiry:'L04/26-111', invoice:'INV-2026-0137', ref:'REF-9837',  customer:'Fish Eagle Lodge',    rep:'Johan Fourie',interactions:4, statement:'Apr 2026', date:'10 Apr 2026', aging:'31-60 days',  balance: 0      },
  { enquiry:'L03/26-091', invoice:'INV-2026-0136', ref:'REF-9836',  customer:'Marula Properties',   rep:'Johan Fourie',interactions:11,statement:'Apr 2026', date:'05 Apr 2026', aging:'61-90 days',  balance: 170000 },
  { enquiry:'L03/26-085', invoice:'INV-2026-0135', ref:'REF-9835',  customer:'Summit Holdings',      rep:'Zanele Sibiya', interactions:14,statement:'Mar 2026', date:'01 Apr 2026', aging:'90+ days',    balance: 62000  }
];

const RECEIPTS = [
  { customer:'Orion Group',         bank:'Business cheque — xxxx 4821', doc:'RCT-2026-0184', ref:'EFT 02/05',      total: 425000, unallocated: 0      },
  { customer:'Highlands Estates',   bank:'Business cheque — xxxx 4821', doc:'RCT-2026-0183', ref:'EFT 01/05',      total:  50000, unallocated: 0      },
  { customer:'Meridian Holdings',    bank:'Business cheque — xxxx 4821', doc:'RCT-2026-0182', ref:'EFT 28/04',      total: 215000, unallocated: 0      },
  { customer:'Fish Eagle Lodge',  bank:'Business savings — xxxx 7730',      doc:'RCT-2026-0181', ref:'EFT 25/04',      total: 128000, unallocated: 0      },
  { customer:'Marula Properties', bank:'Business cheque — xxxx 4821', doc:'RCT-2026-0180', ref:'EFT 22/04',      total: 170000, unallocated: 45000  },
  { customer:'Riverside Sports',       bank:'Operating account — xxxx 1904',doc:'RCT-2026-0179', ref:'Cheque 1289',    total:  50000, unallocated: 50000  },
  { customer:'Summit Holdings',    bank:'Business cheque — xxxx 4821', doc:'RCT-2026-0178', ref:'EFT 15/04',      total: 280000, unallocated: 18000  }
];

const STATEMENTS = [
  { customer:'Orion Group',           period:'May 2026', opening: 0,      invoiced: 425000, receipts: 425000, balance: 0,      lastSent:'02 May 2026', method:'Email' },
  { customer:'Highlands Estates',     period:'May 2026', opening: 0,      invoiced: 182000, receipts: 50000,  balance: 132000, lastSent:'28 Apr 2026', method:'Email' },
  { customer:'Riverside Sports',         period:'May 2026', opening: 50000,  invoiced: 96500,  receipts: 50000,  balance: 96500,  lastSent:'01 May 2026', method:'Email' },
  { customer:'Meridian Holdings',      period:'May 2026', opening: 0,      invoiced: 215000, receipts: 215000, balance: 0,      lastSent:'25 Apr 2026', method:'Email' },
  { customer:'Oakwood Schools',  period:'Apr 2026', opening: 0,      invoiced: 74500,  receipts: 0,      balance: 74500,  lastSent:'18 Apr 2026', method:'Email + Post' },
  { customer:'Fish Eagle Lodge',    period:'Apr 2026', opening: 0,      invoiced: 128000, receipts: 128000, balance: 0,      lastSent:'12 Apr 2026', method:'Email' },
  { customer:'Marula Properties',   period:'Apr 2026', opening: 215000, invoiced: 125000, receipts: 170000, balance: 170000, lastSent:'08 Apr 2026', method:'Email' },
  { customer:'Summit Holdings',      period:'Mar 2026', opening: 0,      invoiced: 62000,  receipts: 0,      balance: 62000,  lastSent:'05 Apr 2026', method:'Email' }
];

const DEBT_FORMAT = (n) => 'R ' + n.toLocaleString('en-ZA');

const Debtors = ({ tab = 'debtors', onNavigate }) => {
  const [search, setSearch] = React.useState('');
  const [period, setPeriod] = React.useState({ kind: 'preset', preset: 'month' });

  const totalOutstanding = DEBTORS.reduce((s,d) => s+d.balance, 0);
  const overdue = DEBTORS.filter(d => d.aging !== 'Current' && d.balance > 0).reduce((s,d) => s+d.balance, 0);
  const totalUnallocated = RECEIPTS.reduce((s,r) => s+r.unallocated, 0);

  const subTabs = [
    { id:'debtors',    label:'Debtors Management',  route:'debtors',            ct: DEBTORS.filter(d=>d.balance>0).length },
    { id:'receipts',   label:'Customer Receipts',   route:'debtors-receipts',   ct: RECEIPTS.length },
    { id:'statements', label:'Customer Statements', route:'debtors-statements', ct: STATEMENTS.length }
  ];

  const title = tab === 'receipts' ? 'Customer Receipts'
              : tab === 'statements' ? 'Customer Statements'
              : 'Debtors Management';
  const sub = tab === 'receipts' ? 'Payments received from customers'
            : tab === 'statements' ? 'Account statements sent to customers'
            : 'Open invoices and aging by customer';

  const primaryAction = tab === 'receipts'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('receipt-new')}><Icon name="plus" size={14}/> Record Receipt</button>
    : tab === 'statements'
    ? <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('statement-new')}><Icon name="send" size={14}/> Generate Statements</button>
    : <button className="btn btn-primary" onClick={()=>onNavigate&&onNavigate('debtor-new')}><Icon name="plus" size={14}/> Log Interaction</button>;

  const agingColor = (a) =>
    a === 'Current' ? 'emerald'
    : a === '1-30 days' ? 'sky'
    : a === '31-60 days' ? 'amber'
    : a === '61-90 days' ? 'red'
    : 'red';

  return (
    <>
      <PageHeader title={title} sub={sub}
        actions={<>
          <button className="btn btn-secondary"><Icon name="download" size={14}/> Export</button>
          {primaryAction}
        </>}/>

      {/* KPI summary */}
      <div className="kpi-grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:16}}>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--sky-light)',color:'var(--sky)'}}><Icon name="credit-card" size={16}/></div><div className="kpi-label">Total Outstanding</div><div className="kpi-value">{DEBT_FORMAT(totalOutstanding)}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--red-light)',color:'var(--red)'}}><Icon name="alert-triangle" size={16}/></div><div className="kpi-label">Overdue</div><div className="kpi-value">{DEBT_FORMAT(overdue)}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--amber-light)',color:'var(--amber)'}}><Icon name="clock" size={16}/></div><div className="kpi-label">Unallocated Receipts</div><div className="kpi-value">{DEBT_FORMAT(totalUnallocated)}</div></div>
        <div className="kpi"><div className="kpi-icon" style={{background:'var(--emerald-light)',color:'var(--emerald)'}}><Icon name="check" size={16}/></div><div className="kpi-label">Statements Sent</div><div className="kpi-value">{STATEMENTS.length}</div></div>
      </div>

      <div className="subtabs" style={{marginBottom:14}}>
        {subTabs.map(t => (
          <button key={t.id} className={`subtab${tab===t.id?' active':''}`} onClick={() => onNavigate && onNavigate(t.route)}>
            {t.label} <span className="ct">{t.ct}</span>
          </button>
        ))}
      </div>

      <FilterToolbar
        search={search} setSearch={setSearch}
        chips={tab === 'debtors'
          ? [{label:'Aging',value:'All'},{label:'Sales Rep',value:'All'},{label:'Customer',value:'All'}]
          : tab === 'receipts'
          ? [{label:'Bank',value:'All'},{label:'Customer',value:'All'}]
          : [{label:'Period',value:'All'},{label:'Method',value:'All'}]}
        onChipRemove={()=>{}}
        extra={<DateRangePicker value={period} onChange={setPeriod}/>}/>

      {/* DEBTORS TABLE */}
      {tab === 'debtors' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead><tr>
                <th>Enquiry</th><th>Invoice No</th><th>Ref No</th><th>Customer</th><th>Sales Rep</th>
                <th style={{textAlign:'center'}}>Interactions</th><th>Statement</th><th>Date</th>
                <th>Aging</th><th style={{textAlign:'right'}}>Balance</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {DEBTORS.filter(d => !search || (d.enquiry+d.invoice+d.customer+d.rep).toLowerCase().includes(search.toLowerCase())).map((d,i) => (
                  <tr key={i}>
                    <td data-label="Enquiry" className="cell-mono link">{d.enquiry}</td>
                    <td data-label="Invoice" className="cell-mono link" style={{fontWeight:600}}>{d.invoice}</td>
                    <td data-label="Ref" className="cell-mono">{d.ref}</td>
                    <td data-label="Customer" className="full" style={{fontWeight:600}}>{d.customer}</td>
                    <td data-label="Rep" style={{fontSize:12.5}}>
                      <div className="av-row"><Avatar name={d.rep} size={22}/><span>{d.rep}</span></div>
                    </td>
                    <td data-label="Interactions" style={{textAlign:'center'}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:4, fontSize:12, color:'var(--slate-700)', padding:'2px 8px', background:'var(--slate-100)', borderRadius:999, fontWeight:600}}>
                        <Icon name="mail" size={10}/> {d.interactions}
                      </span>
                    </td>
                    <td data-label="Statement"><Badge variant="sky">{d.statement}</Badge></td>
                    <td data-label="Date" style={{color:'var(--slate-600)', fontSize:12}}>{d.date}</td>
                    <td data-label="Aging"><Badge variant={agingColor(d.aging)}>{d.aging}</Badge></td>
                    <td data-label="Balance" className="cell-num" style={{fontWeight:600, color: d.balance > 0 ? 'var(--text)' : 'var(--slate-400)'}}>
                      {d.balance > 0 ? DEBT_FORMAT(d.balance) : '—'}
                    </td>
                    <td className="actions">
                      <RowMenu items={[
                        { icon:'eye',    label:'View Account' },
                        { icon:'mail',   label:'Log Interaction', onClick: () => onNavigate && onNavigate('debtor-new') },
                        { icon:'file-text', label:'Send Statement' },
                        { icon:'send',   label:'Send Reminder' },
                        { divider:true },
                        { icon:'trash',  label:'Write Off', danger:true }
                      ]}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEIPTS TABLE */}
      {tab === 'receipts' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead><tr>
                <th>Customer</th><th>Bank Account</th><th>Doc No</th><th>Reference</th>
                <th style={{textAlign:'right'}}>Total</th><th style={{textAlign:'right'}}>Unallocated</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {RECEIPTS.filter(r => !search || (r.customer+r.bank+r.doc+r.ref).toLowerCase().includes(search.toLowerCase())).map((r,i) => (
                  <tr key={i}>
                    <td data-label="Customer" className="full" style={{fontWeight:600}}>{r.customer}</td>
                    <td data-label="Bank" style={{color:'var(--slate-700)', fontSize:12.5}}>{r.bank}</td>
                    <td data-label="Doc" className="cell-mono link" style={{fontWeight:600}}>{r.doc}</td>
                    <td data-label="Reference" className="cell-mono" style={{fontSize:12}}>{r.ref}</td>
                    <td data-label="Total" className="cell-num" style={{fontWeight:600}}>{DEBT_FORMAT(r.total)}</td>
                    <td data-label="Unallocated" className="cell-num" style={{fontWeight: r.unallocated > 0 ? 600 : 400, color: r.unallocated > 0 ? 'var(--amber)' : 'var(--slate-400)'}}>
                      {r.unallocated > 0 ? DEBT_FORMAT(r.unallocated) : '—'}
                    </td>
                    <td className="actions">
                      <RowMenu items={[
                        { icon:'eye',    label:'View Receipt' },
                        { icon:'pencil', label:'Edit', onClick: () => onNavigate && onNavigate('receipt-edit') },
                        { icon:'check',  label:'Allocate to Invoice' },
                        { icon:'download', label:'Download PDF' },
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

      {/* STATEMENTS TABLE */}
      {tab === 'statements' && (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead><tr>
                <th>Customer</th><th>Period</th>
                <th style={{textAlign:'right'}}>Opening</th>
                <th style={{textAlign:'right'}}>Invoiced</th>
                <th style={{textAlign:'right'}}>Receipts</th>
                <th style={{textAlign:'right'}}>Balance</th>
                <th>Last Sent</th><th>Method</th>
                <th style={{width:40}}></th>
              </tr></thead>
              <tbody>
                {STATEMENTS.filter(s => !search || (s.customer+s.period).toLowerCase().includes(search.toLowerCase())).map((s,i) => (
                  <tr key={i}>
                    <td data-label="Customer" className="full" style={{fontWeight:600}}>{s.customer}</td>
                    <td data-label="Period"><Badge variant="sky">{s.period}</Badge></td>
                    <td data-label="Opening" className="cell-num" style={{color:'var(--slate-600)'}}>{DEBT_FORMAT(s.opening)}</td>
                    <td data-label="Invoiced" className="cell-num" style={{color:'var(--slate-700)'}}>{DEBT_FORMAT(s.invoiced)}</td>
                    <td data-label="Receipts" className="cell-num" style={{color:'var(--emerald)'}}>{s.receipts > 0 ? DEBT_FORMAT(s.receipts) : '—'}</td>
                    <td data-label="Balance" className="cell-num" style={{fontWeight:700, color: s.balance > 0 ? 'var(--red)' : 'var(--emerald)'}}>
                      {DEBT_FORMAT(s.balance)}
                    </td>
                    <td data-label="Sent" style={{color:'var(--slate-600)', fontSize:12}}>{s.lastSent}</td>
                    <td data-label="Method" style={{fontSize:12.5}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:5}}>
                        <Icon name="mail" size={12} style={{color:'var(--slate-500)'}}/>
                        {s.method}
                      </span>
                    </td>
                    <td className="actions">
                      <RowMenu items={[
                        { icon:'eye',    label:'Preview Statement' },
                        { icon:'download', label:'Download PDF' },
                        { icon:'send',   label:'Re-send' },
                        { divider:true },
                        { icon:'pencil', label:'Edit Settings', onClick: () => onNavigate && onNavigate('statement-edit') }
                      ]}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

// ===== DEBTOR INTERACTION FORM =====
const DebtorInteractionForm = ({ onNavigate }) => (
  <>
    <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
      <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('debtors')}>
        <Icon name="arrow-left" size={14}/> Back to Debtors Management
      </button>
    </div>
    <PageHeader title="Log Debtor Interaction" sub="Record a follow-up call, email or note against an outstanding invoice"/>
    <div className="card" style={{padding:24}}>
      <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Interaction Details</h3>
      <div className="field-row">
        <div className="field"><label>Customer *</label>
          <select><option value="">— Select customer —</option>
            {DEBTORS.map(d => <option key={d.invoice}>{d.customer}</option>)}
          </select>
        </div>
        <div className="field"><label>Invoice *</label>
          <select><option value="">— Select invoice —</option>
            {DEBTORS.map(d => <option key={d.invoice}>{d.invoice} — {DEBT_FORMAT(d.balance)}</option>)}
          </select>
        </div>
      </div>
      <div className="field-row">
        <div className="field"><label>Interaction Type *</label>
          <select><option>Phone Call</option><option>Email</option><option>SMS / WhatsApp</option><option>Site Visit</option><option>Letter</option></select>
        </div>
        <div className="field"><label>Date *</label><input type="date" defaultValue="2026-05-26"/></div>
      </div>
      <div className="field-row">
        <div className="field"><label>Outcome</label>
          <select><option>Promise to Pay</option><option>Dispute Raised</option><option>No Answer</option><option>Partial Payment Agreed</option><option>Escalated</option></select>
        </div>
        <div className="field"><label>Follow-up Date</label><input type="date"/></div>
      </div>
      <div className="field">
        <label>Notes</label>
        <textarea rows={5} placeholder="Detail what was discussed, payment commitments, next steps..."/>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
        <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('debtors')}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('debtors')}>
          <Icon name="check" size={14}/> Save Interaction
        </button>
      </div>
    </div>
  </>
);

// ===== CUSTOMER RECEIPT FORM =====
const ReceiptForm = ({ mode = 'new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('debtors-receipts')}>
          <Icon name="arrow-left" size={14}/> Back to Customer Receipts
        </button>
        {isEdit && <span className="mono" style={{fontSize:14, fontWeight:600}}>RCT-2026-0184</span>}
      </div>
      <PageHeader title={isEdit ? 'Edit Customer Receipt' : 'Record Customer Receipt'}
        sub={isEdit ? 'Update or re-allocate this payment.' : 'Capture a payment received from a customer.'}/>
      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Receipt Details</h3>
        <div className="field-row">
          <div className="field"><label>Customer *</label>
            <select><option value="">— Select customer —</option>
              {Array.from(new Set(DEBTORS.map(d=>d.customer))).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field"><label>Bank Account *</label>
            <select>
              <option>Business cheque — xxxx 4821</option>
              <option>Business savings — xxxx 7730</option>
              <option>Operating account — xxxx 1904</option>
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Doc No</label><input defaultValue={isEdit ? 'RCT-2026-0184' : '(auto-generated)'} disabled/></div>
          <div className="field"><label>Reference *</label><input placeholder="e.g. EFT 26/05 or Cheque 1289"/></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Receipt Date *</label><input type="date" defaultValue="2026-05-26"/></div>
          <div className="field"><label>Payment Method</label>
            <select><option>EFT</option><option>Cheque</option><option>Cash</option><option>Card</option></select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Total Amount (R) *</label><input type="number" defaultValue={isEdit ? '425000' : ''} placeholder="0.00"/></div>
          <div className="field"><label>Allocated To Invoice</label>
            <select><option value="">— Unallocated —</option>
              {DEBTORS.filter(d=>d.balance>0).map(d => <option key={d.invoice}>{d.invoice} ({DEBT_FORMAT(d.balance)})</option>)}
            </select>
          </div>
        </div>
        <div className="field" style={{margin:0}}>
          <label>Notes</label>
          <textarea rows={3} placeholder="Any context about this payment..."/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('debtors-receipts')}>Cancel</button>
            {isEdit && <button className="btn btn-secondary" style={{color:'var(--red)', borderColor:'#FECACA'}}>
              <Icon name="trash" size={14}/> Delete
            </button>}
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('debtors-receipts')}>
            <Icon name="check" size={14}/> {isEdit ? 'Save Changes' : 'Save Receipt'}
          </button>
        </div>
      </div>
    </>
  );
};

// ===== CUSTOMER STATEMENT (generate / settings) =====
const StatementForm = ({ mode = 'new', onNavigate }) => {
  const isEdit = mode === 'edit';
  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:16, flexWrap:'wrap'}}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('debtors-statements')}>
          <Icon name="arrow-left" size={14}/> Back to Customer Statements
        </button>
      </div>
      <PageHeader
        title={isEdit ? 'Statement Settings' : 'Generate Customer Statements'}
        sub={isEdit ? 'Edit delivery preferences for this customer.' : 'Send account statements to one or more customers.'}/>
      <div className="card" style={{padding:24}}>
        <h3 style={{margin:'0 0 16px', fontSize:14, color:'var(--slate-700)'}}>Statement Settings</h3>
        <div className="field-row">
          <div className="field"><label>Customers *</label>
            <select>
              <option>All customers with open balances</option>
              <option>Overdue only (30+ days)</option>
              <option>Selected customers...</option>
            </select>
          </div>
          <div className="field"><label>Period *</label>
            <select defaultValue="May 2026">
              <option>May 2026</option><option>Apr 2026</option><option>Mar 2026</option>
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>As at Date *</label><input type="date" defaultValue="2026-05-31"/></div>
          <div className="field"><label>Delivery Method *</label>
            <select><option>Email (PDF)</option><option>Email + Post</option><option>Download only</option></select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Template</label>
            <select><option>Ridgeway Standard Statement</option><option>Detailed (line items)</option><option>Summary only</option></select>
          </div>
          <div className="field"><label>From</label>
            <input defaultValue="accounts@ridgeway.example"/>
          </div>
        </div>
        <div className="field">
          <label>Email Subject</label>
          <input defaultValue="Your statement from Ridgeway Waterproofing"/>
        </div>
        <div className="field">
          <label>Email Body</label>
          <textarea rows={4} defaultValue="Hi, please find your account statement attached for the period ending {as_at_date}. Please contact us if you have any queries."/>
        </div>
        <div className="field" style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:0, padding:'12px 14px', background:'var(--slate-50)', border:'1px solid var(--border)', borderRadius:8}}>
          <div>
            <label style={{margin:0, fontWeight:500}}>Include zero-balance accounts</label>
            <div style={{fontSize:11.5, color:'var(--slate-500)', marginTop:2}}>Send statements even when there is nothing outstanding.</div>
          </div>
          <Toggle on={false}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', gap:8, marginTop:24, paddingTop:18, borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-ghost" onClick={() => onNavigate && onNavigate('debtors-statements')}>Cancel</button>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-secondary"><Icon name="eye" size={14}/> Preview</button>
            <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('debtors-statements')}>
              <Icon name="send" size={14}/> {isEdit ? 'Save Settings' : 'Generate & Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Debtors, DebtorInteractionForm, ReceiptForm, StatementForm });
