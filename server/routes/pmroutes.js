const express = require("express");
const { protectUser } = require("../middlewares/userProtect");
const pmController = require("../controllers/pmcontroller");
const ResourceController = require("../controllers/Resourcecontroller");
const RiskController = require("../controllers/riskController");
const SprintController = require("../controllers/sprintController");
const MileStoneController = require("../controllers/MileStoneController");

const {
  addProjectUpdate,
  getProjectUpdates,
  editProjectUpdate,
  deleteProjectUpdate,
  getMomsclients,
  addMomsclient,
  updateMomsclient,
  deleteMomsclient,
  addPhase,
  getPhases,
  getPhasesByPhaseNumber,
  editPhase,
  deletePhase,
} = pmController;

const router = express.Router();

router.post("/add-project-update", protectUser, addProjectUpdate);
router.get("/get-project-updates", protectUser, getProjectUpdates);
router.put("/edit-project-update/:id", protectUser, editProjectUpdate);
router.delete("/delete-project-update/:id", protectUser, deleteProjectUpdate);

router.get("/momsclients", protectUser, getMomsclients);
router.post("/momsclients", protectUser, addMomsclient);
router.put("/momsclients/:id", protectUser, updateMomsclient);
router.delete("/momsclients/:id", protectUser, deleteMomsclient);

router.post("/add-phase", protectUser, addPhase);
router.get("/get-phases", protectUser, getPhases);
router.get("/get-phases/:phaseNumber", protectUser, getPhasesByPhaseNumber);
router.put("/edit-phase/:id", protectUser, editPhase);
router.delete("/delete-phase/:id", protectUser, deletePhase);

const { addResource, getResources, editResource, deleteResource } =
  ResourceController;

router.post("/add-resource", protectUser, addResource);
router.get("/get-resources", protectUser, getResources);
router.put("/edit-resource/:id", protectUser, editResource);
router.delete("/delete-resource/:id", protectUser, deleteResource);

const { createRisk, editRisk, deleteRisk } = RiskController;

router.post("/create-risk/:project_id", createRisk);
router.delete("/delete-risk/:project_id/:risk_id", deleteRisk);
router.put("/edit-risk/:risk_id", editRisk);

const { createSprint, deleteSprint, editSprint } = SprintController;

router.post("/create-sprint/:project_id", createSprint);
router.delete("/delete-sprint/:project_id/:sprint_id", deleteSprint);
router.put("/edit-sprint/:sprint_id", editSprint);

const { createMilestone, deleteMilestone, editMilestone } = MileStoneController;

router.post("/create-milestone/:project_id", createMilestone);
router.delete("/delete-milestone/:project_id/:milestone_id", deleteMilestone);
router.put("/edit-milestone/:milestone_id", editMilestone);

module.exports = router;
