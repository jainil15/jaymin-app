import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

// import page
import CreateProject from "./CreateProject";
import DisplayProjects from "./DisplayProjects";
import ProjectDetails from "./ProjectDetails";

const AuditorDashboard = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        const temp = await getAccessTokenSilently();
        setToken(temp);
      }
    };

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  const openProjectDetails = (project) => {
    setProject(project);
  };

  const closeProjectDetails = () => {
    setProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#36D7B7" size={100} loading={isLoading} />
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("You must be logged in to view this page.");
    return (
      <div className="flex bold text-4xl h-screen">
        <p>You must be logged In to view this page.</p>
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-4xl font-bold text-center mt-10 mb-10">
        Auditor Dashboard
      </h1>

      {! project && (
        <>
          <CreateProject
            className="mt-10 mb-10"
            setFetch={setFetch}
            fetch={fetch}
            isVisible={!project}
          />
          <DisplayProjects
            fetch={fetch}
            setFetch={setFetch}
            onViewMore={openProjectDetails}
          />
        </>
      )}

      {project && (
        <ProjectDetails
          project={project}
          onClose={closeProjectDetails}
        />
      )}
    </div>
  );
};

export default AuditorDashboard;
