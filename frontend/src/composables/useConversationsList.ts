import { ref, computed, watch, onMounted, onBeforeUnmount, reactive } from 'vue'
import type { Conversation, ChatDetail, Message } from '@/types/chat'
import { formatDistanceToNow } from 'date-fns'
import { chatService } from '@/services/chat'
import { socketService } from '@/services/socket'
import { userService } from '@/services/user'

export function useConversationsList(props: {
  conversations: Conversation[]
  loading: boolean
  error: string
}, emit: (event: 'chatUpdated', data: ChatDetail) => void) {
  const selectedChat = ref<ChatDetail | null>(null)
  const selectedId = ref<string | null>(null)
  const chatLoading = ref<boolean>(false)
  const currentUserId = ref(userService.getUserId())
  const unreadMessages = reactive<Record<string, number>>({})
  const processedMessages = reactive<Set<string>>(new Set())

  // Socket event handlers
  const handleChatReply = (data: {
    message: string
    type: string
    agent_name?: string
    timestamp: string
    session_id: string
  }) => {
    // Create unique message identifier
    const messageKey = `${data.session_id}-${data.timestamp}`;
    // Skip if already processed
    if (processedMessages.has(messageKey)) return;
    processedMessages.add(messageKey);

    // Add unread counter if not current chat
    if (selectedId.value !== data.session_id) {
      if (!unreadMessages[data.session_id]) {
        unreadMessages[data.session_id] = 0
      }
      unreadMessages[data.session_id]++
    }

    if (selectedChat.value && selectedId.value === data.session_id) {
      const newMessage: Message = {
        message: data.message,
        message_type: data.type === 'agent_message' ? 'agent' : data.type,
        timestamp: data.timestamp,
        session_id: data.session_id
      }

      // Create a completely new chat object with all properties
      const updatedChat: ChatDetail = {
        ...selectedChat.value,
        messages: [...(selectedChat.value.messages || []), newMessage],
        updated_at: data.timestamp,
        customer: { ...selectedChat.value.customer },
        agent_name: selectedChat.value.agent_name,
        status: selectedChat.value.status,
        user_id: selectedChat.value.user_id,
        user_name: selectedChat.value.user_name,
        session_id: selectedChat.value.session_id,
      }

      // Update the selected chat with the new object
      selectedChat.value = updatedChat

      // Emit chat update event
      emit('chatUpdated', updatedChat)
    }
  }

  const handleRoomEvent = (data: unknown) => {
    console.log('Room event received:', data)
    // You can handle join/leave events here if needed
  }

  const setupSocketListeners = () => {

    socketService.on('chat_reply', handleChatReply)
    socketService.on('room_event', handleRoomEvent)
  }

  const cleanupSocketListeners = () => {

    socketService.off('chat_reply', handleChatReply)
    socketService.off('room_event', handleRoomEvent)
  }

  // Handle socket reconnection
  const handleSocketReconnect = () => {
    console.log('Socket reconnected, re-establishing listeners and room')
    cleanupSocketListeners()
    setupSocketListeners()
    
    // Rejoin room if necessary

    const userId = userService.getUserId()
    if (userId) {
      socketService.emit('join_room', { session_id: `user_${userId}` })
    }
  }

 

  const loadChatDetail = async (sessionId: string) => {
    try {
      // Only load full chat detail if it's a new chat or not loaded yet
      if (!selectedChat.value || selectedChat.value.session_id !== sessionId) {
        chatLoading.value = true
        selectedId.value = sessionId
        const detail = await chatService.getChatDetail(sessionId)
        selectedChat.value = detail
      }
    } catch (err) {
      console.error('Failed to load chat:', err)
    } finally {
      chatLoading.value = false
    }
  }

  // Watch for conversations changes and load first conversation
  watch(() => props.conversations, (newConversations) => {
    if (newConversations.length > 0 && !selectedId.value) {
      loadChatDetail(newConversations[0].session_id)
    }
  }, { immediate: true })

  const formattedConversations = computed(() => {
    return props.conversations.map(conv => ({
      ...conv,
      timeAgo: formatDistanceToNow(new Date(conv.updated_at), { addSuffix: true })
    }))
  })

  // Connect to socket and setup listeners on mount
  onMounted(() => {
    console.log('Connecting to socket')
    socketService.connect()
    setupSocketListeners()
    socketService.onReconnect(handleSocketReconnect)
    
    // Join user-specific room
    const userId = userService.getUserId()
    if (userId) {
      socketService.emit('join_room', { session_id: `user_${userId}` })
    }
  })

  // Cleanup on unmount
  onBeforeUnmount(() => {
    console.log('Disconnecting from socket')
    const userId = userService.getUserId()
    if (userId) {
      socketService.emit('leave_room', { session_id: `user_${userId}` })
    }
    cleanupSocketListeners()
    socketService.offReconnect(handleSocketReconnect)
  })

  // Add method to clear unreads
  const clearUnread = (sessionId: string) => {
    delete unreadMessages[sessionId]
  }

  return {
    selectedChat,
    selectedId,
    chatLoading,
    formattedConversations,
    loadChatDetail,
    unreadMessages,
    clearUnread
  }
} 