import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectUpdates from "./projectupdates";
import ResourceTable from "./Resource";
import Momsclient from "./Momsclient";
import Phase from "./Phase";
import FetchClientFeedback from "../admin/fetchclientfeedback";

const PmDashboard = () => {
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
      <h1 className="text-4xl font-bold text-center">Project Manager Dashboard</h1>
      {/* Your PmDashboard specific components go here */}


      <div className="flex flex-col items-center space-y-16">
        <div className="w-full p-8 bg-blue-50 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
            Resources
          </h1>
          <ResourceTable />
        </div>

        <div className="w-full p-8 bg-green-50 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-green-600 text-center">
            Project Updates
          </h2>
          <ProjectUpdates />
        </div>

        <div className="w-full p-8 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-red-600 text-center">
            Approved Team{" "}
          </h2>
          <Phase />
        </div>

        <div className="w-full p-8 bg-yellow-50 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-yellow-600 text-center">
            MoMs Client
          </h2>
          <Momsclient />
        </div>

        <div className="w-full p-8 bg-green-50 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-yellow-600 text-center">
          </h2>
          <FetchClientFeedback />
        </div>
      </div>
    </div>
  );
};

export default PmDashboard;
