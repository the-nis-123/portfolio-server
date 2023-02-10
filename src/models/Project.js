const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  startDate: { type: String, required: true },
  isOnGoing: { type: Boolean, required: true },
  endDate: { type: String, required: false },
  file: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  achievements: { type: String, required: true },
  teckStack: { type: [mongoose.ObjectId], ref:"Skill",  required: false },
  activeUrl: { type: String },
  sourceUrl: { type: String }
}, {collection: "projects"});

module.exports = mongoose.model('Project', ProjectSchema);
