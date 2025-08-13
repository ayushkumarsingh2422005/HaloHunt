"use client";
import { useState, useEffect } from 'react';
import { X, Video, Hash, Calendar, Clock, MapPin, Upload, Save, Play } from 'lucide-react';
import { getThumbnailUploadUrl, uploadFileToS3, deleteThumbnail } from '../app/services/mediaService';

const LiveModel = ({ isOpen, onClose, onSubmit, initialData = null, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hashtags: [],
    aboutThisStream: '',
    thumbnail: '',
    scheduledAt: '',
    status: 'draft',
    taggedProductId: null,
    isLive: false
  });

  const [hashtagInput, setHashtagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [uploadedThumbnailKey, setUploadedThumbnailKey] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form with initial data if editing
  useEffect(() => {
    if (initialData) {
      console.log('LiveModel received initialData:', initialData);
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        hashtags: initialData.hashtags || [],
        aboutThisStream: initialData.aboutThisStream || '',
        thumbnail: initialData.thumbnail || '',
        thumbnailKey: initialData.thumbnailKey || '',
        scheduledAt: initialData.scheduledAt ? new Date(initialData.scheduledAt).toISOString().slice(0, 16) : '',
        status: initialData.status || 'draft',
        taggedProductId: initialData.taggedProductId || null,
        isLive: initialData.isLive || false
      });
    }
  }, [initialData]);

  // Cleanup function to delete orphaned thumbnails
  const cleanupOrphanedThumbnail = async () => {
    // Only delete if we uploaded a new thumbnail and didn't submit
    if (uploadedThumbnailKey && !isSubmitted && !initialData?.thumbnailKey) {
      try {
        await deleteThumbnail(uploadedThumbnailKey);
        console.log('Orphaned thumbnail deleted successfully');
      } catch (error) {
        console.error('Failed to delete orphaned thumbnail:', error);
      }
    }
  };

  // Handle modal close with cleanup
  const handleClose = async () => {
    await cleanupOrphanedThumbnail();
    onClose();
  };

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setUploadedThumbnailKey(null);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleHashtagAdd = () => {
    if (hashtagInput.trim() && !formData.hashtags.includes(hashtagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtagInput.trim()]
      }));
      setHashtagInput('');
    }
  };

  const handleHashtagRemove = (hashtagToRemove) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(hashtag => hashtag !== hashtagToRemove)
    }));
  };

  const handleHashtagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHashtagAdd();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot be more than 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot be more than 500 characters';
    }

    if (formData.aboutThisStream && formData.aboutThisStream.length > 1000) {
      newErrors.aboutThisStream = 'About this stream cannot be more than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('LiveModel submitting formData:', formData);
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setIsSubmitted(true); // Set to true after successful submission
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error submitting live:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploadingThumbnail(true);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          alert('File size must be less than 10MB');
          return;
        }

        // Get presigned URL for upload
        const { uploadUrl, key, fileUrl } = await getThumbnailUploadUrl(file.type);

        // Upload file to S3
        await uploadFileToS3(uploadUrl, file);

        // Update form data with the uploaded file info
        setFormData(prev => ({
          ...prev,
          thumbnail: fileUrl,
          thumbnailKey: key
        }));
        setUploadedThumbnailKey(key); // Set the key for cleanup

      } catch (error) {
        console.error('Error uploading thumbnail:', error);
        alert('Failed to upload thumbnail. Please try again.');
      } finally {
        setIsUploadingThumbnail(false);
      }
    }
  };

  const handleThumbnailRemove = async () => {
    // If there's a thumbnail key, delete it from S3
    if (formData.thumbnailKey) {
      try {
        await deleteThumbnail(formData.thumbnailKey);
        console.log('Thumbnail deleted successfully');
      } catch (error) {
        console.error('Failed to delete thumbnail:', error);
        // Still remove from form even if S3 deletion fails
      }
    }

    // Clear the thumbnail from form data
    setFormData(prev => ({
      ...prev,
      thumbnail: '',
      thumbnailKey: ''
    }));
    
    // Clear the uploaded thumbnail key tracking
    setUploadedThumbnailKey(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'edit' ? 'Edit Live Stream' : 'Create New Live Stream'}
              </h2>
              <p className="text-sm text-gray-500">
                {mode === 'edit' ? 'Update your live stream details' : 'Set up your live stream'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your stream title"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe what your stream will be about"
              maxLength={500}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={handleHashtagKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="Add hashtags (press Enter)"
                maxLength={30}
              />
              <button
                type="button"
                onClick={handleHashtagAdd}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Hash className="w-4 h-4" />
                Add
              </button>
            </div>
            {formData.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    #{hashtag}
                    <button
                      type="button"
                      onClick={() => handleHashtagRemove(hashtag)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* About This Stream */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About This Stream
            </label>
            <textarea
              value={formData.aboutThisStream}
              onChange={(e) => handleInputChange('aboutThisStream', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.aboutThisStream ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Tell viewers more about what to expect from this stream"
              maxLength={1000}
            />
            {errors.aboutThisStream && (
              <p className="mt-1 text-sm text-red-600">{errors.aboutThisStream}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.aboutThisStream.length}/1000 characters
            </p>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              {formData.thumbnail ? (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleThumbnailRemove}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove thumbnail
                  </button>
                </div>
                             ) : (
                 <div className="space-y-4">
                   {isUploadingThumbnail ? (
                     <>
                       <div className="w-12 h-12 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                       <div>
                         <p className="text-sm text-gray-600">
                           Uploading thumbnail...
                         </p>
                         <p className="text-xs text-gray-500 mt-1">
                           Please wait
                         </p>
                       </div>
                     </>
                   ) : (
                     <>
                       <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                       <div>
                         <p className="text-sm text-gray-600">
                           Click to upload or drag and drop
                         </p>
                         <p className="text-xs text-gray-500 mt-1">
                           PNG, JPG, GIF up to 10MB
                         </p>
                       </div>
                       <input
                         type="file"
                         accept="image/*"
                         onChange={handleThumbnailUpload}
                         className="hidden"
                         id="thumbnail-upload"
                         disabled={isUploadingThumbnail}
                       />
                       <label
                         htmlFor="thumbnail-upload"
                         className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                           isUploadingThumbnail 
                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                             : 'bg-purple-600 text-white hover:bg-purple-700'
                         }`}
                       >
                         <Upload className="w-4 h-4" />
                         {isUploadingThumbnail ? 'Uploading...' : 'Choose File'}
                       </label>
                     </>
                   )}
                 </div>
               )}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Stream
            </label>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to start immediately
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {mode === 'edit' ? <Save className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {mode === 'edit' ? 'Update Stream' : 'Create Stream'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveModel;
