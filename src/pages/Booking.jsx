import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { programs } from '../data/programs.js';
import { useBooking } from '../context/BookingContext.jsx';

const initial = { alias: '', experience: 'Beginner', startDate: '', focus: 'General fitness', notes: '' };
export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setBooking } = useBooking();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(params.get('program') || '');
  const selected = programs.find((p) => p.id === selectedId);
  const deposit = useMemo(() => selected ? Math.round(selected.price * 0.1) : 0, [selected]);
  const update = (field, value) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: '' })); };
  const validate = () => {
    const next = {};
    if (!form.alias.trim() || form.alias.trim().length < 2 || form.alias.trim().length > 24) next.alias = 'Use a demo nickname between 2 and 24 characters.';
    if (!form.startDate) next.startDate = 'Choose a preferred start date.';
    else if (form.startDate < new Date().toISOString().slice(0, 10)) next.startDate = 'Choose today or a future date.';
    if (!selected) next.program = 'Choose a programme before continuing.';
    if (selected && selected.seats < 1) next.program = 'This programme is full. Please choose another.';
    const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    if (selected && rank[form.experience] < rank[selected.level]) next.experience = `${selected.level} experience is required for this programme.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setBooking({ ...form, alias: form.alias.trim(), programId: selected.id, programName: selected.name, price: selected.price, deposit, reference: `RR-${Date.now().toString().slice(-7)}` });
    navigate('/confirmation');
  };
  return <section className="booking-page">
    <Link to="/programs" className="back-link"><ArrowLeft size={15} /> Back to programmes</Link>
    <div className="booking-heading"><div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT STEP</div><h1>Make it<br /><em>official.</em></h1><p>Choose a programme and set a few demo preferences. This is a local prototype — no payment, account or real reservation will be made.</p></div>
    <div className="booking-layout">
      <form className="booking-form" onSubmit={submit} noValidate>
        <div className="form-section-title"><span>01</span><h2>Demo preferences</h2></div>
        <div className="field-grid">
          <label className="field full"><span>Booking nickname *</span><input value={form.alias} onChange={(e) => update('alias', e.target.value)} maxLength="24" aria-invalid={!!errors.alias} aria-describedby={errors.alias ? 'alias-error' : undefined} placeholder="e.g. FitStarter (not your real name)" />{errors.alias && <small id="alias-error" className="field-error">{errors.alias}</small>}</label>
          <label className="field full"><span>Select a programme *</span><select value={selectedId} onChange={(e) => { setSelectedId(e.target.value); setErrors((v) => ({ ...v, program: '' })); }}><option value="">Choose a programme</option>{programs.map((p) => <option key={p.id} value={p.id}>{p.name} — PKR {p.price.toLocaleString('en-PK')}</option>)}</select>{errors.program && <small className="field-error">{errors.program}</small>}</label>
          <label className="field"><span>Your experience level *</span><select value={form.experience} onChange={(e) => update('experience', e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>{errors.experience && <small className="field-error">{errors.experience}</small>}</label>
          <label className="field"><span>Preferred start date *</span><input type="date" value={form.startDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => update('startDate', e.target.value)} aria-invalid={!!errors.startDate} />{errors.startDate && <small className="field-error">{errors.startDate}</small>}</label>
          <label className="field full"><span>Primary focus</span><select value={form.focus} onChange={(e) => update('focus', e.target.value)}><option>General fitness</option><option>Strength</option><option>Conditioning</option><option>Mobility</option><option>Performance</option></select></label>
          <label className="field full"><span>Optional demo note <i>(no personal or health details)</i></span><textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} maxLength={120} placeholder="A short note about preferred training times…" rows="3" /></label>
        </div>
        <button className="button button-lime submit-button" type="submit">Review demo booking <ArrowUpRight size={17} /></button>
        <p className="form-footnote"><ShieldCheck size={14} /> Demo only. Do not enter your real name, contact details or health information.</p>
      </form>
      <aside className="booking-summary"><div className="summary-top"><span>YOUR SUMMARY</span><span>02 / 02</span></div><h2>Keep it<br /><em>simple.</em></h2>{selected ? <><div className="summary-program"><span>{selected.category} / {selected.level}</span><strong>{selected.name}</strong><small>{selected.duration} · {selected.sessions} sessions / week</small></div><div className="summary-line"><span>Programme price</span><strong>PKR {selected.price.toLocaleString('en-PK')}</strong></div><div className="summary-line"><span>Demo deposit (10%)</span><strong>PKR {deposit.toLocaleString('en-PK')}</strong></div><div className="summary-total"><span>Amount shown today</span><strong>PKR {deposit.toLocaleString('en-PK')}</strong></div><p className="summary-disclaimer">The deposit is a calculated example only. No charge or real booking occurs.</p></> : <div className="summary-empty"><span>↗</span><p>Select a programme to see its price and deposit summary.</p></div>}<div className="summary-perks"><div><Check size={15} /> Clear programme details</div><div><Check size={15} /> Transparent demo pricing</div><div><Check size={15} /> No payment required</div></div></aside>
    </div>
  </section>;
}