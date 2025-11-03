<template>
  <div class="inbox-tab">
    <div class="inbox-header">
      <h2>Conversations</h2>
      <div class="inbox-filters">
        <button 
          class="filter-btn" 
          :class="{ active: localStatus === 'open' }"
          @click="handleStatusChange('open')"
        >
          Open
        </button>
        <button 
          class="filter-btn" 
          :class="{ active: localStatus === 'closed' }"
          @click="handleStatusChange('closed')"
        >
          Closed
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-state">
      Loading conversations...
    </div>
    <div v-else-if="conversations.length === 0" class="empty-state">
      No {{ localStatus }} conversations yet.
    </div>
    <div v-else class="conversations-container">
      <div class="conversations-list">
        <div 
          v-for="conv in conversations" 
          :key="conv.session_id"
          class="conversation-item"
          :class="{ active: selectedId === conv.session_id }"
          @click="emit('select-conversation', conv.session_id)"
        >
          <div class="conversation-header">
            <h3>{{ conv.customer.full_name || conv.customer.email }}</h3>
            <span class="timestamp">{{ formatTimeAgo(conv.updated_at) }}</span>
          </div>
          <div class="conversation-preview">
            <span class="agent-name">{{ conv.agent.name }}:</span>
            <p class="last-message">{{ conv.last_message }}</p>
          </div>
          <div class="conversation-footer">
            <span class="message-count">{{ conv.message_count }} messages</span>
            <span class="conversation-status" :class="conv.status">
              {{ conv.status }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="conversation-detail">
        <div v-if="selectedConversation" class="chat-detail">
          <div class="chat-header">
            <h3>{{ selectedConversation.customer.full_name || selectedConversation.customer.email }}</h3>
            <span class="chat-status" :class="selectedConversation.status">
              {{ selectedConversation.status }}
            </span>
          </div>
          
          <div class="messages-container">
            <div 
              v-for="(message, index) in selectedConversation.messages" 
              :key="index"
              class="message-item"
              :class="{ 'customer-message': message.sender === 'customer', 'agent-message': message.sender !== 'customer' }"
            >
              <div class="message-sender">
                {{ message.sender === 'customer' ? (selectedConversation.customer.full_name || 'Customer') : message.sender }}
              </div>
              <div class="message-content">
                {{ message.message }}
              </div>
              <div class="message-time">
                {{ formatMessageTime(message.timestamp) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-selection">
          Select a conversation to view details
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Conversation, ChatDetail } from '@/types/chat'

defineProps<{
  conversations: Conversation[]
  loading: boolean
  status: 'open' | 'closed'
  selectedId: string | null
  selectedConversation: ChatDetail | null
}>()

const emit = defineEmits<{
  (e: 'update:status', value: 'open' | 'closed'): void
  (e: 'select-conversation', sessionId: string): void
}>()

const localStatus = ref<'open' | 'closed'>('open')

const handleStatusChange = (status: 'open' | 'closed') => {
  localStatus.value = status
  emit('update:status', status)
}

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date()
  const past = new Date(timestamp)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  
  return `${displayHours}:${displayMinutes} ${ampm}`
}
</script>

<style scoped>
.inbox-tab {
  max-width: 100%;
}

.inbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.inbox-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.inbox-filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  background-color: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6B7280;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #E5E7EB;
}

.filter-btn.active {
  background-color: #F24611;
  color: white;
  border-color: #F24611;
}

.conversations-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  height: 600px;
}

.conversations-list {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow-y: auto;
}

.conversation-item {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background-color: #F9FAFB;
}

.conversation-item.active {
  background-color: #FEF3F2;
  border-left: 3px solid #F24611;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.conversation-header h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #111827;
}

.timestamp {
  font-size: 0.8rem;
  color: #9CA3AF;
}

.conversation-preview {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}

.agent-name {
  font-weight: 500;
  color: #6B7280;
  font-size: 0.85rem;
}

.last-message {
  color: #9CA3AF;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.conversation-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-count {
  font-size: 0.8rem;
  color: #9CA3AF;
}

.conversation-status {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 500;
}

.conversation-status.open {
  background-color: #D1FAE5;
  color: #065F46;
}

.conversation-status.closed {
  background-color: #FEE2E2;
  color: #991B1B;
}

.conversation-detail {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

.chat-status {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

.chat-status.open {
  background-color: #D1FAE5;
  color: #065F46;
}

.chat-status.closed {
  background-color: #FEE2E2;
  color: #991B1B;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 75%;
}

.customer-message {
  align-self: flex-start;
}

.agent-message {
  align-self: flex-end;
}

.message-sender {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6B7280;
  padding: 0 8px;
}

.message-content {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.customer-message .message-content {
  background-color: #F3F4F6;
  color: #111827;
  border-bottom-left-radius: 4px;
}

.agent-message .message-content {
  background-color: #F24611;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-time {
  font-size: 0.7rem;
  color: #9CA3AF;
  padding: 0 8px;
}

.no-selection {
  color: #9CA3AF;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
}
</style>

