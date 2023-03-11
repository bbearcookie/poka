import express from 'express';
import * as signup from '@controller/auth/signup';
import * as login from '@controller/auth/login';
import * as logout from '@controller/auth/logout';
import * as verify from '@controller/auth/verify';

const router = express.Router();
router.post('/signup', signup.validator, signup.controller);
router.post('/login', login.validator, login.controller);
router.post('/logout', logout.controller);
router.post('/verify', verify.controller);

export default router;