import React, { useRef, useEffect, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { DOCUMENT_WIDGET_CONFIG } from '../config/cloudinary';

const CloudinaryDocumentUpload = ({ 
  value = '', 
  onChange, 
  onError,
  className = '',
  disabled = false,
  label = 'Upload Document'
}) => {
  const widgetRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(value);

  useEffect(() => {
    // Load Cloudinary widget script
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.head.appendChild(script);
    }

    // Set uploaded URL when value changes
    setUploadedUrl(value);
  }, [value]);

  const openWidget = () => {
    if (disabled || isUploading) return;

    if (!window.cloudinary) {
      console.error('Cloudinary widget not loaded');
      onError?.('Cloudinary widget not loaded. Please refresh the page.');
      return;
    }

    if (!DOCUMENT_WIDGET_CONFIG.cloudName || !DOCUMENT_WIDGET_CONFIG.uploadPreset) {
      console.error('Cloudinary configuration missing');
      onError?.('Cloudinary configuration missing. Please check your environment variables.');
      return;
    }

    setIsUploading(true);

    widgetRef.current = window.cloudinary.createUploadWidget(
      DOCUMENT_WIDGET_CONFIG,
      (error, result) => {
        setIsUploading(false);
        
        if (error) {
          console.error('Cloudinary upload error:', error);
          onError?.(error.message || 'Upload failed');
          return;
        }

        if (result && result.event === 'success') {
          const fileUrl = result.info.secure_url;
          setUploadedUrl(fileUrl);
          onChange?.(fileUrl);
        }
      }
    );

    widgetRef.current.open();
  };

  const removeFile = () => {
    setUploadedUrl('');
    onChange?.('');
  };

  return (
    <div className={`cloudinary-upload cloudinary-document-upload ${className}`}>
      {uploadedUrl ? (
        <div className="file-preview-container">
          <div className="file-preview">
            <File size={32} className="file-icon" />
            <div className="file-info">
              <p className="file-name">{uploadedUrl.split('/').pop()}</p>
              <p className="file-status">✓ Uploaded successfully</p>
            </div>
            <button
              type="button"
              className="remove-file-btn"
              onClick={removeFile}
              disabled={disabled}
              title="Remove file"
            >
              <X size={16} />
            </button>
          </div>
          <div className="file-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={openWidget}
              disabled={disabled || isUploading}
            >
              <Upload size={16} />
              {isUploading ? 'Uploading...' : 'Change File'}
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-area" onClick={openWidget}>
            <div className="upload-content">
              <File size={48} className="upload-icon" />
              <p className="upload-text">Click to upload document</p>
              <p className="upload-subtext">
                Supports PDF, DOC, DOCX (max 10MB)
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
              {isUploading ? 'Uploading...' : label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryDocumentUpload;

