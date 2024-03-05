import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Phase = () => {
  const BASE_URI = 'http://localhost:4004/projectmanager';

  const [phases, setPhases] = useState([]);
  const [newPhaseName, setNewPhaseName] = useState('');
  const [newRowData, setNewRowData] = useState({
    numberOfResources: '',
    role: '',
    availabilityPercentage: '',
    duration: '',
  });

  useEffect(() => {
    fetchPhases();
  }, []);

  const fetchPhases = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/phases`);
      setPhases(response.data);
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const addNewPhase = async () => {
    try {
      await axios.post(`${BASE_URI}/phases`, { name: newPhaseName });
      setNewPhaseName('');
      fetchPhases();
    } catch (error) {
      console.error('Error adding new phase:', error);
    }
  };

  const addNewRow = async (phaseId) => {
    try {
      await axios.post(`${BASE_URI}/phases/${phaseId}/addRow`, newRowData);
      setNewRowData({
        numberOfResources: '',
        role: '',
        availabilityPercentage: '',
        duration: '',
      });
      fetchPhases();
    } catch (error) {
      console.error(`Error adding new row to phase ${phaseId}:`, error);
    }
  };

  const handleInputChange = (field, value) => {
    setNewRowData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Phase Management</h1>

      {phases.map((phase) => (
        <div key={phase._id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{`Phase ${phase.name}`}</h2>

          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">No. Of resources</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Availability%</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {phase.resources.map((row) => (
                <tr key={row._id}>
                  <td className="border px-4 py-2">{row.numberOfResources}</td>
                  <td className="border px-4 py-2">{row.role}</td>
                  <td className="border px-4 py-2">{row.availabilityPercentage}</td>
                  <td className="border px-4 py-2">{row.duration}</td>
                  <td className="border px-4 py-2">Actions</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Form to add a new row */}
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="number"
              placeholder="No. Of resources"
              value={newRowData.numberOfResources}
              onChange={(e) => handleInputChange('numberOfResources', e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              value={newRowData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
            <input
              type="number"
              placeholder="Availability%"
              value={newRowData.availabilityPercentage}
              onChange={(e) => handleInputChange('availabilityPercentage', e.target.value)}
            />
            <input
              type="number"
              placeholder="Duration"
              value={newRowData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-700"
              onClick={() => addNewRow(phase._id)}
            >
              Add new row
            </button>
          </form>
        </div>
      ))}

      <div className="mb-8">
        <input
          type="text"
          className="p-2 border rounded-md mr-2"
          placeholder="Enter new phase name"
          value={newPhaseName}
          onChange={(e) => setNewPhaseName(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={addNewPhase}
        >
          Add new phase
        </button>
      </div>
    </div>
  );
};

export default Phase;
