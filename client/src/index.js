import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-r07u7mel6oip3xhm.us.auth0.com"
      clientId="gI0JxsoyZnDNjVb3mpOlKhy4dVpUsHNI"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
