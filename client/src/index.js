import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="jaysite.us.auth0.com"
    clientId="AVLmhHYAlnrpwCaYWfvOc3anmbT66hF2"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
</React.StrictMode>
  
  
);

reportWebVitals();
