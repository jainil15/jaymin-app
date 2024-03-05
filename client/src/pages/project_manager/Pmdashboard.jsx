// components/Pmdashboard.jsx
import React from 'react';
import ProjectUpdates from './projectupdates';
import ResourceTable from './Resource';
import Momsclient from './Momsclient';
import Phase from './Phase';

const Pmdashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Project Manager Dashboard</h1>

      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        
        <ResourceTable />
        <hr className="w-full border-b-2 border-black mb-4" />
        
        <ProjectUpdates />
        <hr className="w-full border-b-2 border-black mb-4" /> 
        
        <Momsclient />
        <hr className="w-full border-b-2 border-black mb-4" /> 

        <Phase />
        <hr className="w-full border-b-2 border-black mb-4" /> 
      
      </div>
    </div>
  );
};

export default Pmdashboard;
