import Student from '../../models/student';
const mongoose = require('mongoose');

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
            res.status(400).json(newStundent);
        }
        else {
            await newStundent.save();
            res.status(200).json({ message: "Student created succesfully" });
        }
    }
    catch(err){
        res.status(500).json({ message: "Internar error server" })
    }  
}