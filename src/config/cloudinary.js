// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
};

// Cloudinary widget configuration for images
export const WIDGET_CONFIG = {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
  sources: ['local', 'url', 'camera'],
  multiple: false,
  cropping: true,
  croppingAspectRatio: 16/9,
  croppingShowDimensions: true,
  folder: 'blog-images',
  resourceType: 'image',
  maxFileSize: 10000000, // 10MB
  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  theme: 'minimal',
  styles: {
    palette: {
      window: "#FFFFFF",
      windowBorder: "#90A0B3",
      tabIcon: "#0078FF",
      menuIcons: "#5A616A",
      textDark: "#000000",
      textLight: "#FFFFFF",
      link: "#0078FF",
      action: "#FF620C",
      inactiveTabIcon: "#0E2F5A",
      error: "#F44235",
      inProgress: "#0078FF",
      complete: "#20B832",
      sourceBg: "#E4EBF1"
    },
    fonts: {
      default: {
        active: true
      }
    }
  }
};

// Cloudinary widget configuration for documents (PDF, DOC, DOCX)
export const DOCUMENT_WIDGET_CONFIG = {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
  sources: ['local'],
  multiple: false,
  folder: 'applications',
  resourceType: 'auto',
  maxFileSize: 10485760, // 10MB
  theme: 'minimal',
  styles: {
    palette: {
      window: "#FFFFFF",
      windowBorder: "#90A0B3",
      tabIcon: "#0078FF",
      menuIcons: "#5A616A",
      textDark: "#000000",
      textLight: "#FFFFFF",
      link: "#0078FF",
      action: "#FF620C",
      inactiveTabIcon: "#0E2F5A",
      error: "#F44235",
      inProgress: "#0078FF",
      complete: "#20B832",
      sourceBg: "#E4EBF1"
    },
    fonts: {
      default: {
        active: true
      }
    }
  }
};

// Debug logging
console.log('Cloudinary Config:', {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
  hasApiKey: !!CLOUDINARY_CONFIG.apiKey,
  hasApiSecret: !!CLOUDINARY_CONFIG.apiSecret
});
