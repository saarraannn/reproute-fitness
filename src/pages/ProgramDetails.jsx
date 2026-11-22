import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Users } from 'lucide-react';
import LoadingState from '../components/LoadingState.jsx';

export default function ProgramDetails({ catalogue, state, retry }) {
  const { id } = useParams();
  if (state === 'loading' || state === 'error') return <section className="detail-page"><LoadingState state={state} onRetry={retry} /></section>;
  const p = catalogue.find((item) => item.id === id);
  if (!p) return <section className="empty-state detail-page"><h2>Programme not found.</h2><p>This programme may have moved. Return to the catalogue to choose another.</p><Link className="button button-dark" to="/programs">Back to programmes</Link></section>;
  const eligible = p.level === 'Beginner' ? 'All experience levels' : p.level === 'Intermediate' ? 'Intermediate or Advanced' : 'Advanced experience required';
  return <section className="detail-page">
    <Link className="back-link" to="/programs"><ArrowLeft size={15} /> All programmes</Link>
    <div className="detail-layout">
      <div className={`detail-art art-${p.image}`}><span className="art-label">{p.category}</span><span className="detail-art-word">REP<br />ROUTE</span><span className="art-circle" /></div>
      <div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> PROGRAMME / {p.level.toUpperCase()}</div><h1>{p.name.split(' ').slice(0, -1).join(' ')} <em>{p.name.split(' ').slice(-1)}</em></h1><p className="detail-description">{p.description}</p>
        <div className="detail-facts"><div><Clock3 size={17} /><span><small>DURATION</small><strong>{p.duration}</strong></span></div><div><CalendarDays size={17} /><span><small>SCHEDULE</small><strong>{p.schedule}</strong></span></div><div><Users size={17} /><span><small>PLACES LEFT</small><strong>{p.seats || 'Waitlist only'}</strong></span></div></div>
        <div className="rule-note"><CheckCircle2 size={17} /><span><strong>Entry requirement</strong>{eligible}. {p.seats ? 'Places are limited and allocated in order.' : 'This programme is currently full.'}</span></div>
        <div className="detail-price"><div><small>PROGRAMME PRICE</small><strong>PKR {p.price.toLocaleString('en-PK')}</strong></div>{p.seats ? <Link className="button button-lime" to={`/booking?program=${p.id}`}>Reserve a place <ArrowUpRight size={17} /></Link> : <button className="button button-disabled" disabled>Currently full</button>}</div>
        <p className="demo-note">Demo booking only · no payment is collected.</p>
      </div>
    </div>
  </section>;
}