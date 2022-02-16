import Questionnaire from '../models/dream';
const mongoose = require('mongoose');

export const createQuestionnaireController = async (req, res) => {
    try {
      const { body } = req;
      const credentials = process.env.MONGODB_URL;
      await mongoose.connect(credentials);

      const newQuestionnaire = new Questionnaire(body);
      let error = newQuestionnaire.validateSync();
      if(error!=undefined) {
        let errorsMessage = {}
        let keys = Object.keys(error.errors);
        for(let i = 0; i<keys.length; i++) {
          let specificErrorName=keys[i];
          let specificError = error.errors[specificErrorName];
          let messageError = specificError.message
          errorsMessage[keys[i]]=messageError;
        }
        res.status(400).json({ errores: errorsMessage});
      }
      else{
        await newQuestionnaire.save();
        res.status(200).json({ message: "Data received and stored succesfully" });
      }
    } catch (err) {
      res.status(500).json({ 
        message: 'Internal server error', 
        error: err
      });
    }
  };