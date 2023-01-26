const router = require('express').Router();

const {
  uploadFile,
  editAward,
  editProject,
  deleteAward,
  deleteFile,
  deleteProject,
  newAward,
  newProject,
  editBiography,
  addBiography
} = require('../controllers/core');



router.route('/profile')
.post(uploadFile.fields([
  {name: "files", maxCount: 12},
  {name: "avatar", maxCount: 1},
  {name: "resume", maxCount: 1}
]), addBiography)
.patch(uploadFile.fields([
  {name: "files", maxCount: 12},
  {name: "avatar", maxCount: 1},
  {name: "resume", maxCount: 1}
]), editBiography);


router.route('/projects')
.post(uploadFile.fields([{name: "files", maxCount: 12}]), newProject);


router.route('/projects/:id')
.patch(uploadFile.fields([{name: "files", maxCount: 12}]), editProject)
.delete(deleteFile, deleteProject);


router.route('/awards')
.post(uploadFile.fields([{name: "files", maxCount: 12}]), newAward);


router.route('/awards/:id')
.patch(uploadFile.fields([{name: "files", maxCount: 12}]), editAward)
.delete(deleteFile, deleteAward);


router.route('/files')
.post(uploadFile.fields([{name: "files", maxCount: 12}]), editBiography);


router.route('/files/:id').delete(deleteFile);



module.exports = router;