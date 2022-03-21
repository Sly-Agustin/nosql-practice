import express from 'express';
import { loginController, authenticateToken, refreshTokenController, deleteRefreshToken } from '../../controller/login/loginController';
const router = express.Router();

router.post('/',  loginController);
router.post('/logout', deleteRefreshToken);
router.post('/token', refreshTokenController);

export default router;