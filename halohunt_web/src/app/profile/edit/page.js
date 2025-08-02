"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  MapPin, 
  Phone,
  Save, 
  ArrowLeft,
  Upload,
  X
} from 'lucide-react';
import Link from 'next/link';
import FileUpload from '../../components/FileUpload';
import { 
  getAvatarUploadUrl, 
  getCoverUploadUrl, 
  uploadFileToS3, 
  updateUserAvatar, 
  updateUserCover 
} from '../../services/mediaService';

export default function EditProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    location: '',
    phone: ''
  });
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      // Populate form with user data
      setFormData({
        fullName: user.fullName || '',
        bio: user.bio || '',
        location: user.location || '',
        phone: user.phone || '',
      });
      setAvatarUrl(user.avatar || '');
      setCoverImageUrl(user.coverImage || '');
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Update profile details
      const profileResult = await updateProfile(formData);
      
      if (profileResult.success) {
        setMessage({ 
          type: 'success', 
          text: 'Profile updated successfully!' 
        });
        
        // Redirect back to profile page after a short delay
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        setMessage({ 
          type: 'error', 
          text: profileResult.error || 'Failed to update profile' 
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: 'error', 
        text: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUploadComplete = (fileUrl, key, updatedUser) => {
    setAvatarUrl(fileUrl);
    setShowAvatarUpload(false);
    setMessage({ 
      type: 'success', 
      text: 'Avatar updated successfully!' 
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const handleCoverUploadComplete = (fileUrl, key, updatedUser) => {
    setCoverImageUrl(fileUrl);
    setShowCoverUpload(false);
    setMessage({ 
      type: 'success', 
      text: 'Cover image updated successfully!' 
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // If loading, show a simple loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Back Button */}
            <div className="flex items-center">
              <Link href="/profile" className="flex items-center text-gray-600 hover:text-purple-600">
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span className="font-medium">Back to Profile</span>
              </Link>
            </div>

            {/* Center - Title */}
            <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>

            {/* Right Side - Empty space for balance */}
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h2>
            
            {!showAvatarUpload ? (
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <img 
                    src={avatarUrl || 'https://randomuser.me/api/portraits/lego/5.jpg'} 
                    alt="Profile avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => setShowAvatarUpload(true)}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-purple-700"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Avatar</span>
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: Square image, at least 400x400 pixels
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setShowAvatarUpload(false)}
                    className="text-sm text-gray-500 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel upload</span>
                  </button>
                </div>
                
                <FileUpload 
                  onFileUploadComplete={handleAvatarUploadComplete}
                  acceptedTypes="image/*"
                  maxSizeMB={2}
                  getUploadUrl={getAvatarUploadUrl}
                  uploadToS3={uploadFileToS3}
                  updateUserMedia={updateUserAvatar}
                />
              </div>
            )}
          </div>

          {/* Cover Image Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Cover Image</h2>
            
            {!showCoverUpload ? (
              <div className="space-y-4">
                <div className="aspect-[3/1] bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={coverImageUrl || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop'} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <button
                    type="button"
                    onClick={() => setShowCoverUpload(true)}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-purple-700"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload New Cover</span>
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: 1200x400 pixels, 3:1 aspect ratio
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setShowCoverUpload(false)}
                    className="text-sm text-gray-500 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel upload</span>
                  </button>
                </div>
                
                <FileUpload 
                  onFileUploadComplete={handleCoverUploadComplete}
                  acceptedTypes="image/*"
                  maxSizeMB={5}
                  getUploadUrl={getCoverUploadUrl}
                  uploadToS3={uploadFileToS3}
                  updateUserMedia={updateUserCover}
                />
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.bio ? formData.bio.length : 0}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-purple-600 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 