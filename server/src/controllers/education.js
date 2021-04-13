const { Education } = require('../models/education.model');

exports.getEducationInfo = (req, res) => {
    Education.find({ _userId: req.user_id }).then((educationItems) => {
        res.send(educationItems);
    });
};

exports.saveEducationInfo = (req, res) => {
    let school = req.body.educationInfo.school;
    let degree = req.body.educationInfo.degree;
    let fieldOfStudy = req.body.educationInfo.fieldOfStudy;
    let startDate = req.body.educationInfo.startDate;
    let endDate = req.body.educationInfo.endDate;
    let grade = req.body.educationInfo.grade;

    let newEducationInfo = new Education({
        _userId: req.user_id,
        school,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade,
    });

    console.log(newEducationInfo);

    newEducationInfo.save().then(() => {
        res.send({ message: "New education details added successfully!" });
    });
}

exports.updateEducationInfo = (req, res) => {
    Education.findOneAndUpdate(
        { _id: req.params.id, _userId: req.user_id },
        { $set: req.body.payload }
    )
        .then(() => {
            res.send({ message: "Education details updated successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}

exports.deleteEducationInfo = (req, res) => {
    Education.findOneAndRemove({ _id: req.params.id, _userId: req.user_id })
        .then(() => {
            res.send({ message: "Education details deleted successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}


exports.getEducationData = (req, res) => {
    Education.find({ _userId: req.params.userId })
        .then((data) => {
            res.send(data)
        })
}