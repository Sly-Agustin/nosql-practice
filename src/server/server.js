const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
import questionnaireRouter from './routes/questionnaire.route';
import studentRouter from './routes/student.route'
import loginRouter from './routes/login.route'
import logger from '../utils/generalLogger'
import authRouter from './routes/auth.route';

import Student from '../models/student';

const app = express();
const port = process.env.PORT;
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');

app.use(express.json());
app.use('/questionnaires', questionnaireRouter);
app.use('/students', studentRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.get('/', function(req, res) {   // Nuevo
    res.render('pages/auth');
});
app.get('/error', (req, res) => res.send("error logging in"));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));
app.use(passport.initialize());
app.use(passport.session());
  
app.set('view engine', 'ejs');
  
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
  }
));

/*const FacebookStrategy = require('passport-facebook');
passport.use(new FacebookStrategy({
  clientID: process.env['FACEBOOK_APP_ID'],
  clientSecret: process.env['FACEBOOK_APP_SECRET'],
  callbackURL: 'https://www.example.com/oauth2/redirect/facebook'
},
async function(accessToken, refreshToken, profile, cb) {
  let facebookMail = profile.emails[0].value;
  let facebookName = profile.name.givenName+" "+profile.name.familyName;
  let student = await Student.findOne({ name: facebookName });
  if(!student){
    return cb(null, false)
  }
  let userInfo = {
    id: profile.id,
    mail: facebookMail,
    name: facebookName,
    status: 'verified'
  };
  return cb(null, userInfo)
}))*/

export const start = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
  };