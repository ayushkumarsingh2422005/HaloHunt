import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Product information
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters'],
      // name of the product
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
      // description of the product
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description cannot be more than 200 characters'],
      // short description of the product
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price cannot be negative'],
      // price of the product
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
      // original price of the product
    },
    discountPercentage: {
      type: Number,
      min: [0, 'Discount percentage cannot be negative'],
      max: [100, 'Discount percentage cannot exceed 100%'],
      // discount percentage of the product
    },
    category: {
      type: String,
      // required: [true, 'Please add a product category'],
      trim: true,
      default: 'Uncategorized',
      // category of the product
    },
    subcategory: {
      type: String,
      trim: true,
      // subcategory of the product
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [50, 'Brand name cannot be more than 50 characters'],
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
      // SKU for the product
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
    },
    isInStock: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    
    // AWS S3 Image Storage Fields
    images: [{
      url: {
        type: String,
        required: true,
        // URL for the image
      },
      key: {
        type: String,
        required: true,
        // S3 object key for the image
      },
      alt: {
        type: String,
        trim: true,
        maxlength: [100, 'Alt text cannot be more than 100 characters'],
        // alt text for the image
      },
      isPrimary: {
        type: Boolean,
        default: false,
        // if the image is the primary image of the product
      },
      order: {
        type: Number,
        default: 0,
        // order of the image in the product
      },
    }],
    
    // Thumbnail for quick display
    thumbnail: {
      url: {
        type: String,
        // URL for the thumbnail image
      },
      key: {
        type: String,
        // S3 object key for the thumbnail
      },
    },
    
    // Product specifications
    specifications: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      value: {
        type: String,
        required: true,
        trim: true,
      },
    }],
    
    // Product variants (size, color, etc.)
    variants: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      value: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        min: [0, 'Variant price cannot be negative'],
      },
      stockQuantity: {
        type: Number,
        min: [0, 'Variant stock cannot be negative'],
        default: 0,
      },
    }],
    
    // Product tags for search
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Tag cannot be more than 30 characters'],
    }],
    
    // SEO fields
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title cannot be more than 60 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot be more than 160 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    
    // Product dimensions and weight
    dimensions: {
      length: {
        type: Number,
        min: [0, 'Length cannot be negative'],
      },
      width: {
        type: Number,
        min: [0, 'Width cannot be negative'],
      },
      height: {
        type: Number,
        min: [0, 'Height cannot be negative'],
      },
      unit: {
        type: String,
        enum: ['cm', 'inch', 'mm'],
        default: 'cm',
      },
    },
    weight: {
      value: {
        type: Number,
        min: [0, 'Weight cannot be negative'],
      },
      unit: {
        type: String,
        enum: ['kg', 'g', 'lb', 'oz'],
        default: 'kg',
      },
    },
    
    // Seller information
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller ID is required'],
    },
    
    // Product ratings and reviews
    averageRating: {
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0,
    },
    totalReviews: {
      type: Number,
      min: [0, 'Review count cannot be negative'],
      default: 0,
    },
    
    // Product status
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'archived'],
      default: 'draft',
    },
    
    // Shipping information
    shippingInfo: {
      weight: {
        type: Number,
        min: [0, 'Shipping weight cannot be negative'],
      },
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      isFreeShipping: {
        type: Boolean,
        default: false,
      },
      shippingCost: {
        type: Number,
        min: [0, 'Shipping cost cannot be negative'],
        default: 0,
      },
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
productSchema.index({ sellerId: 1, createdAt: -1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ status: 1, isActive: 1 });
productSchema.index({ isFeatured: 1, createdAt: -1 });
productSchema.index({ tags: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discountPercentage && this.discountPercentage > 0) {
    return this.price - (this.price * this.discountPercentage / 100);
  }
  return this.price;
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primaryImage = this.images.find(img => img.isPrimary);
  return primaryImage || this.images[0];
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Pre-save middleware to generate SKU if not provided
productSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  
  // Generate slug from name if not provided
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Update isInStock based on stockQuantity
  this.isInStock = this.stockQuantity > 0;
  
  next();
});

// Method to add image
productSchema.methods.addImage = function(imageData) {
  // If this is the first image, make it primary
  if (this.images.length === 0) {
    imageData.isPrimary = true;
  }
  
  this.images.push(imageData);
  return this.save();
};

// Method to set primary image
productSchema.methods.setPrimaryImage = function(imageIndex) {
  if (imageIndex >= 0 && imageIndex < this.images.length) {
    this.images.forEach((img, index) => {
      img.isPrimary = index === imageIndex;
    });
    return this.save();
  }
  throw new Error('Invalid image index');
};

// Method to remove image
productSchema.methods.removeImage = function(imageIndex) {
  if (imageIndex >= 0 && imageIndex < this.images.length) {
    const removedImage = this.images.splice(imageIndex, 1)[0];
    
    // If we removed the primary image and there are other images, make the first one primary
    if (removedImage.isPrimary && this.images.length > 0) {
      this.images[0].isPrimary = true;
    }
    
    return this.save();
  }
  throw new Error('Invalid image index');
};

// Method to update stock
productSchema.methods.updateStock = function(quantity) {
  this.stockQuantity = Math.max(0, this.stockQuantity + quantity);
  this.isInStock = this.stockQuantity > 0;
  return this.save();
};

// Method to calculate average rating
productSchema.methods.calculateAverageRating = function() {
  // This would typically be called from a review model
  // For now, it's a placeholder
  return this.averageRating;
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true, status: 'approved' });
};

// Static method to find featured products
productSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isActive: true, status: 'approved' });
};

// Static method to search products
productSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    isActive: true,
    status: 'approved'
  });
};

const Product = mongoose.model('Product', productSchema);

export default Product;
