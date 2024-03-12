import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./EditProject";
import { FiEye, FiDownload, FiTrash2 } from "react-icons/fi";
import { saveAs } from "file-saver";

function DisplayProjects({ fetch, setFetch, onViewMore }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/auditor/display-projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [fetch]);

  async function handleDelete(id) {
    const confirmation = window.confirm("Do you want to delete?");
    if (confirmation) {
      try {
        const response = await axios.delete(`/auditor/delete-project/${id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  const download = async (project_id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/download-pdf/${project_id}`, {
        responseType: "arraybuffer",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      saveAs(pdfBlob, "output.pdf");
      setLoading(false);
    } catch (error) {
      console.error("Error converting to PDF:", error);
      setLoading(false);
    }
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
                  <button onClick={() => download(project._id)}>
                    <FiDownload />
                  </button>

                  <button onClick={() => onViewMore(project)}>
                    <FiEye />
                  </button>

                  {/* EDITPROJECT COMPONENT FOR POP UP  */}
                  <EditProject project={project} setFetch={setFetch} />

                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FiTrash2 />
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
