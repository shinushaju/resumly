const mongoose = require('mongoose');

const Contact2Schema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
});

const Contact = mongoose.model('Contact', Contact2Schema);

module.exports = { Contact };