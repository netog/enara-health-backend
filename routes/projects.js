const express = require('express');
const router = express.Router();

//Import project controller methods
const {
    getProjects,
    getOneProject,
    startProject,
    stopProject

} = require('../controllers/projectController');

//Manage routes
router.route('/projects').get(getProjects);
router.route('/projects/:name').get(getOneProject);
router.route('/projects/start').post(startProject);
router.route('/projects/stop').post(stopProject);
module.exports = router;