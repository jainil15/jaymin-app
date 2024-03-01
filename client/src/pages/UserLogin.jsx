// zklmSLKLMLXK
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        if (response.redirected) {
          window.location.href = response.url;
        } else if (response.ok) {
          const data = await response.json();
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

  // ... (rest of the component remains unchanged)
  
  async function handleForgotPassword(ev) {
    ev.preventDefault();
    setLoading(true);
    if (email === "") {
      toast.error("Please enter your email");
      setLoading(false);
    } else {
      try {
        await axios.post("/forgot-password", { email: email }).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            toast.success("Password reset link sent to your email");
            setEmail("");
          }
        });
      } catch (error) {
        toast.error("Could not send link");
      }
    }
  }



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-96 p-4 border border-gray-300 rounded">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <Link to="/forgot-password" className="text-blue-500">
          Forgot password?
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
