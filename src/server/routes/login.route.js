import express from 'express';
import { loginController, authenticateToken, tokenController, deleteRefreshToken } from '../../controller/login/loginController';
const router = express.Router();

router.post('/',  loginController);
router.post('/logout', deleteRefreshToken);
router.post('/token', tokenController);

export default router;