import React, { useEffect, useState } from "react";
import Clientfeeback from "./clientfeeback";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const temp = await getAccessTokenSilently();
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
    <div className="flex flex-col items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Client Dashboard</h1>
      <Clientfeeback />
    </div>
  );
};

export default ClientDashboard;
