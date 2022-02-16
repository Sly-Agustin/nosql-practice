const express = require('express');
require('dotenv').config();
import questionnaireRouter from './routes/questionnaire.route';
import studentRouter from './routes/student.route'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/questionnaires', questionnaireRouter);
app.use('/students', studentRouter)

export const start = () => {
    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
  };

