import Questionnaire from '../models/dream';
const mongoose = require('mongoose');

function getErrorsFromValidation(error) {
  let errorsMessage = {}

  Object.keys(error.errors).map((key) => {  
    let specificErrorName=key;
    let specificError = error.errors[specificErrorName];
    let messageError = specificError.message
    errorsMessage[specificErrorName]=messageError;

    return;
  })
  return {errors: errorsMessage}
}

const createQuestionnaire = async (questionnaireModel, questionnaireData) => {
  const questionnaire = new questionnaireModel(questionnaireData);
  let error = questionnaire.validateSync();
  return error ? (getErrorsFromValidation(error)) : questionnaire;
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