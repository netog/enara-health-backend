const Project = require('../models/projects');

// Get all projects   =>  /api/v1/projects
exports.getProjects = async(req, res, next) => {
    const filter = { state: 'Closed' };
    const closedProjects = await Project.aggregate([
        { $match: filter },
        {
            $group: {
                _id: '$name',
                time: { $sum: '$trackedTime' }
            }
        }
    ]);

    if (closedProjects.length === 0) {
        //No closed projects
        res.status(200).json({
            success: false,
            message: 'There are not closed tracked projects'
        });
    } else {
        res.status(200).json({
            success: true,
            total: `${closedProjects.length} projects`,
            data: closedProjects
        });
    }

}

//Get one project   =>  /api/v1/projects/:name
exports.getOneProject = async(req, res, next) => {
    //Find and filter
    var condition = {
        "name": req.params.name,
        "state": 'Closed'
    }
    const foundProject = await Project.find(condition, { _id: 0, trackedTime: 1 });

    if (foundProject.length === 0) {
        //Return error message
        res.status(404).json({
            success: false,
            message: `Project ${req.params.name} does not exist as closed project`
        })
    } else {
        var totalTime = 0;
        for (var i = 0; i < foundProject.length; i++) {
            totalTime = totalTime + foundProject[i].trackedTime;
        }
        //Return success message
        res.status(200).json({
            success: true,
            segments: foundProject.length,
            total: totalTime,
            data: foundProject
        });
    }
}


//Start tracking one project   =>  /api/v1/projects/start
exports.startProject = async(req, res, next) => {

    //Look for existing open project with same name
    var conditions = {
        "name": req.body.name,
        "state": 'Open'
    }
    const foundProject = await Project.findOne(conditions);

    if (foundProject) {
        //Return error message
        res.status(404).json({
            success: false,
            message: `Project ${req.body.name} is already started`
        })

    } else {
        const project = await Project.create(req.body);
        //Return success message
        res.status(200).json({
            success: true
        });
    }

}

//Stop tracking one project   =>  /api/v1/projects/stop
exports.stopProject = async(req, res, next) => {

    const timeNow = new Date();

    var conditions = {
        "name": req.body.name,
        "state": 'Open'
    }

    //Look for existing project
    const foundProject = await Project.findOne(conditions);
    if (foundProject) {
        var timeStart = new Date(foundProject.startDate);
        var diffMs = (timeNow.getTime() - timeStart.getTime());
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        var update = {
            "state": 'Closed',
            "trackedTime": diffMins
        }
        await Project.updateOne(conditions, update);

        res.status(200).json({
            success: true,
            message: `Project lasted ${diffMins} minutes`
        });
    } else {
        //Error: Try to stop a non started project
        res.status(404).json({
            success: false,
            message: `Project ${req.body.name} was not started before`
        });
    }

}