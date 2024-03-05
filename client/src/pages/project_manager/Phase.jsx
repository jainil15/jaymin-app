import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const Phases = () => {
  const baseUri = 'http://localhost:4004/projectmanager'; // Adjust the base URI as needed
  const [phases, setPhases] = useState([]);
  const [formData, setFormData] = useState({
    phaseNumber: '',
    numberOfResources: '',
    role: '',
    availabilityPercentage: '',
    duration: '',
  });
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    if (
      !formData.phaseNumber ||
      !formData.numberOfResources ||
      !formData.role ||
      !formData.availabilityPercentage ||
      !formData.duration ||
      isNaN(Number(formData.numberOfResources)) ||
      Number(formData.numberOfResources) <= 0 ||
      isNaN(Number(formData.phaseNumber)) ||
      Number(formData.phaseNumber) <= 0
    ) {
      // Displaying proper error messages in alert box
      alert('All fields are required, and Phase Number and Number of Resources must be a positive number!');
      return false;
    }
    return true;
  };

  const fetchPhases = async () => {
    try {
      const response = await axios.get(`${baseUri}/get-phases`);
      setPhases(response.data);
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const addPhase = async () => {
    try {
      if (validateForm()) {
        await axios.post(`${baseUri}/add-phase`, formData);
        setFormData({
          phaseNumber: '',
          numberOfResources: '',
          role: '',
          availabilityPercentage: '',
          duration: '',
        });
        fetchPhases();
      }
    } catch (error) {
      console.error('Error adding phase:', error);
    }
  };

  const editPhase = (id) => {
    const selectedPhase = phases.find((phase) => phase._id === id);
    setFormData({
      phaseNumber: selectedPhase.phaseNumber,
      numberOfResources: selectedPhase.numberOfResources,
      role: selectedPhase.role,
      availabilityPercentage: selectedPhase.availabilityPercentage,
      duration: selectedPhase.duration,
    });
    setEditingId(id);
  };

  const saveEditedPhase = async () => {
    try {
      if (validateForm()) {
        await axios.put(`${baseUri}/edit-phase/${editingId}`, formData);
        setFormData({
          phaseNumber: '',
          numberOfResources: '',
          role: '',
          availabilityPercentage: '',
          duration: '',
        });
        setEditingId(null);
        fetchPhases();
      }
    } catch (error) {
      console.error('Error saving edited phase:', error);
    }
  };

  const deletePhase = async (id) => {
    try {
      // Using SweetAlert for deletion confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this phase!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await axios.delete(`${baseUri}/delete-phase/${id}`);
        fetchPhases();
        Swal.fire('Deleted!', 'Your phase has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting phase:', error);
    }
  };

  useEffect(() => {
    fetchPhases();
  }, []);

  const groupByPhase = (phases) => {
    return phases.reduce((groupedPhases, phase) => {
      const key = phase.phaseNumber;
      if (!groupedPhases[key]) {
        groupedPhases[key] = [];
      }
      groupedPhases[key].push(phase);
      return groupedPhases;
    }, {});
  };

  return (
    <div className="container mx-auto mt-8 mb-8">

      <form className="mb-4">
  <table className="table-auto w-full">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Phase Number</th>
        <th className="px-4 py-2">Number of Resources</th>
        <th className="px-4 py-2">Role</th>
        <th className="px-4 py-2">Availability Percentage (In %)</th>
        <th className="px-4 py-2">Duration (In month)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border px-4 py-2">
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={formData.phaseNumber}
            onChange={(e) => setFormData({ ...formData, phaseNumber: e.target.value })}
            required
            readOnly={editingId !== null} 
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={formData.numberOfResources}
            onChange={(e) => setFormData({ ...formData, numberOfResources: e.target.value })}
            required
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={formData.availabilityPercentage}
            onChange={(e) => setFormData({ ...formData, availabilityPercentage: e.target.value })}
            required
          />
        </td>
        <td className="border px-4 py-2">
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </td>
       
      </tr>
    </tbody>
  </table>
          <button
             className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1.5 mt-6 hover:bg-blue-700"
            onClick={editingId ? saveEditedPhase : addPhase}
          >
            {editingId ? 'Save Edited Phase' : 'Add Phase'}
          </button>
</form>


      {Object.entries(groupByPhase(phases)).map(([phaseNumber, phaseGroup]) => (
        <div key={phaseNumber} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Phase-{phaseNumber}</h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">No. Of Resources</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Availability Percentage</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {phaseGroup.map((phase) => (
                <tr key={phase._id}>
                  <td className="border px-4 py-2">{phase.numberOfResources}</td>
                  <td className="border px-4 py-2">{phase.role}</td>
                  <td className="border px-4 py-2">{phase.availabilityPercentage}</td>
                  <td className="border px-4 py-2">{phase.duration}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-700"
                      onClick={() => editPhase(phase._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                      onClick={() => deletePhase(phase._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Phases;
