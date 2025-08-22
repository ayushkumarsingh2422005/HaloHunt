import express from 'express';
import {
  createProduct,
  getMyProducts,
  getPublicProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
  removeProductImage,
  setPrimaryImage,
  updateProductStock,
  searchProducts,
  getProductCategories,
  getFeaturedProducts
} from '../controller/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicProducts);
router.get('/search', searchProducts);
router.get('/categories', getProductCategories);
router.get('/featured', getFeaturedProducts);
router.get('/public/:id', getProduct);

// Protected routes (require authentication)
router.use(protect);

router.post('/', createProduct);
router.get('/my-products', getMyProducts);

// Parameterized routes (must come after specific routes)
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/:id/stock', updateProductStock);

// Image management routes
router.post('/:id/images', addProductImage);
router.delete('/:id/images/:imageIndex', removeProductImage);
router.put('/:id/images/:imageIndex/primary', setPrimaryImage);

export default router;
