"use client";
import { useState, useEffect } from 'react';
import { X, Upload, Trash2, Star, Plus, Minus } from 'lucide-react';
import { productService } from '../services/productService';
// import { mediaService } from '../services/mediaService';
import mediaService from '../services/mediaService';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, mode = "create" }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        originalPrice: '',
        discountPercentage: '',
        category: 'none',
        subcategory: '',
        brand: '',
        sku: '',
        stockQuantity: '',
        isInStock: true,
        isActive: true,
        isFeatured: false,
        images: [],
        thumbnail: null,
        specifications: [],
        variants: [],
        tags: [],
        metaTitle: '',
        metaDescription: '',
        slug: '',
        dimensions: {
            length: '',
            width: '',
            height: '',
            unit: 'cm'
        },
        weight: {
            value: '',
            unit: 'kg'
        },
        shippingInfo: {
            weight: '',
            dimensions: {
                length: '',
                width: '',
                height: ''
            },
            isFreeShipping: false,
            shippingCost: ''
        },
        status: 'draft'
    });

    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    // Load initial data if editing
    useEffect(() => {
        if (initialData && mode === "edit") {
            setFormData({
                ...initialData,
                price: initialData.price?.toString() || '',
                category: initialData.category || 'none',
                originalPrice: initialData.originalPrice?.toString() || '',
                discountPercentage: initialData.discountPercentage?.toString() || '',
                stockQuantity: initialData.stockQuantity?.toString() || '',
                dimensions: {
                    length: initialData.dimensions?.length?.toString() || '',
                    width: initialData.dimensions?.width?.toString() || '',
                    height: initialData.dimensions?.height?.toString() || '',
                    unit: initialData.dimensions?.unit || 'cm'
                },
                weight: {
                    value: initialData.weight?.value?.toString() || '',
                    unit: initialData.weight?.unit || 'kg'
                },
                shippingInfo: {
                    weight: initialData.shippingInfo?.weight?.toString() || '',
                    dimensions: {
                        length: initialData.shippingInfo?.dimensions?.length?.toString() || '',
                        width: initialData.shippingInfo?.dimensions?.width?.toString() || '',
                        height: initialData.shippingInfo?.dimensions?.height?.toString() || ''
                    },
                    isFreeShipping: initialData.shippingInfo?.isFreeShipping || false,
                    shippingCost: initialData.shippingInfo?.shippingCost?.toString() || ''
                }
            });
        }
    }, [initialData, mode]);

    // Load categories on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const result = await productService.getProductCategories();
            setCategories(result.data || []);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageUpload = async (files) => {
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        const newImages = [];
        const tempImages = [];

        try {
            // First, add all images as temporary with low brightness
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const tempImage = {
                    url: URL.createObjectURL(file),
                    key: null,
                    alt: file.name,
                    isPrimary: formData.images.length === 0 && i === 0,
                    order: formData.images.length + i,
                    isUploading: true,
                    file: file
                };
                tempImages.push(tempImage);
            }

            // Add temporary images to form immediately
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...tempImages]
            }));

            // Upload each image with progress tracking
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const tempIndex = formData.images.length + i;

                try {
                    // Update progress to uploading
                    setUploadProgress(prev => ({
                        ...prev,
                        [tempIndex]: { status: 'uploading', progress: 0 }
                    }));

                    // Get presigned URL
                    const uploadData = await mediaService.getProductImageUploadUrl(file.type);

                    // Update progress to uploading to S3
                    setUploadProgress(prev => ({
                        ...prev,
                        [tempIndex]: { status: 'uploading', progress: 50 }
                    }));

                    // Upload to S3
                    await mediaService.uploadFileToS3(uploadData.uploadUrl, file);

                    // Update progress to completed
                    setUploadProgress(prev => ({
                        ...prev,
                        [tempIndex]: { status: 'completed', progress: 100 }
                    }));

                    // Replace temporary image with uploaded image
                    setFormData(prev => ({
                        ...prev,
                        images: prev.images.map((img, index) =>
                            index === tempIndex ? {
                                ...img,
                                url: uploadData.fileUrl,
                                key: uploadData.key,
                                isUploading: false,
                                file: undefined
                            } : img
                        )
                    }));

                    // Add to newImages array for thumbnail handling
                    newImages.push({
                        url: uploadData.fileUrl,
                        key: uploadData.key,
                        alt: file.name,
                        isPrimary: tempImages[i].isPrimary,
                        order: tempImages[i].order
                    });

                } catch (error) {
                    console.error(`Error uploading image ${file.name}:`, error);

                    // Update progress to failed
                    setUploadProgress(prev => ({
                        ...prev,
                        [tempIndex]: { status: 'failed', progress: 0, error: error.message }
                    }));

                    // Mark image as failed
                    setFormData(prev => ({
                        ...prev,
                        images: prev.images.map((img, index) =>
                            index === tempIndex ? {
                                ...img,
                                isUploading: false,
                                uploadFailed: true,
                                error: error.message
                            } : img
                        )
                    }));
                }
            }

            // Set thumbnail if none exists
            if (!formData.thumbnail && newImages.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    thumbnail: {
                        url: newImages[0].url,
                        key: newImages[0].key
                    }
                }));
            }
        } catch (error) {
            console.error('Error in image upload process:', error);
            alert('Failed to process images. Please try again.');
        } finally {
            setUploadingImages(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => {
            const newImages = [...prev.images];
            const removedImage = newImages.splice(index, 1)[0];

            // If we removed the primary image and there are other images, make the first one primary
            if (removedImage.isPrimary && newImages.length > 0) {
                newImages[0].isPrimary = true;
            }

            // Update thumbnail if it was the removed image
            let newThumbnail = prev.thumbnail;
            if (prev.thumbnail && prev.thumbnail.key === removedImage.key) {
                newThumbnail = newImages.length > 0 ? {
                    url: newImages[0].url,
                    key: newImages[0].key
                } : null;
            }

            // Clean up progress tracking for removed image
            setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[index];
                // Shift progress tracking for remaining images
                const shiftedProgress = {};
                Object.keys(newProgress).forEach(key => {
                    const keyNum = parseInt(key);
                    if (keyNum > index) {
                        shiftedProgress[keyNum - 1] = newProgress[key];
                    } else {
                        shiftedProgress[key] = newProgress[key];
                    }
                });
                return shiftedProgress;
            });

            return {
                ...prev,
                images: newImages,
                thumbnail: newThumbnail
            };
        });
    };

    const setPrimaryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.map((img, i) => ({
                ...img,
                isPrimary: i === index
            })),
            thumbnail: {
                url: prev.images[index].url,
                key: prev.images[index].key
            }
        }));
    };

    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { name: '', value: '' }]
        }));
    };

    const removeSpecification = (index) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    const updateSpecification = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.map((spec, i) =>
                i === index ? { ...spec, [field]: value } : spec
            )
        }));
    };

    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { name: '', value: '', price: '', stockQuantity: '' }]
        }));
    };

    const removeVariant = (index) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };

    const updateVariant = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, i) =>
                i === index ? { ...variant, [field]: value } : variant
            )
        }));
    };

    const addTag = (tag) => {
        if (tag.trim() && !formData.tags.includes(tag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tag.trim()]
            }));
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (!formData.category || formData.category === '') newErrors.category = 'Category is required';
        if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Valid stock quantity is required';
        if (formData.images.length === 0) newErrors.images = 'At least one image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Prepare data for submission
            const submitData = {
                name: formData.name,
                description: formData.description,
                shortDescription: formData.shortDescription || undefined,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
                discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : undefined,
                category: formData.category === 'none' ? null : formData.category,
                subcategory: formData.subcategory || undefined,
                brand: formData.brand || undefined,
                sku: formData.sku || undefined,
                stockQuantity: parseInt(formData.stockQuantity),
                isInStock: formData.isInStock,
                isActive: formData.isActive,
                isFeatured: formData.isFeatured,
                images: formData.images,
                thumbnail: formData.thumbnail,
                specifications: formData.specifications.filter(spec => spec.name && spec.value),
                variants: formData.variants.filter(variant => variant.name && variant.value),
                tags: formData.tags,
                metaTitle: formData.metaTitle || undefined,
                metaDescription: formData.metaDescription || undefined,
                slug: formData.slug || undefined,
                status: formData.status,
                // Only include dimensions if they have values
                ...(formData.dimensions.length || formData.dimensions.width || formData.dimensions.height ? {
                    dimensions: {
                        length: formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined,
                        width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined,
                        height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined,
                        unit: formData.dimensions.unit
                    }
                } : {}),
                // Only include weight if it has a value
                ...(formData.weight.value ? {
                    weight: {
                        value: parseFloat(formData.weight.value),
                        unit: formData.weight.unit
                    }
                } : {}),
                // Only include shipping info if it has meaningful values
                ...(formData.shippingInfo.weight || formData.shippingInfo.dimensions.length || formData.shippingInfo.dimensions.width || formData.shippingInfo.dimensions.height || formData.shippingInfo.shippingCost ? {
                    shippingInfo: {
                        weight: formData.shippingInfo.weight ? parseFloat(formData.shippingInfo.weight) : undefined,
                        dimensions: {
                            length: formData.shippingInfo.dimensions.length ? parseFloat(formData.shippingInfo.dimensions.length) : undefined,
                            width: formData.shippingInfo.dimensions.width ? parseFloat(formData.shippingInfo.dimensions.width) : undefined,
                            height: formData.shippingInfo.dimensions.height ? parseFloat(formData.shippingInfo.dimensions.height) : undefined
                        },
                        isFreeShipping: formData.shippingInfo.isFreeShipping,
                        shippingCost: formData.shippingInfo.shippingCost ? parseFloat(formData.shippingInfo.shippingCost) : undefined
                    }
                } : {})
            };

            // Debug: Log the data being sent
            console.log('Submitting product data:', submitData);

            await onSubmit(submitData);
            onClose();
        } catch (error) {
            console.error('Error submitting product:', error);

            // Try to get more detailed error information
            let errorMessage = 'Failed to save product';
            if (error.message) {
                errorMessage += `: ${error.message}`;
            }

            // If it's a response error, try to get the response data
            if (error.response) {
                try {
                    const errorData = await error.response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (parseError) {
                    console.error('Error parsing error response:', parseError);
                }
            }

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {mode === "edit" ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter product name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="none">None</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.price ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleInputChange}
                                min="0"
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="0"
                            />
                            {errors.stockQuantity && <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter brand name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SKU
                            </label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Auto-generated if empty"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Short Description
                        </label>
                        <input
                            type="text"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleInputChange}
                            maxLength={200}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Brief product description (max 200 characters)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            maxLength={1000}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Detailed product description"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Images *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files)}
                                className="hidden"
                                id="image-upload"
                                disabled={uploadingImages}
                            />
                            <label
                                htmlFor="image-upload"
                                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${uploadingImages ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {uploadingImages ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Uploading Images...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Upload Images
                                    </>
                                )}
                            </label>
                            <p className="text-sm text-gray-500 mt-2">
                                Upload multiple images. First image will be the primary image.
                            </p>

                            {/* Upload Status Summary */}
                            {Object.keys(uploadProgress).length > 0 && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                                        <span className="text-xs text-gray-500">
                                            {Object.values(uploadProgress).filter(p => p.status === 'completed').length} / {Object.keys(uploadProgress).length} completed
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {Object.entries(uploadProgress).map(([index, progress]) => {
                                            const image = formData.images[parseInt(index)];
                                            return (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded overflow-hidden">
                                                        <img
                                                            src={image?.url}
                                                            alt={image?.alt}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-gray-600 truncate">{image?.alt}</p>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                            <div
                                                                className={`h-1.5 rounded-full transition-all duration-300 ${progress.status === 'completed' ? 'bg-green-500' :
                                                                    progress.status === 'failed' ? 'bg-red-500' :
                                                                        'bg-blue-500'
                                                                    }`}
                                                                style={{ width: `${progress.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs">
                                                        {progress.status === 'completed' && (
                                                            <span className="text-green-600">✓</span>
                                                        )}
                                                        {progress.status === 'failed' && (
                                                            <span className="text-red-600">✗</span>
                                                        )}
                                                        {progress.status === 'uploading' && (
                                                            <span className="text-blue-600">{progress.progress}%</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image Preview
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {formData.images.map((image, index) => {
                                    const progress = uploadProgress[index];
                                    const isUploading = image.isUploading;
                                    const isFailed = image.uploadFailed;

                                    return (
                                        <div key={index} className="relative group">
                                            <div className={`relative w-full h-32 rounded-lg border-2 overflow-hidden ${isUploading ? 'border-blue-300 bg-blue-50' :
                                                isFailed ? 'border-red-300 bg-red-50' :
                                                    'border-gray-200'
                                                }`}>
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    className={`w-full h-full object-cover transition-all duration-300 ${isUploading ? 'brightness-50' :
                                                        isFailed ? 'brightness-75' :
                                                            'brightness-100'
                                                        }`}
                                                />

                                                {/* Upload Progress Overlay */}
                                                {isUploading && (
                                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                                            <p className="text-white text-xs font-medium">Uploading...</p>
                                                            {progress && (
                                                                <p className="text-white text-xs mt-1">{progress.progress}%</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Failed Upload Overlay */}
                                                {isFailed && (
                                                    <div className="absolute inset-0 bg-red-500 bg-opacity-80 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                                                <X className="w-4 h-4 text-white" />
                                                            </div>
                                                            <p className="text-white text-xs font-medium">Upload Failed</p>
                                                            <p className="text-red-100 text-xs mt-1">{image.error}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Success Checkmark */}
                                                {!isUploading && !isFailed && progress?.status === 'completed' && (
                                                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Image Actions */}
                                            <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center pointer-events-none">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 pointer-events-auto">
                                                    {image.isPrimary && (
                                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                                                            Primary
                                                        </span>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPrimaryImage(index)}
                                                        disabled={image.isPrimary || isUploading}
                                                        className={`p-1 rounded-full ${image.isPrimary || isUploading
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-blue-500 hover:bg-blue-600'
                                                            } text-white`}
                                                    >
                                                        <Star className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        disabled={isUploading}
                                                        className={`p-1 rounded-full ${isUploading
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-red-500 hover:bg-red-600'
                                                            } text-white`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Image Info */}
                                            <div className="mt-2 text-center">
                                                <p className="text-xs text-gray-600 truncate">{image.alt}</p>
                                                {progress && (
                                                    <div className="mt-1">
                                                        {progress.status === 'uploading' && (
                                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                                <div
                                                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                                                    style={{ width: `${progress.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        )}
                                                        {progress.status === 'completed' && (
                                                            <span className="text-xs text-green-600">✓ Uploaded</span>
                                                        )}
                                                        {progress.status === 'failed' && (
                                                            <span className="text-xs text-red-600">✗ Failed</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Additional Options */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isInStock"
                                checked={formData.isInStock}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">In Stock</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Featured</span>
                        </label>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    #{tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-purple-600 hover:text-purple-800"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add a tag"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.querySelector('input[placeholder="Add a tag"]');
                                    if (input.value.trim()) {
                                        addTag(input.value);
                                        input.value = '';
                                    }
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Specifications
                            </label>
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                        {formData.specifications.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Specification name"
                                    value={spec.name}
                                    onChange={(e) => updateSpecification(index, 'name', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={spec.value}
                                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSpecification(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Variants */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Variants (Size, Color, etc.)
                            </label>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                        {formData.variants.map((variant, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Variant name"
                                    value={variant.name}
                                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={variant.value}
                                    onChange={(e) => updateVariant(index, 'value', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={variant.price}
                                    onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                    step="0.01"
                                    min="0"
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={variant.stockQuantity}
                                    onChange={(e) => updateVariant(index, 'stockQuantity', e.target.value)}
                                    min="0"
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors col-span-4"
                                >
                                    <Minus className="w-4 h-4 inline mr-2" />
                                    Remove Variant
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="draft">Draft</option>
                            <option value="pending">Pending Review</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Saving...' : (mode === "edit" ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
