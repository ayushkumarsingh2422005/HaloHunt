import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/userModel.js';
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail } from '../utils/emailService.js';

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorResponse('Email already in use', 400));
  }

  // Create user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Google OAuth login/register
// @route   POST /api/v1/auth/google
// @access  Public
export const googleAuth = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;

  console.log('idToken', idToken);

  if (!idToken) {
    return next(new ErrorResponse('Please provide a valid Google token', 400));
  }

  console.log('Received Google auth request with token');
  console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);

  try {
    // Verify the Google token with more detailed error handling
    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (verifyError) {
      console.error('Google token verification failed:', verifyError);
      
      // For development purposes only - this is not secure for production
      // This allows testing without proper Google verification
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Attempting to decode token without verification');
        try {
          // Extract payload from JWT without verification (DEVELOPMENT ONLY)
          const parts = idToken.split('.');
          if (parts.length !== 3) {
            return next(new ErrorResponse('Invalid token format', 401));
          }
          
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          console.log('Token payload:', payload);
          
          // Extract user info from payload
          const email = payload.email;
          const name = payload.name;
          const picture = payload.picture;
          const googleId = payload.sub;
          
          if (!email || !googleId) {
            return next(new ErrorResponse('Invalid token payload', 401));
          }
          
          // Continue with user lookup/creation
          let user = await User.findOne({ email });

          if (user) {
            if (!user.googleId) {
              user.googleId = googleId;
              user.avatar = picture || user.avatar;
              await user.save();
            }
          } else {
            user = await User.create({
              fullName: name || email.split('@')[0],
              email,
              googleId,
              avatar: picture,
              emailVerified: true,
            });
          }

          return sendTokenResponse(user, 200, res);
        } catch (decodeError) {
          console.error('Failed to decode token:', decodeError);
          return next(new ErrorResponse('Invalid token format', 401));
        }
      }
      
      return next(new ErrorResponse('Google token verification failed', 401));
    }

    const { email, name, picture, sub: googleId } = ticket.getPayload();
    console.log('Google auth successful for:', email);

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update user with Google ID if not already set
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        fullName: name,
        email,
        googleId,
        avatar: picture,
        emailVerified: true,
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Google auth error:', error);
    return next(new ErrorResponse('Invalid Google token', 401));
  }
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    fullName: req.body.fullName,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  try {
    // Send email using Brevo
    const emailResult = await sendPasswordResetEmail(
      user.email,
      user.fullName,
      resetToken,
      resetUrl
    );

    if (!emailResult.success) {
      console.log('Email service error:', emailResult.error);
      
      // In development, allow password reset without email
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Returning reset token in response');
        return res.status(200).json({
          success: true,
          message: 'Email service is not configured. In development mode only:',
          data: {
            resetToken,
            resetUrl
          }
        });
      }
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorResponse('Email could not be sent', 500));
    }

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (err) {
    console.error('Password reset email error:', err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  console.log('Reset password request received');
  console.log('Token from params:', req.params.resettoken);
  
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  console.log('Hashed token:', resetPasswordToken);
  
  // Check if password is provided
  if (!req.body.password) {
    return next(new ErrorResponse('Please provide a new password', 400));
  }

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    console.log('Invalid or expired token');
    return next(new ErrorResponse('Invalid or expired token', 400));
  }

  console.log('User found:', user.email);

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  
  try {
    await user.save();
    console.log('Password updated successfully');
    
    // Send confirmation email
    try {
      await sendPasswordResetSuccessEmail(user.email, user.fullName);
      console.log('Password reset confirmation email sent');
    } catch (err) {
      console.error('Password reset success email error:', err);
      // Continue even if confirmation email fails
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('Error saving user:', err);
    return next(new ErrorResponse('Error updating password', 500));
  }
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Ensure JWT_COOKIE_EXPIRE is a valid number, default to 30 if not
  const cookieExpire = parseInt(process.env.JWT_COOKIE_EXPIRE) || 30;
  
  const options = {
    expires: new Date(
      Date.now() + cookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Use secure cookies in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
}; 