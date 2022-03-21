const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
import questionnaireRouter from './routes/questionnaire.route';
import studentRouter from './routes/student.route'
import loginRouter from './routes/login.route'
import logger from '../utils/generalLogger'

import Student from '../models/student';

const app = express();
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');

app.use(express.json());
app.use('/questionnaires', questionnaireRouter);
app.use('/students', studentRouter);
app.use('/login', loginRouter)
app.get('/', function(req, res) {   // Nuevo
    res.render('pages/auth');
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
  
app.use(passport.initialize());
app.use(passport.session());
  
app.set('view engine', 'ejs');

// These 2 are after error or success
app.get('/success', (req, res) => {
  console.log("Entering success, req.session: "+JSON.stringify(req.session));
  //console.log("req.body content: "+JSON.stringify(req.body))
  let userInfo = req.session.passport.user
  res.status(200).json(userInfo)}
);
app.get('/error', (req, res) => res.send("error logging in"));
  
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // New
    let googleMail = profile.emails[0].value;
    let googleName = profile.name.givenName+" "+profile.name.familyName;
    let student = await Student.findOne({ name: googleName });
    if(!student){
      return cb(null, false)
    }
    let userInfo = {
      id: profile.id,
      mail: googleMail,
      name: googleName,
      status: 'verified'
    };
    return cb(null, userInfo)

    //return done(null, false); // Always fail auth
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    console.log("Entering function after authenticate, in callback");
    console.log("req.session in callback: "+JSON.stringify(req.session));
    // Successful authentication, redirect success.
    req.body.wololo = 'wololo';
    if (req.body.wololo){
      console.log("THERE IS WOLOLO! "+JSON.stringify(req.body));
    }
    res.redirect('/success');
    //res.status(200).json('Exito en login '+JSON.stringify(req.body));
  });



export const start = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
  };

