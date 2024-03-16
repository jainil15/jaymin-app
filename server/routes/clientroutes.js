const express = require("express");
const { protectUser } = require("../middlewares/userProtect");
const projectController = require("../controllers/projectController");
const clientFeedbackController = require("../controllers/clientFeedbackController");

const router = express.Router();


// Project Routes
const { displayProjects, fetchOneProject } = projectController; // Changed to lowercase

router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);



// ALL FUNCTIONS
const {
    createClientFeedback,
    deleteClientFeedback,
    editClientFeedback,
} = clientFeedbackController;

// CLIENT FEEDBACK ROUTES
router.post("/:project_id", createClientFeedback);

//DELETE CLIENT FEEDBACK
router.delete("/:project_id/:clientFeedback_id", deleteClientFeedback);

//EDIT CLIENT FEEDBACK
router.put("/:clientFeedback_id", editClientFeedback);

module.exports = router;