const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  projectCover: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  projectDate: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: false,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200,
    required: true,
    trim: true
  }
});


const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
