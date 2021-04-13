const { AboutUser } = require('../models/about.model');

exports.getAboutInfo = (req, res) => {
    AboutUser.find({ _userId: req.user_id }).then((about_info) => {
        res.send(about_info);
    });
};

exports.saveAboutInfo = (req, res) => {
    let username = req.body.aboutInfo.username;
    let fullName = req.body.aboutInfo.fullName;
    let designation = req.body.aboutInfo.designation;
    let location = req.body.aboutInfo.location;
    let bio = req.body.aboutInfo.bio;

    let newUserAbout = new AboutUser({
        username,
        fullName,
        designation,
        location,
        bio,
        _userId: req.user_id,
    });
    newUserAbout
        .save()
        .then((about) => {
            res.send(about);
        })
        .catch((e) => {
            res.send(e);
        });
}


exports.updateAboutInfo = (req, res) => {
    AboutUser.findByIdAndUpdate(
        { _id: req.params.id, _userId: req.user_id },
        { $set: req.body.payload }
    )
        .then((info) => {
            res.send({ message: "About information updated successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}


exports.getUsername = (req, res) => {
    AboutUser.findOne({ _userId: req.user_id }).select('username').then((user) => {
        res.send(user);
    });
}

exports.getAllUsernames = (req, res) => {
    AboutUser.find({}).select(['username', '_userId'])
        .then((users) => {
            res.send(users);
        });
}

exports.getAboutData = (req, res) => {
    AboutUser.findOne({ username: req.params.username })
        .then((data) => {
            res.send(data)
        })
}