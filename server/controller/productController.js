import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import Product from '../models/productModel.js';
import { deleteFile } from '../utils/s3Service.js';

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Seller only)
export const createProduct = asyncHandler(async (req, res, next) => {
  // Add seller ID from auth middleware
  req.body.sellerId = req.user.id;

  // Validate of KYC will be done here
  // if (req.user.role !== 'seller') {
  //   return next(new ErrorResponse('Only sellers can create products', 403));
  // }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product created successfully'
  });
});

// @desc    Get all products for a seller
// @route   GET /api/v1/products/my-products
// @access  Private (Seller only)
export const getMyProducts = asyncHandler(async (req, res) => {
  const { status, category, limit = 10, page = 1 } = req.query;

  // Build query
  let query = { sellerId: req.user.id };

  // Filter by status if provided
  if (status) {
    query.status = status;
  }

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    },
    data: products
  });
});

// @desc    Get all public products
// @route   GET /api/v1/products
// @access  Public
export const getPublicProducts = asyncHandler(async (req, res, next) => {
  const { category, subcategory, brand, minPrice, maxPrice, limit = 12, page = 1, sort = 'newest' } = req.query;

  // Build query for public products
  let query = { 
    status: 'approved', 
    isActive: true 
  };

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  // Filter by subcategory if provided
  if (subcategory) {
    query.subcategory = subcategory;
  }

  // Filter by brand if provided
  if (brand) {
    query.brand = brand;
  }

  // Filter by price range if provided
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build sort object
  let sortObj = {};
  switch (sort) {
    case 'price-low':
      sortObj = { price: 1 };
      break;
    case 'price-high':
      sortObj = { price: -1 };
      break;
    case 'oldest':
      sortObj = { createdAt: 1 };
      break;
    case 'newest':
    default:
      sortObj = { createdAt: -1 };
      break;
  }

  const products = await Product.find(query)
    .populate('sellerId', 'fullName avatar')
    .sort(sortObj)
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    },
    data: products
  });
});

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('sellerId', 'fullName avatar bio');

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // If product is not approved and requester is not the owner, restrict access
  const requesterId = req.user?.id;
  const ownerId = product.sellerId?._id?.toString() || product.sellerId?.toString();
  const isOwner = requesterId && ownerId && requesterId.toString() === ownerId.toString();
  
  if (!isOwner && product.status !== 'approved') {
    return next(new ErrorResponse('Product not available for viewing', 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Owner only)
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 401));
  }

  // Clean the update data
  const updateData = { ...req.body };
  
  // Convert empty strings to null for ObjectId fields
  if (updateData.category === '') {
    updateData.category = null;
  }
  if (updateData.subcategory === '') {
    updateData.subcategory = null;
  }
  if (updateData.brand === '') {
    updateData.brand = null;
  }

  product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product,
    message: 'Product updated successfully'
  });
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Owner only)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this product`, 401));
  }

  // Delete all product images from S3
  if (product.images && product.images.length > 0) {
    try {
      for (const image of product.images) {
        if (image.key) {
          await deleteFile(image.key);
          console.log('Product image deleted from S3:', image.key);
        }
      }
    } catch (error) {
      console.error('Failed to delete some product images from S3:', error);
      // Continue with product deletion even if image deletion fails
    }
  }

  // Delete thumbnail from S3 if it exists
  if (product.thumbnail && product.thumbnail.key) {
    try {
      await deleteFile(product.thumbnail.key);
      console.log('Product thumbnail deleted from S3:', product.thumbnail.key);
    } catch (error) {
      console.error('Failed to delete product thumbnail from S3:', error);
      // Continue with product deletion even if thumbnail deletion fails
    }
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Add image to product
// @route   POST /api/v1/products/:id/images
// @access  Private (Owner only)
export const addProductImage = asyncHandler(async (req, res, next) => {
  const { imageData } = req.body;

  if (!imageData || !imageData.url || !imageData.key) {
    return next(new ErrorResponse('Please provide image data with url and key', 400));
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to modify this product`, 401));
  }

  // Add the image
  await product.addImage(imageData);

  res.status(200).json({
    success: true,
    data: product,
    message: 'Image added successfully'
  });
});

// @desc    Remove image from product
// @route   DELETE /api/v1/products/:id/images/:imageIndex
// @access  Private (Owner only)
export const removeProductImage = asyncHandler(async (req, res, next) => {
  const { imageIndex } = req.params;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to modify this product`, 401));
  }

  // Get the image to be removed
  const imageToRemove = product.images[parseInt(imageIndex)];
  if (!imageToRemove) {
    return next(new ErrorResponse('Invalid image index', 400));
  }

  // Delete the image from S3
  if (imageToRemove.key) {
    try {
      await deleteFile(imageToRemove.key);
      console.log('Product image deleted from S3:', imageToRemove.key);
    } catch (error) {
      console.error('Failed to delete product image from S3:', error);
      // Continue with image removal even if S3 deletion fails
    }
  }

  // Remove the image from the product
  await product.removeImage(parseInt(imageIndex));

  res.status(200).json({
    success: true,
    data: product,
    message: 'Image removed successfully'
  });
});

// @desc    Set primary image for product
// @route   PUT /api/v1/products/:id/images/:imageIndex/primary
// @access  Private (Owner only)
export const setPrimaryImage = asyncHandler(async (req, res, next) => {
  const { imageIndex } = req.params;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to modify this product`, 401));
  }

  // Set the primary image
  await product.setPrimaryImage(parseInt(imageIndex));

  res.status(200).json({
    success: true,
    data: product,
    message: 'Primary image updated successfully'
  });
});

// @desc    Update product stock
// @route   PUT /api/v1/products/:id/stock
// @access  Private (Owner only)
export const updateProductStock = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return next(new ErrorResponse('Please provide quantity', 400));
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the product
  if (product.sellerId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to modify this product`, 401));
  }

  // Update the stock
  await product.updateStock(quantity);

  res.status(200).json({
    success: true,
    data: product,
    message: 'Stock updated successfully'
  });
});

// @desc    Search products
// @route   GET /api/v1/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res, next) => {
  const { q, category, minPrice, maxPrice, limit = 12, page = 1, sort = 'relevance' } = req.query;

  if (!q) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  // Build search query
  let searchQuery = {
    $text: { $search: q },
    status: 'approved',
    isActive: true
  };

  // Add category filter if provided
  if (category) {
    searchQuery.category = category;
  }

  // Add price filter if provided
  if (minPrice || maxPrice) {
    searchQuery.price = {};
    if (minPrice) searchQuery.price.$gte = parseFloat(minPrice);
    if (maxPrice) searchQuery.price.$lte = parseFloat(maxPrice);
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Build sort object
  let sortObj = {};
  switch (sort) {
    case 'price-low':
      sortObj = { price: 1 };
      break;
    case 'price-high':
      sortObj = { price: -1 };
      break;
    case 'newest':
      sortObj = { createdAt: -1 };
      break;
    case 'oldest':
      sortObj = { createdAt: 1 };
      break;
    case 'relevance':
    default:
      sortObj = { score: { $meta: 'textScore' } };
      break;
  }

  const products = await Product.find(searchQuery)
    .populate('sellerId', 'fullName avatar')
    .sort(sortObj)
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Product.countDocuments(searchQuery);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    },
    data: products
  });
});

// @desc    Get product categories
// @route   GET /api/v1/products/categories
// @access  Public
export const getProductCategories = asyncHandler(async (req, res, next) => {
  const categories = await Product.distinct('category', { 
    status: 'approved', 
    isActive: true 
  });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// @desc    Get featured products
// @route   GET /api/v1/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const { limit = 8 } = req.query;

  const products = await Product.findFeatured()
    .populate('sellerId', 'fullName avatar')
    .limit(parseInt(limit));

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});
