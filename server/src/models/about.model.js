const mongoose = require("mongoose");

const AboutUserSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true,
    },
    displayImage: {
        type: String,
        required: false,
    },
    imageType: {
        type: String,
        required: false,
    },
    fullName: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true,
    },
    designation: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true,
    },
    location: {
        type: String,
        required: false,
        maxlength: 50,
        trim: true,
    },
    bio: {
        type: String,
        required: false,
        maxlength: 749,
        trim: true,
    },
});

const AboutUser = mongoose.model("AboutUser", AboutUserSchema);

module.exports = { AboutUser };
