const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact:  { type: String, required: true },
  location:  { type: String, required: true },
  avatar: {type: String},
  resume: { type: String },
  gallery: { type: [String] },
  refreshToken: [String],
  intro: {type: String},
  motivation: {type: String},
  hobbies: {type: [String]},
  skills: {type: [Object]},
  otherSkills: {type: [String]},
  education: {type: [Object]},
  socialHandles: {type: [Object]},
  highlights: {type: [Object]}
}, {collection: "userinfo"});

module.exports = mongoose.model('Biography', BioSchema);





