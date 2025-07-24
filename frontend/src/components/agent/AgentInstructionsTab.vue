<!--
ChatterMate - Agent Instructions Tab
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
import { computed, ref, watch } from 'vue'
import { useAgentEdit } from '@/composables/useAgentEdit'

interface UserGroup {
  id: string;
  name: string;
}

const props = defineProps({
  instructions: {
    type: String,
    required: true
  },
  transferToHuman: {
    type: Boolean,
    required: true
  },
  askForRating: {
    type: Boolean,
    required: true
  },
  userGroups: {
    type: Array as () => UserGroup[],
    required: true
  },
  selectedGroupIds: {
    type: Array as () => string[],
    required: true
  },
  loadingGroups: {
    type: Boolean,
    required: true
  },
  isEditing: {
    type: Boolean,
    required: true
  },
  agent: {
    type: Object as () => any,
    required: true
  }
})

const emit = defineEmits([
  'save-agent'
])

// Initialize agent edit composable
const { generateInstructions, isLoading, error } = useAgentEdit(props.agent)

// Create local state for all editable fields
const localInstructions = ref(props.instructions)
const localTransferToHuman = ref(props.transferToHuman)
const localAskForRating = ref(props.askForRating)
const localSelectedGroupIds = ref<string[]>([...props.selectedGroupIds])

// Watch for changes in props to update local state
watch(() => props.instructions, (newValue) => {
  localInstructions.value = newValue
})

watch(() => props.transferToHuman, (newValue) => {
  localTransferToHuman.value = newValue
})

watch(() => props.askForRating, (newValue) => {
  localAskForRating.value = newValue
})

watch(() => props.selectedGroupIds, (newValue) => {
  localSelectedGroupIds.value = [...newValue]
}, { deep: true })

const transferReasons = [
  "Knowledge gaps",
  "Need human contact",
  "Customer frustration",
  "High priority issues",
  "Compliance matters"
]

const tooltipContent = computed(() => {
  return `Auto-transfer when:\n${transferReasons.map(reason => `• ${reason}`).join('\n')}`
})

const ratingTooltipContent = computed(() => {
  return `Enable to:\n• Request feedback after chat ends\n• Collect star ratings (1-5)\n• Gather optional comments\n• Track customer satisfaction`
})

// AI generation state
const showAIPrompt = ref(false)
const aiPrompt = ref('')

const handleGenerateWithAI = async () => {
  if (!aiPrompt.value.trim()) return
  
  try {
    const generatedInstructions = await generateInstructions(aiPrompt.value)
    if (generatedInstructions.length > 0) {
      // Join the generated instructions with newlines
      localInstructions.value = generatedInstructions.join('\n')
      showAIPrompt.value = false
      aiPrompt.value = ''
    }
  } catch (err) {
    console.error('Failed to generate instructions:', err)
  }
}

const handleSave = () => {
  emit('save-agent', {
    instructions: localInstructions.value,
    transferToHuman: localTransferToHuman.value,
    askForRating: localAskForRating.value,
    selectedGroupIds: localSelectedGroupIds.value
  })
}
</script>

<template>
  <div class="instructions-tab">
    <!-- Instructions Section -->
    <section class="detail-section instructions-section">
      <div class="instructions-header">
        <h4 class="section-title">Instructions</h4>
        <button 
          class="ai-generate-button" 
          @click="showAIPrompt = true"
          :disabled="isLoading"
          v-if="isEditing"
        >
          <span class="ai-icon">✨</span>
          Generate with AI
        </button>
      </div>
      
      <!-- AI Prompt Modal -->
      <div v-if="showAIPrompt" class="ai-prompt-modal">
        <div class="ai-prompt-content">
          <h5>Generate Instructions with AI</h5>
          <textarea 
            v-model="aiPrompt"
            placeholder="Describe what you want your agent to do. For example: 'Create a customer support agent that helps with product returns and exchanges'"
            rows="4"
            class="ai-prompt-textarea"
          ></textarea>
          <div v-if="error" class="error-message">{{ error }}</div>
          <div class="ai-prompt-actions">
            <button 
              class="cancel-ai-button" 
              @click="showAIPrompt = false"
              :disabled="isLoading"
            >
              Cancel
            </button>
            <button 
              class="generate-ai-button" 
              @click="handleGenerateWithAI"
              :disabled="isLoading || !aiPrompt.trim()"
            >
              {{ isLoading ? 'Generating...' : 'Generate' }}
            </button>
          </div>
        </div>
      </div>
      
      <textarea 
        class="instructions-textarea" 
        v-model="localInstructions"
        rows="6" 
        placeholder="Enter instructions for the agent..."
        :readonly="!isEditing"
      ></textarea>
    </section>

    <!-- Transfer and Rating Section -->
    <section class="detail-section">
      <div class="transfer-section">
        <!-- Transfer toggle -->
        <div class="transfer-toggle">
          <div class="toggle-header">
            <h4 class="section-title">Transfer to Human</h4>
            <label class="switch" v-tooltip="tooltipContent">
              <input type="checkbox" 
                v-model="localTransferToHuman"
                :disabled="!isEditing"
              >
              <span class="slider"></span>
            </label>
          </div>
          <p class="helper-text">Enable automatic transfer to human agents when needed</p>
        </div>

        <!-- Group selection -->
        <div v-if="localTransferToHuman" class="transfer-groups">
          <h4 class="subsection-title">Transfer Groups</h4>
          <p v-if="userGroups.length" class="helper-text">Select groups that can handle transferred chats</p>
          
          <div v-if="!loadingGroups">
            <div v-if="userGroups.length" class="groups-list">
              <label v-for="group in userGroups" :key="group.id" class="group-item">
                <input 
                  type="checkbox" 
                  :value="group.id"
                  v-model="localSelectedGroupIds"
                  :disabled="!isEditing"
                >
                <span>{{ group.name }}</span>
              </label>
            </div>
            <div v-else class="no-groups-message">
              <p>No groups available.</p>
              <router-link to="/human-agents" class="create-group-link">
                Create Group <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
          
          <div v-else class="loading-groups">
            Loading groups...
          </div>
        </div>

        <!-- Ask for Rating -->
        <div class="rating-toggle">
          <div class="toggle-header">
            <h4 class="section-title">Ask for Rating</h4>
            <label class="switch" v-tooltip="ratingTooltipContent">
              <input type="checkbox" 
                v-model="localAskForRating"
                :disabled="!isEditing"
              >
              <span class="slider"></span>
            </label>
          </div>
          <p class="helper-text">Request customer feedback when chats end</p>
        </div>
      </div>
    </section>

    <!-- Save Button -->
    <div v-if="isEditing" class="save-section">
      <button class="save-button" @click="handleSave">
        Save Changes
      </button>
    </div>
  </div>
</template>

<style scoped>
.instructions-tab {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 var(--space-lg);
}

.detail-section {
  margin-bottom: var(--space-xl);
  background: var(--background-soft);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.instructions-section {
  margin-bottom: var(--space-xl);
}

.instructions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.section-title {
  margin-bottom: 0;
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
}

.ai-generate-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-generate-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.ai-generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ai-icon {
  font-size: 1rem;
}

.ai-prompt-modal {
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

.ai-prompt-content {
  background: white;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.ai-prompt-content h5 {
  margin-bottom: var(--space-md);
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
}

.ai-prompt-textarea {
  width: 100%;
  min-height: 100px;
  padding: var(--space-md);
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-color);
  resize: vertical;
  margin-bottom: var(--space-md);
  box-sizing: border-box;
}

.ai-prompt-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-soft);
}

.error-message {
  color: var(--error-color);
  font-size: var(--text-sm);
  margin-bottom: var(--space-md);
  padding: var(--space-sm);
  background: var(--error-light);
  border-radius: var(--radius-sm);
}

.ai-prompt-actions {
  display: flex;
  gap: var(--space-sm);
  justify-content: flex-end;
}

.cancel-ai-button {
  padding: var(--space-sm) var(--space-md);
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-ai-button:hover:not(:disabled) {
  background: var(--background-soft);
}

.generate-ai-button {
  padding: var(--space-sm) var(--space-md);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.generate-ai-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.generate-ai-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.subsection-title {
  margin-bottom: var(--space-md);
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
}

.instructions-textarea {
  width: 100%;
  min-height: 150px;
  padding: var(--space-md);
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  color: var(--text-color);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.instructions-textarea:read-only {
  background: var(--background-alt);
  cursor: default;
}

.instructions-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-soft);
}

.transfer-section {
  padding-top: var(--space-md);
}

.transfer-toggle {
  margin-bottom: var(--space-xl);
}

.toggle-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.helper-text {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin-bottom: var(--space-md);
  line-height: 1.5;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(224, 224, 224);
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: rgb(255, 255, 255);
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

input:checked + .slider {
  background-color: var(--success-color, green);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.transfer-groups {
  padding: var(--space-lg);
  background: var(--background-alt);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-lg);
  border: 1px solid var(--border-color);
  width: 100%;
  box-sizing: border-box;
}

.groups-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.group-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  transition: background-color 0.2s;
}

.group-item:hover {
  background-color: var(--background-soft);
}

.group-item input {
  margin: 0;
}

.no-groups-message {
  text-align: center;
  padding: var(--space-xl);
  background: var(--background-color);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}

.create-group-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.create-group-link:hover {
  opacity: 0.8;
}

.create-group-link i {
  font-size: 0.8em;
}

.loading-groups {
  text-align: center;
  padding: var(--space-xl);
  background: var(--background-color);
  border-radius: var(--radius-md);
  color: var(--text-muted);
}

.rating-toggle {
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-sm);
  color: var(--text-color);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: var(--space-md);
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-color);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:read-only {
  background: var(--background-alt);
  cursor: default;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-soft);
}

.save-section {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-lg);
  border-top: 1px solid var(--border-color);
  background: var(--background-soft);
  margin-top: var(--space-xl);
}

.save-button {
  padding: var(--space-md) var(--space-xl);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style> 