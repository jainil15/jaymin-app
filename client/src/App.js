// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';  // Import Auth0Provider
import "monday-ui-react-core/tokens";

import "./App.css";
import Layout from "./components/layout";
import Home from "./components/home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AuditorProjects from "./pages/auditor/AuditorProjects";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import header from "./components/header";

function App() {
  const domain = 'dev-hd6ipxvrhs35fzbt.us.auth0.com';
  const clientId = 'hvU8TgiP0DzxpnlglvwzKj8bgu5Z7A9l';

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auditor" element={<AuditorDashboard />} />
            <Route path="/auditor/projects" element={<AuditorProjects />} />
            <Route path='/header' element={header} />
          </Route>
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
