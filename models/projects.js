const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Project name.'],
        trim: true,
        maxlength: [100, 'Project name can not exceed 100 characters.']
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    lastDate: {
        type: Date
    },
    trackedTime: {
        type: Number,
        default: 0
    },
    state: {
        type: String,
        required: [true],
        enum: {
            values: [
                'Open',
                'Closed'
            ]
        },
        default: 'Open'
    }

});

module.exports = mongoose.model('Project', projectSchema);