const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const ResourceModel = mongoose.model("Resource", ResourceSchema);
module.exports = ResourceModel;
