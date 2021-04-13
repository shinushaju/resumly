const { Experience } = require('../models/experience.model');

exports.getExperienceInfo = (req, res) => {
    Experience.find({ _userId: req.user_id })
        .then((experienceItems) => {
            res.send(experienceItems);
        })
};

exports.saveExperienceInfo = (req, res) => {
    let title = req.body.experienceInfo.title;
    let type = req.body.experienceInfo.type;
    let companyName = req.body.experienceInfo.companyName;
    let location = req.body.experienceInfo.location;
    let startDate = req.body.experienceInfo.startDate;
    let endDate = req.body.experienceInfo.endDate;
    let description = req.body.experienceInfo.description;

    let newExperienceInfo = new Experience({
        _userId: req.user_id,
        title,
        type,
        companyName,
        location,
        startDate,
        endDate,
        description,
    });

    newExperienceInfo.save().then(() => {
        res.send({ message: "New experience details added successfully!" });
    });
}

exports.updateExperienceInfo = (req, res) => {
    Experience.findOneAndUpdate(
        { _id: req.params.id, _userId: req.user_id },
        { $set: req.body.payload }
    )
        .then(() => {
            res.send({ message: "Experience details updated successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}

exports.deleteExperienceInfo = (req, res) => {
    Experience.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id,
    }).then(() => {
        res.send({ message: "Experience details deleted successfully!" });
    });
}

exports.getExperienceData = (req, res) => {
    Experience.find({ _userId: req.params.userId })
        .then((data) => {
            res.send(data)
        })
}