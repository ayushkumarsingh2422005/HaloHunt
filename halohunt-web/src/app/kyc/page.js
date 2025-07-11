"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Upload, Check, AlertCircle, 
  Shield, Camera, Info, X, User, Calendar, MapPin, 
  FileText, CreditCard, CheckCircle, Clock
} from 'lucide-react';

const KYCPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, submitted, approved, rejected
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [idType, setIdType] = useState('passport');
  const [idFrontImage, setIdFrontImage] = useState(null);
  const [idBackImage, setIdBackImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Handle personal info form changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
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
  
  // Navigate to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setPersonalInfo({
      fullName: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    });
    setIdType('passport');
    setIdFrontImage(null);
    setIdBackImage(null);
    setSelfieImage(null);
    setAcceptedTerms(false);
    setCurrentStep(1);
    setVerificationStatus('pending');
  };
  
  // Check if current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return (
          personalInfo.fullName && 
          personalInfo.dateOfBirth && 
          personalInfo.address && 
          personalInfo.city && 
          personalInfo.state && 
          personalInfo.zipCode && 
          personalInfo.country
        );
      case 2:
        return idFrontImage && (idType === 'passport' || idBackImage);
      case 3:
        return selfieImage && acceptedTerms;
      default:
        return false;
    }
  };
  
  // Render step indicator
  const StepIndicator = ({ number, title, isActive, isCompleted }) => {
    return (
      <div className="flex flex-col items-center">
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${isCompleted ? 'bg-green-500 text-white' : 
              isActive ? 'bg-purple-600 text-white' : 
              'bg-gray-200 text-gray-600'}`}
        >
          {isCompleted ? <Check className="w-4 h-4" /> : number}
        </div>
        <span className={`mt-2 text-xs ${isActive ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
          {title}
        </span>
      </div>
    );
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
              We've received your information and are currently reviewing it. This process typically takes 1-3 business days.
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
              Unfortunately, we couldn't verify your identity with the provided information. Please check the reason below and try again.
            </p>
            <div className="bg-white p-4 rounded-md text-left mb-4">
              <h4 className="font-medium text-sm mb-1">Reason:</h4>
              <p className="text-sm text-gray-600">The document provided is not clearly visible or has expired. Please upload a valid and clear document.</p>
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
          <>
            {/* Steps Indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <StepIndicator 
                  number={1} 
                  title="Personal Info" 
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                />
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div 
                    className="h-1 bg-purple-600" 
                    style={{ width: currentStep > 1 ? '100%' : '0%' }}
                  />
                </div>
                <StepIndicator 
                  number={2} 
                  title="ID Verification" 
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                />
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div 
                    className="h-1 bg-purple-600" 
                    style={{ width: currentStep > 2 ? '100%' : '0%' }}
                  />
                </div>
                <StepIndicator 
                  number={3} 
                  title="Final Step" 
                  isActive={currentStep === 3}
                  isCompleted={false}
                />
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    <p className="text-sm text-gray-600">
                      Please provide your personal details exactly as they appear on your ID document.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={personalInfo.fullName}
                            onChange={handlePersonalInfoChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={personalInfo.dateOfBirth}
                            onChange={handlePersonalInfoChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          id="address"
                          name="address"
                          value={personalInfo.address}
                          onChange={handlePersonalInfoChange}
                          required
                          rows="2"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter your street address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={personalInfo.city}
                          onChange={handlePersonalInfoChange}
                          required
                          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={personalInfo.state}
                          onChange={handlePersonalInfoChange}
                          required
                          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="State"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={personalInfo.zipCode}
                          onChange={handlePersonalInfoChange}
                          required
                          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={personalInfo.country}
                        onChange={handlePersonalInfoChange}
                        required
                        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: ID Verification */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">ID Verification</h2>
                    <p className="text-sm text-gray-600">
                      Please upload a clear photo of your government-issued ID.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ID Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setIdType('passport')}
                            className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                              idType === 'passport' 
                                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <FileText className="w-6 h-6 mb-2" />
                            <span className="text-sm">Passport</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIdType('drivers_license')}
                            className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                              idType === 'drivers_license' 
                                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <CreditCard className="w-6 h-6 mb-2" />
                            <span className="text-sm">Driver's License</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIdType('id_card')}
                            className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                              idType === 'id_card' 
                                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <CreditCard className="w-6 h-6 mb-2" />
                            <span className="text-sm">ID Card</span>
                          </button>
                        </div>
                      </div>

                      <FileUpload 
                        label="Front of ID"
                        image={idFrontImage}
                        setImage={setIdFrontImage}
                        description="Make sure all details are clearly visible and not blurry."
                      />

                      {idType !== 'passport' && (
                        <FileUpload 
                          label="Back of ID"
                          image={idBackImage}
                          setImage={setIdBackImage}
                          description="Make sure all details are clearly visible and not blurry."
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Selfie and Terms */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Final Step</h2>
                    <p className="text-sm text-gray-600">
                      Please take a selfie and accept the terms to complete your verification.
                    </p>

                    <div className="space-y-6">
                      <FileUpload 
                        label="Selfie Photo"
                        image={selfieImage}
                        setImage={setSelfieImage}
                        description="Take a clear photo of your face. Ensure good lighting and that your face is fully visible."
                      />

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              type="checkbox"
                              checked={acceptedTerms}
                              onChange={() => setAcceptedTerms(!acceptedTerms)}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-gray-700">
                              I agree to the terms and conditions <span className="text-red-500">*</span>
                            </label>
                            <p className="text-gray-500 mt-1">
                              I confirm that all information provided is accurate and belongs to me. 
                              I understand that providing false information may result in account termination.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                      >
                        Back
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepComplete()}
                        className={`px-4 py-3 rounded-md w-full sm:w-auto ${
                          isStepComplete()
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepComplete()}
                        className={`px-4 py-3 rounded-md w-full sm:w-auto ${
                          isStepComplete()
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Submit Verification
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <VerificationStatusCard />
        )}
      </div>
    </div>
  );
};

export default KYCPage; 