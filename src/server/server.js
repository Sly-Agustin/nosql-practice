const express = require('express');
require('dotenv').config();
//import express from 'express';
import dreamRouter from './routes/dream.route';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/dreams', dreamRouter);

export const start = () => {
    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    });
  };

