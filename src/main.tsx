import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { Toaster, Tooltip } from './ui/components';

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Tooltip.Provider>
      <App />
      <Toaster />
    </Tooltip.Provider>
  </React.StrictMode>
);
