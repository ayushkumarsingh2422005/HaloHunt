// this is zegoroutes file

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getZegoToken } from '../controller/zegoController.js';

const router = express.Router();

router.get('/token', protect, getZegoToken);
router.get('/public-token', getZegoToken);

export default router;