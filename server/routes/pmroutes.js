const express = require('express');
const { protectUser } = require('../middlewares/userProtect');
const {
  addResource,
  getResources,
  getResource,
  editResource,
  deleteResource,
} = require('../controllers/pmcontroller');

const router = express.Router();

router.post('/add-resource', protectUser, addResource);
router.get('/get-resources', protectUser, getResources);
router.get('/get-resource/:id', protectUser, getResource);
router.put('/edit-resource/:id', protectUser, editResource);
router.delete('/delete-resource/:id', protectUser, deleteResource);

module.exports = router;

