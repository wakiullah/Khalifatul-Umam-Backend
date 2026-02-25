import express from 'express';
import { signup, login, getMe, logout } from './auth.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

export default router;