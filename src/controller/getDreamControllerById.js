import Questionnaire from '../models/dream';
const mongoose = require('mongoose');

function idVerification(possibleId) {
    const id = possibleId;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return null
    }
    return id;
}

async function findQuestionnaireIfExists(questionnaireModel, id){
    return await questionnaireModel.findOne({ questionnaireId: id });
}

async function getDreamControllerById (req, res) {
    try{
        const id = idVerification(req.params.id);
        if (id==null){
            res.status(400).send({
                message: 'ID not valid',
                idProvided: req.params.id
            })
            return
        }

        let findQuestionnaire = await findQuestionnaireIfExists(Questionnaire, id);
        if(findQuestionnaire==null){
            res.status(404).json({ message: "Error, questionnaire does not exist"});
        }
        else{
            res.status(200).json({ data: findQuestionnaire });
        }
    }
    catch(err){
        res.status(500).json({ message: "Internal server error", error: err});
    }
}

module.exports = {getDreamControllerById, findQuestionnaireIfExists};