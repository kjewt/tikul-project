import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
// import { RecoilRoot } from 'recoil';
// import { CART_ITEM, cartState } from './store/cart';

const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <RecoilRoot initializeState={() => Object.assign(cartState, initialValue)}> */}
    <App />
    {/* </RecoilRoot> */}
  </React.StrictMode>,
);
