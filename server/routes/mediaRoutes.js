import express from 'express';
import {
  getAvatarUploadUrl,
  getCoverUploadUrl,
  updateAvatar,
  updateCover
} from '../controller/mediaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/avatar-upload-url', protect, getAvatarUploadUrl);
router.get('/cover-upload-url', protect, getCoverUploadUrl);
router.put('/avatar', protect, updateAvatar);
router.put('/cover', protect, updateCover);

export default router; 