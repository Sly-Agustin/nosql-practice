const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
import Student from '../../models/student';
import logger from '../../utils/authLogger'

let refreshTokenArr = [];

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token==null) {
    return res.status(401).json({ message: 'Error, no token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token'});
    }
    req.user=user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h'});
}

async function loginController(req, res){
  // Assumes the user has been authenticated by google/facebook/etc

  const userId = req.body.userId;
  const user = {userId: userId}

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokenArr.push(refreshToken);   // This should be done with database, doing it locally to test

  res.status(200).json({ message: 'logged succesfully', accessToken: accessToken, refreshToken: refreshToken });
};

function refreshTokenController(req, res) {
  const refreshToken = req.body.token;
  if(refreshToken==null) {
    return res.status(401).json({ message: "no token provided to refresh" });
  }
  if(!refreshTokenArr.includes(refreshToken)) {
    return res.status(403).json({ message: "no refresh tokens like the one received exists within the database" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token'});
    }
    const accessToken = generateAccessToken({userId: user.userId});   // We dont use the whole user because it has irrelevant info
    res.status(200).json({newToken: accessToken})
  });
}

function deleteRefreshToken(req, res) {
  refreshTokenArr = refreshTokenArr.filter(token => token !== req.body.token);
  res.status(200).json({ message: "Token deleted succesofully" });
}

async function getIdBasedOnName(req, res, next){
  logger.info("getIdBasedOnName req.body: "+JSON.stringify(req.body));
  let userName=req.body.name;
  let user = await Student.findOne({name: userName});
  let userId;
  if(user==null){
    logger.log("Studen with name: "+userName+" does not exist in the database");
    return res.status(404).json({error: 'Student with that name does not exist'});
  }
  userId = user._id;
  req.body.userId=userId;
  next();
}

export {loginController, authenticateToken, refreshTokenController, deleteRefreshToken, getIdBasedOnName}