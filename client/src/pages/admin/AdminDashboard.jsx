import React, { useEffect } from "react";
import AddUserForm from "./adduserform";
import { useNavigate } from "react-router-dom";
import FetchClientFeedback from "./fetchclientfeedback";
import axios from "axios";

const AdminDashboard = () => {
  return (
    <div className=" items-center space-y-16">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
      <AddUserForm />
      <FetchClientFeedback />
    </div>
  );
};

export default AdminDashboard;
