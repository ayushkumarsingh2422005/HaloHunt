import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import Stream from '../models/streamModel.js';
import { deleteFile } from '../utils/s3Service.js';

// @desc    Create new stream
// @route   POST /api/v1/streams
// @access  Private
export const createStream = asyncHandler(async (req, res, next) => {
  // Add user ID from auth middleware
  req.body.userId = req.user.id;

  const stream = await Stream.create(req.body);

  res.status(201).json({
    success: true,
    data: stream,
    message: 'Stream created successfully'
  });
});

// @desc    Get all streams for a user
// @route   GET /api/v1/streams/my-streams
// @access  Private
export const getMyStreams = asyncHandler(async (req, res) => {
  const streams = await Stream.find({ userId: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: streams.length,
    data: streams
  });
});

// @desc    Get all public streams
// @route   GET /api/v1/streams
// @access  Public
export const getPublicStreams = asyncHandler(async (req, res, next) => {
  const { status, hashtag, limit = 10, page = 1 } = req.query;

  // Build query
  let query = { status: { $in: ['live', 'scheduled'] } };

  // Filter by status if provided
  if (status) {
    query.status = status;
  }

  // Filter by hashtag if provided
  if (hashtag) {
    query.hashtags = { $in: [hashtag] };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const streams = await Stream.find(query)
    .populate('userId', 'fullName avatar')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Stream.countDocuments(query);

  res.status(200).json({
    success: true,
    count: streams.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    },
    data: streams
  });
});

// @desc    Get single stream by ID
// @route   GET /api/v1/streams/:id
// @access  Public
export const getStream = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id)
    .populate('userId', 'fullName avatar bio');
    // .populate('taggedProductId', 'name price images');

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // If stream is not live and requester is not the owner, restrict access
  const requesterId = req.user?.id;
  const ownerId = stream.userId?._id?.toString() || stream.userId?.toString();
  const isOwner = requesterId && ownerId && requesterId.toString() === ownerId.toString();
  if (!isOwner && (stream.status === 'draft' || stream.status === 'scheduled')) {
    return next(new ErrorResponse('Not authorized to view this stream', 403));
  }

  res.status(200).json({
    success: true,
    data: stream
  });
});

// @desc    Update stream
// @route   PUT /api/v1/streams/:id
// @access  Private
export const updateStream = asyncHandler(async (req, res, next) => {
  let stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the stream
  if (stream.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this stream`, 401));
  }

  // Clean the update data to handle empty strings
  const updateData = { ...req.body };
  
  // Convert empty strings to null for ObjectId fields
  if (updateData.taggedProductId === '') {
    updateData.taggedProductId = null;
  }
  
  // Convert empty strings to null for date fields
  if (updateData.scheduledAt === '') {
    updateData.scheduledAt = null;
  }

  stream = await Stream.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: stream,
    message: 'Stream updated successfully'
  });
});

// @desc    Delete stream
// @route   DELETE /api/v1/streams/:id
// @access  Private
export const deleteStream = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the stream
  if (stream.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this stream`, 401));
  }

  // Delete thumbnail from S3 if it exists
  if (stream.thumbnailKey) {
    try {
      await deleteFile(stream.thumbnailKey);
      console.log('Thumbnail deleted from S3:', stream.thumbnailKey);
    } catch (error) {
      console.error('Failed to delete thumbnail from S3:', error);
      // Continue with stream deletion even if thumbnail deletion fails
    }
  }

  await stream.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Stream deleted successfully'
  });
});

// @desc    Start stream
// @route   PUT /api/v1/streams/:id/start
// @access  Private
export const startStream = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the stream
  if (stream.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to start this stream`, 401));
  }

  // Check if stream can be started
  if (stream.status === 'live') {
    return next(new ErrorResponse('Stream is already live', 400));
  }

  if (stream.status === 'ended') {
    return next(new ErrorResponse('Cannot start an ended stream', 400));
  }

  // Start the stream
  await stream.startStream();

  res.status(200).json({
    success: true,
    data: stream,
    message: 'Stream started successfully'
  });
});

// @desc    End stream
// @route   PUT /api/v1/streams/:id/end
// @access  Private
export const endStream = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the stream
  if (stream.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to end this stream`, 401));
  }

  // Check if stream can be ended
  if (stream.status !== 'live') {
    return next(new ErrorResponse('Stream is not currently live', 400));
  }

  // End the stream
  await stream.endStream();

  res.status(200).json({
    success: true,
    data: stream,
    message: 'Stream ended successfully'
  });
});

// @desc    Like/Unlike stream
// @route   PUT /api/v1/streams/:id/like
// @access  Private
export const toggleLike = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // For now, we'll just increment/decrement likes
  // In a real app, you might want to track who liked what
  const { action } = req.body; // 'like' or 'unlike'

  if (action === 'like') {
    await stream.incrementLikes();
  } else if (action === 'unlike') {
    await stream.decrementLikes();
  } else {
    return next(new ErrorResponse('Invalid action. Use "like" or "unlike"', 400));
  }

  res.status(200).json({
    success: true,
    data: stream,
    message: `Stream ${action}d successfully`
  });
});

// @desc    Get stream statistics
// @route   GET /api/v1/streams/:id/stats
// @access  Private
export const getStreamStats = asyncHandler(async (req, res, next) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) {
    return next(new ErrorResponse(`Stream not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the stream
  if (stream.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to view this stream's stats`, 401));
  }

  // Calculate duration if stream has ended
  const duration = stream.duration ? Math.floor(stream.duration / 1000 / 60) : null; // in minutes

  const stats = {
    likesCount: stream.likesCount,
    viewerCount: stream.viewerCount,
    duration,
    status: stream.status,
    startedAt: stream.startedAt,
    endedAt: stream.endedAt
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Search streams by hashtags
// @route   GET /api/v1/streams/search
// @access  Public
export const searchStreams = asyncHandler(async (req, res, next) => {
  const { q, limit = 10, page = 1 } = req.query;

  if (!q) {
    return next(new ErrorResponse('Please provide a search query', 400));
  }

  // Build search query
  const searchQuery = {
    $or: [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { hashtags: { $in: [new RegExp(q, 'i')] } }
    ],
    status: { $in: ['live', 'scheduled'] }
  };

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const streams = await Stream.find(searchQuery)
    .populate('userId', 'fullName avatar')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Stream.countDocuments(searchQuery);

  res.status(200).json({
    success: true,
    count: streams.length,
    total,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    },
    data: streams
  });
});
