// Momsclient.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Momsclient = () => {
  const BASE_URI = 'http://localhost:4004/projectmanager'; // Change this to your server URI
  const [momsclients, setMomsclients] = useState([]);
  const [formData, setFormData] = useState({
    Date: '',
    Duration: '',
    MomLink: '',
    Comments: '',
  });
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    const durationRegex = /^\d+$/; // Regular expression for positive integers
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // Regular expression for URL validation

    if (
      !formData.Date ||
      !formData.Duration ||
      !formData.MomLink ||
      !formData.Comments ||
      !durationRegex.test(formData.Duration) || // Check if duration is a positive number
      !urlRegex.test(formData.MomLink) // Check if MomLink is a valid URL
    ) {
      alert('All fields are required, and input validation failed!');
      return false;
    }
    return true;
  };

  const fetchMomsclients = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/momsclients`);
      setMomsclients(response.data);
    } catch (error) {
      console.error('Error fetching momsclients:', error);
    }
  };

  const addMomsclient = async () => {
    try {
      if (validateForm()) {
        await axios.post(`${BASE_URI}/momsclients`, formData);
        setFormData({ Date: '', Duration: '', MomLink: '', Comments: '' });
        fetchMomsclients();
      }
    } catch (error) {
      console.error('Error adding momsclient:', error);
    }
  };

  const editMomsclient = async (id) => {
    try {
      setEditingId(id);
      const selectedMomsclient = momsclients.find((momsclient) => momsclient._id === id);
      setFormData({
        Date: selectedMomsclient.Date,
        Duration: selectedMomsclient.Duration,
        MomLink: selectedMomsclient.MomLink,
        Comments: selectedMomsclient.Comments,
      });
    } catch (error) {
      console.error('Error editing momsclient:', error);
    }
  };

  const saveEditedMomsclient = async () => {
    try {
      if (editingId && validateForm()) {
        await axios.put(`${BASE_URI}/momsclients/${editingId}`, formData);
        setFormData({ Date: '', Duration: '', MomLink: '', Comments: '' });
        setEditingId(null);
        fetchMomsclients();
      }
    } catch (error) {
      console.error('Error saving edited momsclient:', error);
    }
  };

  const deleteMomsclient = async (id) => {
    try {
      await axios.delete(`${BASE_URI}/momsclients/${id}`);
      fetchMomsclients();
    } catch (error) {
      console.error('Error deleting momsclient:', error);
    }
  };

  useEffect(() => {
    fetchMomsclients();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Momsclients</h1>

      <form className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date:
            </label>
            <input
              type="datetime-local" // Use datetime-local input type
              id="date"
              name="date"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.Date}
              onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration: (In hours)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.Duration}
              onChange={(e) => setFormData({ ...formData, Duration: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="momLink">
              MoM Link:
            </label>
            <input
              type="url"
              id="momLink"
              name="momLink"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.MomLink}
              onChange={(e) => setFormData({ ...formData, MomLink: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
              Comments:
            </label>
            <textarea
              id="comments"
              name="comments"
              className="mt-1 p-2 border rounded-md w-full"
              rows="4"
              value={formData.Comments}
              onChange={(e) => setFormData({ ...formData, Comments: e.target.value })}
              required
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mx-1.5 hover:bg-blue-700"
          onClick={addMomsclient}
        >
          Add Momsclient
        </button>
      </form>

      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">MoM Link</th>
            <th className="px-4 py-2">Comments</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {momsclients.map((momsclient) => (
            <tr key={momsclient._id}>
              <td className="border px-4 py-2">
                {new Date(momsclient.Date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
              <td className="border px-4 py-2">{momsclient.Duration}</td>
              <td className="border px-4 py-2">{momsclient.MomLink}</td>
              <td className="border px-4 py-2">{momsclient.Comments}</td>
              <td className="border px-4 py-2">
                {editingId === momsclient._id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
                    onClick={saveEditedMomsclient}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-700"
                    onClick={() => editMomsclient(momsclient._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  onClick={() => deleteMomsclient(momsclient._id)}
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

export default Momsclient;
