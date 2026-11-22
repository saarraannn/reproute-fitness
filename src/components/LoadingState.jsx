import { RefreshCw } from 'lucide-react';

export default function LoadingState({ state, onRetry }) {
  if (state === 'loading') return <div className="state-panel" role="status"><span className="loader" /><h3>Finding your rhythm…</h3><p>Loading the programme catalogue.</p></div>;
  if (state === 'error') return <div className="state-panel" role="alert"><h3>We hit a small pause.</h3><p>The demo catalogue could not be loaded. Please try again.</p><button className="button button-dark" onClick={onRetry}><RefreshCw size={16} /> Try again</button></div>;
  return null;
}