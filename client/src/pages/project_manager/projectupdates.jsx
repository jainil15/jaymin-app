import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectUpdates = () => {
  const baseUri = 'http://localhost:4004/projectmanager';
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    generalUpdates: '',
  });
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    // Check if any field is empty or null
    if (!formData.date || !formData.generalUpdates) {
      alert('Both fields are required!');
      return false;
    }
    return true;
  };

  const fetchProjectUpdates = async () => {
    try {
      const response = await axios.get(`${baseUri}/get-project-updates`);
      setProjectUpdates(response.data);
    } catch (error) {
      console.error('Error fetching project updates:', error);
    }
  };

  const addProjectUpdate = async () => {
    try {
      if (validateForm()) {
        await axios.post(`${baseUri}/add-project-update`, formData);
        setFormData({ date: '', generalUpdates: '' });
        fetchProjectUpdates();
      }
    } catch (error) {
      console.error('Error adding project update:', error);
    }
  };

  const editProjectUpdate = async (id) => {
    try {
      setEditingId(id);
      const selectedUpdate = projectUpdates.find((update) => update._id === id);
      setFormData({
        date: selectedUpdate.date,
        generalUpdates: selectedUpdate.generalUpdates,
      });
    } catch (error) {
      console.error('Error editing project update:', error);
    }
  };

  const saveEditedProjectUpdate = async () => {
    try {
      // Check if there is an ongoing edit and if the form is valid
      if (editingId && validateForm()) {
        await axios.put(`${baseUri}/edit-project-update/${editingId}`, formData);
        setFormData({ date: '', generalUpdates: '' });
        setEditingId(null); // Reset editingId after saving changes
        fetchProjectUpdates();
      }
    } catch (error) {
      console.error('Error saving edited project update:', error);
    }
  };

  const deleteProjectUpdate = async (id) => {
    try {
      await axios.delete(`${baseUri}/delete-project-update/${id}`);
      fetchProjectUpdates();
    } catch (error) {
      console.error('Error deleting project update:', error);
    }
  };

  useEffect(() => {
    fetchProjectUpdates();
  }, []);
  
  return (
    <div className="container mx-auto mt-8 mb-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Project Updates</h1>

      <table className="table-auto w-full mt-8 mx-auto mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 w-1/4">Date</th>
            <th className="px-4 py-2 w-3/4">General Updates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">
              <input
                type="date"
                className="mt-1 p-2 border rounded-md w-full"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </td>
            <td className="border px-4 py-2">
              <textarea
                className="mt-1 p-2 border rounded-md w-full"
                rows="6"
                value={formData.generalUpdates}
                onChange={(e) => setFormData({ ...formData, generalUpdates: e.target.value })}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mx-1.5 hover:bg-blue-700 mb-4"
        onClick={addProjectUpdate}
      >
        Add Project Update
      </button>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-8 py-2">Date</th>
            <th className="px-12 py-2">General Updates</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectUpdates.map((update) => (
            <tr key={update._id}>
              <td className="border px-8 py-2" required>
                {new Date(update.date).toLocaleDateString()}
              </td>
              <td className="border px-12 py-2" required>
                {update.generalUpdates}
              </td>
              <td className="border px-4 py-2">
                {editingId === update._id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
                    onClick={saveEditedProjectUpdate}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-700"
                    onClick={() => editProjectUpdate(update._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  onClick={() => deleteProjectUpdate(update._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectUpdates;
