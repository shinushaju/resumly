const {
  User,
  AboutUser,
  Education,
  Experience,
  Project,
  Contact
} = require("../models/models")


exports.getUserEmail = (req, res) => {
  User.findById({ _id: req.user_id }).select('email').then((email) => {
    res.send(email);
  });
}

exports.getAllEmails = (req, res) => {
  User.find({}).select('email')
    .then((emails) => {
      res.send(emails);
    });
}

exports.updateCredentials = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body.payload }
  )
    .then((info) => {
      console.log(info);
      res.send({ message: "User credentials updated successfully!" });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

// Delete a user account
exports.deleteAccount = (req, res) => {
  User.findOneAndRemove({
    _id: req.params.id,
  }).then((delete_user) => {
    res.send(delete_user);

    // helper method to delete all user data 
    deleteUserData(delete_user._id);
    res.send({ message: "User data deleted successfully!" });
  });
};

// method to delete all data of a user
let deleteUserData = (_userId) => {
  // delete about information of user from database
  AboutUser.findOneAndRemove({
    _userId,
  }).then(() => {
    console.log("About information of user " + _userId + " is deleted!");
  });

  // delete projects of user from database
  Project.deleteMany({
    _userId,
  }).then(() => {
    console.log("All projects of user " + _userId + " are deleted!");
  });

  // delete experience information of user from database
  Experience.deleteMany({
    _userId,
  }).then(() => {
    console.log("All experiences info of user " + _userId + " are deleted!");
  });

  // delete education information of user from database
  Education.deleteMany({
    _userId,
  }).then(() => {
    console.log("All education info of user " + _userId + " are deleted!");
  });

  // delete education information of user from database
  Contact.deleteMany({
    _userId,
  }).then(() => {
    console.log("All contact info of user " + _userId + " are deleted!");
  });
};
