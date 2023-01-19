const getProjets = require('./getProjects');
const getFile = require('./getFile');
const getAwards = require('./getAwards');
const getBiography = require('./getBiography');

const editBiography = require('./editBiography');
const editProject = require('./editProject');
const editAward = require('./editAward');

const deleteAward = require('./deleteAward');
const deleteFile = require('./deleteFile');
const deleteProject = require('./deleteProject');

const newAward = require('./newAward');
const newProject = require('./newProject');
const addBiography = require('./addBiography');
const uploadFile = require('./uploadFile');




module.exports = {
  getProjets,
  getFile,
  getAwards,
  getBiography,
  editBiography,
  editProject,
  editAward,
  deleteAward,
  deleteFile,
  deleteProject,
  newAward,
  newProject,
  addBiography,
  uploadFile
}