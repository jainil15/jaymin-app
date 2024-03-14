import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaTimes } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { saveAs } from "file-saver";

import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";

import Budget from "./Project/Budget";
import ProjectOverview from "./Project/ProjectOverview";
import Stakeholder from "./Project/stakeholder";
import AuditHistory from "./Project/AuditHistory";
import VersionHistory from "./Project/VersionHistory";
import FinancialMatrix from "./Project/FinancialMatrix";
import OperationalMatrix from "./Project/OperationalMatrix";
import TechnicalMatrix from "./Project/TechnicalMatrix";

function EscalationMatix({ project, setFetch, updateProjectData }) {
  return (
    <div>
      <FinancialMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
      <OperationalMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
      <TechnicalMatrix
        project={project}
        setFetch={setFetch}
        updateProjectData={updateProjectData}
      />
    </div>
  );
}

function ProjectDetails({ onClose, project, updateProjectData }) {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <RingLoader />;
  }

  // DOWNLOAD PROJECT AS PDF
  const download = async (project_id) => {
    setLoading(true);
    try {
      // Send a POST request to the backend server to convert the URL to PDF
      const response = await axios.get(`/download-pdf/${project_id}`, {
        responseType: "arraybuffer",
      });

      // Convert the array buffer received from the server to a Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Use file-saver to save the PDF file locally
      saveAs(pdfBlob, "output.pdf");
      setLoading(false);
    } catch (error) {
      // Handle errors if any occur during the conversion process
      console.error("Error converting to PDF:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <RingLoader />;
  }

  return (
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Overview</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Budget</Tab>
          <Tab>Audit History</Tab>
          <Tab>Version History</Tab>
          <Tab>Escalation Matrix</Tab>
        </TabList>
        <div className="flex gap-3 items-center cursor-pointer">
          <h1 className="font-bold">Project Name: {project.project_name}</h1>

          <div
            className="flex text-center justify-content-between items-center"
            onClick={onClose}
          >
            <span className="font-bold">Close</span>
            <FaTimes />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            {/* PROJECT OVERVIEW COMPONENT */}
            <ProjectOverview project={project} setFetch={setFetch} />
          </TabPanel>

          <TabPanel>
            {/* STAKEHOLDER COMPONENT */}
            <Stakeholder project={project} setFetch={setFetch} />
          </TabPanel>

          <TabPanel>
            {/* BUDGET COMPONENT */}
            <Budget
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            {/* AUDIT HISTORY COMPONENT */}
            <AuditHistory
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            {/* VERSION HISTORY COMPONENT */}
            <VersionHistory
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

          <TabPanel>
            <EscalationMatix
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel>

        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default ProjectDetails;
