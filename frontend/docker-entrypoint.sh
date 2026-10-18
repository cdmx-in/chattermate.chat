#!/bin/sh

# Generate config.js with runtime environment variables
# Use window.location.protocol and window.location.host as fallbacks if env vars not set
cat <<EOF > /usr/share/nginx/html/config.js
// Runtime configuration generated at container startup.
// Assigned to \`self\`, not \`window\`: the page sees it as window.APP_CONFIG
// (self === window there), and the service worker can importScripts() this
// same file to read the Firebase config, which has no window object.
self.APP_CONFIG = {
  // API URLs
  API_URL: "${VITE_API_URL}",
  WS_URL: "${VITE_WS_URL}",
  WIDGET_URL: "${VITE_WIDGET_URL}",
  
  // App URLs
  APP_URL: "${VITE_APP_URL}",
  PRIVACY_POLICY_URL: "${VITE_PRIVACY_POLICY_URL}",
  TERMS_OF_SERVICE_URL: "${VITE_TERMS_OF_SERVICE_URL}",
  
  // Firebase Configuration
  FIREBASE_API_KEY: "${VITE_FIREBASE_API_KEY}",
  FIREBASE_AUTH_DOMAIN: "${VITE_FIREBASE_AUTH_DOMAIN}",
  FIREBASE_PROJECT_ID: "${VITE_FIREBASE_PROJECT_ID}",
  FIREBASE_MESSAGING_SENDER_ID: "${VITE_FIREBASE_MESSAGING_SENDER_ID}",
  FIREBASE_APP_ID: "${VITE_FIREBASE_APP_ID}",
  FIREBASE_STORAGE_BUCKET: "${VITE_FIREBASE_STORAGE_BUCKET}",
  FIREBASE_MEASUREMENT_ID: "${VITE_FIREBASE_MEASUREMENT_ID}",
  FIREBASE_VAPID_KEY: "${VITE_FIREBASE_VAPID_KEY}",
  
  // Razorpay Checkout
  RAZORPAY_KEY_ID: "${VITE_RAZORPAY_KEY_ID:-}",
  // Google Tag Manager container (enables purchase/checkout analytics)
  GTM_ID: "${VITE_GTM_ID:-}",

  // Google Fonts API
  GOOGLE_FONTS_API_KEY: "${VITE_GOOGLE_FONTS_API_KEY}",
  
  // Node Environment
  NODE_ENV: "${NODE_ENV}",
  HOST: "${HOST}"
};

EOF

# Start nginx
exec "$@" 