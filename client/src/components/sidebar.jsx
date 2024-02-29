// sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => (
  <aside className="bg-gray-900 max-w-lg min-w-64 h-screen flex flex-col items-start text-lg text-white font-bold whitespace-nowrap leading-relaxed p-5 box-border">
    <div className="p-2 rounded-lg mt-4">Dashboard</div>
    <div className="p-2 rounded-lg mt-4">Projects</div>
    <div className="p-2 rounded-lg mt-4">Settings</div>
  </aside>
);
export default Sidebar;
