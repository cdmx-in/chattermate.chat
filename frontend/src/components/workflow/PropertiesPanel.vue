<!--
ChatterMate - Workflow Properties Panel
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
import { ref, watch } from 'vue'
import type { Node } from '@vue-flow/core'
import { workflowNodeService } from '@/services/workflowNode'
import { toast } from 'vue-sonner'

// Define form field interface
interface FormField {
  name: string
  label: string
  type: string
  required: boolean
  placeholder: string
  options: string
  minLength: number
  maxLength: number
}

const props = defineProps<{
  selectedNode: Node
  availableNodeTypes: Array<{
    type: string
    label: string
    icon: string
    description: string
    color: string
  }>
  workflowId: string
}>()

const emit = defineEmits<{
  (e: 'save', properties: any): void
  (e: 'close'): void
  (e: 'delete'): void
}>()

const nodeForm = ref({
  name: '',
  description: '',
  // Message node
  message_text: '',
  show_typing: false,
  // LLM node
  system_prompt: '',
  temperature: 0.7,
  // Condition node
  condition_expression: '',
  // Form node
  form_fields: [] as FormField[],
  form_title: '',
  form_description: '',
  submit_button_text: 'Submit',
  // Action node
  action_type: '',
  action_url: '',
  // Human transfer node
  transfer_department: '',
  transfer_message: '',
  // Wait node
  wait_duration: 5,
  wait_unit: 'seconds',
  // End node
  final_message: ''
})

const saving = ref(false)



// Watch for node selection changes
watch(() => props.selectedNode, (newNode) => {
  if (newNode) {
    // Helper function to extract clean name from label by removing emoji icons
    const extractCleanName = (label: string) => {
      if (!label) return ''
      // Remove common emoji icons and trim whitespace
      return label
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Unicode emojis
        .replace(/[💬🤖🔀📝⚡👤⏱️🏁📄]/g, '') // Specific icons we use
        .replace(/^\s+|\s+$/g, '') // Trim whitespace
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    }

    nodeForm.value = {
      name: newNode.data.cleanName || 
            extractCleanName(newNode.data.label) || 
            '',
      description: newNode.data.description || '',
      // Message node - check multiple possible locations for message_text
      message_text: newNode.data.message_text || 
                    newNode.data.config?.message_text || 
                    '',
      show_typing: newNode.data.show_typing || 
                   newNode.data.config?.show_typing || 
                   false,
      // LLM node
      system_prompt: newNode.data.system_prompt || 
                     newNode.data.config?.system_prompt || 
                     '',
      temperature: newNode.data.temperature || 
                   newNode.data.config?.temperature || 
                   0.7,
      // Condition node
      condition_expression: newNode.data.condition_expression || 
                            newNode.data.config?.condition_expression || 
                            '',
      // Form node - prioritize config over outer fields
      form_fields: newNode.data.config?.form_fields || 
                   newNode.data.form_fields || 
                   [] as FormField[],
      form_title: newNode.data.config?.form_title || 
                  newNode.data.form_title || 
                  '',
      form_description: newNode.data.config?.form_description || 
                        newNode.data.form_description || 
                        '',
      submit_button_text: newNode.data.config?.submit_button_text || 
                          newNode.data.submit_button_text || 
                          'Submit',
      // Action node
      action_type: newNode.data.action_type || 
                   newNode.data.config?.action_type || 
                   '',
      action_url: newNode.data.action_url || 
                  newNode.data.config?.action_url || 
                  '',
      // Human transfer node
      transfer_department: newNode.data.transfer_department || 
                           newNode.data.config?.transfer_department || 
                           '',
      transfer_message: newNode.data.transfer_message || 
                        newNode.data.config?.transfer_message || 
                        '',
      // Wait node
      wait_duration: newNode.data.wait_duration || 
                     newNode.data.config?.wait_duration || 
                     5,
      wait_unit: newNode.data.wait_unit || 
                 newNode.data.config?.wait_unit || 
                 'seconds',
      // End node
      final_message: newNode.data.final_message || 
                     newNode.data.config?.final_message || 
                     ''
    }
  }
}, { immediate: true })

// Get node type display name
const getNodeTypeName = (type: string) => {
  const names = {
    message: 'Message',
    llm: 'LLM',
    condition: 'Condition',
    form: 'Form',
    action: 'Action',
    humanTransfer: 'Human Transfer',
    wait: 'Wait',
    end: 'End'
  }
  return names[type as keyof typeof names] || type
}

// Get field type icon
const getFieldTypeIcon = (type: string) => {
  const icons = {
    text: '📝',
    email: '📧',
    number: '🔢',
    tel: '📞',
    textarea: '📄',
    select: '📋',
    checkbox: '☑️',
    radio: '🔘'
  }
  return icons[type as keyof typeof icons] || '📝'
}

// Add form field
const addFormField = () => {
  nodeForm.value.form_fields.push({
    name: '',
    label: '',
    type: 'text',
    required: false,
    placeholder: '',
    options: '',
    minLength: 0,
    maxLength: 255
  })
}

// Remove form field
const removeFormField = (index: number) => {
  nodeForm.value.form_fields.splice(index, 1)
}

// Helper function to check if node ID is a UUID
const isUUID = (id: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

// Handle form submission
const handleSave = async () => {
  if (saving.value) return
  
  try {
    saving.value = true
    
    // Prepare node data for API
    const nodeData = {
      name: nodeForm.value.name,
      description: nodeForm.value.description,
      // Node type-specific properties
      ...(props.selectedNode.data.nodeType === 'message' && {
        message_text: nodeForm.value.message_text
      }),
      ...(props.selectedNode.data.nodeType === 'llm' && {
        system_prompt: nodeForm.value.system_prompt,
        temperature: nodeForm.value.temperature
      }),
      ...(props.selectedNode.data.nodeType === 'condition' && {
        condition_expression: nodeForm.value.condition_expression
      }),
      ...(props.selectedNode.data.nodeType === 'form' && {
        config: {
          form_fields: nodeForm.value.form_fields,
          form_title: nodeForm.value.form_title,
          form_description: nodeForm.value.form_description,
          submit_button_text: nodeForm.value.submit_button_text
        }
      }),
      ...(props.selectedNode.data.nodeType === 'action' && {
        action_type: nodeForm.value.action_type,
        action_url: nodeForm.value.action_url
      }),
      ...(props.selectedNode.data.nodeType === 'humanTransfer' && {
        transfer_department: nodeForm.value.transfer_department,
        transfer_message: nodeForm.value.transfer_message
      }),
      ...(props.selectedNode.data.nodeType === 'wait' && {
        wait_duration: nodeForm.value.wait_duration,
        wait_unit: nodeForm.value.wait_unit
      }),
      ...(props.selectedNode.data.nodeType === 'end' && {
        final_message: nodeForm.value.final_message
      })
    }

    // Check if the node has been saved to the backend (has UUID)
    if (isUUID(props.selectedNode.id)) {
      // Node exists in backend, use single node update API
      const result = await workflowNodeService.updateSingleNode(
        props.workflowId,
        props.selectedNode.id,
        nodeData
      )

      // Emit the result to the parent component
      emit('save', {
        ...nodeForm.value,
        updatedNode: result
      })

      toast.success('Node properties updated successfully')
    } else {
      // Node hasn't been saved yet, emit data to parent to save entire workflow
      emit('save', {
        ...nodeForm.value,
        needsWorkflowSave: true // Flag to indicate parent should save entire workflow
      })

      toast.success('Node properties updated - save workflow to persist changes')
    }
  } catch (error: any) {
    console.error('Error updating node:', error)
    toast.error(error.response?.data?.detail || 'Failed to update node properties')
  } finally {
    saving.value = false
  }
}

// Handle close
const handleClose = () => {
  emit('close')
}

// Handle delete
const handleDelete = () => {
  if (confirm('Are you sure you want to delete this node?')) {
    emit('delete')
  }
}
</script>

<template>
  <div class="properties-panel">
    <div class="properties-header">
      <div class="header-left">
        <h3>Node Properties</h3>
        <span class="node-type-badge" :style="{ backgroundColor: selectedNode.data.color }">
          {{ selectedNode.data.icon }} {{ getNodeTypeName(selectedNode.data.nodeType) }}
        </span>
      </div>
      <div class="header-actions">
        <button class="header-icon-btn delete-btn" @click="handleDelete" title="Delete Node">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
        <button class="header-icon-btn close-btn" @click="handleClose" title="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <div class="properties-content">
      <form @submit.prevent="handleSave">
        <!-- Basic Properties -->
        <div class="form-section">
          <h4>Basic Information</h4>
          
          <div class="form-group">
            <label for="node-name">Node Name *</label>
            <input
              id="node-name"
              v-model="nodeForm.name"
              type="text"
              class="form-input"
              placeholder="Enter node name"
              required
            />
          </div>

          <div class="form-group">
            <label for="node-description">Description</label>
            <textarea
              id="node-description"
              v-model="nodeForm.description"
              class="form-textarea"
              placeholder="Enter node description (optional)"
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Node-specific Properties -->
        <div class="form-section">
          <h4>{{ getNodeTypeName(selectedNode.data.nodeType) }} Settings</h4>
          
          <!-- Message Node -->
          <template v-if="selectedNode.data.nodeType === 'message'">
            <div class="form-group">
              <label for="message-text">Message Text *</label>
              <textarea
                id="message-text"
                v-model="nodeForm.message_text"
                class="form-textarea"
                placeholder="Enter the message to send to users"
                rows="4"
                required
              ></textarea>
            </div>
          </template>

          <!-- LLM Node -->
          <template v-if="selectedNode.data.nodeType === 'llm'">
            <div class="form-group">
              <label for="system-prompt">System Prompt *</label>
              <textarea
                id="system-prompt"
                v-model="nodeForm.system_prompt"
                class="form-textarea"
                placeholder="Enter system prompt for the AI"
                rows="4"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="temperature">Temperature</label>
              <input
                id="temperature"
                v-model.number="nodeForm.temperature"
                type="number"
                class="form-input"
                min="0"
                max="2"
                step="0.1"
                placeholder="0.7"
              />
            </div>
          </template>

          <!-- Condition Node -->
          <template v-if="selectedNode.data.nodeType === 'condition'">
            <div class="form-group">
              <label for="condition-expression">Condition Expression *</label>
              <textarea
                id="condition-expression"
                v-model="nodeForm.condition_expression"
                class="form-textarea"
                placeholder="Enter condition logic (e.g., user_input.includes('yes'))"
                rows="4"
                required
              ></textarea>
            </div>
          </template>

          <!-- Form Node -->
          <template v-if="selectedNode.data.nodeType === 'form'">
            <div class="form-group">
              <label for="form-title">Form Title</label>
              <input
                id="form-title"
                v-model="nodeForm.form_title"
                type="text"
                class="form-input"
                placeholder="Enter form title"
              />
            </div>
            
            <div class="form-group">
              <label for="form-description">Form Description</label>
              <textarea
                id="form-description"
                v-model="nodeForm.form_description"
                class="form-textarea"
                placeholder="Enter form description (optional)"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="submit-button-text">Submit Button Text</label>
              <input
                id="submit-button-text"
                v-model="nodeForm.submit_button_text"
                type="text"
                class="form-input"
                placeholder="Submit"
              />
            </div>
            
            <div class="form-group">
              <label>Form Fields</label>
              <div class="form-fields-container">
                <div
                  v-for="(field, index) in nodeForm.form_fields"
                  :key="index"
                  class="form-field-item"
                >
                  <div class="form-field-header">
                    <span class="field-type-badge" :class="`field-type-${field.type}`">
                      {{ getFieldTypeIcon(field.type) }} {{ field.type }}
                    </span>
                    <button
                      type="button"
                      class="remove-field-btn"
                      @click="removeFormField(index)"
                      title="Remove field"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <div class="form-field-config">
                    <div class="field-row">
                      <div class="field-col">
                        <label class="field-label">Field Name *</label>
                        <input
                          v-model="field.name"
                          type="text"
                          class="field-input"
                          placeholder="field_name"
                          required
                        />
                      </div>
                      <div class="field-col">
                        <label class="field-label">Display Label *</label>
                        <input
                          v-model="field.label"
                          type="text"
                          class="field-input"
                          placeholder="Field Label"
                          required
                        />
                      </div>
                    </div>
                    
                    <div class="field-row">
                      <div class="field-col">
                        <label class="field-label">Field Type</label>
                        <select v-model="field.type" class="field-select">
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="number">Number</option>
                          <option value="tel">Phone</option>
                          <option value="textarea">Textarea</option>
                          <option value="select">Select</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="radio">Radio</option>
                        </select>
                      </div>
                      <div class="field-col">
                        <label class="field-label">Required</label>
                        <label class="checkbox-label">
                          <input
                            v-model="field.required"
                            type="checkbox"
                            class="form-checkbox"
                          />
                          <span>Required field</span>
                        </label>
                      </div>
                    </div>
                    
                    <div class="field-row">
                      <div class="field-col-full">
                        <label class="field-label">Placeholder</label>
                        <input
                          v-model="field.placeholder"
                          type="text"
                          class="field-input"
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    </div>
                    
                    <!-- Options for select/radio fields -->
                    <div v-if="field.type === 'select' || field.type === 'radio'" class="field-row">
                      <div class="field-col-full">
                        <label class="field-label">Options (one per line)</label>
                        <textarea
                          v-model="field.options"
                          class="field-textarea"
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    
                    <!-- Validation for text fields -->
                    <div v-if="field.type === 'text' || field.type === 'textarea'" class="field-row">
                      <div class="field-col">
                        <label class="field-label">Min Length</label>
                        <input
                          v-model.number="field.minLength"
                          type="number"
                          class="field-input"
                          min="0"
                          placeholder="0"
                        />
                      </div>
                      <div class="field-col">
                        <label class="field-label">Max Length</label>
                        <input
                          v-model.number="field.maxLength"
                          type="number"
                          class="field-input"
                          min="1"
                          placeholder="255"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  class="add-field-btn"
                  @click="addFormField"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Form Field
                </button>
              </div>
            </div>
          </template>

          <!-- Action Node -->
          <template v-if="selectedNode.data.nodeType === 'action'">
            <div class="form-group">
              <label for="action-type">Action Type *</label>
              <select
                id="action-type"
                v-model="nodeForm.action_type"
                class="form-select"
                required
              >
                <option value="">Select action type</option>
                <option value="webhook">Webhook</option>
                <option value="email">Send Email</option>
                <option value="api">API Call</option>
              </select>
            </div>
            <div class="form-group">
              <label for="action-url">URL *</label>
              <input
                id="action-url"
                v-model="nodeForm.action_url"
                type="url"
                class="form-input"
                placeholder="https://example.com/webhook"
                required
              />
            </div>
          </template>

          <!-- Human Transfer Node -->
          <template v-if="selectedNode.data.nodeType === 'humanTransfer'">
            <div class="form-group">
              <label for="transfer-department">Department *</label>
              <select
                id="transfer-department"
                v-model="nodeForm.transfer_department"
                class="form-select"
                required
              >
                <option value="">Select department</option>
                <option value="general">General Support</option>
                <option value="sales">Sales</option>
                <option value="technical">Technical Support</option>
              </select>
            </div>
            <div class="form-group">
              <label for="transfer-message">Transfer Message</label>
              <textarea
                id="transfer-message"
                v-model="nodeForm.transfer_message"
                class="form-textarea"
                placeholder="Message to show when transferring to human agent"
                rows="3"
              ></textarea>
            </div>
          </template>

          <!-- Wait Node -->
          <template v-if="selectedNode.data.nodeType === 'wait'">
            <div class="form-group">
              <label for="wait-duration">Duration *</label>
              <input
                id="wait-duration"
                v-model.number="nodeForm.wait_duration"
                type="number"
                class="form-input"
                min="1"
                placeholder="5"
                required
              />
            </div>
            <div class="form-group">
              <label for="wait-unit">Time Unit *</label>
              <select
                id="wait-unit"
                v-model="nodeForm.wait_unit"
                class="form-select"
                required
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </template>

          <!-- End Node -->
          <template v-if="selectedNode.data.nodeType === 'end'">
            <div class="form-group">
              <label for="end-message">Final Message</label>
              <textarea
                id="end-message"
                v-model="nodeForm.final_message"
                class="form-textarea"
                placeholder="Final message to show when ending conversation"
                rows="3"
              ></textarea>
            </div>
          </template>
        </div>
      </form>
    </div>

    <div class="properties-footer">
      <div class="footer-actions">
        <button type="button" class="btn btn-secondary" @click="handleClose">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" @click="handleSave" :disabled="saving">
          <div v-if="saving" class="btn-spinner"></div>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Properties Panel Styles */
.properties-panel {
  width: 350px;
  background: var(--background-soft);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  background: var(--background-color);
}

.properties-header .header-left {
  flex: 1;
}

.properties-header h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-color);
}

.node-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 500;
  color: white;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-icon-btn:hover {
  background: var(--background-muted);
  color: var(--text-color);
}

.header-icon-btn.delete-btn:hover {
  background: var(--error-color);
  color: white;
}

.header-icon-btn svg {
  width: 16px;
  height: 16px;
}

.properties-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
}

.form-section {
  margin-bottom: var(--space-lg);
}

.form-section h4 {
  margin: 0 0 var(--space-sm) 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-xs);
}

.form-group {
  margin-bottom: var(--space-sm);
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-color);
  color: var(--text-color);
  font-size: 0.85rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(243, 70, 17, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 70px;
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
  margin-bottom: 0;
  padding: 4px 0;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-label span {
  font-size: 0.85rem;
  color: var(--text-color);
  line-height: 1.4;
  user-select: none;
}

.properties-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: var(--space-md);
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
  flex-shrink: 0;
}

.footer-actions {
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
  min-width: 80px;
  white-space: nowrap;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: var(--background-muted);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--background-alt);
  color: var(--text-color);
}

.btn-danger {
  background: var(--error-color);
  color: white;
}

.btn-danger:hover {
  background: #DC2626;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Form Fields Styles */
.form-fields-container {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-color);
  padding: var(--space-sm);
}

.form-field-item {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-soft);
  margin-bottom: var(--space-sm);
  overflow: hidden;
}

.form-field-item:last-child {
  margin-bottom: 0;
}

.form-field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--background-muted);
  border-bottom: 1px solid var(--border-color);
}

.field-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: capitalize;
  background: var(--primary-soft);
  color: var(--primary-color);
}

.remove-field-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-field-btn:hover {
  background: var(--error-color);
  color: white;
}

.remove-field-btn svg {
  width: 12px;
  height: 12px;
}

.form-field-config {
  padding: var(--space-md);
}

.field-row {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.field-row:last-child {
  margin-bottom: 0;
}

.field-col {
  flex: 1;
}

.field-col-full {
  flex: 1;
  width: 100%;
}

.field-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.field-input,
.field-textarea,
.field-select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--background-color);
  color: var(--text-color);
  font-size: 0.75rem;
  transition: border-color 0.2s ease;
}

.field-input:focus,
.field-textarea:focus,
.field-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px rgba(243, 70, 17, 0.1);
}

.field-textarea {
  resize: vertical;
  min-height: 60px;
}

.add-field-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  width: 100%;
  padding: var(--space-sm);
  background: var(--background-muted);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  font-weight: 500;
}

.add-field-btn:hover {
  background: var(--primary-soft);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.add-field-btn svg {
  width: 14px;
  height: 14px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .properties-panel {
    width: 320px;
  }
}

@media (max-width: 768px) {
  .properties-panel {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1002;
    box-shadow: var(--shadow-lg);
  }
  
  .properties-footer {
    padding: var(--space-md);
  }
  
  .footer-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .btn {
    flex: 1;
    margin: 0 4px;
  }
}
</style> 