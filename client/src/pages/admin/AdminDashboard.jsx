import React, { useState, useEffect } from "react";
import axios from 'axios';

const AdminDashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    role: 'Client', // Default role
    email: '',
    password: '',
  });

  const [userList, setUserList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user list from your API endpoint
    const fetchUserList = async () => {
      try {
        const response = await axios.get('/api/users');
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserList();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!userData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email is not valid';
    }

    if (!userData.password.trim()) {
      errors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (validateForm()) {
      try {
       const res= await axios.post('/admin/adduser', userData);
        setUserData({ name: '', role: 'Client', email: '', password: '' });
  
        // const response = await axios.get('/api/users');
        // setUserList(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
      
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
  <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
  <table className="w-full mb-8">
  </table>
  <h2 className="text-2xl font-bold mb-4">Add User</h2>
  <div className="flex flex-col space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Name:</label>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        className={`border p-2 rounded w-full ${errors.name && 'border-red-500'}`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Role:</label>
      <select
        name="role"
        value={userData.role}
        onChange={handleInputChange}
        className="border p-2 rounded w-full"
      >
        <option value="Client">Client</option>
        <option value="Auditor">Auditor</option>
        <option value="ProjectManager">Project Manager</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Email:</label>
      <input
        type="text"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        className={`border p-2 rounded w-full ${errors.email && 'border-red-500'}`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Password:</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        className={`border p-2 rounded w-full ${errors.password && 'border-red-500'}`}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
    </div>
    <button onClick={handleAddUser} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
      Add User
    </button>
  </div>
</div>

  );
};

export default AdminDashboard;
