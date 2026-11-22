import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard.jsx';
import LoadingState from '../components/LoadingState.jsx';

export default function Home({ catalogue, state, retry }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A better kind of training plan</div>
          <h1>Find your<br /><em>training</em> rhythm<span className="lime-dot">.</span></h1>
          <p className="hero-intro">Good training isn't about doing everything. It's about finding the right next step — and showing up for it.</p>
          <div className="hero-actions"><Link className="button button-lime" to="/programs">Explore programmes <ArrowUpRight size={17} /></Link><a className="text-link" href="#method">How it works <ArrowDown size={15} /></a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>R</span><span>M</span><span>A</span></div><p><strong>Small steps. Real consistency.</strong><br />A programme that meets you where you are.</p></div>
        </div>
        <div className="hero-visual" aria-label="Abstract fitness training artwork">
          <div className="hero-image-shape"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-silhouette"><span /><i /></div><div className="hero-stamp">MOVE<br />WITH<br />PURPOSE</div></div>
          <div className="hero-caption"><span>01 / 03</span><span>Progress is personal <MoveUpRight size={14} /></span></div>
        </div>
        <div className="hero-side-note">TRAINING · COMMUNITY · PROGRESS</div>
      </section>
      <section className="stats-strip"><div><strong>10</strong><span>Curated programmes</span></div><div><strong>01</strong><span>Next step at a time</span></div><div><strong>100%</strong><span>Your pace, your progress</span></div><div className="strip-note">A simpler way<br />to get moving <ArrowUpRight size={18} /></div></section>
      <section className="section section-programmes">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Choose your focus</div><h2>Start where<br /><em>you are.</em></h2></div><Link to="/programs" className="text-link">All programmes <ArrowUpRight size={16} /></Link></div>
        {state === 'loading' || state === 'error' ? <LoadingState state={state} onRetry={retry} /> : <div className="program-grid">{catalogue.slice(0, 3).map((p) => <ProgramCard key={p.id} program={p} />)}</div>}
      </section>
      <section className="method-section" id="method"><div className="method-left"><div className="eyebrow"><span className="eyebrow-line" /> The RepRoute method</div><h2>Less noise.<br /><em>More momentum.</em></h2><p>Pick a focus, choose a level that feels right, and follow a clear schedule. No complicated promises — just a practical starting point.</p><Link className="button button-lime" to="/programs">Find your programme <ArrowUpRight size={17} /></Link></div><div className="method-steps"><div><span>01</span><h3>Choose a focus</h3><p>Strength, conditioning, mobility or performance.</p></div><div><span>02</span><h3>Find your level</h3><p>Each programme clearly shows its experience level and schedule.</p></div><div><span>03</span><h3>Make it yours</h3><p>Review the details and reserve a place in this demo experience.</p></div></div></section>
      <section className="closing-cta"><p>YOUR NEXT REP STARTS HERE</p><h2>Ready for your<br /><em>next chapter?</em></h2><Link className="button button-lime" to="/programs">Explore all programmes <ArrowRight size={17} /></Link><span className="cta-mark">R.</span></section>
    </>
  );
}