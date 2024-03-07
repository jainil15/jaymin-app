// App.js
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"; // Import Auth0
import Home from "./components/Home";
import Header from "./components/Header";
import UserLogin from "./pages/userlogin";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import PmDashboard from "./pages/project_manager/Pmdashboard";
import AuditorProjects from "./pages/auditor/AuditorProjects";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = "http://localhost:4004";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Auth0Provider
      domain="jaysite.us.auth0.com"
      clientId="AVLmhHYAlnrpwCaYWfvOc3anmbT66hF2"
      redirectUri={window.location.origin}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute allowedRole="Client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projectmanager/dashboard"
              element={
                <ProtectedRoute allowedRole="ProjectManager">
                  <PmDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/auditor/dashboard"
              element={
                <ProtectedRoute allowedRole="Auditor">
                  <AuditorDashboard />
                </ProtectedRoute>
              }
            />

            {/* un protected routes  */}
            <Route path="/auditor/projects" element={<AuditorProjects />} />
            <Route path="/header" element={<Header />} />
            <Route path="/UserLogin" element={<UserLogin />} />
          </Route>
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
