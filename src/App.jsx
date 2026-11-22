import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Programs from './pages/Programs.jsx';
import ProgramDetails from './pages/ProgramDetails.jsx';
import Booking from './pages/Booking.jsx';
import Confirmation from './pages/Confirmation.jsx';

export default function App() {
  const [catalogueState, setCatalogueState] = useState('loading');
  const [catalogue, setCatalogue] = useState([]);
  const loadCatalogue = useCallback(async () => {
    setCatalogueState('loading');
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      // Add ?simulateError=1 to the URL to test the error and retry state once.
      if (new URLSearchParams(window.location.search).get('simulateError') === '1') {
        window.history.replaceState({}, '', window.location.pathname);
        throw new Error('Simulated catalogue request failure');
      }
      // Local data is loaded asynchronously to demonstrate a request lifecycle.
      const { programs } = await import('./data/programs.js');
      setCatalogue(programs);
      setCatalogueState(programs.length ? 'ready' : 'empty');
    } catch {
      setCatalogueState('error');
    }
  }, []);
  useEffect(() => { loadCatalogue(); }, [loadCatalogue]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home catalogue={catalogue} state={catalogueState} retry={loadCatalogue} />} />
        <Route path="/programs" element={<Programs catalogue={catalogue} state={catalogueState} retry={loadCatalogue} />} />
        <Route path="/programs/:id" element={<ProgramDetails catalogue={catalogue} state={catalogueState} retry={loadCatalogue} />} />
        <Route path="/booking" element={<Booking catalogue={catalogue} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}