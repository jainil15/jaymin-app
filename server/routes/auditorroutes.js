const express = require("express");
const { protectUser } = require("../middlewares/userProtect");
const auditorController = require("../controllers/projectController");
const budgetController = require("../controllers/budgetController");
const stackholderController = require("../controllers/stackholderController");
const auditHistoryController = require("../controllers/auditHistoryController");
const matrixController = require("../controllers/matrixController");
const riskController = require("../controllers/riskController");
const sprintController = require("../controllers/sprintController");
const versionHistoryController = require("../controllers/versionHistoryController");
const {pdfdownloadcontroller} = require("../controllers/pdfdownloadcontroller");

const router = express.Router();

// Routes for Project
const {
  createProject,
  displayProjects,
  deleteProject,
  editProject,
  fetchOneProject,
} = auditorController;

router.post("/create-project", createProject);
router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);
router.delete("/delete-project/:id", deleteProject);
router.delete("/delete-project/:id", deleteProject);
router.put("/edit-project", editProject);

// Routes for Project Budget
const { createBudget, deleteBudget, editBudget } = budgetController;
router.post("/create-budget/:project_id", createBudget);
router.delete("/delete-budget/:project_id/:budget_id", deleteBudget);
router.put("/edit-budget/:budget_id", editBudget);

// Routes for Project Stackholder
const {
  createStackholder,
  deleteStackholder,
  editStackholder,
  displayStackholder,
} = stackholderController;

router.get("/get-all-stackholder", displayStackholder);
router.post("/create-stackholder/:project_id", createStackholder);
router.delete(
  "/delete-stackholder/:project_id/:stackholder_id",
  deleteStackholder
);
router.put("/edit-stackholder/:stackholder_id", editStackholder);

// Routes for Audit History
const {
  createAuditHistory,
  deleteAuditHistory,
  editAuditHistory,
  displayAuditHistory,
} = auditHistoryController;

router.post("/create-auditHistory/:project_id", createAuditHistory);
router.delete(
  "/delete-auditHistory/:project_id/:auditHistory_id",
  deleteAuditHistory
);
router.put(
  "/edit-auditHistory/:project_id/:auditHistory_id",
  editAuditHistory
);

// Routes for Matrix
const {
  createOperationalMatrix,
  deleteOperationalMatrix,
  editOperationalMatrix,
  createFinancialMatrix,
  deleteFinancialMatrix,
  editFinancialMatrix,
  createTechnicalMatrix,
  deleteTechnicalMatrix,
  editTechnicalMatrix,
} = matrixController;

router.post("/create-operationalMatrix/:project_id", createOperationalMatrix);
router.post("/create-financialMatrix/:project_id", createFinancialMatrix);
router.post("/create-technicalMatrix/:project_id", createTechnicalMatrix);

router.delete(
  "/delete-operationalMatrix/:project_id/:operationalMatrix_id",
  deleteOperationalMatrix
);
router.delete(
  "/delete-financialMatrix/:project_id/:financialMatrix_id",
  deleteFinancialMatrix
);
router.delete(
  "/delete-technicalMatrix/:project_id/:technicalMatrix_id",
  deleteTechnicalMatrix
);

router.put("/edit-operationalMatrix/:operationalMatrix_id", editOperationalMatrix);
router.put("/edit-financialMatrix/:financialMatrix_id", editFinancialMatrix);
router.put("/edit-technicalMatrix/:technicalMatrix_id", editTechnicalMatrix);

// Routes for Risk
const { createRisk, deleteRisk, editRisk } = riskController;

router.post("/create-risk/:project_id", createRisk);
router.delete("/delete-risk/:project_id/:risk_id", deleteRisk);
router.put("/edit-risk/:risk_id", editRisk);

// Routes for Sprint
const { createSprint, deleteSprint, editSprint } = sprintController;

router.post("/create-sprint/:project_id", createSprint);
router.delete("/delete-sprint/:project_id/:sprint_id", deleteSprint);
router.put("/edit-sprint/:sprint_id", editSprint);

// Routes for Version History
const {
  createVersionHistory,
  deleteVersionHistory,
  editVersionHistory,
} = versionHistoryController;

router.post("/create-versionHistory/:project_id", createVersionHistory);
router.delete(
  "/delete-versionHistory/:project_id/:versionHistory_id",
  deleteVersionHistory
);
router.put(
  "/edit-versionHistory/:project_id/:versionHistory_id",
  editVersionHistory
);

// routes for pdf
const {downloadpdf} = require("../controllers/pdfdownloadcontroller");
router.get("/download-pdf/:project_id", downloadpdf);


module.exports = router;