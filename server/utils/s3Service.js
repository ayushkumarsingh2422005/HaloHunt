import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Bucket name
const bucketName = process.env.AWS_S3_BUCKET_NAME;

/**
 * Generate a presigned URL for uploading a file to S3
 * @param {string} fileType - MIME type of the file
 * @param {string} folder - Folder in S3 bucket (e.g., 'avatars', 'covers')
 * @returns {Object} - Object containing the upload URL and the file key
 */
export const generateUploadUrl = async (fileType, folder = 'uploads') => {
  const fileExtension = fileType.split('/')[1] || 'jpg';
  const fileName = `${uuidv4()}.${fileExtension}`;
  const key = `${folder}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: fileType,
    // ACL: 'public-read' // Make uploaded files publicly readable
  });

  try {
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    
    return {
      uploadUrl,
      key,
      fileUrl: `https://${bucketName}.s3.amazonaws.com/${key}`
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
};

/**
 * Generate a presigned URL for viewing a file from S3
 * @param {string} key - S3 object key
 * @returns {string} - Presigned URL for viewing the file
 */
export const generateViewUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return url;
  } catch (error) {
    console.error('Error generating view URL:', error);
    throw error;
  }
};

/**
 * Get the public URL for a file in S3
 * @param {string} key - S3 object key
 * @returns {string} - Public URL for the file
 */
export const getPublicUrl = (key) => {
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
};

/**
 * Delete a file from S3
 * @param {string} key - S3 object key
 * @returns {Promise} - Promise that resolves when file is deleted
 */
export const deleteFile = async (key) => {
  if (!key) {
    console.log('No key provided for deletion, skipping...');
    return;
  }

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  try {
    await s3Client.send(command);
    console.log(`Successfully deleted file: ${key}`);
  } catch (error) {
    console.error(`Error deleting file ${key}:`, error);
    // Don't throw error to prevent breaking the update process
    // Just log it for debugging purposes
  }
};

export default {
  generateUploadUrl,
  generateViewUrl,
  getPublicUrl,
  deleteFile
}; 