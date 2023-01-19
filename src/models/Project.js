const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  isOnGoing: { type: Boolean, required: true },
  endDate: { type: String, required: false },
  files: { type: [String], required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  achievements: { type: String, required: true },
  teckStack: { type: [String], required: true },
  activeUrl: { type: String },
  sourceUrl: { type: String }
}, {collection: "userinfo"});

module.exports = mongoose.model('Project', ProjectSchema);
