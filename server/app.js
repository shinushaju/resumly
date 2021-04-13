const express = require("express");
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const jwt = require("jsonwebtoken");

const { mongoose } = require("./src/config/db");
const { User } = require("./src/models/users.model");


const { signup, login } = require("./src/controllers/auth");
const { deleteAccount, getUserEmail, getAllEmails, updateCredentials } = require('./src/controllers/user')
const { getAboutInfo, saveAboutInfo, updateAboutInfo, getUsername, getAllUsernames, getAboutData } = require('./src/controllers/about');
const { getProjectInfo, saveProjectInfo, updateProjectInfo, deleteProjectInfo, getProjectData } = require('./src/controllers/projects');
const { getExperienceInfo, saveExperienceInfo, updateExperienceInfo, deleteExperienceInfo, getExperienceData } = require('./src/controllers/experience');
const { getEducationInfo, saveEducationInfo, updateEducationInfo, deleteEducationInfo, getEducationData } = require('./src/controllers/education');
const { getContactInfo, saveContactInfo, updateContactInfo, deleteContactInfo, getContactData } = require('./src/controllers/contact');

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
    extended: true,
  })
);
app.use(express.json({ limit: "50mb" }));

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );
  next();
});



// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
  let token = req.header("x-access-token");
  // verify the JWT
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
    if (err) {
      res.status(401).send(err);
    } else {
      req.user_id = decoded._id;
      next();
    }
  });
};

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
  // grab the refresh token from the request header
  let refreshToken = req.header("x-refresh-token");
  // grab the _id from the request header
  let _id = req.header("_id");

  User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          error:
            "User not found!",
        });
      }

      req.user_id = user._id;
      req.userObject = user;
      console.log(req.userObject);
      req.refreshToken = refreshToken;

      let isSessionValid = false;

      user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
          // check if the session has expired
          if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
            // refresh token has not expired
            isSessionValid = true;
          }
        }
      });
      if (isSessionValid) {
        // the session is VALID - call next() to continue with processing this web request
        next();
      } else {
        // the session is not valid
        return Promise.reject({
          error: "Refresh token has expired or the session is invalid",
        });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

//AUTH ROUTES 

app.post('/signup', signup);
app.post('/login', login);

// USER ROUTES
app.get("/user/email", authenticate, getUserEmail);
app.get("/emails", getAllEmails);
app.patch("/user/:id/credentials", authenticate, updateCredentials);
app.delete('/user/:id', authenticate, deleteAccount)

// Get username of a single user
app.get("/user/username", authenticate, getUsername);
// Get  all usernames in db
app.get("/users", authenticate, getAllUsernames);

// ABOUT ROUTES
app.get('/user/about', authenticate, getAboutInfo);
app.post('/user/about', authenticate, saveAboutInfo);
app.patch('/user/about/:id', authenticate, updateAboutInfo);

// PROJECT ROUTES
app.get('/user/projects', authenticate, getProjectInfo);
app.post('/user/projects', authenticate, saveProjectInfo);
app.patch('/user/projects/:id', authenticate, updateProjectInfo);
app.delete('/user/projects/:id', authenticate, deleteProjectInfo);

// WORK EXPERIENCE ROUTES
app.get('/user/experience', authenticate, getExperienceInfo);
app.post('/user/experience', authenticate, saveExperienceInfo);
app.patch('/user/experience/:id', authenticate, updateExperienceInfo);
app.delete('/user/experience/:id', authenticate, deleteExperienceInfo);


// EDUCATION ROUTES
app.get('/user/education', authenticate, getEducationInfo);
app.post('/user/education', authenticate, saveEducationInfo);
app.patch('/user/education/:id', authenticate, updateEducationInfo);
app.delete('/user/education/:id', authenticate, deleteEducationInfo);


// CONTACTS ROUTES
app.get('/user/contact', authenticate, getContactInfo);
app.post('/user/contact', authenticate, saveContactInfo);
app.patch('/user/contact/:id', authenticate, updateContactInfo);
app.delete('/user/contact/:id', authenticate, deleteContactInfo);


/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get("/user/access-token", verifySession, (req, res) => {
  // we know that the user/caller is authenticated and we have the user_id and user object available to us
  req.userObject
    .generateAccessAuthToken()
    .then((accessToken) => {
      res.header("x-access-token", accessToken).send({ accessToken });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// PREVIEW PROFILE ROUTES
app.get('/user/:username/about', getAboutData);
app.get('/user/:userId/projects', getProjectData);
app.get('/user/:userId/experience', getExperienceData);
app.get('/user/:userId/education', getEducationData);
app.get('/user/:userId/contacts', getContactData);


const port = process.env.PORT;
app.listen(port, () => {
  console.log('Server is running at: %d', port);
});
