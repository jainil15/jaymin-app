import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UserLogin() {
 
  return (
    <div className="flex flex-col items-center h-screen">
      <h1>Login Please</h1>
      <ToastContainer />
    </div>
  );
  
}

export default UserLogin;
