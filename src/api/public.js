const router = require('express').Router();
const AuthControllers = require('../controllers/auth');
const {
 getAwards,
 getFile,
 getProjets,
 getBiography,
 uploadFile,
 getSkills
} = require('../controllers/core');



router.route('/profile')
.get(getBiography);

router.route('/projects')
.get(getProjets);

router.route('/awards')
.get(getAwards);


router.route('/skills')
.get(getSkills);


router.route('/files/:filename')
.get(getFile);


//Authentication routes
router.route('/login').post(uploadFile.none(), AuthControllers.Login);
router.route('/logout').get(AuthControllers.Logout);
router.route('/refresh').get(AuthControllers.Refresh);

module.exports = router;