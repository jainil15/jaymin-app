// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="bg-gray-900 max-w-xs min-w-64 h-auto flex flex-col items-start text-lg text-white font-bold whitespace-nowrap leading-relaxed p-5 box-border">
    <NavLink to="/" className="p-2 rounded-lg mt-4 hover:bg-gray-700 transition-colors duration-200">Dashboard</NavLink>
    <div className="p-2 rounded-lg mt-4">Projects</div>
    <div className="p-2 rounded-lg mt-4">Settings</div>
  </aside>
);
export default Sidebar;
