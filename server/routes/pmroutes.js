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
  addPhase,
  getPhases,
  getPhasesByPhaseNumber,
  editPhase,
  deletePhase,
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
router.get('/momsclients', protectUser, getMomsclients);
router.post('/momsclients', protectUser, addMomsclient);
router.put('/momsclients/:id', protectUser, updateMomsclient);
router.delete('/momsclients/:id', protectUser, deleteMomsclient);

// pahase management routes
router.post('/add-phase', protectUser, addPhase);
router.get('/get-phases', protectUser, getPhases);
router.get('/get-phases/:phaseNumber', protectUser, getPhasesByPhaseNumber);
router.put('/edit-phase/:id', protectUser, editPhase);
router.delete('/delete-phase/:id', protectUser, deletePhase);



module.exports = router;

