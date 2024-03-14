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

// import file
import ProjectOverview from "../auditor/Project/ProjectOverview";

function ProjectDetails({ onClose, project, updateProjectData }) {
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!project) {
    return <RingLoader />;
  }

  if (loading) {
    return <RingLoader />;
  }

  return (
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Overview</Tab>
          <Tab>Risk Profiling</Tab>
          <Tab>Sprint</Tab>
          <Tab>Milestones</Tab>
          <Tab>Resource</Tab>
          <Tab>Phase</Tab>
          <Tab>Updates</Tab>
          <Tab>MoMs</Tab>
          <Tab>Stakeholder</Tab>
          <Tab>Budget</Tab>
          <Tab>Audit History</Tab>
          <Tab>Version History</Tab>
          <Tab>Escalation Matrix</Tab>
          <Tab>CLient Feedback</Tab>
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
            <h1>Project Overview</h1>
            <ProjectOverview project={project} setFetch={setFetch} />

          </TabPanel>

          <TabPanel>
            <h1>Risk Profile</h1>
            {/* <RiskProfile
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            /> */}
          </TabPanel>

          <TabPanel></TabPanel>

          <TabPanel>{/* AUDIT HISTORY COMPONENT */}</TabPanel>

          <TabPanel>{/* VERSION HISTORY COMPONENT */}</TabPanel>

          <TabPanel></TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default ProjectDetails;
