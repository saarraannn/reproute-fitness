import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { programs } from '../data/programs.js';
import { useBooking } from '../context/BookingContext.jsx';

const initial = { fullName: '', email: '', experience: 'Beginner', startDate: '', notes: '' };
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
    if (!form.fullName.trim() || form.fullName.trim().length < 2) next.fullName = 'Enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.startDate) next.startDate = 'Choose a preferred start date.';
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
    setBooking({ ...form, programId: selected.id, programName: selected.name, price: selected.price, deposit, reference: `RR-${Date.now().toString().slice(-7)}` });
    navigate('/confirmation');
  };
  return <section className="booking-page">
    <Link to="/programs" className="back-link"><ArrowLeft size={15} /> Back to programmes</Link>
    <div className="booking-heading"><div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT STEP</div><h1>Make it<br /><em>official.</em></h1><p>Tell us a little about your booking. This is a local demo form — no payment or real reservation will be made.</p></div>
    <div className="booking-layout">
      <form className="booking-form" onSubmit={submit} noValidate>
        <div className="form-section-title"><span>01</span><h2>Your details</h2></div>
        <div className="field-grid">
          <label className="field full"><span>Full name *</span><input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'name-error' : undefined} placeholder="e.g. Sameer Hussain" />{errors.fullName && <small id="name-error" className="field-error">{errors.fullName}</small>}</label>
          <label className="field full"><span>Email address *</span><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</label>
        </div>
        <div className="form-section-title"><span>02</span><h2>Programme & experience</h2></div>
        <div className="field-grid">
          <label className="field full"><span>Select a programme *</span><select value={selectedId} onChange={(e) => { setSelectedId(e.target.value); setErrors((v) => ({ ...v, program: '' })); }}><option value="">Choose a programme</option>{programs.map((p) => <option key={p.id} value={p.id}>{p.name} — PKR {p.price.toLocaleString('en-PK')}</option>)}</select>{errors.program && <small className="field-error">{errors.program}</small>}</label>
          <label className="field"><span>Your experience level *</span><select value={form.experience} onChange={(e) => update('experience', e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>{errors.experience && <small className="field-error">{errors.experience}</small>}</label>
          <label className="field"><span>Preferred start date *</span><input type="date" value={form.startDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => update('startDate', e.target.value)} aria-invalid={!!errors.startDate} />{errors.startDate && <small className="field-error">{errors.startDate}</small>}</label>
          <label className="field full"><span>Anything else? <i>(optional)</i></span><textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} maxLength={240} placeholder="A short note about your preferred schedule…" rows="3" /></label>
        </div>
        <button className="button button-lime submit-button" type="submit">Review demo booking <ArrowUpRight size={17} /></button>
        <p className="form-footnote"><ShieldCheck size={14} /> Demo only. Please do not enter sensitive or health information.</p>
      </form>
      <aside className="booking-summary"><div className="summary-top"><span>YOUR SUMMARY</span><span>02 / 02</span></div><h2>Keep it<br /><em>simple.</em></h2>{selected ? <><div className="summary-program"><span>{selected.category} / {selected.level}</span><strong>{selected.name}</strong><small>{selected.duration} · {selected.sessions} sessions / week</small></div><div className="summary-line"><span>Programme price</span><strong>PKR {selected.price.toLocaleString('en-PK')}</strong></div><div className="summary-line"><span>Demo deposit (10%)</span><strong>PKR {deposit.toLocaleString('en-PK')}</strong></div><div className="summary-total"><span>Amount shown today</span><strong>PKR {deposit.toLocaleString('en-PK')}</strong></div><p className="summary-disclaimer">The deposit is a calculated example only. No charge or real booking occurs.</p></> : <div className="summary-empty"><span>↗</span><p>Select a programme to see its price and deposit summary.</p></div>}<div className="summary-perks"><div><Check size={15} /> Clear programme details</div><div><Check size={15} /> Transparent demo pricing</div><div><Check size={15} /> No payment required</div></div></aside>
    </div>
  </section>;
}