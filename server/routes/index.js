import express from 'express';
import authRoutes from './authRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import streamRoutes from './streamRoutes.js';
import zegoRoutes from './zegoRoutes.js';

const router = express.Router();

// Mount routes
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/media', mediaRoutes);
router.use('/api/v1/streams', streamRoutes);
router.use('/api/v1/zego', zegoRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Test route for Google auth
router.get('/api/v1/test', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'API is working correctly',
    env: {
      googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured',
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    }
  });
});

export default router; 