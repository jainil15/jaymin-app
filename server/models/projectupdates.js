// models/projectupdates.js
const mongoose = require('mongoose');

const projectUpdatesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  generalUpdates: {
    type: String,
    required: true,
  },
});

const ProjectUpdates = mongoose.model('ProjectUpdates', projectUpdatesSchema);

module.exports = ProjectUpdates;
