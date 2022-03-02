import Student from '../../models/student';
const mongoose = require('mongoose');

export const createStudentController = async (req, res) => {
    try {
        const { body } = req;

        const newStundent = new Student(body)
        await newStundent.save();
        res.status(200).json({ message: "Student created succesfully" });
    }
    catch(err){
        res.status(500).json({ message: "Internar error server" })
    }  
}