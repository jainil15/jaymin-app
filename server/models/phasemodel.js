const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  numberOfResources: { type: Number, required: true },
  role: { type: String, required: true },
  availabilityPercentage: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const phaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  approvedTeam: { type: String, required: true },
  resources: { type: [resourceSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Phase = mongoose.model('Phase', phaseSchema);

module.exports = Phase;
