import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { generateUploadUrl, deleteFile } from '../utils/s3Service.js';
import User from '../models/userModel.js';

// @desc    Generate presigned URL for avatar upload
// @route   GET /api/v1/media/avatar-upload-url
// @access  Private
export const getAvatarUploadUrl = asyncHandler(async (req, res, next) => {
  const fileType = req.query.fileType || 'image/jpeg';
  
  // Validate file type
  if (!fileType.startsWith('image/')) {
    return next(new ErrorResponse('Invalid file type. Only images are allowed for avatars.', 400));
  }

  try {
    const { uploadUrl, key, fileUrl } = await generateUploadUrl(fileType, 'avatars');
    
    res.status(200).json({
      success: true,
      data: {
        uploadUrl,
        key,
        fileUrl
      }
    });
  } catch (error) {
    console.error('Error generating avatar upload URL:', error);
    return next(new ErrorResponse('Error generating upload URL', 500));
  }
});

// @desc    Generate presigned URL for cover image upload
// @route   GET /api/v1/media/cover-upload-url
// @access  Private
export const getCoverUploadUrl = asyncHandler(async (req, res, next) => {
  const fileType = req.query.fileType || 'image/jpeg';
  
  // Validate file type
  if (!fileType.startsWith('image/')) {
    return next(new ErrorResponse('Invalid file type. Only images are allowed for cover images.', 400));
  }

  try {
    const { uploadUrl, key, fileUrl } = await generateUploadUrl(fileType, 'covers');
    
    res.status(200).json({
      success: true,
      data: {
        uploadUrl,
        key,
        fileUrl
      }
    });
  } catch (error) {
    console.error('Error generating cover upload URL:', error);
    return next(new ErrorResponse('Error generating upload URL', 500));
  }
});

// @desc    Update user avatar after S3 upload
// @route   PUT /api/v1/media/avatar
// @access  Private
export const updateAvatar = asyncHandler(async (req, res, next) => {
  const { fileUrl, key } = req.body;

  if (!fileUrl || !key) {
    return next(new ErrorResponse('Please provide fileUrl and key', 400));
  }

  // Get current user to check if they have an existing avatar
  const currentUser = await User.findById(req.user.id);
  
  // Delete previous avatar if it exists and is not the default
  if (currentUser.avatarKey && 
      currentUser.avatar !== 'https://randomuser.me/api/portraits/lego/5.jpg') {
    await deleteFile(currentUser.avatarKey);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { 
      avatar: fileUrl,
      avatarKey: key 
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user cover image after S3 upload
// @route   PUT /api/v1/media/cover
// @access  Private
export const updateCover = asyncHandler(async (req, res, next) => {
  const { fileUrl, key } = req.body;

  if (!fileUrl || !key) {
    return next(new ErrorResponse('Please provide fileUrl and key', 400));
  }

  // Get current user to check if they have an existing cover image
  const currentUser = await User.findById(req.user.id);
  
  // Delete previous cover image if it exists and is not the default
  if (currentUser.coverImageKey && 
      currentUser.coverImage !== 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop') {
    await deleteFile(currentUser.coverImageKey);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { 
      coverImage: fileUrl,
      coverImageKey: key 
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Generate presigned URL for stream thumbnail upload
// @route   GET /api/v1/media/thumbnail-upload-url
// @access  Private
export const getThumbnailUploadUrl = asyncHandler(async (req, res, next) => {
  const fileType = req.query.fileType || 'image/jpeg';
  
  // Validate file type
  if (!fileType.startsWith('image/')) {
    return next(new ErrorResponse('Invalid file type. Only images are allowed for thumbnails.', 400));
  }

  try {
    const { uploadUrl, key, fileUrl } = await generateUploadUrl(fileType, 'thumbnails');
    
    res.status(200).json({
      success: true,
      data: {
        uploadUrl,
        key,
        fileUrl
      }
    });
  } catch (error) {
    console.error('Error generating thumbnail upload URL:', error);
    return next(new ErrorResponse('Error generating upload URL', 500));
  }
}); 

// @desc    Delete orphaned thumbnail by S3 key
// @route   DELETE /api/v1/media/thumbnail
// @access  Private
export const deleteThumbnail = asyncHandler(async (req, res, next) => {
  const { key } = req.body;

  if (!key) {
    return next(new ErrorResponse('Please provide the S3 key of the thumbnail to delete', 400));
  }

  try {
    // Validate that the key is for a thumbnail (starts with 'thumbnails/')
    if (!key.startsWith('thumbnails/')) {
      return next(new ErrorResponse('Invalid thumbnail key', 400));
    }

    // Delete the file from S3
    await deleteFile(key);
    
    res.status(200).json({
      success: true,
      message: 'Thumbnail deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
    return next(new ErrorResponse('Error deleting thumbnail', 500));
  }
}); 