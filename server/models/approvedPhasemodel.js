// models/approvedPhase.model.js
const mongoose = require('mongoose');

const approvedPhaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number, required: true },
  resources: [{
    number: { type: Number, required: true },
    role: { type: String, required: true },
    availability: { type: Number, required: true },
    duration: { type: String, required: true },
  }],
});

const ApprovedPhase = mongoose.model('ApprovedPhase', approvedPhaseSchema);

module.exports = ApprovedPhase;
