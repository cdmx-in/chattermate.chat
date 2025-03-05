<!--
ChatterMate - Conversation Chat
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
-->

<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import type { ChatDetail } from '@/types/chat'
import { useConversationChat } from '@/composables/useConversationChat'
import sendIcon from '@/assets/sendbutton.svg'

const props = defineProps<{
  chat: ChatDetail
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'chatUpdated', data: ChatDetail): void
  (e: 'clearUnread', sessionId: string): void
}>()

const {
  newMessage,
  messagesContainer,
  formattedMessages,
  isLoading,
  showTakeoverButton,
  showTakenOverStatus,
  isChatClosed,
  canSendMessage,
  scrollToBottom,
  sendMessage,
  handleTakeover,
  updateChat,
  handledByAI,
  endChat
} = useConversationChat(props.chat, emit)

// Add state for end chat confirmation
const showEndChatConfirm = ref(false)

// Function to handle end chat request
const handleEndChatRequest = () => {
  showEndChatConfirm.value = true
}

// Function to confirm end chat
const confirmEndChat = () => {
  endChat(true) // true indicates to request rating
  showEndChatConfirm.value = false
}

// Function to cancel end chat
const cancelEndChat = () => {
  showEndChatConfirm.value = false
}

// Watch for chat changes and update the internal state
watch(() => props.chat, (newChat) => {
  if (newChat) {
    updateChat(newChat)
    nextTick(() => {
      scrollToBottom()
    })
  }
}, { deep: true })

// Scroll to bottom on initial load
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="chat-layout">
    <header class="chat-header">
      <div class="user-info">
        <h2>{{ chat.customer.full_name || chat.customer.email }}</h2>
        <div v-if="handledByAI" class="chat-closed-status">
          <i class="fas fa-lock"></i>
          Handled by AI
        </div>
        <div v-if="showTakenOverStatus" class="taken-over-status">
          <i class="fas fa-user-clock"></i>
          Taken over by {{ chat.user_name || 'another agent' }}
        </div>
        <div v-if="isChatClosed" class="chat-closed-status">
          <i class="fas fa-lock"></i>
          Chat closed
        </div>
      </div>
      <div class="header-actions">
        <button 
          v-if="showTakeoverButton"
          class="takeover-btn"
          :disabled="isLoading"
          @click="handleTakeover"
        >
          <i class="fas fa-hand-paper"></i>
          {{ isLoading ? 'Taking over...' : 'Take over chat' }}
        </button>
        <!-- Add End Chat button -->
        <button 
          v-if="canSendMessage && !isChatClosed" 
          class="end-chat-btn"
          @click="handleEndChatRequest"
        >
          <i class="fas fa-door-open"></i>
          End Chat
        </button>
        <button class="action-btn"><i class="fas fa-star"></i></button>
        <button class="action-btn"><i class="fas fa-user"></i></button>
        <button class="action-btn"><i class="fas fa-video"></i></button>
        <button class="action-btn"><i class="fas fa-phone"></i></button>
      </div>
    </header>

    <main class="chat-content">
      <div class="messages" ref="messagesContainer">
        <div 
          v-for="(message, idx) in formattedMessages" 
          :key="idx"
          class="message"
          :class="message.message_type === 'bot' || message.message_type === 'agent' ? 'bot' : 'user'"
        >
          <div class="message-content">
            <div class="message-bubble">
              {{ message.message }}
              <span class="message-time">{{ message.timeAgo }}</span>
            </div>
            <span v-if="message.message_type === 'bot' || message.message_type === 'agent'" class="agent-name">
              {{ message.message_type === 'bot' ? message.agent_name : message.user_name }}
            </span>
          </div>
        </div>
      </div>
    </main>

    <!-- End Chat Confirmation Modal -->
    <div v-if="showEndChatConfirm" class="end-chat-modal">
      <div class="end-chat-modal-content">
        <h3>End Chat</h3>
        <p>Are you sure you want to end this chat and request customer feedback?</p>
        <div class="end-chat-modal-actions">
          <button class="cancel-btn" @click="cancelEndChat">Cancel</button>
          <button class="confirm-btn" @click="confirmEndChat">End Chat & Request Rating</button>
        </div>
      </div>
    </div>

    <footer class="chat-input" v-if="!isChatClosed && !handledByAI">
      <div class="input-container" :class="{ disabled: !canSendMessage }">
        <input 
          v-model="newMessage"
          type="text" 
          placeholder="Type a message" 
          class="message-input"
          @keyup.enter="sendMessage"
          :disabled="!canSendMessage"
        >
        <button 
          class="send-button" 
          @click="sendMessage"
          :disabled="!newMessage.trim() || !canSendMessage"
        >
          <img :src="sendIcon" alt="Send" />
        </button>
      </div>
      <div v-if="!canSendMessage" class="input-message">
        {{ showTakeoverButton ? 'Take over the chat to send messages' : 
           handledByAI ? 'This chat is being handled by AI' : 
           isChatClosed  ? 'This chat has been closed' : 
           'Chat is being handled by ' + chat.user_name }}
      </div>
    </footer>

    <footer v-else-if="handledByAI" class="chat-closed-footer">
      <div class="chat-closed-message">
        <i class="fas fa-lock"></i>
        This chat is being handled by AI
      </div>
    </footer>
    <footer v-else class="chat-closed-footer">
      <div class="chat-closed-message">
        <i class="fas fa-lock"></i>
        This chat has been closed
      </div>
    </footer>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100%;
  background: var(--background-color);
  position: relative;
  overflow: hidden;
}

.chat-header {
  flex: 0 0 auto;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.chat-content {
  flex: 1 1 auto;
  min-height: 0;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.messages {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-input {
  flex: 0 0 auto;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
  width: 100%;
}

.user-info h2 {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.status {
  font-size: 12px;
  color: var(--text-muted);
}

.header-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.action-btn:hover {
  background: var(--background-mute);
}

.message {
  max-width: 70%;
  display: flex;
  margin-bottom: 12px;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 100%;
}

.message.user {
  margin-left: auto;
  justify-content: flex-end;
}

.message.bot {
  margin-right: auto;
  justify-content: flex-start;
}

.message-bubble {
  background: var(--background-soft);
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  color: var(--text-primary);
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
}

.message.user .message-bubble {
  background: var(--primary-color);
  color: var(--background-color);
  border-radius: 16px;
  border-bottom-right-radius: 4px;
}

.agent-name {
  font-size: 12px;
  color: var(--text-muted);
  padding-left: 4px;
  margin-top: 2px;
}

.message-time {
  font-size: 11px;
  color: var(--text-color-light);
  margin-top: 4px;
  display: block;
  text-align: right;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.message.bot .message-time {
  color: var(--text-muted);
}

.input-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--background-soft);
  padding: 8px 16px;
  border-radius: 24px;
  border: 1px solid var(--border-color);
}

.input-container.disabled {
  opacity: 0.7;
  background: var(--background-mute);
}

.message-input {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  padding: 8px 0;
  outline: none;
}

.message-input::placeholder {
  color: var(--text-placeholder);
}

.emoji-btn,
.attach-btn,
.send-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 18px;
}

.send-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
}

.send-button:hover {
  opacity: 1;
}

.send-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.send-button img {
  width: 24px;
  height: 24px;
}

.takeover-btn {
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.takeover-btn:hover {
  background: var(--accent-color);
}

.takeover-btn:disabled {
  background: var(--background-mute);
  cursor: not-allowed;
}

.takeover-btn i {
  font-size: 16px;
}

.taken-over-status {
  font-size: 12px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.taken-over-status i {
  font-size: 14px;
}

.input-message {
  text-align: center;
  color: var(--text-muted);
  font-size: 12px;
  margin-top: 8px;
}

.message-input:disabled {
  cursor: not-allowed;
}

.chat-closed-status {
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.chat-closed-status i {
  font-size: 14px;
}

.chat-closed-footer {
  flex: 0 0 auto;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
  width: 100%;
}

.chat-closed-message {
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.chat-closed-message i {
  font-size: 16px;
}

.end-chat-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  margin-right: 16px;
}

.end-chat-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

.end-chat-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.end-chat-modal-content {
  background: var(--background-color);
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.end-chat-modal-content h3 {
  margin-top: 0;
  color: var(--text-primary);
  font-size: 18px;
}

.end-chat-modal-content p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.end-chat-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  background: var(--background-mute);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.confirm-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.confirm-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

.cancel-btn:hover {
  background: var(--background-soft);
}
</style> 