import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Handle hash-based routing
const handleHashChange = () => {
  const hash = window.location.hash.slice(1) || 'registration';
  // You can dispatch a custom event or use a state management solution
  window.dispatchEvent(new CustomEvent('navigationChange', { detail: hash }));
};

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Initial hash check
handleHashChange();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);