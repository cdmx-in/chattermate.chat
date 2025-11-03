<template>
  <s-app-nav>
    <s-link href="https://chattermate.chat" target="_blank" rel="home">Home</s-link>
    <s-link href="https://chattermate.chat/pricing.html" target="_blank">Pricing</s-link>
  </s-app-nav>
  <div class="shopify-management-page">
    <div class="management-container">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <div>
            <h1>Shopify Integration Management</h1>
            <p class="shop-name">{{ shopName }}</p>
          </div>
          <button class="advanced-settings-btn" @click="goToDashboard">
            Advanced Settings
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs-navigation">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'setup' }"
          @click="switchTab('setup')"
        >
          Setup Instructions
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'customization' }"
          @click="switchTab('customization')"
        >
          Agent Customization
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'inbox' }"
          @click="switchTab('inbox')"
        >
          Inbox
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Setup Tab -->
        <SetupTab 
          v-if="activeTab === 'setup'" 
          :agents-connected="agentsConnected"
          :widget-id="widgetId"
          @open-theme-editor="openShopifyThemeEditor"
        />

        <!-- Customization Tab -->
        <CustomizationTab 
          v-if="activeTab === 'customization'"
          :agent="selectedAgent"
          :loading="loadingAgent"
          :saving="savingAgent"
          :uploading="uploadingPhoto"
          :photo-url="currentPhotoUrl"
          @save="saveAgentChanges"
          @trigger-photo-upload="triggerPhotoUpload"
        />
        
        <!-- Hidden file input for photo upload -->
        <input 
          type="file" 
          ref="photoInput" 
          accept="image/jpeg,image/png,image/webp" 
          @change="handlePhotoChange" 
          class="hidden" 
        />

        <!-- Inbox Tab -->
        <InboxTab 
          v-if="activeTab === 'inbox'"
          :conversations="conversations"
          :loading="loadingConversations"
          :status="conversationStatus"
          :selected-id="selectedConversationId"
          :selected-conversation="selectedConversation"
          @update:status="handleStatusChange"
          @select-conversation="selectConversation"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { agentService } from '@/services/agent'
import { chatService } from '@/services/chat'
import type { Agent, AgentWithCustomization } from '@/types/agent'
import type { Conversation, ChatDetail } from '@/types/chat'
import { toast } from 'vue-sonner'
import api from '@/services/api'
import SetupTab from '@/components/shopify/SetupTab.vue'
import CustomizationTab from '@/components/shopify/CustomizationTab.vue'
import InboxTab from '@/components/shopify/InboxTab.vue'

const route = useRoute()
const router = useRouter()

// State
const activeTab = ref('setup')
const shopName = computed(() => {
  const shop = route.query.shop as string
  return shop ? shop.replace('.myshopify.com', '') : 'your store'
})
const shopId = computed(() => route.query.shop_id as string)
const agentsConnected = computed(() => Number(route.query.agents_connected) || 0)
const widgetId = computed(() => route.query.widget_id as string)

// Agent management
const connectedAgents = ref<Agent[]>([])
const selectedAgentId = ref<string>('')
const selectedAgent = ref<AgentWithCustomization | null>(null)
const loadingAgent = ref(false)
const savingAgent = ref(false)

// Photo upload
const photoInput = ref<HTMLInputElement | null>(null)
const uploadingPhoto = ref(false)

// Conversations
const conversations = ref<Conversation[]>([])
const selectedConversationId = ref<string | null>(null)
const selectedConversation = ref<ChatDetail | null>(null)
const loadingConversations = ref(false)
const conversationStatus = ref<'open' | 'closed'>('open')

// Computed
const currentPhotoUrl = computed(() => {
  if (!selectedAgent.value?.customization?.photo_url) {
    return '/default-avatar.png' // Fallback avatar
  }
  
  const photoUrl = selectedAgent.value.customization.photo_url
  
  // If it's an S3 URL, use it directly
  if (photoUrl.includes('amazonaws.com')) {
    return photoUrl
  }
  
  // For local storage, prepend the API URL
  return import.meta.env.VITE_API_URL + photoUrl
})

// Methods
const switchTab = (tab: string) => {
  activeTab.value = tab
  
  // Update URL query params
  const query = { ...route.query, tab }
  router.replace({ query })
  
  // Load data based on tab
  if (tab === 'customization' && !selectedAgent.value) {
    loadSelectedAgent()
  } else if (tab === 'inbox' && conversations.value.length === 0) {
    loadConversations()
  }
}

const loadConnectedAgents = async () => {
  if (!shopId.value) return
  
  try {
    const response = await api.get(`/shopify/connected-agents`, {
      params: { shop_id: shopId.value }
    })
    connectedAgents.value = response.data || []
    
    if (connectedAgents.value.length > 0) {
      selectedAgentId.value = connectedAgents.value[0].id
    }
  } catch (error) {
    console.error('Error loading connected agents:', error)
    // Fallback: load all organization agents
    try {
      connectedAgents.value = await agentService.getOrganizationAgents()
      if (connectedAgents.value.length > 0) {
        selectedAgentId.value = connectedAgents.value[0].id
      }
    } catch (err) {
      console.error('Error loading organization agents:', err)
      toast.error('Failed to load agents')
    }
  }
}

const loadSelectedAgent = async () => {
  if (!selectedAgentId.value) return
  
  loadingAgent.value = true
  try {
    selectedAgent.value = await agentService.getAgentById(selectedAgentId.value)
  } catch (error) {
    console.error('Error loading agent:', error)
    toast.error('Failed to load agent details')
  } finally {
    loadingAgent.value = false
  }
}

const saveAgentChanges = async (data: { name: string; instructions: string }) => {
  if (!selectedAgent.value) return
  
  savingAgent.value = true
  try {
    const instructions = data.instructions
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
    
    await agentService.updateAgent(selectedAgent.value.id, {
      display_name: data.name,
      instructions
    })
    
    toast.success('Agent updated successfully')
    
    // Reload agent to get fresh data
    await loadSelectedAgent()
  } catch (error) {
    console.error('Error saving agent:', error)
    toast.error('Failed to save agent changes')
  } finally {
    savingAgent.value = false
  }
}

const triggerPhotoUpload = () => {
  photoInput.value?.click()
}

const handlePhotoChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  // For simplicity, upload directly without cropper
  if (!selectedAgent.value) return
  
  uploadingPhoto.value = true
  try {
    const updatedCustomization = await agentService.uploadAgentPhoto(selectedAgent.value.id, file)
    
    if (selectedAgent.value.customization) {
      selectedAgent.value.customization.photo_url = updatedCustomization.photo_url
    }
    
    toast.success('Photo updated successfully')
  } catch (error) {
    console.error('Error uploading photo:', error)
    toast.error('Failed to upload photo')
  } finally {
    uploadingPhoto.value = false
  }
}

const loadConversations = async () => {
  loadingConversations.value = true
  try {
    const params: any = {
      status: conversationStatus.value === 'open' ? 'open,transferred' : conversationStatus.value,
      limit: 50
    }
    
    conversations.value = await chatService.getRecentChats(params)
  } catch (error) {
    console.error('Error loading conversations:', error)
    toast.error('Failed to load conversations')
  } finally {
    loadingConversations.value = false
  }
}

const selectConversation = async (sessionId: string) => {
  selectedConversationId.value = sessionId
  try {
    selectedConversation.value = await chatService.getChatDetail(sessionId)
  } catch (error) {
    console.error('Error loading conversation detail:', error)
    toast.error('Failed to load conversation')
  }
}

const handleStatusChange = (status: 'open' | 'closed') => {
  conversationStatus.value = status
  loadConversations()
}

const goToDashboard = () => {
  window.open('https://app.chattermate.chat', '_blank')
}

const openShopifyThemeEditor = () => {
  const shop = route.query.shop as string
  if (shop) {
    const themeEditorUrl = `https://${shop}/admin/themes/current/editor?context=apps`
    window.open(themeEditorUrl, '_blank')
  }
}

// Watch for conversation status changes
watch(conversationStatus, () => {
  loadConversations()
})

// Initialize
onMounted(async () => {
  // Load connected agents
  await loadConnectedAgents()
  
  // Check if there's a tab in query params
  const tabParam = route.query.tab as string
  if (tabParam && ['setup', 'customization', 'inbox'].includes(tabParam)) {
    activeTab.value = tabParam
  }
  
  // Load data for active tab
  if (activeTab.value === 'customization') {
    await loadSelectedAgent()
  } else if (activeTab.value === 'inbox') {
    await loadConversations()
  }
})
</script>

<style scoped>
.shopify-management-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #1F2937;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  background-color: #F9FAFB;
}

.management-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.page-header {
  padding: 30px;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  margin: 0 0 8px;
  font-size: 1.8rem;
  color: #111827;
}

.shop-name {
  color: #6B7280;
  font-size: 1rem;
  margin: 0;
}

.advanced-settings-btn {
  padding: 10px 20px;
  background-color: #F24611;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.advanced-settings-btn:hover {
  background-color: #D93B0A;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(242, 70, 17, 0.2);
}

.tabs-navigation {
  display: flex;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
}

.tab-button {
  flex: 1;
  padding: 16px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  color: #6B7280;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #111827;
  background-color: #F3F4F6;
}

.tab-button.active {
  color: #F24611;
  border-bottom-color: #F24611;
  background-color: white;
}

.tab-content {
  padding: 30px;
  min-height: 400px;
}

.hidden {
  display: none;
}
</style>

