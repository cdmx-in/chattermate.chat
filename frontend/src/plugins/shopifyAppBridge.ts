import createApp from '@shopify/app-bridge'
import { Redirect } from '@shopify/app-bridge/actions'

let shopifyApp: any = null

export function initShopifyApp() {
  // Don't initialize App Bridge if we're on the login page or in popup mode
  // This prevents the login page from being redirected by Shopify's embedded app logic
  const currentPath = window.location.pathname
  const isLoginPage = currentPath === '/login' || currentPath.endsWith('/login')
  
  if (isLoginPage) {
    console.info('🚫 Skipping App Bridge initialization - login page detected')
    return null
  }
  
  const params = new URLSearchParams(window.location.search)
  const isPopup = params.get('popup') === '1'
  
  if (isPopup) {
    console.info('🚫 Skipping App Bridge initialization - popup mode detected')
    return null
  }

  if (shopifyApp) return shopifyApp

  const host = params.get('host')
  const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY || (window.APP_CONFIG as any)?.VITE_SHOPIFY_API_KEY

  if (!host || !apiKey) {
    console.info('ℹ️ App Bridge not initialized - missing host or apiKey')
    return null
  }

  shopifyApp = createApp({
    apiKey,
    host,
    forceRedirect: true,
  })

  console.info('✅ Shopify App Bridge initialized')
  return shopifyApp
}

export function useShopifyRedirect() {
  const app = initShopifyApp()
  return app ? Redirect.create(app) : null
}
