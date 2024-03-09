// Sidebar.js
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-gray-900 max-w-xs min-w-64 h-auto flex flex-col items-start text-lg text-white font-bold whitespace-nowrap leading-relaxed p-5 box-border">
      <NavLink to="/" className={`p-2 rounded-lg mt-4 ${location.pathname === "/Home" ? "bg-gray-700" : ""}`}>Home</NavLink>
      <NavLink to="/projects" className={`p-2 rounded-lg mt-4 ${location.pathname === "/projects" ? "bg-gray-700" : ""}`}>Projects</NavLink>
      <NavLink to="/settings" className={`p-2 rounded-lg mt-4 ${location.pathname === "/settings" ? "bg-gray-700" : ""}`}>Settings</NavLink>
    </aside>
  );
};

export default Sidebar;
