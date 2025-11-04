import api from './api'
import type { Conversation, ChatDetail } from '@/types/chat'

interface ChatParams {
  skip?: number
  limit?: number
  agent_id?: string
  status?: 'open' | 'closed' | 'transferred' | string
  user_id?: string
  customer_email?: string
  date_from?: string
  date_to?: string
}

export const chatService = {
  async getRecentChats(params?: ChatParams) {
    // Check if we're in a Shopify context
    const urlParams = new URLSearchParams(window.location.search)
    const hasShopParam = urlParams.has('shop') || urlParams.has('host')
    
    const endpoint = hasShopParam ? '/chats/recent/shopify' : '/chats/recent'
    const response = await api.get(endpoint, { params })
    return response.data as Conversation[]
  },

  async getChatDetail(sessionId: string) {
    // Check if we're in a Shopify context
    const urlParams = new URLSearchParams(window.location.search)
    const hasShopParam = urlParams.has('shop') || urlParams.has('host')
    
    const endpoint = hasShopParam ? `/chats/${sessionId}/shopify` : `/chats/${sessionId}`
    const response = await api.get<ChatDetail>(endpoint)
    return response.data
  },

  async takeoverChat(sessionId: string): Promise<void> {
    const response = await api.post(`/sessions/${sessionId}/takeover`)
    return response.data
  },

  async reassignChat(sessionId: string, toUserId: string) {
    const response = await api.post(`/sessions/${sessionId}/reassign`, null, { params: { to_user_id: toUserId } })
    return response.data as ChatDetail
  }
} 