import Questionnaire from '../models/dream';
const mongoose = require('mongoose');

function isNumber(posibleId){
	let id = parseInt(posibleId, 10);
	if (isNaN(id)) {
		return false;
	}
	return true;
}

export const getDreamControllerById = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        if (!isNumber(id)){
            res.status(400).send({
                message: 'IDs must be a number',
            });
            return;
        }

        const credentials = process.env.MONGODB_URL;
        await mongoose.connect(credentials);

        let findQuestionnaire = await Questionnaire.findOne({ questionnaireId: id }).exec();
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