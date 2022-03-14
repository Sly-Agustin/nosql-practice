const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    studentId: Number,
    name: {type: String, required: [true, 'Name required']}
})

module.exports = mongoose.model("Student", Student);