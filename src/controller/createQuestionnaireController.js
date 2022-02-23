import Questionnaire from '../models/dream';
const mongoose = require('mongoose');

function getErrorsFromValidation(error) {
  let errorsMessage = {}
  let keys = Object.keys(error.errors);
  for(let i = 0; i<keys.length; i++) {
    let specificErrorName=keys[i];
    let specificError = error.errors[specificErrorName];
    let messageError = specificError.message
    errorsMessage[keys[i]]=messageError;
  }
  return {errors: errorsMessage}
}

const createQuestionnaire = async (questionnaireModel, questionnaireData) => {
  const questionnaire = new questionnaireModel(questionnaireData);
  let error = questionnaire.validateSync();
  if(error!=undefined) {
    let errorsMessage = getErrorsFromValidation(error);
    return errorsMessage;
  }
  return questionnaire;
}

const createQuestionnaireController = async (req, res) => {
    try {
      const { body } = req;

      const newQuestionnaire = await createQuestionnaire(Questionnaire, body);
      if(newQuestionnaire.errors){
        res.status(400).json(newQuestionnaire);
      }
      else {
        await newQuestionnaire.save();
        res.status(200).json({ message: "Data received and stored succesfully" });
      }
    } catch (err) {
      res.status(500).json({ 
        message: 'Internal server error', 
      });
    }
  };

module.exports = {createQuestionnaireController, createQuestionnaire};