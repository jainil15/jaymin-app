import React from "react";
import ProjectUpdates from "./projectupdates";
import ResourceTable from "./Resource";
import Momsclient from "./Momsclient";
import Phase from "./Phase";
import FetchClientFeedback from "../admin/fetchclientfeedback";

const Pmdashboard = () => {
  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Project Manager Dashboard
      </h1>

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

export default Pmdashboard;
