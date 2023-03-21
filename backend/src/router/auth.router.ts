import express from 'express';
import signup from '@controller/auth/signup';
import login from '@controller/auth/login';
import logout from '@controller/auth/logout';
import verify from '@controller/auth/verify';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify', verify);

export default router;