import React from 'react';
import { createRoot } from 'react-dom/client';
import '@smoked-glass/ui/styles.css';
import './app/app.css';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
