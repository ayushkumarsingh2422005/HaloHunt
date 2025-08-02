"use client";
import { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';

const FileUpload = ({ 
  onFileUploadComplete, 
  acceptedTypes = "image/*", 
  maxSizeMB = 5,
  className = "",
  getUploadUrl,
  uploadToS3,
  updateUserMedia
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
    
    // Validate file type
    if (!selectedFile.type.match(acceptedTypes)) {
      setErrorMessage(`Invalid file type. Please select a ${acceptedTypes.replace('*', '')} file.`);
      setUploadStatus('error');
      return;
    }
    
    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      setUploadStatus('error');
      return;
    }
    
    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage('');
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setUploadStatus('uploading');
      setUploadProgress(10);
      
      // Step 1: Get presigned URL from our backend
      const { uploadUrl, key, fileUrl } = await getUploadUrl(file.type);
      setUploadProgress(30);
      
      // Step 2: Upload file directly to S3 using presigned URL
      await uploadToS3(uploadUrl, file);
      setUploadProgress(70);
      
      // Step 3: Update user record with the new file URL
      const updatedUser = await updateUserMedia(fileUrl, key);
      setUploadProgress(100);
      
      // Step 4: Notify parent component
      if (onFileUploadComplete) {
        onFileUploadComplete(fileUrl, key, updatedUser);
      }
      
      setUploadStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage(error.message || 'Upload failed. Please try again.');
      setUploadStatus('error');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus('idle');
    setErrorMessage('');
    setUploadProgress(0);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* File Input */}
      {!file && (
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <span className="text-sm font-medium">Click to upload or drag and drop</span>
          <span className="text-xs text-gray-500 mt-1">
            {acceptedTypes.replace('*', ' files')} (max {maxSizeMB}MB)
          </span>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept={acceptedTypes} 
          />
        </label>
      )}
      
      {/* Preview & Actions */}
      {file && (
        <div className="w-full">
          {/* File Preview */}
          <div className="mb-3 relative">
            {preview && (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {!preview && (
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-gray-100 rounded mr-3">
                  <Upload className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Upload Status */}
          {uploadStatus === 'uploading' && (
            <div className="mb-3">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="mb-3 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-sm text-green-600">Upload successful!</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            {uploadStatus !== 'success' && (
              <>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                  className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={uploadStatus === 'uploading'}
                  className="py-2 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </>
            )}
            
            {uploadStatus === 'success' && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
              >
                Upload Another
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 