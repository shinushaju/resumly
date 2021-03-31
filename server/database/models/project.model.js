const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectTags: [{}],
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project };