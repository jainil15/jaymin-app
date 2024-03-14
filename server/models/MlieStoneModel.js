const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    approvalDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    revisedCompletionDate: {
      type: Date,
    },
    comments: {
      type: String,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },  
  },
  { timestamps: true, versionKey: false }
);
const MilestoneModel = mongoose.model("Milestone", MilestoneSchema);
module.exports = MilestoneModel;
