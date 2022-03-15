import {findQuestionnaireIfExists, getDreamControllerById} from '../getDreamControllerById';
import Questionnaire from '../../models/dream';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function idVerification(possibleId) {
  const id = possibleId;
  if(!mongoose.Types.ObjectId.isValid(id)){
      return null
  }
  return id;
}

async function authenticateQuestionnaireUser(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // The [1] is because is the payload of the token, 0 is header, 2 signature

  if (token==null) {
    return res.status(401).json({ message: 'Error, no token provided' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token'});
    }
    req.user=user;
    
    /* This is not the best way to do this, however it's the only way right now, if we use getDreamControllerById
    we will consume the "res", and there is no way of creating a fake one. Maybe refactoring the original controller
    could solve this in an elegant way... but for now this stays */
    let id = idVerification(req.params.id);
    if(id==null){
      return res.status(400).json({error: 'ID not valid. Not ObjectId type'});
    }
    let questionnaire = await findQuestionnaireIfExists(Questionnaire, id);
    if(questionnaire==null){
      return res.status(404).json({error: 'Questionnaire does not exist'});
    }

    if(questionnaire.userId==user.userId){
      next();
    }
    else{
      return res.status(401).json({ message: 'Permission denied, user cannot see this questionnaire'});
    }
  });
}

export { authenticateQuestionnaireUser }