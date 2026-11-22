import { ArrowUpRight, Clock3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const artClass = (image) => 'program-art art-' + image;

export default function ProgramCard({ program }) {
  return (
    <article className="program-card">
      <Link to={`/programs/${program.id}`} className={artClass(program.image)} aria-label={`View ${program.name}`}>
        <span className="art-label">{program.category}</span>
        <span className="art-number">{String(program.id.length).padStart(2, '0')}</span>
        <span className="art-circle" />
        <span className="art-open"><ArrowUpRight size={19} /></span>
      </Link>
      <div className="program-card-body">
        <div className="card-meta"><span>{program.level}</span><span>{program.duration}</span></div>
        <h3><Link to={`/programs/${program.id}`}>{program.name}</Link></h3>
        <p>{program.description}</p>
        <div className="card-bottom"><span><Clock3 size={14} /> {program.sessions} sessions / week</span><span><Users size={14} /> {program.seats ? `${program.seats} seats` : 'Waitlist'}</span></div>
        <div className="card-price"><strong>PKR {program.price.toLocaleString('en-PK')}</strong><Link to={`/programs/${program.id}`} aria-label={`Explore ${program.name}`}><ArrowUpRight size={17} /></Link></div>
      </div>
    </article>
  );
}