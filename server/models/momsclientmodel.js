

const mongoose = require('mongoose');

const momsclientSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  Duration: { type: String, required: true },
  MomLink: { type: String, required: true },
  Comments: { type: String, required: true },
});

const Momsclient = mongoose.model('Momsclient', momsclientSchema);

module.exports = Momsclient;
