// ===== PROJECTS / BOOKINGS =====
const BOOKINGS = [
  { no: "P-1042", start: "01 May 2026", area: "Sandton", customer: "Orion Group", desc: "40 Kiaat Ave — roof waterproofing", foreman: "Kagiso Molefe", rep: "Ethan Jacobs", status: "Scheduled", days: 8, complete: 0 },
  { no: "P-1041", start: "02 May 2026", area: "Johannesburg", customer: "Riverside Sports", desc: "Riverside College Hockey Pavilion rebuild", foreman: "Sizwe Maseko", rep: "Ethan Jacobs", status: "Scheduled", days: 14, complete: 0 },
  { no: "P-1040", start: "28 Apr 2026", area: "Cape Town", customer: "Highlands Estates", desc: "Highlands Block C — balcony membrane", foreman: "Johan Fourie", rep: "Zanele Sibiya", status: "In Progress", days: 10, complete: 35 },
  { no: "P-1039", start: "26 Apr 2026", area: "Pretoria", customer: "Meridian Holdings", desc: "Parking deck membrane", foreman: "Kagiso Molefe", rep: "Zanele Sibiya", status: "In Progress", days: 12, complete: 60 },
  { no: "P-1038", start: "20 Apr 2026", area: "Mpumalanga", customer: "Fish Eagle Lodge", desc: "Pool deck and surrounds", foreman: "Johan Fourie", rep: "Johan Fourie", status: "Delayed", days: 6, complete: 45 },
  { no: "P-1037", start: "05 May 2026", area: "Fourways", customer: "Meridian Holdings", desc: "9 Meridian Close — full pkg", foreman: null, rep: "Johan Fourie", status: "Scheduled", days: 7, complete: 0 },
  { no: "P-1036", start: "06 May 2026", area: "Cape Town", customer: "Oakwood Schools", desc: "OW Primary — hall ceiling", foreman: null, rep: "Ethan Jacobs", status: "Scheduled", days: 4, complete: 0 },
  { no: "P-1035", start: "15 Apr 2026", area: "Johannesburg", customer: "Jacaranda Property", desc: "Block 4 damp inspection", foreman: "Sizwe Maseko", rep: "Zanele Sibiya", status: "Completed", days: 3, complete: 100 }
];

const Projects = () => {
  const [view, setView] = React.useState('list');
  return (
    <>
      <PageHeader
        title="Project Bookings"
        sub="5 active bookings"
        actions={<>
          <span className="seg">
            <button className={view==='list'?'active':''} onClick={() => setView('list')}><Icon name="list" size={12}/> List</button>
            <button className={view==='cal'?'active':''} onClick={() => setView('cal')}><Icon name="calendar" size={12}/> Calendar</button>
          </span>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> New Booking</button>
        </>}
      />

      <div className="subtabs">
        <button className="subtab">Active Projects</button>
        <button className="subtab active">Bookings</button>
        <button className="subtab">Bookings Report</button>
        <button className="subtab">Calendar</button>
      </div>

      <div className="mini-stats">
        <div className="mini-stat"><div className="lbl">Active</div><div className="v">14</div></div>
        <div className="mini-stat"><div className="lbl">Starting this week</div><div className="v">5</div></div>
        <div className="mini-stat" style={{ borderColor: '#FCD34D' }}><div className="lbl">Awaiting Foreman</div><div className="v" style={{ color: '#B45309' }}>2</div></div>
        <div className="mini-stat"><div className="lbl">Completed this month</div><div className="v">31</div></div>
      </div>

      {view === 'list' ? (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="data responsive-table">
              <thead>
                <tr>
                  <th>Project No</th><th>Start Date</th><th>Customer</th>
                  <th>Description</th><th>Area</th>
                  <th>Foreman</th><th>Sales Rep</th><th>Status</th>
                  <th>Completion</th><th style={{width:40}}></th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map(b => (
                  <tr key={b.no}>
                    <td data-label="No" className="cell-mono link">{b.no}</td>
                    <td data-label="Start">{b.start}</td>
                    <td data-label="Customer" className="cell-bold full">{b.customer}</td>
                    <td data-label="Desc" style={{ color: 'var(--slate-700)' }}>{b.desc}</td>
                    <td data-label="Area" style={{ color: 'var(--slate-600)' }}>{b.area}</td>
                    <td data-label="Foreman">{b.foreman ? (
                      <div className="av-row"><Avatar name={b.foreman}/><span style={{fontSize:12.5}}>{b.foreman}</span></div>
                    ) : <Badge variant="amber">Awaiting</Badge>}</td>
                    <td data-label="Rep" style={{ color: 'var(--slate-600)' }}>{b.rep}</td>
                    <td data-label="Status"><StatusBadge status={b.status}/></td>
                    <td data-label="Completion">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                        <div style={{ width: 60, height: 6, background: 'var(--slate-100)', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ width: b.complete + '%', height: '100%', background: b.complete===100?'var(--emerald)':'var(--sky)' }}/>
                        </div>
                        <span className="mono" style={{ color: 'var(--slate-600)' }}>{b.complete}% · {b.days}d</span>
                      </div>
                    </td>
                    <td className="actions">
                      <RowMenu items={[{icon:'eye',label:'Open'},{icon:'pencil',label:'Edit'},{icon:'user',label:'Reassign Foreman'}]}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>May 2026</h3>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="row-actions-btn"><Icon name="chevron-left" size={14}/></button>
              <button className="row-actions-btn"><Icon name="chevron-right" size={14}/></button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} style={{ background: 'var(--slate-50)', padding: '6px 10px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--slate-500)' }}>{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3; // start Thu May 1
              const showDay = day >= 1 && day <= 31;
              const events = [];
              if (day === 1) events.push({ c: 'Orion · 40 Kiaat', color: '#0EA5E9', span: 6 });
              if (day === 2) events.push({ c: 'Riverside Hockey', color: '#10B981', span: 5 });
              if (day === 5) events.push({ c: 'Meridian Close', color: '#8B5CF6', span: 3 });
              if (day === 6) events.push({ c: 'OW Primary', color: '#F59E0B', span: 2 });
              if (day === 13) events.push({ c: 'Thembeka New Build', color: '#0EA5E9', span: 7 });
              if (day === 19) events.push({ c: 'Jacaranda Block 4', color: '#10B981', span: 3 });
              return (
                <div key={i} style={{ background: 'white', minHeight: 88, padding: 6, position: 'relative' }}>
                  <div style={{ fontSize: 11, color: showDay ? 'var(--slate-600)' : 'var(--slate-300)', marginBottom: 4 }}>{showDay ? day : ''}</div>
                  {events.map((e,j) => (
                    <div key={j} style={{ background: e.color, color: 'white', fontSize: 10, padding: '3px 6px', borderRadius: 4, marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{e.c}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

window.Projects = Projects;
