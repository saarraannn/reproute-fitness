import { useMemo, useState } from 'react';
import { ArrowDownUp, Search, SlidersHorizontal, X } from 'lucide-react';
import ProgramCard from '../components/ProgramCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { categories } from '../data/programs.js';

export default function Programs({ catalogue, state, retry }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('featured');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogue.filter((p) => (category === 'All' || p.category === category) && (level === 'All' || p.level === level) && (!q || [p.name, p.description, p.category, p.level].some((v) => v.toLowerCase().includes(q)))).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0);
  }, [catalogue, query, category, level, sort]);
  const reset = () => { setQuery(''); setCategory('All'); setLevel('All'); setSort('featured'); };
  return <section className="catalogue-page">
    <div className="page-topline"><span>THE PROGRAMME INDEX / 2026</span><span>01 — 10</span></div>
    <div className="catalogue-title"><div><div className="eyebrow"><span className="eyebrow-line" /> Find your focus</div><h1>Choose your<br /><em>next move.</em></h1></div><p>Explore the programmes, compare the details and find a training rhythm that fits your week.</p></div>
    <div className="filter-panel">
      <label className="search-box"><Search size={18} /><span className="sr-only">Search programmes</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search programmes, focus or level…" /></label>
      <label className="filter-control"><SlidersHorizontal size={15} /><span className="sr-only">Filter by category</span><select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label className="filter-control"><span className="sr-only">Filter by level</span><select value={level} onChange={(e) => setLevel(e.target.value)}><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
      <label className="filter-control"><ArrowDownUp size={15} /><span className="sr-only">Sort programmes</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></label>
      <button className="reset-button" onClick={reset} aria-label="Clear filters"><X size={15} /> Reset</button>
    </div>
    <div className="results-line"><span>{filtered.length} PROGRAMME{filtered.length === 1 ? '' : 'S'} FOUND</span><span>PRICES IN PKR</span></div>
    {state === 'loading' || state === 'error' ? <LoadingState state={state} onRetry={retry} /> : filtered.length ? <div className="program-grid catalogue-grid">{filtered.map((p) => <ProgramCard key={p.id} program={p} />)}</div> : <div className="empty-state"><div className="empty-icon">↗</div><h2>No matches this time.</h2><p>Try another keyword or clear your filters to see every programme.</p><button className="button button-dark" onClick={reset}>Clear filters</button></div>}
  </section>;
}