import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiDownload } from "react-icons/fi";

function DisplayProjects({ fetch, setFetch, onViewMore, clientEmail }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/client/display-projects");
        console.log("Projects from API:", response.data);

        // Filter projects based on project_manager_email
        const filteredProjects = response.data.filter(
          (project) => project.client_email === clientEmail
        );

        console.log("Filtered Projects:", filteredProjects);
        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [fetch, clientEmail]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div
      className="overflow-auto shadow-md sm:rounded-lg"
      style={{ maxHeight: "300px" }}
    >
      {projects?.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Project name</th>
              <th className="border px-4 py-2">Project Description</th>
              <th className="border px-4 py-2">Scope</th>
              <th className="border px-4 py-2">Stack</th>
              <th className="border px-4 py-2">Project Manager</th>
              <th className="border px-4 py-2">Created On</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects?.map((project, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{project.project_name}</td>
                <td className="border px-4 py-2">{project.project_desc}</td>
                <td className="border px-4 py-2">{project.project_scope}</td>
                <td className="border px-4 py-2">{project.project_stack}</td>
                <td className="border px-4 py-2">{project.project_manager}</td>
                <td className="border px-4 py-2">
                  {formatCreatedAt(project.createdAt)}
                </td>

                <td className="border px-4 py-2 flex gap-2 justify-center items-center">
                  <button onClick={() => onViewMore(project)}>
                    <FiEye />
                  </button>
                  <button>
                    <FiDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
}

export default DisplayProjects;
