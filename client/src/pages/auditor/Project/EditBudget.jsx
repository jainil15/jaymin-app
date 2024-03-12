import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditBudget({ budget, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: budget.type,
    duration: budget.duration,
    budgetedHours: budget.budgetedHours,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateBudget(e) {
    e.preventDefault();
    try {
      await axios.put(`/auditor/edit-budget/${budget._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("Budget Edited successfully");
          setFetch((prev) => !prev);
          closeModal();
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  }

  return (
    <>
      <div onClick={openModal} className="p-1 cursor-pointer">
        {/* Edit icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-700 hover:text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div>
            <form
              className="bg-white text-gray-900 rounded-md shadow-lg border-2 border-gray-800 p-7 flex flex-col justify-center items-center gap-4"
              onSubmit={updateBudget}
            >
              <div className="text-2xl mb-4">Edit Budget</div>

              <div className="w-full">
                <label className="block mb-1 text-left" htmlFor="type">
                  Type
                </label>
                <select
                  required
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                >
                  <option value="">Select</option>
                  <option value="Fixed Budget">Fixed Budget</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-1 text-left" htmlFor="duration">
                  Duration
                </label>
                <input
                  required
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                />
              </div>
              <div className="w-full">
                <label className="block mb-1 text-left" htmlFor="budgetedHours">
                  Budgeted Hours
                </label>
                <input
                  required
                  type="number"
                  id="budgetedHours"
                  name="budgetedHours"
                  value={formData.budgetedHours}
                  onChange={handleChange}
                  className="w-full border rounded-md py-2 px-3"
                />
              </div>
              <div className="flex justify-center w-full">
                <button type="button" onClick={closeModal} className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                  Close
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditBudget;
