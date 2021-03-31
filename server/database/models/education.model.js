const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema ({
    school: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    fieldOfStudy: {
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
    grade: {
        type: String,
        required: true
    }
});

const Education = mongoose.model('Education', EducationSchema);

module.exports = { Education };