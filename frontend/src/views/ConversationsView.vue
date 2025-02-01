<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ConversationsList from '@/components/conversations/ConversationsList.vue'
import type { Conversation } from '@/types/chat'
import { chatService } from '@/services/chat'

const conversations = ref<Conversation[]>([])
const loading = ref(true)
const error = ref('')

const loadConversations = async () => {
  try {
    loading.value = true
    conversations.value = await chatService.getRecentChats()
  } catch (err) {
    error.value = 'Failed to load conversations'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadConversations)
</script>

<template>
  <DashboardLayout>
    <header class="page-header" style="padding: var(--space-lg);">
        <h1>Conversations</h1>
    </header>
    <div class="conversations-view">
      <ConversationsList 
        :conversations="conversations"
        :loading="loading"
        :error="error"
        @refresh="loadConversations"
      />
    </div>
  </DashboardLayout>
</template>

<style scoped>
.conversations-view {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  background: #1a1a1a;
}
</style> 