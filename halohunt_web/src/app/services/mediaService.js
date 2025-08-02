const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get a presigned URL for uploading an avatar to S3
 * @param {string} fileType - MIME type of the file
 * @returns {Promise<Object>} - Object containing uploadUrl, key, and fileUrl
 */
export const getAvatarUploadUrl = async (fileType) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/v1/media/avatar-upload-url?fileType=${encodeURIComponent(fileType)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload URL: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error getting avatar upload URL:', error);
    throw error;
  }
};

/**
 * Get a presigned URL for uploading a cover image to S3
 * @param {string} fileType - MIME type of the file
 * @returns {Promise<Object>} - Object containing uploadUrl, key, and fileUrl
 */
export const getCoverUploadUrl = async (fileType) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/v1/media/cover-upload-url?fileType=${encodeURIComponent(fileType)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload URL: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error getting cover upload URL:', error);
    throw error;
  }
};

/**
 * Upload a file to S3 using a presigned URL
 * @param {string} presignedUrl - Presigned URL for uploading
 * @param {File} file - File to upload
 * @returns {Promise<void>}
 */
export const uploadFileToS3 = async (presignedUrl, file) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

/**
 * Update user avatar with S3 file information
 * @param {string} fileUrl - Public URL of the file
 * @param {string} key - S3 key of the file
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUserAvatar = async (fileUrl, key) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/v1/media/avatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ fileUrl, key })
    });

    if (!response.ok) {
      throw new Error(`Failed to update avatar: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating user avatar:', error);
    throw error;
  }
};

/**
 * Update user cover image with S3 file information
 * @param {string} fileUrl - Public URL of the file
 * @param {string} key - S3 key of the file
 * @returns {Promise<Object>} - Updated user object
 */
export const updateUserCover = async (fileUrl, key) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/v1/media/cover`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ fileUrl, key })
    });

    if (!response.ok) {
      throw new Error(`Failed to update cover: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating user cover:', error);
    throw error;
  }
};

export default {
  getAvatarUploadUrl,
  getCoverUploadUrl,
  uploadFileToS3,
  updateUserAvatar,
  updateUserCover
}; 