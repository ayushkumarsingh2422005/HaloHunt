"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Upload, Check, AlertCircle, 
  Shield, Info, X, FileText, CheckCircle, Clock, Building
} from 'lucide-react';

const KYCPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, submitted, approved, rejected
  
  // Document states
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [gstNumber, setGstNumber] = useState('');
  
  // Handle file uploads
  const handleFileUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to the server
    setVerificationStatus('submitted');
  };
  
  // Reset the form
  const resetForm = () => {
    setAadharImage(null);
    setPanImage(null);
    setGstNumber('');
    setVerificationStatus('pending');
  };
  
  // Check if form is complete
  const isFormComplete = () => {
    return aadharImage && panImage;
  };
  
  // Render file upload component
  const FileUpload = ({ label, image, setImage, required = true, description }) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt={label} 
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setImage)}
              className="hidden"
              id={`file-${label}`}
            />
            <label 
              htmlFor={`file-${label}`}
              className="cursor-pointer flex flex-col items-center py-4"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 font-medium">Click to upload</span>
              <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
              <span className="text-xs text-gray-500 mt-2">JPG, PNG or PDF up to 5MB</span>
            </label>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 flex items-start gap-1 mt-1">
            <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>{description}</span>
          </p>
        )}
      </div>
    );
  };
  
  // Render verification status
  const VerificationStatusCard = () => {
    switch (verificationStatus) {
      case 'submitted':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Verification in Progress</h3>
            <p className="text-sm text-gray-600 mb-4">
              We've received your documents and are currently reviewing them. This process typically takes 1-3 business days.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                href="/profile" 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back to Profile
              </Link>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
              >
                Start Over
              </button>
            </div>
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Approved</h3>
            <p className="text-sm text-gray-600 mb-4">
              Congratulations! Your identity has been verified successfully. You now have full access to all features.
            </p>
            <Link 
              href="/profile" 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Back to Profile
            </Link>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Failed</h3>
            <p className="text-sm text-gray-600 mb-4">
              Unfortunately, we couldn't verify your identity with the provided documents. Please check the reason below and try again.
            </p>
            <div className="bg-white p-4 rounded-md text-left mb-4">
              <h4 className="font-medium text-sm mb-1">Reason:</h4>
              <p className="text-sm text-gray-600">The documents provided are not clearly visible or have expired. Please upload valid and clear documents.</p>
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center text-gray-600 hover:text-gray-900 p-2 -ml-2">
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Identity Verification</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Why verify your identity?</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Identity verification helps us maintain a secure marketplace and comply with regulations. 
                  Your information is encrypted and handled according to our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {verificationStatus === 'pending' ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Document Verification</h2>
                <p className="text-sm text-gray-600">
                  Please upload clear photos of your Aadhaar Card and PAN Card. GST number is optional.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Both Aadhaar and PAN card are required for verification. Make sure the images are clear and all details are visible.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <FileUpload 
                    label="Aadhaar Card"
                    image={aadharImage}
                    setImage={setAadharImage}
                    description="Upload a clear photo of your Aadhaar Card. Make sure all details are clearly visible."
                  />

                  <FileUpload 
                    label="PAN Card"
                    image={panImage}
                    setImage={setPanImage}
                    description="Upload a clear photo of your PAN Card. Make sure all details are clearly visible."
                  />

                  <div>
                    <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        id="gstNumber"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your GST Number (if applicable)"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      If you're a business owner or seller, providing your GST number is recommended.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-3 text-sm">
                      <p className="text-gray-700 font-medium">Document Requirements</p>
                      <ul className="list-disc pl-5 mt-1 text-gray-600 text-xs space-y-1">
                        <li>Documents must be valid and not expired</li>
                        <li>All text should be clearly visible</li>
                        <li>No blurry or partial images</li>
                        <li>No edited or manipulated documents</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={!isFormComplete()}
                    className={`px-6 py-3 rounded-md ${
                      isFormComplete()
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Documents
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <VerificationStatusCard />
        )}
      </div>
    </div>
  );
};

export default KYCPage; 