const express = require("express");
const { protectUser } = require("../middlewares/userProtect");
const clientController = require("../controllers/clientController"); // Corrected file name
const projectController = require("../controllers/projectController"); // Corrected file name

const router = express.Router();

// Client Feedback Routes
const {
  addClientFeedback,
  getClientFeedbacks,
  editClientFeedback,
  deleteClientFeedback,
} = clientController;

router.post("/add-client-feedback", protectUser, addClientFeedback); 
router.get("/get-client-feedbacks", protectUser, getClientFeedbacks); 
router.put("/edit-client-feedback/:id", protectUser, editClientFeedback);
router.delete("/delete-client-feedback/:id", protectUser, deleteClientFeedback);

// Project Routes
const { displayProjects, fetchOneProject } = projectController; // Changed to lowercase

router.get("/display-projects", displayProjects);
router.get("/fetch-project/:id", fetchOneProject);

module.exports = router;
