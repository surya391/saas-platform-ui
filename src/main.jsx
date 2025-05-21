import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'


import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './utils/authConfig';
const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Provider store={store} >
          <App />
        </Provider>
      </BrowserRouter>
    </MsalProvider>
  </React.StrictMode>
);

