const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  awardedBy: { type: String, required: true },
  files: { type: [String]},
  url:  { type: String }
}, {collection: "awards"});

module.exports = mongoose.model('Award', AwardSchema);





