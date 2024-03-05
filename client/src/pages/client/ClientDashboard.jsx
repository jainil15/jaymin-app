import React from "react";
import Clientfeeback from "./clientfeeback";

const ClientDashboard = () => {
  return (
    <div className="flex flex-col items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Client Dashboard</h1>

      <Clientfeeback />
    </div>
  );
};

export default ClientDashboard;
