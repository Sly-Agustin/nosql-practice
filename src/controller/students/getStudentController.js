import Student from '../../models/student';
const mongoose = require('mongoose');
import studentLogger from '../../utils/studentLogger'

const getStudents = async () => {
    const students = await Student.find();
    return students;
}

export const getStudentsController = async(req, res) => {
    const students = await getStudents();
    res.status(200).json({ students: students });
}
