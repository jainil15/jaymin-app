const express = require('express');
const { protectUser } = require('../middlewares/userProtect');
const pmController = require('../controllers/pmcontroller');

const {
  addResource,
  getResources,
  editResource,
  deleteResource,
  addProjectUpdate,
  getProjectUpdates,
  editProjectUpdate,
  deleteProjectUpdate,
  getMomsclients,
  addMomsclient,
  updateMomsclient,
  deleteMomsclient,
} = pmController;

const router = express.Router();

router.post('/add-resource', protectUser, addResource);
router.get('/get-resources', protectUser, getResources);
router.put('/edit-resource/:id', protectUser, editResource);
router.delete('/delete-resource/:id', protectUser, deleteResource);

// New routes for ProjectUpdates
router.post('/add-project-update', protectUser, addProjectUpdate);
router.get('/get-project-updates', protectUser, getProjectUpdates);
router.put('/edit-project-update/:id', protectUser, editProjectUpdate);
router.delete('/delete-project-update/:id', protectUser, deleteProjectUpdate);

// Routes for MOMs client
router.get('/momsclients', getMomsclients);
router.post('/momsclients', addMomsclient);
router.put('/momsclients/:id', updateMomsclient);
router.delete('/momsclients/:id', deleteMomsclient);

// pahase management routes
router.get('/phases', pmController.getAllPhases);
router.post('/phases', pmController.addNewPhase);
router.post('/phases/:id/addRow', pmController.addRowToPhase);
router.get('/phases/:id', pmController.getPhaseById);
router.put('/phases/:id', pmController.updatePhaseById);
router.delete('/phases/:id', pmController.deletePhaseById);

module.exports = router;
