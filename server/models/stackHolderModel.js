const mongoose = require("mongoose");

const StackHolderSchema = new mongoose.Schema(
  {
    role: {
      type: String,
    },
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    // Reference to Project model
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true, versionKey: false }
);

const StackHolderModel = mongoose.model("StackHolder", StackHolderSchema);
module.exports = StackHolderModel;
