const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 500,
        trim: true
    }
});

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = { Experience };