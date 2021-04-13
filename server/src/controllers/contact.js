const { Contact } = require('../models/contact.model');

exports.getContactInfo = (req, res) => {
    Contact.find({ _userId: req.user_id }).then((contacts) => {
        res.send(contacts);
    });
};


exports.saveContactInfo = (req, res) => {
    let type = req.body.contactInfo.type;
    let link = req.body.contactInfo.link;
    let contactsInfo = new Contact({
        _userId: req.user_id,
        type,
        link,
    });

    contactsInfo.save().then((contacts) => {
        res.send(contacts);
        console.log("New contact added to profile!");
    });
}

exports.updateContactInfo = (req, res) => {
    Contact.findByIdAndUpdate(
        { _id: req.params.id, _userId: req.user_id },
        { $set: req.body.payload }
    )
        .then(() => {
            res.send({ message: "Contact updated successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}

exports.deleteContactInfo = (req, res) => {
    Contact.findOneAndRemove({ _id: req.params.id, _userId: req.user_id })
        .then(() => {
            res.send({ message: "Contact deleted successfully!" });
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
}

exports.getContactData = (req, res) => {
    Contact.find({ _userId: req.params.userId })
        .then((data) => {
            res.send(data)
        })
}