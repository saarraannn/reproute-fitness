import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowUpRight, Dumbbell } from 'lucide-react';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="RepRoute home"><span className="brand-mark"><Dumbbell size={19} /></span><span>rep<span className="brand-light">route</span><i>.</i></span></Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/programs">Programmes</NavLink>
          <a href="/#method">Our method</a>
          <NavLink to="/booking">Booking</NavLink>
        </nav>
        <Link className="header-cta" to="/programs">Find your route <ArrowUpRight size={16} /></Link>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer"><Link to="/" className="brand"><span className="brand-mark"><Dumbbell size={17} /></span><span>rep<span className="brand-light">route</span><i>.</i></span></Link><p>Train with intention. Progress at your pace.</p><span>© 2026 RepRoute · Student project prototype</span></footer>
    </div>
  );
}