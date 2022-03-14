import express from 'express';
import { createStudentController } from '../../controller/students/createStudentController';
const router = express.Router();

router.post('/',  createStudentController);

export default router;