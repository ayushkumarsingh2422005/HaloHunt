import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Password is required only if not using Google auth
      },
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return password in queries
    },
    role: {
      type: String,
      enum: ['user', 'seller', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'https://randomuser.me/api/portraits/lego/5.jpg',
    },
    avatarKey: {
      type: String, // S3 key for the avatar image
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    location: {
      type: String,
      maxlength: [100, 'Location cannot be more than 100 characters'],
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number cannot be more than 20 characters'],
    },
    socialLinks: {
      instagram: String,
      twitter: String,
      website: String,
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop',
    },
    coverImageKey: {
      type: String, // S3 key for the cover image
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow null/undefined values (for non-Google users)
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false,
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

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) {
    next();
  }

  // Skip password hashing if using Google auth
  if (this.googleId && !this.password) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  // If this is a Google user without a password, they can't log in with password
  if (this.googleId && !this.password) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 