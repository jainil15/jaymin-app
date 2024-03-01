const express = require('express');
const { protectUser } = require('../middlewares/userProtect');
const {
  addResource,
  getResources,
  // ... (other functions like getResource, editResource, deleteResource)
} = require('../controllers/pmcontroller');

const router = express.Router();

router.post('/add-resource', protectUser, addResource);
router.get('/get-resources', protectUser, getResources);
// ... (other routes for getResource, editResource, deleteResource)

module.exports = router;
