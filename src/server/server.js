const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
import questionnaireRouter from './routes/questionnaire.route';
import studentRouter from './routes/student.route'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/questionnaires', questionnaireRouter);
app.use('/students', studentRouter)

export const start = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
  };

