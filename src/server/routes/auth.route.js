import express from 'express';
import { googleAuthServiceCallback, test } from '../../controller/auth/googleAuthController'
import { loginController, getIdBasedOnName } from '../../controller/login/loginController';
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), googleAuthServiceCallback, getIdBasedOnName, loginController);

export default router;