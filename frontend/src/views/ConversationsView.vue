<!--
ChatterMate - Conversations View
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