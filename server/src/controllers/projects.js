const { Project } = require('../models/project.model');

exports.getProjectInfo = (req, res) => {
  Project.find({ _userId: req.user_id }).then((projectItems) => {
    res.send(projectItems);
  });
};


exports.saveProjectInfo = (req, res) => {
  let projectCover = req.body.projectInfo.projectCover;
  let imageType = req.body.projectInfo.imageType;
  let projectDate = req.body.projectInfo.projectDate;
  let projectName = req.body.projectInfo.projectName;
  let url = req.body.projectInfo.url;
  let description = req.body.projectInfo.description;

  let newProjectInfo = new Project({
    _userId: req.user_id,
    projectCover,
    imageType,
    projectDate,
    projectName,
    url,
    description,
  });

  newProjectInfo.save().then(() => {
    res.send({ message: "New project details added successfully!" });
  });
}

exports.updateProjectInfo = (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.params.id, _userId: req.user_id },
    { $set: req.body.payload }
  )
    .then(() => {
      res.send({ message: "Project details updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

exports.deleteProjectInfo = (req, res) => {
  Project.findOneAndRemove({ _id: req.params.id, _userId: req.user_id })
    .then(() => {
      res.send({ message: "Project details deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

exports.getProjectData = (req, res) => {
  Project.find({ _userId: req.params.userId })
    .then((data) => {
      res.send(data)
    })
}