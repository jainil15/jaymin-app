const mongoose = require('mongoose');

const clientfeedbackSchema = new mongoose.Schema({
    feedbackType: {
        type: String,
        required: true
    },
    nameofclient: {
        type: String,
        required: true
    },
    projectname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    detailedFeedback: {
        type: String,
        required: true
    },
    actionTaken: {
        type: String,
        default: 'No action taken',
    },
    closureDate: {
        type: Date,
        default: null,
    },
});

// Use the correct model name
const ClientFeedback = mongoose.model('ClientFeedback', clientfeedbackSchema);

module.exports = ClientFeedback;
