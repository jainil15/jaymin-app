// ProtectedRoute.js
import React, { useEffect, useState , Route} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate,Navigate, Routes } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import axios from "axios";

const ProtectedRoute = ({ children, allowedRole,component, ...args }) => {

  const { isAuthenticated, user, isLoading} = useAuth0();
  const navigate = useNavigate();
  const userRole = async(request,response)=> await axios.get(`/api/userRole?email=${user.email}`);
  console.log(userRole);

  <Routes component={withAuthenticationRequired(component)} {...args} />

 useEffect(() => {
  const fetchUserRole = async () => {
    console.log("hello user",userRole)
    console.log("hello auth",isAuthenticated);
    
      if (isAuthenticated && !isLoading) {

        switch(userRole) {
          case "Admin":
            navigate("/admin/dashboard");
            break;
          case "Client":
            navigate("/client/dashboard");
            break;
          case "Auditor":
            navigate("/auditor/dashboard");
            break;
          case "ProjectManager":
            navigate("/projectmanager/dashboard");
            break;
          case "":
            console.log("isdndj")
             navigate("/UserLogin")
          default:
            navigate("/");
        }
      }
    
    }
}, []);


  if (!isAuthenticated) {
    ({ returnTo: window.location.origin })
  } else if (allowedRole === userRole) {
    fetchUserRole();
  }
  return children;
};

export default ProtectedRoute;
