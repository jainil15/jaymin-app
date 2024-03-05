import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resources = () => {
  const baseUri = 'http://localhost:4004/projectmanager';
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    comment: '',
  });
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.role ||
      !formData.startDate ||
      !formData.endDate ||
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      alert('All fields are required, and End Date must be greater than Start Date!');
      return false;
    }
    return true;
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${baseUri}/get-resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const addResource = async () => {
    try {
      if (validateForm()) {
        await axios.post(`${baseUri}/add-resource`, formData);
        setFormData({ name: '', role: '', startDate: '', endDate: '', comment: '' });
        fetchResources();
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const editResource = (id) => {
    const selectedResource = resources.find((resource) => resource._id === id);
    setFormData({
      name: selectedResource.name,
      role: selectedResource.role,
      startDate: selectedResource.startDate,
      endDate: selectedResource.endDate,
      comment: selectedResource.comment,
    });
    setEditingId(id);
  };

  const saveEditedResource = async () => {
    try {
      if (validateForm()) {
        await axios.put(`${baseUri}/edit-resource/${editingId}`, formData);
        setFormData({ name: '', role: '', startDate: '', endDate: '', comment: '' });
        setEditingId(null);
        fetchResources();
      }
    } catch (error) {
      console.error('Error saving edited resource:', error);
    }
  };

  const deleteResource = async (id) => {
    try {
      await axios.delete(`${baseUri}/delete-resource/${id}`);
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Resources</h1>

      <form className="mb-4">
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-600">End Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Comment</label>
          <textarea
            className="mt-1 p-2 border rounded-md w-full"
            rows="3"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1.5 hover:bg-blue-700"
          onClick={editingId ? saveEditedResource : addResource}
        >
          {editingId ? 'Save Edited Resource' : 'Add Resource'}
        </button>
      </form>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource._id}>
              <td className="border px-4 py-2">{resource.name}</td>
              <td className="border px-4 py-2">{resource.role}</td>
              <td className="border px-4 py-2">{new Date(resource.startDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(resource.endDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{resource.comment}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-700"
                  onClick={() => editResource(resource._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  onClick={() => deleteResource(resource._id)}
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

export default Resources;
