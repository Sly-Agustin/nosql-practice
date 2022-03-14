const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
import questionnaireRouter from './routes/questionnaire.route';
import studentRouter from './routes/student.route'
import loginRouter from './routes/login.route'
import logger from '../utils/generalLogger'

const app = express();
const port = process.env.PORT;
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use('/questionnaires', questionnaireRouter);
app.use('/students', studentRouter);
app.use('/login', loginRouter)

export const start = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(port, () => {
        logger.info(`Server started on port ${port}`);
    });
  };

