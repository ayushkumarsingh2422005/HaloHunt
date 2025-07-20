import express from 'express';
const router = express.Router();
import {
  register,
  login,
  googleAuth,
  getMe,
  logout
} from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/session', protect, getMe);
router.get('/logout', protect, logout);

export default router; 