// models/resources.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
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

    projects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },

  },
  { timestamps: true, versionKey: false }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
