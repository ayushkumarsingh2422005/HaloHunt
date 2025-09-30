import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a stream title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a stream description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    hashtags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Hashtag cannot be more than 30 characters'],
    }],
    aboutThisStream: {
      type: String,
      trim: true,
      maxlength: [1000, 'About this stream cannot be more than 1000 characters'],
    },
    likesCount: {
      type: Number,
      default: 0,
      min: [0, 'Likes count cannot be negative'],
    },
    taggedProductId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product',
      default: [],
      // Not required as streams might not always have tagged products
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    // streamKey: {
    //   type: String,
    //   // For streaming service integration
    // },
    thumbnail: {
      type: String,
      // URL for stream thumbnail
    },
    thumbnailKey: {
      type: String,
      // S3 key for the thumbnail image
    },
    viewerCount: {
      type: Number,
      default: 0,
      min: [0, 'Viewer count cannot be negative'],
    },
    scheduledAt: {
      type: Date,
      // For scheduled streams
    },
    startedAt: {
      type: Date,
      // When the stream actually started
    },
    endedAt: {
      type: Date,
      // When the stream ended
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'live', 'ended', 'cancelled'],
      default: 'draft',
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

// Index for better query performance
streamSchema.index({ userId: 1, createdAt: -1 });
streamSchema.index({ status: 1, scheduledAt: 1 });
streamSchema.index({ hashtags: 1 });

// Virtual for stream duration (if stream has ended)
streamSchema.virtual('duration').get(function() {
  if (this.startedAt && this.endedAt) {
    return this.endedAt - this.startedAt;
  }
  return null;
});

// Ensure virtual fields are serialized
streamSchema.set('toJSON', { virtuals: true });
streamSchema.set('toObject', { virtuals: true });

// Pre-save middleware to ensure taggedProductId is always an array
streamSchema.pre('save', function(next) {
  if (!this.taggedProductId) {
    this.taggedProductId = [];
  }
  next();
});

// Method to increment likes count
streamSchema.methods.incrementLikes = function() {
  this.likesCount += 1;
  return this.save();
};

// Method to decrement likes count
streamSchema.methods.decrementLikes = function() {
  if (this.likesCount > 0) {
    this.likesCount -= 1;
  }
  return this.save();
};

// Method to start stream
streamSchema.methods.startStream = function() {
  this.isLive = true;
  this.status = 'live';
  this.startedAt = new Date();
  return this.save();
};

// Method to end stream
streamSchema.methods.endStream = function() {
  this.isLive = false;
  this.status = 'ended';
  this.endedAt = new Date();
  return this.save();
};

// Method to add tagged product
streamSchema.methods.addTaggedProduct = function(productId) {
  // Ensure taggedProductId is initialized as an array
  if (!this.taggedProductId) {
    this.taggedProductId = [];
  }
  
  if (!this.taggedProductId.includes(productId)) {
    this.taggedProductId.push(productId);
  }
  return this.save();
};

// Method to remove tagged product
streamSchema.methods.removeTaggedProduct = function(productId) {
  // Ensure taggedProductId is initialized as an array
  if (!this.taggedProductId) {
    this.taggedProductId = [];
  }
  
  this.taggedProductId = this.taggedProductId.filter(id => id.toString() !== productId.toString());
  return this.save();
};

// Method to get tagged products
streamSchema.methods.getTaggedProducts = function() {
  // Ensure taggedProductId is initialized as an array
  if (!this.taggedProductId) {
    this.taggedProductId = [];
  }
  return this.taggedProductId;
};

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;
