import React, { useRef, useEffect, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { WIDGET_CONFIG } from '../config/cloudinary';

const CloudinaryUpload = ({ 
  value = '', 
  onChange, 
  onError,
  className = '',
  disabled = false 
}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);

  useEffect(() => {
    // Load Cloudinary widget script
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Set preview URL when value changes
    setPreviewUrl(value);
  }, [value]);

  const openWidget = () => {
    if (disabled || isUploading) return;

    if (!window.cloudinary) {
      console.error('Cloudinary widget not loaded');
      onError?.('Cloudinary widget not loaded. Please refresh the page.');
      return;
    }

    if (!WIDGET_CONFIG.cloudName || !WIDGET_CONFIG.uploadPreset) {
      console.error('Cloudinary configuration missing');
      onError?.('Cloudinary configuration missing. Please check your environment variables.');
      return;
    }

    setIsUploading(true);

    widgetRef.current = window.cloudinary.createUploadWidget(
      WIDGET_CONFIG,
      (error, result) => {
        setIsUploading(false);
        
        if (error) {
          console.error('Cloudinary upload error:', error);
          onError?.(error.message || 'Upload failed');
          return;
        }

        if (result && result.event === 'success') {
          const imageUrl = result.info.secure_url;
          setPreviewUrl(imageUrl);
          onChange?.(imageUrl);
        }
      }
    );

    widgetRef.current.open();
  };

  const removeImage = () => {
    setPreviewUrl('');
    onChange?.('');
  };

  return (
    <div className={`cloudinary-upload ${className}`}>
      {previewUrl ? (
        <div className="image-preview-container">
          <div className="image-preview">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="preview-image"
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={removeImage}
              disabled={disabled}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <div className="image-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={openWidget}
              disabled={disabled || isUploading}
            >
              <Upload size={16} />
              {isUploading ? 'Uploading...' : 'Change Image'}
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-area" onClick={openWidget}>
            <div className="upload-content">
              <ImageIcon size={48} className="upload-icon" />
              <p className="upload-text">Click to upload an image</p>
              <p className="upload-subtext">
                Supports JPG, PNG, GIF, WebP (max 10MB)
              </p>
            </div>
          </div>
          <div className="upload-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={openWidget}
              disabled={disabled || isUploading}
            >
              <Upload size={16} />
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                const url = prompt('Enter image URL:');
                if (url && url.trim()) {
                  setPreviewUrl(url.trim());
                  onChange?.(url.trim());
                }
              }}
              disabled={disabled}
            >
              Use URL Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
