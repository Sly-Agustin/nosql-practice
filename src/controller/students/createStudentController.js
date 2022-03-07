import Student from '../../models/student';
const mongoose = require('mongoose');
import studentLogger from '../../utils/studentLogger'

const createStudent = async (studentModel, studentData) => {
    const student = new studentModel(studentData);
    let error = student.validateSync();
    if(error!=undefined) {
      let errorsMessage = {error: "bad request"}
      return errorsMessage;
    }
    return student;
  }

export const createStudentController = async (req, res) => {
    try {
        const { body } = req;

        const newStundent = await createStudent(Student, body)
        if(newStundent.error){
            studentLogger.info('Student not created due to incorrect data received');
            res.status(400).json(newStundent);
        }
        else {
            await newStundent.save();
            studentLogger.info('Student created');
            res.status(200).json({ message: "Student created succesfully" });
        }
    }
    catch(err){
        res.status(500).json({ message: "Internar error server" })
    }  
}