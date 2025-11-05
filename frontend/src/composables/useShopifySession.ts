import { getSessionToken } from '@shopify/app-bridge/utilities'
import { initShopifyApp } from '@/plugins/shopifyAppBridge'
import { ref, computed } from 'vue'

/**
 * Composable for managing Shopify session tokens and App Bridge
 * 
 * Usage:
 * ```typescript
 * const { sessionToken, isEmbedded, getToken, app } = useShopifySession()
 * 
 * // Check if in embedded context
 * if (isEmbedded.value) {
 *   // Get fresh token
 *   const token = await getToken()
 * }
 * ```
 */
export function useShopifySession() {
  const app = initShopifyApp()
  const sessionToken = ref<string | null>(null)
  const isEmbedded = computed(() => !!app)
  
  /**
   * Get a fresh session token from Shopify App Bridge
   * Returns null if not in embedded context
   */
  const getToken = async (): Promise<string | null> => {
    if (!app) {
      console.info('Not in Shopify embedded context')
      return null
    }
    
    try {
      const token = await getSessionToken(app)
      sessionToken.value = token
      console.log('✅ Retrieved Shopify session token')
      return token
    } catch (error) {
      console.error('❌ Failed to get Shopify session token:', error)
      return null
    }
  }
  
  return {
    sessionToken,
    isEmbedded,
    getToken,
    app
  }
}

