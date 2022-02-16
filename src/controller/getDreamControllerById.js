import Dream from '../models/dream';
const mongoose = require('mongoose');

export const getDreamControllerById = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);

        const credentials = process.env.MONGODB_URL;
        await mongoose.connect(credentials);

        let findQuestionnaire = await Dream.findOne({ questionnaireId: id }).exec();
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