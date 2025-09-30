import express from 'express';
import {
  createStream,
  getMyStreams,
  getPublicStreams,
  getStream,
  updateStream,
  deleteStream,
  startStream,
  endStream,
  toggleLike,
  getStreamStats,
  searchStreams,
  addTaggedProduct,
  removeTaggedProduct,
  getTaggedProducts
} from '../controller/streamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicStreams);
router.get('/search', searchStreams);
router.get('/:id/tagged-products', getTaggedProducts);

// Protected routes (require authentication)
router.use(protect);

router.post('/', createStream);
router.get('/my-streams', getMyStreams);

// Parameterized routes (must come after specific routes)
router.get('/:id', getStream);
router.put('/:id', updateStream);
router.delete('/:id', deleteStream);
router.put('/:id/start', startStream);
router.put('/:id/end', endStream);
router.put('/:id/like', toggleLike);
router.get('/:id/stats', getStreamStats);

// Product tagging routes (protected - only stream owner can modify)
router.post('/:id/tagged-products', addTaggedProduct);
router.delete('/:id/tagged-products/:productId', removeTaggedProduct);

export default router;
