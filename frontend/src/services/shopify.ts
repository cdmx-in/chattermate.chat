import api from './api'
import { getApiUrl } from '@/config/api'

/**
 * Check if Shopify is connected for the current organization
 */
export const checkShopifyConnection = async () => {
  try {
    // Gets the first connected shop to determine if Shopify is connected
    const response = await api.get('/shopify/shops?limit=1')
    const shops = response.data
    const isConnected = shops && shops.length > 0 && shops[0].is_installed
    
    // Return connection status and shop domain if available
    return { 
      connected: isConnected, 
      shop_domain: isConnected ? shops[0].shop_domain : '',
    }
  } catch (error) {
    console.error('Error checking Shopify connection:', error)
    return { connected: false }
  }
}

/**
 * Get the Shopify authorization URL
 * User needs to provide their shop domain
 */
export const connectToShopify = (shopDomain: string) => {
  if (!shopDomain.includes('.myshopify.com')) {
    shopDomain = `${shopDomain}.myshopify.com`
  }
  
  // Redirect directly to the backend API for OAuth initiation
  // This bypasses the frontend router which requires authentication
  // getApiUrl() returns the URL WITH /api/v1 already included
  const apiUrl = getApiUrl()
  window.location.href = `${apiUrl}/shopify/auth?shop=${encodeURIComponent(shopDomain)}`
}

/**
 * Disconnect Shopify integration
 * This will remove all Shopify shops associated with the current organization
 */
export const disconnectShopify = async (shopId: string) => {
  try {
    // Assuming you'll create this endpoint
    const response = await api.delete(`/shopify/shops/${shopId}`)
    return response.data
  } catch (error) {
    console.error('Error disconnecting Shopify:', error)
    throw error
  }
}

/**
 * Get all connected Shopify shops
 */
export const getShopifyShops = async () => {
  try {
    const response = await api.get('/shopify/shops')
    return response.data
  } catch (error) {
    console.error('Error getting Shopify shops:', error)
    throw error
  }
}

/**
 * Save agent-to-Shopify configuration
 */
export const saveAgentShopifyConfig = async (agentId: string, config: {
  shop_id?: string;
  enabled: boolean;
}) => {
  try {
    const response = await api.post(`/shopify/agent-config/${agentId}`, config)
    return response.data
  } catch (error) {
    console.error('Error saving agent Shopify config:', error)
    throw error
  }
}

/**
 * Get agent-to-Shopify configuration
 */
export const getAgentShopifyConfig = async (agentId: string) => {
  try {
    const response = await api.get(`/shopify/agent-config/${agentId}`)
    return response.data
  } catch (error) {
    console.error('Error getting agent Shopify config:', error)
    return { enabled: false }
  }
}

/**
 * Enable Shopify for multiple agents
 */
export const enableShopifyForAgents = async (agentIds: string[], shopId: string) => {
  try {
    const savePromises = agentIds.map(agentId => 
      saveAgentShopifyConfig(agentId, {
        shop_id: shopId,
        enabled: true
      })
    )
    
    await Promise.all(savePromises)
    return { success: true, count: agentIds.length }
  } catch (error) {
    console.error('Error enabling Shopify for agents:', error)
    throw error
  }
}

/**
 * Get shop information from backend during auth flow
 */
export const getShopAuthInfo = async (shopDomain: string, embedded: boolean = true) => {
  try {
    const response = await api.get(`/shopify/auth?shop=${encodeURIComponent(shopDomain)}&embedded=${embedded ? 1 : 0}`)
    return response.data
  } catch (error) {
    console.error('Error getting shop auth info:', error)
    throw error
  }
}

/**
 * Get shop configuration status (agents connected, widget ID, etc.)
 */
export const getShopConfigStatus = async (shopDomain: string, shopId?: string) => {
  try {
    const params = new URLSearchParams({ shop: shopDomain })
    if (shopId) {
      params.append('shop_id', shopId)
    }
    
    const response = await api.get(`/shopify/shop-config-status?${params.toString()}`)
    return response.data
  } catch (error) {
    console.error('Error getting shop config status:', error)
    throw error
  }
} 