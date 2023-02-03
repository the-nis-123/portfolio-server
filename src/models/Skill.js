const mongoose = require('mongoose');

const Skill = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  file: { type: String, required: true }
}, {collection: "skills"});

module.exports = mongoose.model('Skill', Skill);





