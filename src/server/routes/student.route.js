import express from 'express';
import { createStudentController } from '../../controller/students/createStudentController';
import { authenticateToken } from '../../controller/login/loginController';
import { getStudentsController } from '../../controller/students/getStudentController';
const router = express.Router();

router.post('/',  createStudentController);
router.get('/', authenticateToken, getStudentsController)

export default router;