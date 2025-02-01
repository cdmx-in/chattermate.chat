import api from './api'
import type { Conversation, ChatDetail } from '@/types/chat'

interface ChatParams {
  skip?: number
  limit?: number
  agentId?: string
}

export const chatService = {
  async getRecentChats(params?: ChatParams) {
    const response = await api.get<Conversation[]>('/chats/recent', { params })
    return response.data
  },

  async getChatDetail(sessionId: string) {
    const response = await api.get<ChatDetail>(`/chats/${sessionId}`)
    return response.data
  },

  async takeoverChat(sessionId: string): Promise<void> {
    const response = await api.post(`/sessions/${sessionId}/takeover`)
    return response.data
  }
} 