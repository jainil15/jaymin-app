// models/phasemodel.js
const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema(
  {
    phaseNumber: {
      type: Number,
      required: true,
    },
    numberOfResources: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    availabilityPercentage: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Phase = mongoose.model('Phase', phaseSchema);

module.exports = Phase;
