import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
