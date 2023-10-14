import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { Toaster } from './ui/components';

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
