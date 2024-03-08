// zklmSLKLMLXK
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// old login file without auth0
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function loginUser(ev) {
    ev.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill all fields");
    } else {
      try {
        // Check if the login is for the admin
        if (email === "iamjay1820@gmail.com" && password === "12341234") {
          // For testing purposes, directly set the user role as Admin
          navigate("/admin/dashboard");
          return;
        }

        const response = await fetch("http://localhost:4004/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Data",data)
          // Handle role-based redirection here
          switch (data.role) {
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
            default:
              toast.error("Invalid role");
          }
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (err) {
        toast.error("An error occurred during login.");
        console.log(err);
      }
    }
  }


  return (
    <div className="flex flex-col items-center h-screen">
     <h1>Please Login First</h1>
    </div>
  );
  
}

export default UserLogin;
