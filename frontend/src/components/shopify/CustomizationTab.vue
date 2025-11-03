<template>
  <div class="customization-wrapper">
    <s-text v-if="loading" alignment="center" tone="subdued" class="loading-message">
      Loading agent details...
    </s-text>
    
    <div v-else-if="agent" class="customization-content">
      <!-- Header -->
      <div class="customization-header">
        <s-heading>Customize Your Agent</s-heading>
        <s-text tone="subdued">
          Personalize your agent's appearance and behavior to match your brand.
        </s-text>
      </div>

      <!-- Main Content Layout -->
      <div class="main-layout">
        <!-- Form Content -->
        <div class="form-container">
        <!-- Chat Style Section -->
        <div class="form-section">
          <s-text variant="heading-sm" fontWeight="semibold">Chat Style</s-text>
          <s-text variant="body-sm" tone="subdued" class="section-description">
            Choose your chat style to match your brand experience.
          </s-text>
          <div class="style-cards">
            <div 
              v-for="option in chatStyleOptions" 
              :key="option.value"
              class="style-card"
              :class="{ 'active': localChatStyle === option.value }"
              @click="localChatStyle = option.value"
            >
              <div class="style-card-header">
                <div class="style-icon">{{ option.icon }}</div>
                <div class="style-check" v-if="localChatStyle === option.value">
                  ✓
                </div>
              </div>
              <div class="style-card-body">
                <h5 class="style-title">{{ option.label }}</h5>
                <p class="style-description">{{ option.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Colors Section -->
        <div class="form-section">
          <s-text variant="heading-sm" fontWeight="semibold">Colors</s-text>
          <s-text variant="body-sm" tone="subdued" class="section-description">
            Customize the colors to match your brand.
          </s-text>
          <div class="color-grid">
            <div class="color-picker">
              <label>Background</label>
              <div class="color-input">
                <input type="color" v-model="localBackgroundColor">
                <span class="color-value">{{ localBackgroundColor }}</span>
              </div>
            </div>

            <div class="color-picker">
              <label>Chat Bubble</label>
              <div class="color-input">
                <input type="color" v-model="localBubbleColor">
                <span class="color-value">{{ localBubbleColor }}</span>
              </div>
            </div>

            <div class="color-picker">
              <label>Accent</label>
              <div class="color-input">
                <input type="color" v-model="localAccentColor">
                <span class="color-value">{{ localAccentColor }}</span>
              </div>
            </div>

            <div class="color-picker">
              <label>Icon Color</label>
              <div class="color-input">
                <input type="color" v-model="localIconColor">
                <span class="color-value">{{ localIconColor }}</span>
              </div>
            </div>
          </div>
        </div>


        <!-- Agent Instructions Section -->
        <div class="form-section">
          <s-text-area 
            label="Instructions"
            v-model="localInstructions"
            :rows="10"
            placeholder="Enter agent instructions (one per line)"
          />
          <s-text variant="body-sm" tone="subdued" class="helper-text">
            Instructions guide your agent's behavior. Enter one instruction per line.
          </s-text>
        </div>

        <!-- Welcome Message Section (only for ASK_ANYTHING style) -->
        <div v-if="localChatStyle === 'ASK_ANYTHING'" class="form-section">
          <s-text variant="heading-sm" fontWeight="semibold">Welcome Message</s-text>
          <s-text variant="body-sm" tone="subdued" class="section-description">
            Customize the welcome message shown when users first open the chat.
          </s-text>
          
          <div class="welcome-fields">
            <s-text-field 
              label="Welcome Title"
              v-model="localWelcomeTitle"
              placeholder="e.g., Welcome to our AI Assistant"
            />
            <s-text variant="body-sm" tone="subdued" class="helper-text">
              Leave empty to use default: "Welcome to {{ agent?.display_name || agent?.name }}"
            </s-text>

            <s-text-area 
              label="Welcome Subtitle"
              v-model="localWelcomeSubtitle"
              :rows="3"
              placeholder="e.g., I'm here to help you with anything you need. What can I assist you with today?"
            />
            <s-text variant="body-sm" tone="subdued" class="helper-text">
              Leave empty to use default message
            </s-text>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <s-button 
            variant="primary" 
            @click="handleSave"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </s-button>
        </div>
        </div>

        <!-- Chat Preview Section -->
        <div class="preview-container">
          <div class="preview-header">
            <div class="preview-title-section">
              <s-text variant="heading-sm" fontWeight="semibold">Live Preview</s-text>
              <s-text variant="body-sm" tone="subdued">
                See how your customizations will look to customers
              </s-text>
            </div>
            
            <div class="preview-controls">
              <s-button 
                :variant="showBubblePreview ? 'primary' : 'secondary'"
                size="small"
                @click="showBubblePreview = true"
              >
                Bubble
              </s-button>
              <s-button 
                :variant="!showBubblePreview ? 'primary' : 'secondary'"
                size="small"
                @click="showBubblePreview = false"
              >
                Chat
              </s-button>
            </div>
          </div>
          
          <div class="preview-content">
            <AgentChatPreviewPanel
              :is-active="true"
              :customization="previewCustomization"
              :agent-type="agent.agent_type || 'assistant'"
              :agent-name="agent.display_name || agent.name"
              :agent-id="agent.id"
            />
          </div>
        </div>
      </div>
    </div>
    
    <s-text v-else alignment="center" tone="subdued" class="error-message">
      Unable to load agent details. Please try refreshing the page.
    </s-text>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { AgentWithCustomization, ChatStyle } from '@/types/agent'
import AgentChatPreviewPanel from '@/components/agent/AgentChatPreviewPanel.vue'

const props = defineProps<{
  agent: AgentWithCustomization | null
  loading: boolean
  saving: boolean
}>()

const emit = defineEmits<{
  (e: 'save', data: { 
    instructions: string;
    chat_style: ChatStyle;
    chat_background_color: string;
    chat_bubble_color: string;
    accent_color: string;
    icon_color: string;
    welcome_title: string;
    welcome_subtitle: string;
  }): void
}>()

// Chat style options with descriptions
const chatStyleOptions = [
  {
    value: 'CHATBOT' as ChatStyle,
    label: 'Chatbot',
    description: 'Traditional customer support style with agent branding',
    icon: '💬'
  },
  {
    value: 'ASK_ANYTHING' as ChatStyle,
    label: 'Ask Anything',
    description: 'Modern AI assistant style for general queries',
    icon: '🤖'
  }
]

const localInstructions = ref('')
const localChatStyle = ref<ChatStyle>('CHATBOT')
const localBackgroundColor = ref('#F8F9FA')
const localBubbleColor = ref('#E9ECEF')
const localAccentColor = ref('#f34611')
const localIconColor = ref('#6C757D')
const localWelcomeTitle = ref('')
const localWelcomeSubtitle = ref('')

// Initialize local state when agent changes
watch(() => props.agent, (newAgent) => {
  if (newAgent) {
    localInstructions.value = newAgent.instructions?.join('\n') || ''
    localChatStyle.value = newAgent.customization?.chat_style || 'CHATBOT'
    localBackgroundColor.value = newAgent.customization?.chat_background_color || '#F8F9FA'
    localBubbleColor.value = newAgent.customization?.chat_bubble_color || '#E9ECEF'
    localAccentColor.value = newAgent.customization?.accent_color || '#f34611'
    localIconColor.value = newAgent.customization?.icon_color || '#6C757D'
    localWelcomeTitle.value = newAgent.customization?.welcome_title || ''
    localWelcomeSubtitle.value = newAgent.customization?.welcome_subtitle || ''
  }
}, { immediate: true })

// State for preview mode - start with chat view as default
const showBubblePreview = ref(false)

// Computed property for live preview customization
const previewCustomization = computed(() => {
  const baseCustomization = {
    id: props.agent?.customization?.id || 0,
    agent_id: props.agent?.id || '',
    chat_style: localChatStyle.value,
    chat_background_color: localBackgroundColor.value,
    chat_bubble_color: localBubbleColor.value,
    accent_color: localAccentColor.value,
    icon_color: localIconColor.value,
    welcome_title: localWelcomeTitle.value,
    welcome_subtitle: localWelcomeSubtitle.value,
    font_family: props.agent?.customization?.font_family || 'Inter',
    // Keep the existing photo URLs from customization
    photo_url: props.agent?.customization?.photo_url,
    photo_url_signed: props.agent?.customization?.photo_url_signed,
    // Add preview flags to show bubble by default
    showBubblePreview: showBubblePreview.value
  }
  
  if (!props.agent?.customization) {
    return baseCustomization
  }
  
  return {
    ...props.agent.customization,
    ...baseCustomization
  }
})

const handleSave = () => {
  emit('save', {
    instructions: localInstructions.value,
    chat_style: localChatStyle.value,
    chat_background_color: localBackgroundColor.value,
    chat_bubble_color: localBubbleColor.value,
    accent_color: localAccentColor.value,
    icon_color: localIconColor.value,
    welcome_title: localWelcomeTitle.value,
    welcome_subtitle: localWelcomeSubtitle.value
  })
}
</script>

<style scoped>
.customization-wrapper {
  max-width: 100%;
  width: 100%;
}

.loading-message,
.error-message {
  padding: 40px 0;
}

.customization-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.customization-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

/* Main layout with form and preview side by side */
.main-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 32px;
  align-items: start;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

/* Preview container styles */
.preview-container {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.preview-title-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-controls {
  display: flex;
  gap: 4px;
  background: var(--background-soft);
  border-radius: var(--radius-sm);
  padding: 2px;
}

.preview-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 600px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--background-soft);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.section-description {
  margin-bottom: 8px;
}

/* Chat Style Cards */
.style-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.style-card {
  background: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.style-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.style-card.active {
  border-color: var(--primary-color);
  background: var(--background-soft);
  box-shadow: var(--shadow-lg);
}

.style-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.style-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.style-check {
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: bold;
}

.style-card-body {
  text-align: left;
}

.style-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.style-description {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1.3;
  margin: 0;
}

.style-card.active .style-title {
  color: var(--primary-color);
}

/* Colors Section */
.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-picker label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.color-input {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.color-input input[type="color"] {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.color-value {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  color: var(--text-muted);
  font-size: var(--text-xs);
  font-weight: 500;
}


/* Welcome Message Fields */
.welcome-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.helper-text {
  margin-top: 8px;
}

.form-actions {
  padding-top: 8px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .preview-container {
    position: static;
    order: -1; /* Show preview first on mobile */
  }
  
  .preview-content {
    justify-content: center;
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .color-grid {
    grid-template-columns: 1fr;
  }
  
  .style-cards {
    grid-template-columns: 1fr;
  }
  
  .customization-content {
    gap: 16px;
  }
  
  .main-layout {
    gap: 16px;
  }
  
  .form-section {
    padding: 16px;
  }
  
  .preview-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .preview-controls {
    align-self: center;
  }
}
</style>

