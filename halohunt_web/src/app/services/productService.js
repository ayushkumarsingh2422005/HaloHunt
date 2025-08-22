const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('Authentication token not found');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

// Product API functions
export const productService = {
  // Create a new product
  createProduct: async (productData) => {
    return makeAuthenticatedRequest('/api/v1/products', {
      method: 'POST',
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        shortDescription: productData.shortDescription,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discountPercentage: productData.discountPercentage,
        category: productData.category,
        subcategory: productData.subcategory,
        brand: productData.brand,
        sku: productData.sku,
        stockQuantity: productData.stockQuantity,
        isInStock: productData.isInStock,
        isActive: productData.isActive,
        isFeatured: productData.isFeatured,
        images: productData.images || [],
        thumbnail: productData.thumbnail,
        specifications: productData.specifications || [],
        variants: productData.variants || [],
        tags: productData.tags || [],
        metaTitle: productData.metaTitle,
        metaDescription: productData.metaDescription,
        slug: productData.slug,
        dimensions: productData.dimensions,
        weight: productData.weight,
        shippingInfo: productData.shippingInfo,
        status: productData.status || 'draft'
      })
    });
  },

  // Get user's products
  getMyProducts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/api/v1/products/my-products${queryParams ? `?${queryParams}` : ''}`;
    return makeAuthenticatedRequest(endpoint);
  },

  // Get public products
  getPublicProducts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/api/v1/products${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Get single product
  getProduct: async (productId) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}`);
  },

  // Update product
  updateProduct: async (productId, productData) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        shortDescription: productData.shortDescription,
        price: productData.price,
        originalPrice: productData.originalPrice,
        discountPercentage: productData.discountPercentage,
        category: productData.category,
        subcategory: productData.subcategory,
        brand: productData.brand,
        sku: productData.sku,
        stockQuantity: productData.stockQuantity,
        isInStock: productData.isInStock,
        isActive: productData.isActive,
        isFeatured: productData.isFeatured,
        images: productData.images || [],
        thumbnail: productData.thumbnail,
        specifications: productData.specifications || [],
        variants: productData.variants || [],
        tags: productData.tags || [],
        metaTitle: productData.metaTitle,
        metaDescription: productData.metaDescription,
        slug: productData.slug,
        dimensions: productData.dimensions,
        weight: productData.weight,
        shippingInfo: productData.shippingInfo,
        status: productData.status
      })
    });
  },

  // Delete product
  deleteProduct: async (productId) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}`, {
      method: 'DELETE'
    });
  },

  // Add image to product
  addProductImage: async (productId, imageData) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}/images`, {
      method: 'POST',
      body: JSON.stringify({ imageData })
    });
  },

  // Remove image from product
  removeProductImage: async (productId, imageIndex) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}/images/${imageIndex}`, {
      method: 'DELETE'
    });
  },

  // Set primary image for product
  setPrimaryImage: async (productId, imageIndex) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}/images/${imageIndex}/primary`, {
      method: 'PUT'
    });
  },

  // Update product stock
  updateProductStock: async (productId, quantity) => {
    return makeAuthenticatedRequest(`/api/v1/products/${productId}/stock`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      ...params
    }).toString();

    const response = await fetch(`${API_BASE_URL}/api/v1/products/search?${searchParams}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Get product categories
  getProductCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/categories`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Get featured products
  getFeaturedProducts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/api/v1/products/featured${queryParams ? `?${queryParams}` : ''}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }
};
