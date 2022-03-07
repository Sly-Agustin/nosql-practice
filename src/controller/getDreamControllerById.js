import Questionnaire from '../models/dream';
const mongoose = require('mongoose');
import logger from '../utils/questionnaireLogger'

function isNumber(possibleId){
	if (possibleId==" "){
        return false;
    }
	if (isNaN(possibleId)) {
		return false;
	}
	return true;
}

function idVerification(possibleId) {
    const id = possibleId;
    if (!isNumber(id)){
        return null;
    }
    return id;
}

async function findQuestionnaireIfExists(questionnaireModel, id){
    return await questionnaireModel.findOne({ questionnaireId: id });
}

async function getDreamControllerById (req, res) {
    logger.info('getDreamControllerById called with ID: '+req.params.id);
    try{
        const id = idVerification(req.params.id);
        if (id==null){
            logger.error('getDreamControllerById error: ID not a number. Received: '+req.params.id)
            res.status(400).send({
                message: 'ID must be a number'
            })
            return
        }

        let findQuestionnaire = await findQuestionnaireIfExists(Questionnaire, id);
        if(findQuestionnaire==null){
            logger.info('getDreamControllerById: questionnaire with ID '+id+' not found in database')
            res.status(404).json({ message: "Error, questionnaire does not exist"});
        }
        else{
            logger.info('getDreamControllerById: questionnaire with ID '+id+' retrieved succesfully')
            res.status(200).json({ data: findQuestionnaire });
        }
    }
    catch(err){
        res.status(500).json({ message: "Internal server error", error: err});
    }
}

module.exports = {getDreamControllerById, findQuestionnaireIfExists};