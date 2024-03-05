const express = require('express');
const { protectUser } = require('../middlewares/userProtect');
const clientController = require('../controllers/clientcontroller');

const {
    addClientFeedback,
    getClientFeedbacks,
    editClientFeedback,
    deleteClientFeedback,
} = clientController;

const router = express.Router();

router.post('/add-clientfeedback', protectUser, addClientFeedback);
router.get('/get-clientfeedbacks', protectUser, getClientFeedbacks);
router.put('/edit-clientfeedback/:id', protectUser, editClientFeedback);
router.delete('/delete-clientfeedback/:id', protectUser, deleteClientFeedback);

module.exports = router;
