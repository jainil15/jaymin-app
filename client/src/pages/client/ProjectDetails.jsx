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


// import components
import Stakeholder from "../project_manager/Project/DisplayStackholder";
import AuditHistory from "../project_manager/Project/DisplayAudithistory";


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
          <Tab>Stakeholder</Tab>
          <Tab>Audit History</Tab>
          <Tab>Vesion History</Tab>
          <Tab>Project Updates</Tab>
          <Tab>Client Feedback</Tab>
          {/* <Tab>MoMs CLient</Tab> */}
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
          {/* PROJECT OVERVIEW COMPONENT */}
          <TabPanel>
            <Stakeholder
              project={project}
            />
          </TabPanel>
          {/* Audity History */}
          <TabPanel>
            <AuditHistory
              project={project}
            />
          </TabPanel>

          {/* version history */}
          <TabPanel>
            {/* <VersionHistory project={project} /> */}
          </TabPanel>
          {/* updates */}
          <TabPanel>
            <h1>Project Updates</h1>
            {/* <ProjectUpdate
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            /> */}
          </TabPanel>

          {/* STAKEHOLDER COMPONENT */}
          

          {/* client feedback */}
          <TabPanel>
            <h1>Client Feedback</h1>
          </TabPanel>

          {/* momsclient */}
          {/* <TabPanel>
            <MomsClient
              project={project}
              setFetch={setFetch}
              updateProjectData={updateProjectData}
            />
          </TabPanel> */}
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default ProjectDetails;
