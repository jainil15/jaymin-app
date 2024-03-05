import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-hd6ipxvrhs35fzbt.us.auth0.com"
    clientId="hvU8TgiP0DzxpnlglvwzKj8bgu5Z7A9l"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
</React.StrictMode>
  
  
);

reportWebVitals();
