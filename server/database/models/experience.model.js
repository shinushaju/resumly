const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = { Experience };