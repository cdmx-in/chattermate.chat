import { ref, computed, watch, nextTick } from 'vue'
import type { ChatDetail, Message } from '@/types/chat'
import { formatDistanceToNow } from 'date-fns'
import { chatService } from '@/services/chat'
import { userService } from '@/services/user'
import { socketService } from '@/services/socket'
import { toast } from 'vue-sonner'

export function useConversationChat(
  initialChat: ChatDetail,
  emit: {
    (event: 'refresh'): void
    (event: 'clearUnread', sessionId: string): void
  }
) {
  const chat = ref<ChatDetail>(initialChat)
  const newMessage = ref('')
  const messagesContainer = ref<HTMLElement | null>(null)
  const isLoading = ref(false)
  const currentUserId = userService.getUserId()

  const showTakeoverButton = computed(() => {
    return chat.value.status === 'transferred' && !chat.value.user_id
  })

  const showTakenOverStatus = computed(() => {
    return chat.value.status === 'open' && chat.value.user_id && chat.value.user_id !== currentUserId
  })

  const handledByAI = computed(() => {
    console.log(chat.value.status === 'open' && !chat.value.user_id && !chat.value.group_id)
    return chat.value.status === 'open' && !chat.value.user_id && !chat.value.group_id
  })

  const isChatClosed = computed(() => {
    return chat.value.status === 'closed'
  })

  const canSendMessage = computed(() => {
    // Cannot send if chat is closed
    if (isChatClosed.value) return false
    
    // Cannot send if needs takeover or taken by another user
    return !showTakeoverButton.value && !showTakenOverStatus.value
  })

  const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }

  // Watch for changes in messages and scroll to bottom
  watch(() => chat.value.messages, () => {
    scrollToBottom()
  }, { deep: true })

  const updateChat = (newChat: ChatDetail) => {
    chat.value = { ...newChat }
    // Emit event to clear unreads
    emit('clearUnread', newChat.session_id)
  }

  const sendMessage = async () => {
    if (!newMessage.value.trim() || !canSendMessage.value) return

    try {
      const messageText = newMessage.value
      // Clear input immediately for better UX
      newMessage.value = ''

      // Add message locally first
      const timestamp = new Date().toISOString()
      const localMessage: Message = {
        message: messageText,
        message_type: 'agent',
        created_at: timestamp,
        session_id: chat.value.session_id
      }

      // Update chat with new message
      chat.value.messages.push(localMessage)
      chat.value.updated_at = timestamp

      // Emit message through socket
      socketService.emit('agent_message', {
        message: messageText,
        session_id: chat.value.session_id,
        message_type: 'agent',
        created_at: timestamp
      })

      scrollToBottom()
    } catch (err) {
      console.error('Failed to send message:', err)
      toast.error('Failed to send message', {
        description: 'Please try again',
        duration: 4000,
        closeButton: true
      })
    }
  }

  const handleTakeover = async () => {
    try {
      isLoading.value = true
      await chatService.takeoverChat(chat.value.session_id)
      
      // Show success toast
      toast.success('Chat taken over successfully', {
        description: 'You can now send messages in this chat',
        duration: 4000,
        closeButton: true
      })
      const userName = userService.getUserName()
      const userId = userService.getUserId()

      // Update local chat state
      chat.value = {
        ...chat.value,
        status: 'open',
        user_id: userId,
        user_name: userName
      }

      socketService.emit('taken_over', { session_id: chat.value.session_id, user_name: userName, profile_picture: userService.getCurrentUser()?.profile_pic ? userService.getCurrentUser()?.profile_pic : '' })
      
      // Emit refresh event to update chat status
      emit('refresh')
    } catch (err: any) {
      console.error('Failed to takeover chat:', err)
      
      // Show error toast with specific message if available
      toast.error('Failed to take over chat', {
        description: err.response?.data?.detail || 'Please try again',
        duration: 4000,
        closeButton: true
      })
    } finally {
      isLoading.value = false
    }
  }

  const formattedMessages = computed(() => {
    return chat.value.messages.map(msg => ({
      ...msg,
      timeAgo: formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })
    }))
  })

  return {
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
    handledByAI
  }
} 