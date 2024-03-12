const mongoose = require("mongoose");

const RiskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    severity: {
      type: String,
    },
    impact: {
      type: String,
    },
    remedialSteps: {
      type: String,
    },
    status: {
      type: String,
    },
    closureDate: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);
const RiskModel = mongoose.model("Risk", RiskSchema);
module.exports = RiskModel;
