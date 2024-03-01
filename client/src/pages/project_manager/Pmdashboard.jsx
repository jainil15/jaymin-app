import React, { useState } from 'react';

const Pmdashboard = () => {
  const [resources, setResources] = useState([
    { name: "project1", role: "Developer", startDate: "2022-10-13", endDate: "2022-11-12", comment: "No comment" },
  ]);

  const addResource = () => {
    setResources((prevResources) => [
      ...prevResources,
      { name: "", role: "", startDate: "", endDate: "", comment: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources[index][field] = value;
      return updatedResources;
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Resources</h1>
      <form onSubmit={addResource} className="w-full">
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
                      required
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
