import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element in public/index.html');

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
