import express from 'express';
import {
  getAvatarUploadUrl,
  getCoverUploadUrl,
  updateAvatar,
  updateCover,
  getThumbnailUploadUrl,
  deleteThumbnail
} from '../controller/mediaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/avatar-upload-url', protect, getAvatarUploadUrl);
router.get('/cover-upload-url', protect, getCoverUploadUrl);
router.get('/thumbnail-upload-url', protect, getThumbnailUploadUrl);
router.put('/avatar', protect, updateAvatar);
router.put('/cover', protect, updateCover);
router.delete('/thumbnail', protect, deleteThumbnail);

export default router;