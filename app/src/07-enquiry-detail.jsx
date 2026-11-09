// ===== ENQUIRY DETAIL =====
const EnquiryDetail = ({ onNavigate }) => {
  const [editing, setEditing] = React.useState(false);
  const lineItems = [
    { d: "Site inspection & moisture testing", q: 1, u: "ea", p: 2500, t: 2500 },
    { d: "Acrylic waterproofing membrane (Block A)", q: 240, u: "m²", p: 285, t: 68400 },
    { d: "Acrylic waterproofing membrane (Block B)", q: 180, u: "m²", p: 285, t: 51300 },
    { d: "Galvanised flashings to parapet edges", q: 56, u: "m", p: 320, t: 17920 },
    { d: "Site cleaning & removal", q: 1, u: "ea", p: 4500, t: 4500 }
  ];
  const subtotal = lineItems.reduce((a,x)=>a+x.t,0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const fmt = (n) => "R " + n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('enquiries')}>
          <Icon name="arrow-left" size={14}/> Back to Enquiries
        </button>
        <span className="mono" style={{ fontSize: 14, fontWeight: 600 }}>L04/26-124</span>
        <StatusBadge status="Deposit Paid"/>
        <TypeBadge type="Repeat Customer"/>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-secondary"><Icon name="file-text" size={14}/> Generate Quote PDF</button>
          <button className="btn btn-primary" onClick={() => setEditing(!editing)}>
            <Icon name="pencil" size={14}/> {editing ? 'Done editing' : 'Edit Enquiry'}
          </button>
        </span>
      </div>

      <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card card-pad">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', fontWeight: 600 }}>Enquiry</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 600, marginTop: 2 }}>L04/26-124</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>Quote: Q-2603</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px 18px', fontSize: 12 }}>
                <span style={{ color: 'var(--slate-500)' }}>Created</span><span>15 Apr 2026 · 10:24</span>
                <span style={{ color: 'var(--slate-500)' }}>Last update</span><span>29 Apr 2026 · 14:08</span>
                <span style={{ color: 'var(--slate-500)' }}>Subject</span><span>Roof waterproofing — block A & B</span>
                <span style={{ color: 'var(--slate-500)' }}>Area</span><span>Sandton, Gauteng</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd"><h3>Customer Information</h3><a href="#" onClick={(e)=>e.preventDefault()}>View record →</a></div>
            <div className="card-pad" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', fontSize: 13 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Customer</div>
                <a href="#" onClick={(e)=>e.preventDefault()} style={{ fontSize: 14, fontWeight: 600 }}>Orion Property Group (Pty) Ltd</a>
                <div className="mono" style={{ fontSize: 11.5, color: 'var(--slate-500)', marginTop: 2 }}>C-1042 · Sage: ORN001</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Primary contact</div>
                <div style={{ fontWeight: 500, marginTop: 2 }}>Palesa Radebe</div>
                <div style={{ color: 'var(--slate-600)', fontSize: 12 }}>+27 11 000 0100 · palesa@oriongroup.example</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd">
              <h3>Quote Line Items</h3>
              <button className="btn btn-secondary btn-sm"><Icon name="plus" size={12}/> Add Line Item</button>
            </div>
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th style={{ width: 30 }}>#</th>
                    <th>Description</th>
                    <th style={{ width: 60, textAlign: 'right' }}>Qty</th>
                    <th style={{ width: 50 }}>Unit</th>
                    <th style={{ width: 110, textAlign: 'right' }}>Unit Price</th>
                    <th style={{ width: 130, textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((l,i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--slate-500)' }}>{i+1}</td>
                      <td>{l.d}</td>
                      <td className="cell-num">{l.q}</td>
                      <td style={{ color: 'var(--slate-500)' }}>{l.u}</td>
                      <td className="cell-num">{fmt(l.p)}</td>
                      <td className="cell-num" style={{ fontWeight: 600 }}>{fmt(l.t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ minWidth: 240, display: 'grid', gridTemplateColumns: '1fr auto', gap: '6px 24px', fontSize: 13 }}>
                <span style={{ color: 'var(--slate-500)' }}>Subtotal</span><span className="mono">{fmt(subtotal)}</span>
                <span style={{ color: 'var(--slate-500)' }}>VAT (15%)</span><span className="mono">{fmt(vat)}</span>
                <span style={{ fontWeight: 600, fontSize: 14, paddingTop: 6, borderTop: '1px solid var(--border)' }}>Grand Total</span>
                <span className="mono" style={{ fontWeight: 700, fontSize: 14, paddingTop: 6, borderTop: '1px solid var(--border)' }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd"><h3>Inspection Notes</h3></div>
            <div className="card-pad">
              <div className="field-row">
                <div className="field"><label>Inspection date</label><input defaultValue="2026-04-12" type="date" disabled={!editing}/></div>
                <div className="field"><label>Assigned inspector</label><select disabled={!editing}><option>Sizwe Maseko</option><option>Johan Botha</option></select></div>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Notes</label>
                <textarea rows={4} disabled={!editing} defaultValue="Existing acrylic membrane has failed at the parapet flashings. Standing water present in two low points. Recommend full strip-and-replace on Block A & B with new galvanised counter-flashings and improved fall to outlets."/>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-hd"><h3>Quick Actions</h3></div>
            <div className="card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-primary" style={{ justifyContent: 'center' }}><Icon name="send" size={14}/> Send to Customer</button>
              <button className="btn btn-secondary" style={{ justifyContent: 'center' }}><Icon name="file-text" size={14}/> Create Invoice</button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-emerald" style={{ flex: 1, justifyContent: 'center' }}><Icon name="check" size={14}/> Mark Won</button>
                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', color: 'var(--red)', borderColor: '#FECACA' }}><Icon name="x" size={14}/> Mark Lost</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd"><h3>Timeline</h3></div>
            <div className="card-pad">
              <div className="timeline">
                <div className="tl-event">
                  <div className="tl-meta">29 Apr 2026 · Ethan Jacobs</div>
                  <div className="tl-text">Deposit received — R 24,000</div>
                </div>
                <div className="tl-event">
                  <div className="tl-meta">22 Apr 2026 · Ethan Jacobs</div>
                  <div className="tl-text">Quote Q-2603 sent to customer</div>
                </div>
                <div className="tl-event">
                  <div className="tl-meta">12 Apr 2026 · Sizwe Maseko</div>
                  <div className="tl-text">Site inspection completed</div>
                </div>
                <div className="tl-event">
                  <div className="tl-meta">15 Apr 2026 · System</div>
                  <div className="tl-text">Enquiry created</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <input placeholder="Add a note…" style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 7 }}/>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-hd"><h3>Documents</h3><button className="row-actions-btn"><Icon name="upload" size={14}/></button></div>
            <div style={{ padding: '6px 0' }}>
              {[
                { n: "Quote-Q2603.pdf", s: "284 KB" },
                { n: "Site-photos-12Apr.zip", s: "8.4 MB" },
                { n: "Inspection-report.pdf", s: "1.2 MB" }
              ].map((d,i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', fontSize: 12.5 }}>
                  <Icon name="file-text" size={14} style={{ color: 'var(--slate-500)' }}/>
                  <span style={{ flex: 1 }}>{d.n}</span>
                  <span style={{ color: 'var(--slate-500)' }}>{d.s}</span>
                  <button className="row-actions-btn"><Icon name="download" size={12}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

window.EnquiryDetail = EnquiryDetail;
