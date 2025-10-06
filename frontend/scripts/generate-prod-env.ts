import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load production environment variables
dotenv.config({ path: '.env.prod' })

// Create swenv.js content for production
const swEnvContent = `
const firebaseConfig = {
  apiKey: "${process.env.VITE_FIREBASE_API_KEY}",
  authDomain: "${process.env.VITE_FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.VITE_FIREBASE_PROJECT_ID}",
  messagingSenderId: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.VITE_FIREBASE_APP_ID}",
  storageBucket: "${process.env.VITE_FIREBASE_STORAGE_BUCKET}",
  measurementId: "${process.env.VITE_FIREBASE_MEASUREMENT_ID}"
};
`

// Write to public/swenv.js
fs.writeFileSync('./public/swenv.js', swEnvContent)
console.log('Production service worker environment file generated successfully!')

// Create config.js content for production using environment variables
const configContent = `// Runtime configuration - this file gets replaced at container startup
window.APP_CONFIG = {
  // API URLs
  API_URL: "${process.env.VITE_API_URL || 'https://api.chattermate.chat/api/v1'}",
  WS_URL: "${process.env.VITE_WS_URL || 'wss://api.chattermate.chat'}",
  WIDGET_URL: "${process.env.VITE_WIDGET_URL || 'https://app.chattermate.chat'}",
  
  // Firebase Configuration
  FIREBASE_API_KEY: "${process.env.VITE_FIREBASE_API_KEY || 'AIzaSyDTwDgANnBItYx39qm-6shq4cUws6QY4wI'}",
  FIREBASE_AUTH_DOMAIN: "${process.env.VITE_FIREBASE_AUTH_DOMAIN || 'chattermate-13e0a.firebaseapp.com'}",
  FIREBASE_PROJECT_ID: "${process.env.VITE_FIREBASE_PROJECT_ID || 'chattermate-13e0a'}",
  FIREBASE_MESSAGING_SENDER_ID: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '680125690355'}",
  FIREBASE_APP_ID: "${process.env.VITE_FIREBASE_APP_ID || '1:680125690355:web:466f50999a6c91935ae286'}",
  FIREBASE_STORAGE_BUCKET: "${process.env.VITE_FIREBASE_STORAGE_BUCKET || 'chattermate-13e0a.firebasestorage.app'}",
  FIREBASE_MEASUREMENT_ID: "${process.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-7LGB58R2Q7'}",
  FIREBASE_VAPID_KEY: "${process.env.VITE_FIREBASE_VAPID_KEY || 'BJKnggErez2qK3AxBhHyEV-EoS9lfcWO1GDXhRwUKIHbT_PH23vhY_8HRIz_KyuC-0gbuViSrtSMiFp7zgyYY4g'}",
  
  // Google Fonts API
  GOOGLE_FONTS_API_KEY: "${process.env.VITE_GOOGLE_FONTS_API_KEY || 'AIzaSyCTQCSK_ybLEglabeusbyekQGEyvFr2C5o'}",
  
  // Node Environment
  NODE_ENV: "production",
  HOST: "${process.env.VITE_HOST || '0.0.0.0'}"
};
`

// Write config to both public and dist directories
const publicConfigPath = './public/config.js'
const distConfigPath = './dist/config.js'

// Write to public directory
fs.writeFileSync(publicConfigPath, configContent)
console.log('Production config file generated to public/config.js')

// Ensure dist directory exists and write to dist directory
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist', { recursive: true })
}
fs.writeFileSync(distConfigPath, configContent)
console.log('Production config file generated to dist/config.js')
