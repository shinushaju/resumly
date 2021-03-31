const express = require('express');
const app = express();
const  { mongoose } = require('./database/db');

const { Education } = require('./database/models/education.model');
const { Experience } = require('./database/models/experience.model');
const { Project } = require('./database/models/project.model')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// PROJECT ROUTES

app.get('/projects', (req, res) => {
    Project.find()
    .then((projectItems) => {
        res.send(projectItems);
    });
})

app.post('/projects', (req, res) => {
    let projectName = req.body.projectInfo.projectName;
    let url = req.body.projectInfo.url;
    let description = req.body.projectInfo.description;
    let projectTags = req.body.projectInfo.projectTags;

    let newProjectInfo = new Project({
        projectName,
        url,
        description,
        projectTags
    });

    newProjectInfo.save()
    .then((newProjectItem) => {
        res.send(newProjectItem);
    })
})

app.patch('/projects/:id', (req, res) => {
    Project.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(()=> {
        res.sendStatus(200);
    })
})

app.delete('/projects/:id', (req, res) => {
    Project.findOneAndRemove({ _id: req.params.id })
    .then((removedProjectItem)=> {
        res.send(removedProjectItem);
    })
})


// WORK EXPERIENCE ROUTES

app.get('/experience', (req, res) => {
    Experience.find()
    .then((experienceItems) => {
        res.send(experienceItems);
    });
})

app.post('/experience', (req, res) => {
    let title = req.body.experienceInfo.title;
    let type = req.body.experienceInfo.type;
    let companyName = req.body.experienceInfo.companyName;
    let location = req.body.experienceInfo.location;
    let startDate = req.body.experienceInfo.startDate;
    let endDate = req.body.experienceInfo.endDate;
    let description = req.body.experienceInfo.description;

    let newExperienceInfo = new Experience({
        title,
        type,
        companyName,
        location,
        startDate,
        endDate,
        description
    });

    newExperienceInfo.save()
    .then((newExperienceItem) => {
        res.send(newExperienceItem);
    })
})

app.patch('/experience/:id', (req, res) => {
    Experience.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(()=> {
        res.sendStatus(200);
    })
})

app.delete('/experience/:id', (req, res) => {
    Experience.findOneAndRemove({ _id: req.params.id })
    .then((removedExperienceItem)=> {
        res.send(removedExperienceItem);
    })
})

// EDUCATION ROUTES

app.get('/education', (req, res) => {
    Education.find()
    .then((educationItems) => {
        res.send(educationItems);
    });
})

app.post('/education', (req, res) => {
    let school = req.body.educationInfo.school;
    let degree = req.body.educationInfo.degree;
    let fieldOfStudy = req.body.educationInfo.fieldOfStudy;
    let startDate = req.body.educationInfo.startDate;
    let endDate = req.body.educationInfo.endDate;
    let grade = req.body.educationInfo.grade;

    let newEducationInfo = new Education({
        school,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        grade
    });

    newEducationInfo.save()
    .then((newEducationItem) => {
        res.send(newEducationItem);
    })
})

app.patch('/education/:id', (req, res) => {
    Education.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(()=> {
        res.sendStatus(200);
    })
})

app.delete('/education/:id', (req, res) => {
    Education.findOneAndRemove({ _id: req.params.id })
    .then((removedEducationItem)=> {
        res.send(removedEducationItem);
    })
})

app.listen(3000, ()=> {
    console.log("Server is running at port 3000");
})