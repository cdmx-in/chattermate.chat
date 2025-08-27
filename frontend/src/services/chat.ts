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
    // Send the status parameter to the backend
    const response = await api.get('/chats/recent', { params })
    return response.data as Conversation[]
  },

  async getChatDetail(sessionId: string) {
    const response = await api.get<ChatDetail>(`/chats/${sessionId}`)
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