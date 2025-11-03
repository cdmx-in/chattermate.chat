<template>
  <div class="customization-tab">
    <div v-if="loading" class="loading-state">
      Loading agent details...
    </div>
    <div v-else-if="agent" class="customization-form">
      <h2>Customize Your Agent</h2>
      <p class="section-description">
        Personalize your agent's appearance and behavior to match your brand.
      </p>

      <!-- Agent Photo -->
      <div class="form-section">
        <label>Agent Photo</label>
        <div class="photo-uploader">
          <div class="current-photo" @click="emit('trigger-photo-upload')">
            <img :src="photoUrl" :alt="localName" />
            <div class="photo-overlay">
              <span>{{ uploading ? 'Uploading...' : 'Change Photo' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Agent Name -->
      <div class="form-section">
        <label for="agent-name">Agent Name</label>
        <input 
          id="agent-name"
          v-model="localName" 
          type="text" 
          class="form-input"
          placeholder="Enter agent name"
        />
      </div>

      <!-- Agent Instructions -->
      <div class="form-section">
        <label for="agent-instructions">Instructions</label>
        <textarea 
          id="agent-instructions"
          v-model="localInstructions" 
          class="form-textarea"
          rows="10"
          placeholder="Enter agent instructions (one per line)"
        ></textarea>
        <p class="helper-text">
          Instructions guide your agent's behavior. Enter one instruction per line.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <button 
          class="primary-button" 
          @click="handleSave"
          :disabled="saving"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>
    <div v-else class="error-state">
      Unable to load agent details. Please try refreshing the page.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AgentWithCustomization } from '@/types/agent'

const props = defineProps<{
  agent: AgentWithCustomization | null
  loading: boolean
  saving: boolean
  uploading: boolean
  photoUrl: string
}>()

const emit = defineEmits<{
  (e: 'save', data: { name: string; instructions: string }): void
  (e: 'trigger-photo-upload'): void
}>()

const localName = ref('')
const localInstructions = ref('')

// Initialize local state when agent changes
watch(() => props.agent, (newAgent) => {
  if (newAgent) {
    localName.value = newAgent.display_name || newAgent.name
    localInstructions.value = newAgent.instructions?.join('\n') || ''
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', {
    name: localName.value,
    instructions: localInstructions.value
  })
}
</script>

<style scoped>
.customization-tab {
  max-width: 700px;
  margin: 0 auto;
}

.customization-form h2 {
  color: #111827;
  margin-bottom: 8px;
  font-size: 1.5rem;
}

.section-description {
  color: #6B7280;
  margin-bottom: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-section label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.photo-uploader {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-photo {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid #E5E7EB;
  transition: all 0.3s;
}

.current-photo:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.current-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
}

.current-photo:hover .photo-overlay {
  opacity: 1;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #1F2937;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #F24611;
  box-shadow: 0 0 0 3px rgba(242, 70, 17, 0.1);
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
}

.helper-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #6B7280;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.primary-button {
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
  font-size: 1rem;
  background-color: #F24611;
  color: white;
}

.primary-button:hover {
  background-color: #D93B0A;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(242, 70, 17, 0.2);
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
  color: #9CA3AF;
}
</style>

