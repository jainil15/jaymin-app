import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUserForm from "./adduserform";
import { useNavigate } from "react-router-dom";
import FetchClientFeedback from "./fetchclientfeedback";

const AdminDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);


  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const temp = await getAccessTokenSilently();
        setToken(temp);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    toast.info('Loading...');
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    toast.error('You must be logged in to view this page.');
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div className="items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
      <AddUserForm />
      <FetchClientFeedback  />
      
    </div>
  );
};

export default AdminDashboard;
