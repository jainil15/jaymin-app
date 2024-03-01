import React, { useState, useEffect } from 'react';

const Pmdashboard = () => {
  const [resources, setResources] = useState([
    { ResourceName: "", Role: "", startDate: "", endDate: "", comment: "" },
  ]);

  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resources));
  }, [resources]);

  const addResource = async () => {
    try {
      const response = await fetch('http://localhost:4004/projectmanager/add-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resources[resources.length - 1]),
      });

      const newResource = await response.json();
      const { name, role, startDate, endDate, comment } = newResource;
      setResources((prevResources) => [...prevResources, { name, role, startDate, endDate, comment }]);
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const handleInputChange = (index, field, value) => {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources[index][field] = value;

      // Check if end date is before start date, and update it if needed
      if (field === 'startDate' && updatedResources[index].endDate < value) {
        updatedResources[index].endDate = value;
      }

      return updatedResources;
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      <form onSubmit={(e) => { e.preventDefault(); addResource(); }} className="w-full">
        <table className="bg-white border border-blue-500 w-full">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(resources[0]).map((key) => (
                <th key={key} className="border border-gray-300 p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index}>
                {Object.keys(resource).map((key) => (
                  <td key={key} className="border border-gray-300 p-2">
                    <input
                      type={key === 'startDate' || key === 'endDate' ? "date" : "text"}
                      value={resource[key]}
                      onChange={(e) => handleInputChange(index, key, e.target.value)}
                      className="border border-gray-300 p-1 w-full"
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)} 
                      required
                      min={key === 'endDate' ? resource.startDate : undefined} 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Pmdashboard;
