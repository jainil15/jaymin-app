import React from "react";
import AddUserForm from "./adduserform";
import FetchClientFeedback from "./fetchclientfeedback";
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
