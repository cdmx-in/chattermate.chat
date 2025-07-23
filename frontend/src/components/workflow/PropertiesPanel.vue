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
import { ref, watch, computed } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import { workflowNodeService } from '@/services/workflowNode'
import { toast } from 'vue-sonner'
import { useAgentEdit } from '@/composables/useAgentEdit'
import KnowledgeGrid from '@/components/agent/KnowledgeGrid.vue'

// Collapsible sections state
const collapsedSections = ref({
  basic: false,
  nodeSettings: false,
  advanced: true, // Advanced settings collapsed by default
  knowledge: true // Knowledge sources collapsed by default
})

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
  agentId: string
  organizationId: string
  currentEdges: Edge[]
  currentNodes: Node[]
}>()

const emit = defineEmits<{
  (e: 'save', properties: any): void
  (e: 'close'): void
  (e: 'delete'): void
}>()

// Computed property to detect if condition node is connected to an LLM node from above
const isConnectedToLLM = computed(() => {
  if (props.selectedNode.data.nodeType !== 'condition') return false
  
  // Find edges where this condition node is the target
  const incomingEdges = props.currentEdges.filter(edge => edge.target === props.selectedNode.id)
  
  // Check if any source node is an LLM
  return incomingEdges.some(edge => {
    const sourceNode = props.currentNodes.find(node => node.id === edge.source)
    return sourceNode?.data.nodeType === 'llm'
  })
})

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
  // LLM-based condition checkboxes
  llm_conditions: {
    user_frustrated: false,
    request_human_agent: false,
    no_knowledge: false
  },
  // Form node
  form_fields: [] as FormField[],
  form_title: '',
  form_description: '',
  submit_button_text: 'Submit',
  form_full_screen: false,
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
  final_message: '',
  // Landing Page node
  landing_page_heading: '',
  landing_page_content: ''
})

const saving = ref(false)

// Validation errors state
const validationErrors = ref<Record<string, string>>({})

// AI generation state
const showAIPrompt = ref(false)
const aiPrompt = ref('')

// Initialize agent edit composable (using a mock agent object for AI generation)
const mockAgent = {
  id: 'temp-agent',
  name: 'Workflow Node Agent',
  display_name: 'Workflow Node Agent',
  description: 'Temporary agent for AI generation',
  agent_type: 'general',
  instructions: '',
  transfer_to_human: false,
  ask_for_rating: false,
  organization_id: 'temp',
  created_by: 'temp',
  created_at: new Date(),
  updated_at: new Date(),
  is_active: true,
  enable_rate_limiting: false,
  overall_limit_per_ip: 0,
  requests_per_sec: 0,
  conversation_starters: [],
  knowledge_base_ids: [],
  canvas_data: {}
} as any
const { generateInstructions, isLoading: aiLoading, error: aiError } = useAgentEdit(mockAgent)

// Toggle collapsible section
const toggleSection = (section: keyof typeof collapsedSections.value) => {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// Validation functions
const validateField = (field: string, value: any, nodeType: string): string | null => {
  switch (field) {
    case 'name':
      if (!value || value.trim() === '') {
        return 'Node name is required'
      }
      if (value.length > 100) {
        return 'Node name must be less than 100 characters'
      }
      break
    
    case 'message_text':
      if (nodeType === 'message' && (!value || value.trim() === '')) {
        return 'Message text is required'
      }
      break
    
    case 'system_prompt':
      if (nodeType === 'llm' && (!value || value.trim() === '')) {
        return 'System prompt is required'
      }
      break
    
    case 'temperature':
      if (nodeType === 'llm' && (value < 0 || value > 2)) {
        return 'Temperature must be between 0 and 2'
      }
      break
    
    case 'condition_expression':
      // Only validate condition_expression if not connected to LLM (using traditional mode)
      if (nodeType === 'condition' && !isConnectedToLLM.value && (!value || value.trim() === '')) {
        return 'Condition expression is required'
      }
      break
    
    case 'llm_conditions':
      // Only validate LLM conditions if connected to LLM
      if (nodeType === 'condition' && isConnectedToLLM.value) {
        if (!value || (!value.user_frustrated && !value.request_human_agent && !value.no_knowledge)) {
          return 'At least one LLM condition must be selected'
        }
      }
      break
    
    case 'action_type':
      if (nodeType === 'action' && (!value || value.trim() === '')) {
        return 'Action type is required'
      }
      break
    
    case 'action_url':
      if (nodeType === 'action' && (!value || value.trim() === '')) {
        return 'Action URL is required'
      }
      if (nodeType === 'action' && value && !isValidUrl(value)) {
        return 'Please enter a valid URL'
      }
      break
    
    case 'transfer_department':
      if (nodeType === 'humanTransfer' && (!value || value.trim() === '')) {
        return 'Department is required'
      }
      break
    
    case 'wait_duration':
      if (nodeType === 'wait' && (!value || value < 1)) {
        return 'Wait duration must be at least 1'
      }
      break
    
    case 'wait_unit':
      if (nodeType === 'wait' && (!value || value.trim() === '')) {
        return 'Time unit is required'
      }
      break
    
    case 'form_fields':
      if (nodeType === 'form' && (!value || value.length === 0)) {
        return 'At least one form field is required'
      }
      if (nodeType === 'form' && value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const field = value[i]
          if (!field.name || field.name.trim() === '') {
            return `Form field ${i + 1}: Field name is required`
          }
          if (!field.label || field.label.trim() === '') {
            return `Form field ${i + 1}: Display label is required`
          }
          if (field.name && !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field.name)) {
            return `Form field ${i + 1}: Field name must start with a letter or underscore and contain only letters, numbers, and underscores`
          }
        }
      }
      break
    
    case 'landing_page_heading':
      if (nodeType === 'landingPage' && (!value || value.trim() === '')) {
        return 'Heading is required'
      }
      break
    
    case 'landing_page_content':
      if (nodeType === 'landingPage' && (!value || value.trim() === '')) {
        return 'Content is required'
      }
      break
  }
  return null
}

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validate all fields
const validateForm = (): boolean => {
  const errors: Record<string, string> = {}
  const nodeType = props.selectedNode.data.nodeType
  
  // Validate each field
  const fieldsToValidate = [
    'name', 'message_text', 'system_prompt', 'temperature',
    'condition_expression', 'llm_conditions', 'action_type', 'action_url',
    'transfer_department', 'wait_duration', 'wait_unit', 'form_fields',
    'landing_page_heading', 'landing_page_content'
  ]
  
  fieldsToValidate.forEach(field => {
    const value = nodeForm.value[field as keyof typeof nodeForm.value]
    const error = validateField(field, value, nodeType)
    if (error) {
      errors[field] = error
    }
  })
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// Real-time validation on field change
const validateFieldOnChange = (field: string) => {
  const value = nodeForm.value[field as keyof typeof nodeForm.value]
  const error = validateField(field, value, props.selectedNode.data.nodeType)
  
  if (error) {
    validationErrors.value[field] = error
  } else {
    delete validationErrors.value[field]
  }
}



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
      // LLM-based condition checkboxes
      llm_conditions: newNode.data.llm_conditions || 
                      newNode.data.config?.llm_conditions || 
                      { user_frustrated: false, request_human_agent: false, no_knowledge: false },
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
      form_full_screen: newNode.data.config?.form_full_screen || 
                        newNode.data.form_full_screen || 
                        false,
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
                     '',
      // Landing Page node
      landing_page_heading: newNode.data.landing_page_heading || 
                            newNode.data.config?.landing_page_heading || 
                            '',
      landing_page_content: newNode.data.landing_page_content || 
                            newNode.data.config?.landing_page_content || 
                            '',
    }
  }
}, { immediate: true })

// Get node type display name
const getNodeTypeName = (type: string) => {
  const names = {
    landingPage: 'Landing Page',
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
  // Trigger validation for form fields
  validateFieldOnChange('form_fields')
}

// Remove form field
const removeFormField = (index: number) => {
  nodeForm.value.form_fields.splice(index, 1)
  // Trigger validation for form fields
  validateFieldOnChange('form_fields')
}

// Helper function to check if node ID is a UUID
const isUUID = (id: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

// Handle AI generation for system prompt
const handleGenerateWithAI = async () => {
  if (!aiPrompt.value.trim()) return
  
  try {
    const generatedInstructions = await generateInstructions(aiPrompt.value)
    if (generatedInstructions.length > 0) {
      // Join the generated instructions with newlines
      nodeForm.value.system_prompt = generatedInstructions.join('\n')
      showAIPrompt.value = false
      aiPrompt.value = ''
      // Trigger validation for the updated field
      validateFieldOnChange('system_prompt')
    }
  } catch (err) {
    console.error('Failed to generate instructions:', err)
  }
}

// Handle form submission
const handleSave = async () => {
  if (saving.value) return
  
  // Check if any knowledge modals are currently open
  const hasOpenModal = document.querySelector('.modal-overlay')
  if (hasOpenModal) {
    console.log('Knowledge modal is open, preventing save')
    return
  }
  
  // Validate form before saving
  if (!validateForm()) {
    toast.error('Please fix the validation errors before saving', {
      position: 'top-center'
    })
    return
  }
  
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
        config: {
          system_prompt: nodeForm.value.system_prompt,
          temperature: nodeForm.value.temperature
        }
      }),
      ...(props.selectedNode.data.nodeType === 'condition' && {
        condition_expression: nodeForm.value.condition_expression,
        config: {
          llm_conditions: nodeForm.value.llm_conditions
        }
      }),
      ...(props.selectedNode.data.nodeType === 'form' && {
        config: {
          form_fields: nodeForm.value.form_fields,
          form_title: nodeForm.value.form_title,
          form_description: nodeForm.value.form_description,
          submit_button_text: nodeForm.value.submit_button_text,
          form_full_screen: nodeForm.value.form_full_screen
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
      }),
      ...(props.selectedNode.data.nodeType === 'landingPage' && {
        landing_page_heading: nodeForm.value.landing_page_heading,
        landing_page_content: nodeForm.value.landing_page_content
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

      toast.success('Node properties updated successfully', {
        position: 'top-center'
      })
    } else {
      // Node hasn't been saved yet, emit data to parent to save entire workflow
      emit('save', {
        ...nodeForm.value,
        needsWorkflowSave: true, // Flag to indicate parent should save entire workflow
        hasValidationErrors: Object.keys(validationErrors.value).length > 0,
        validationErrors: validationErrors.value
      })

      if (Object.keys(validationErrors.value).length === 0) {
        toast.success('Node properties updated - save workflow to persist changes', {
          position: 'top-center'
        })
      }
    }
  } catch (error: any) {
    console.error('Error updating node:', error)
    toast.error(error.response?.data?.detail || 'Failed to update node properties', {
      position: 'top-center'
    })
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

// Add global event listeners when component mounts (removed for now)
// onMounted(() => {
//   document.addEventListener('click', handleGlobalModalClick, true)
//   document.addEventListener('keydown', handleGlobalModalClick, true)
// })

// Clean up event listeners when component unmounts (removed for now)
// onUnmounted(() => {
//   document.removeEventListener('click', handleGlobalModalClick, true)
//   document.removeEventListener('keydown', handleGlobalModalClick, true)
// })
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
        <div class="collapsible-section">
          <div class="section-header" @click="toggleSection('basic')">
            <div class="section-title">
              <svg class="section-icon" :class="{ 'rotated': collapsedSections.basic }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
              <span>Basic Information</span>
            </div>
          </div>
          
          <div class="section-content" :class="{ 'collapsed': collapsedSections.basic }">
            <div class="form-group">
              <label for="node-name">Node Name *</label>
              <input
                id="node-name"
                v-model="nodeForm.name"
                type="text"
                class="form-input"
                :class="{ 'error': validationErrors.name }"
                placeholder="Enter node name"
                required
                @blur="validateFieldOnChange('name')"
                @input="validateFieldOnChange('name')"
              />
              <div v-if="validationErrors.name" class="error-message">
                {{ validationErrors.name }}
              </div>
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
        </div>

        <!-- Node-specific Properties -->
        <div class="collapsible-section">
          <div class="section-header" @click="toggleSection('nodeSettings')">
            <div class="section-title">
              <svg class="section-icon" :class="{ 'rotated': collapsedSections.nodeSettings }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
              <span>{{ getNodeTypeName(selectedNode.data.nodeType) }} Settings</span>
            </div>
          </div>
          
          <div class="section-content" :class="{ 'collapsed': collapsedSections.nodeSettings }">
          
          <!-- Message Node -->
          <template v-if="selectedNode.data.nodeType === 'message'">
            <div class="form-group">
              <label for="message-text">Message Text *</label>
              <textarea
                id="message-text"
                v-model="nodeForm.message_text"
                class="form-textarea"
                :class="{ 'error': validationErrors.message_text }"
                placeholder="Enter the message to send to users"
                rows="4"
                required
                @blur="validateFieldOnChange('message_text')"
                @input="validateFieldOnChange('message_text')"
              ></textarea>
              <div v-if="validationErrors.message_text" class="error-message">
                {{ validationErrors.message_text }}
              </div>
            </div>
          </template>

          <!-- LLM Node -->
          <template v-if="selectedNode.data.nodeType === 'llm'">
            <div class="form-group">
              <div class="instructions-header">
                <label for="system-prompt">Instructions *</label>
                <button 
                  class="ai-generate-button" 
                  @click="showAIPrompt = true"
                  :disabled="aiLoading"
                  type="button"
                >
                  <span class="ai-icon">✨</span>
                  Generate with AI
                </button>
              </div>
              <textarea
                id="system-prompt"
                v-model="nodeForm.system_prompt"
                class="form-textarea"
                :class="{ 'error': validationErrors.system_prompt }"
                placeholder="Enter system prompt for the AI"
                rows="4"
                required
                @blur="validateFieldOnChange('system_prompt')"
                @input="validateFieldOnChange('system_prompt')"
              ></textarea>
              <div v-if="validationErrors.system_prompt" class="error-message">
                {{ validationErrors.system_prompt }}
              </div>
            </div>
            <div class="form-group">
              <label for="temperature">Temperature</label>
              <input
                id="temperature"
                v-model.number="nodeForm.temperature"
                type="number"
                class="form-input"
                :class="{ 'error': validationErrors.temperature }"
                min="0"
                max="2"
                step="0.1"
                placeholder="0.7"
                @blur="validateFieldOnChange('temperature')"
                @input="validateFieldOnChange('temperature')"
              />
              <div v-if="validationErrors.temperature" class="error-message">
                {{ validationErrors.temperature }}
              </div>
            </div>

            <!-- Knowledge Section -->
            <div class="form-group">
              <div class="knowledge-section">
                <div class="section-header knowledge-header" @click="toggleSection('knowledge')">
                  <div class="section-title">
                    <svg class="section-icon" :class="{ 'rotated': collapsedSections.knowledge }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                    <span>Knowledge Sources</span>
                  </div>
                </div>
                
                <div class="section-content knowledge-content" :class="{ 'collapsed': collapsedSections.knowledge }">
                  <div class="knowledge-wrapper">
                    <KnowledgeGrid 
                      v-if="!collapsedSections.knowledge"
                      :agent-id="agentId" 
                      :organization-id="organizationId"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- AI Prompt Modal -->
            <div v-if="showAIPrompt" class="ai-prompt-modal">
              <div class="ai-prompt-content">
                <h5>Generate Instructions with AI</h5>
                <textarea 
                  v-model="aiPrompt"
                  placeholder="Describe what you want this AI node to do. For example: 'Create instructions for a customer support assistant that helps with order tracking'"
                  rows="4"
                  class="ai-prompt-textarea"
                ></textarea>
                <div v-if="aiError" class="error-message">{{ aiError }}</div>
                <div class="ai-prompt-actions">
                  <button 
                    class="cancel-ai-button" 
                    @click="showAIPrompt = false"
                    :disabled="aiLoading"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button 
                    class="generate-ai-button" 
                    @click="handleGenerateWithAI"
                    :disabled="aiLoading || !aiPrompt.trim()"
                    type="button"
                  >
                    {{ aiLoading ? 'Generating...' : 'Generate' }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Condition Node -->
          <template v-if="selectedNode.data.nodeType === 'condition'">
            <!-- Show smart checkboxes if connected to LLM from above -->
            <template v-if="isConnectedToLLM">
              <div class="form-group">
                <label>LLM-Based Conditions</label>
                <p class="field-help">Select conditions to trigger based on LLM responses</p>
                <div class="checkbox-group">
                  <label class="checkbox-label">
                    <input
                      v-model="nodeForm.llm_conditions.user_frustrated"
                      type="checkbox"
                      class="form-checkbox"
                      @change="validateFieldOnChange('llm_conditions')"
                    />
                    <span>🔥 Transfer chat if user frustrated</span>
                  </label>
                  <label class="checkbox-label">
                    <input
                      v-model="nodeForm.llm_conditions.request_human_agent"
                      type="checkbox"
                      class="form-checkbox"
                      @change="validateFieldOnChange('llm_conditions')"
                    />
                    <span>👤 Request human agent</span>
                  </label>
                  <label class="checkbox-label">
                    <input
                      v-model="nodeForm.llm_conditions.no_knowledge"
                      type="checkbox"
                      class="form-checkbox"
                      @change="validateFieldOnChange('llm_conditions')"
                    />
                    <span>❓ Not having knowledge to answer</span>
                  </label>
                </div>
                <div v-if="validationErrors.llm_conditions" class="error-message">
                  {{ validationErrors.llm_conditions }}
                </div>
              </div>
            </template>
            
            <!-- Show generic condition expression if not connected to LLM -->
            <template v-else>
              <div class="form-group">
                <label for="condition-expression">Condition Expression *</label>
                <textarea
                  id="condition-expression"
                  v-model="nodeForm.condition_expression"
                  class="form-textarea"
                  :class="{ 'error': validationErrors.condition_expression }"
                  placeholder="Enter condition logic (e.g., user_input.includes('yes'))"
                  rows="4"
                  required
                  @blur="validateFieldOnChange('condition_expression')"
                  @input="validateFieldOnChange('condition_expression')"
                ></textarea>
                <div v-if="validationErrors.condition_expression" class="error-message">
                  {{ validationErrors.condition_expression }}
                </div>
              </div>
            </template>
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
              <label class="checkbox-group">
                <input
                  v-model="nodeForm.form_full_screen"
                  type="checkbox"
                  class="form-checkbox"
                />
                <span class="checkbox-label">Display form in full screen mode</span>
              </label>
              <p class="help-text">When enabled, the form will be displayed as a full screen overlay instead of within the chat interface</p>
            </div>
            
            <div class="form-group">
              <label>Form Fields</label>
              <div class="form-fields-container" :class="{ 'error': validationErrors.form_fields }">
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
                          @blur="validateFieldOnChange('form_fields')"
                          @input="validateFieldOnChange('form_fields')"
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
                          @blur="validateFieldOnChange('form_fields')"
                          @input="validateFieldOnChange('form_fields')"
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
              <div v-if="validationErrors.form_fields" class="error-message">
                {{ validationErrors.form_fields }}
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
                :class="{ 'error': validationErrors.action_type }"
                required
                @blur="validateFieldOnChange('action_type')"
                @change="validateFieldOnChange('action_type')"
              >
                <option value="">Select action type</option>
                <option value="webhook">Webhook</option>
                <option value="email">Send Email</option>
                <option value="api">API Call</option>
              </select>
              <div v-if="validationErrors.action_type" class="error-message">
                {{ validationErrors.action_type }}
              </div>
            </div>
            <div class="form-group">
              <label for="action-url">URL *</label>
              <input
                id="action-url"
                v-model="nodeForm.action_url"
                type="url"
                class="form-input"
                :class="{ 'error': validationErrors.action_url }"
                placeholder="https://example.com/webhook"
                required
                @blur="validateFieldOnChange('action_url')"
                @input="validateFieldOnChange('action_url')"
              />
              <div v-if="validationErrors.action_url" class="error-message">
                {{ validationErrors.action_url }}
              </div>
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
                :class="{ 'error': validationErrors.transfer_department }"
                required
                @blur="validateFieldOnChange('transfer_department')"
                @change="validateFieldOnChange('transfer_department')"
              >
                <option value="">Select department</option>
                <option value="general">General Support</option>
                <option value="sales">Sales</option>
                <option value="technical">Technical Support</option>
              </select>
              <div v-if="validationErrors.transfer_department" class="error-message">
                {{ validationErrors.transfer_department }}
              </div>
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
                :class="{ 'error': validationErrors.wait_duration }"
                min="1"
                placeholder="5"
                required
                @blur="validateFieldOnChange('wait_duration')"
                @input="validateFieldOnChange('wait_duration')"
              />
              <div v-if="validationErrors.wait_duration" class="error-message">
                {{ validationErrors.wait_duration }}
              </div>
            </div>
            <div class="form-group">
              <label for="wait-unit">Time Unit *</label>
              <select
                id="wait-unit"
                v-model="nodeForm.wait_unit"
                class="form-select"
                :class="{ 'error': validationErrors.wait_unit }"
                required
                @blur="validateFieldOnChange('wait_unit')"
                @change="validateFieldOnChange('wait_unit')"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
              <div v-if="validationErrors.wait_unit" class="error-message">
                {{ validationErrors.wait_unit }}
              </div>
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

          <!-- Landing Page Node -->
          <template v-if="selectedNode.data.nodeType === 'landingPage'">
            <div class="form-group">
              <label for="landing-page-heading">Heading *</label>
              <input
                id="landing-page-heading"
                v-model="nodeForm.landing_page_heading"
                class="form-input"
                :class="{ 'error': validationErrors.landing_page_heading }"
                placeholder="Enter a welcoming heading for your landing page"
                required
                @blur="validateFieldOnChange('landing_page_heading')"
                @input="validateFieldOnChange('landing_page_heading')"
              />
              <div v-if="validationErrors.landing_page_heading" class="error-message">
                {{ validationErrors.landing_page_heading }}
              </div>
            </div>
            
            <div class="form-group">
              <label for="landing-page-content">Content *</label>
              <textarea
                id="landing-page-content"
                v-model="nodeForm.landing_page_content"
                class="form-textarea"
                :class="{ 'error': validationErrors.landing_page_content }"
                placeholder="Enter the content text for your landing page. This will be displayed below the heading."
                rows="4"
                required
                @blur="validateFieldOnChange('landing_page_content')"
                @input="validateFieldOnChange('landing_page_content')"
              ></textarea>
              <div v-if="validationErrors.landing_page_content" class="error-message">
                {{ validationErrors.landing_page_content }}
              </div>
            </div>
          </template>
        </div>
        </div>
      </form>
    </div>

    <div class="properties-footer">
      <div class="footer-actions">
        <button type="button" class="btn btn-secondary" @click="handleClose">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" @click="handleSave" :disabled="saving || Object.keys(validationErrors).length > 0">
          <div v-if="saving" class="btn-spinner"></div>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure toast positioning is centered and doesn't cover buttons */
.properties-panel :deep([data-sonner-toaster]) {
  top: 80px !important;
}

.properties-panel :deep([data-sonner-toaster][data-theme]) {
  top: 80px !important;
}

.properties-panel :deep(.sonner-toaster) {
  top: 80px !important;
}
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

/* Collapsible Section Styles */
.collapsible-section {
  margin-bottom: var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-color);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background: var(--background-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.section-header:hover {
  background: var(--background-alt);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.section-icon {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
  transition: transform 0.2s ease;
}

.section-icon.rotated {
  transform: rotate(-90deg);
}

.section-content {
  padding: var(--space-md);
  transition: all 0.3s ease;
  max-height: none;
  overflow: visible;
}

.section-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  overflow: hidden;
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

.form-input.error,
.form-textarea.error,
.form-select.error {
  border-color: var(--error-color);
  background-color: rgba(239, 68, 68, 0.05);
}

.form-input.error:focus,
.form-textarea.error:focus,
.form-select.error:focus {
  border-color: var(--error-color);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

.error-message {
  color: var(--error-color);
  font-size: 0.75rem;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.error-message::before {
  content: "⚠";
  font-size: 0.8rem;
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
  max-height: none;
  overflow: visible;
}

.form-fields-container.error {
  border-color: var(--error-color);
  background-color: rgba(239, 68, 68, 0.05);
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

.field-help {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  line-height: 1.3;
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

.field-input.error,
.field-textarea.error,
.field-select.error {
  border-color: var(--error-color);
  background-color: rgba(239, 68, 68, 0.05);
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

/* Instructions Header Styles */
.instructions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.ai-generate-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-generate-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.ai-generate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ai-icon {
  font-size: 0.8rem;
}

/* AI Prompt Modal Styles */
.ai-prompt-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ai-prompt-content {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  width: 90%;
  max-width: 500px;
  box-shadow: var(--shadow-xl);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.ai-prompt-content h5 {
  margin: 0 0 var(--space-sm) 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.ai-prompt-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-soft);
  color: var(--text-color);
  font-size: 0.85rem;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
}

.ai-prompt-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.cancel-ai-button,
.generate-ai-button {
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

.cancel-ai-button {
  background: var(--background-muted);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.cancel-ai-button:hover {
  background: var(--background-alt);
  color: var(--text-color);
}

.generate-ai-button {
  background: var(--primary-color);
  color: white;
}

.generate-ai-button:hover {
  background: var(--primary-dark);
}

.generate-ai-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Knowledge Section Styles */
.knowledge-section {
  margin-top: var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-color);
  overflow: hidden;
}

.knowledge-header .section-header {
  background: var(--background-muted);
  border-bottom: 1px solid var(--border-color);
}

.knowledge-header .section-title {
  color: var(--text-color);
}

.knowledge-content {
  padding: 0; /* Remove default padding since KnowledgeGrid has its own */
  max-height: none;
  overflow: visible;
  transition: all 0.3s ease;
}

.knowledge-content.collapsed {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  overflow: hidden;
}

.knowledge-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Override KnowledgeGrid styles within PropertiesPanel */
.knowledge-content :deep(.knowledge-grid-container) {
  padding: var(--space-sm);
  background: transparent;
  border-top: none;
}

.knowledge-content :deep(.knowledge-header) {
  margin-bottom: var(--space-sm);
  flex-direction: column;
  gap: var(--space-xs);
  align-items: stretch;
}

.knowledge-content :deep(.header-left) {
  flex-direction: column;
  gap: var(--space-xs);
  align-items: stretch;
}

.knowledge-content :deep(.header-left h3) {
  font-size: 1rem;
  margin-bottom: 0;
}

.knowledge-content :deep(.header-actions) {
  display: flex;
  gap: var(--space-xs);
  justify-content: center;
}

.knowledge-content :deep(.action-button) {
  font-size: 0.7rem;
  padding: 4px 8px;
  flex: 1;
  text-align: center;
  white-space: nowrap;
}

.knowledge-content :deep(.knowledge-grid) {
  font-size: 0.8rem;
}

.knowledge-content :deep(.knowledge-grid-header),
.knowledge-content :deep(.knowledge-grid-row) {
  grid-template-columns: 1fr 60px;
  min-height: auto;
}

.knowledge-content :deep(.header-cell),
.knowledge-content :deep(.grid-cell) {
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.75rem;
}

.knowledge-content :deep(.header-cell:nth-child(2)),
.knowledge-content :deep(.header-cell:nth-child(3)),
.knowledge-content :deep(.header-cell:nth-child(4)),
.knowledge-content :deep(.grid-cell:nth-child(2)),
.knowledge-content :deep(.grid-cell:nth-child(3)),
.knowledge-content :deep(.grid-cell:nth-child(4)) {
  display: none;
}

.knowledge-content :deep(.actions-cell) {
  width: 60px;
  text-align: center;
}

.knowledge-content :deep(.delete-button) {
  padding: 2px;
}

.knowledge-content :deep(.delete-icon) {
  width: 16px;
  height: 16px;
}

.knowledge-content :deep(.knowledge-empty) {
  padding: var(--space-md);
  text-align: center;
}

.knowledge-content :deep(.warning-message) {
  font-size: 0.8rem;
  margin-bottom: var(--space-xs);
}

.knowledge-content :deep(.warning-description) {
  font-size: 0.75rem;
  line-height: 1.4;
}

.knowledge-content :deep(.modal-content) {
  max-width: 30vw;
  max-height: 75vh;
  width: 65%;
}

/* Ensure knowledge modals have proper z-index and don't interfere */
.knowledge-content :deep(.modal-overlay) {
  z-index: 1001 !important; /* Higher than properties panel */
  position: fixed !important;
  isolation: isolate;
  background: rgba(0, 0, 0, 0.4) !important; /* Slightly more transparent for workflow context */
}

/* Prevent modal interactions from bubbling to properties panel */
.knowledge-content :deep(.modal-overlay),
.knowledge-content :deep(.modal-content) {
  pointer-events: auto;
}

.knowledge-content :deep(.modal-overlay) {
  backdrop-filter: blur(4px);
}

.knowledge-content :deep(.pagination) {
  flex-direction: column;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.knowledge-content :deep(.pagination-button) {
  width: 100%;
  font-size: 0.7rem;
  padding: var(--space-xs);
}

.knowledge-content :deep(.page-info) {
  font-size: 0.7rem;
  text-align: center;
}

/* Link modal overrides for PropertiesPanel */
.knowledge-content :deep(.link-modal) {
  max-width: 65vw;
  width: 60%;
}

.knowledge-content :deep(.org-knowledge-grid .knowledge-grid-header),
.knowledge-content :deep(.org-knowledge-grid .knowledge-grid-row) {
  grid-template-columns: 2fr 0fr 100px; /* Keep 3 columns but make type column 0 width */
  align-items: center;
}

.knowledge-content :deep(.org-knowledge-grid .type-cell) {
  display: none; /* Hide type column */
}

.knowledge-content :deep(.source-cell) {
  padding-left: var(--space-sm);
  white-space: normal;
  word-break: break-word;
  font-size: 0.75rem;
}

.knowledge-content :deep(.action-cell) {
  padding-right: var(--space-sm);
  text-align: right;
  width: 100px;
}

.knowledge-content :deep(.link-button),
.knowledge-content :deep(.unlink-button) {
  min-width: 70px;
  padding: 4px 8px;
  font-size: 0.7rem;
  display: inline-block;
}

/* Force proper button display regardless of responsive breakpoints */
.knowledge-content :deep(.org-knowledge-grid) .action-cell {
  display: block !important;
  visibility: visible !important;
}

.knowledge-content :deep(.org-knowledge-grid) .link-button,
.knowledge-content :deep(.org-knowledge-grid) .unlink-button {
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Additional form styles */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 8px 0;
}

.checkbox-group input[type="checkbox"] {
  margin-top: 2px;
  flex-shrink: 0;
}

.checkbox-label {
  font-size: 0.85rem;
  color: var(--text-color);
  line-height: 1.4;
}

.help-text {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
  line-height: 1.3;
}

/* Override any responsive hiding that might affect buttons */
@media (max-width: 768px) {
  .knowledge-content :deep(.knowledge-grid-container) {
    padding: 4px;
  }
  
  .knowledge-content :deep(.header-actions) {
    flex-direction: column;
    gap: 4px;
  }
  
  .knowledge-content :deep(.action-button) {
    font-size: 0.65rem;
    padding: 3px 6px;
  }

  .knowledge-content :deep(.org-knowledge-grid .knowledge-grid-header),
  .knowledge-content :deep(.org-knowledge-grid .knowledge-grid-row) {
    grid-template-columns: 2fr 0fr 100px !important; /* Force 3-column layout */
  }
  
  .knowledge-content :deep(.org-knowledge-grid) .action-cell {
    display: block !important;
    grid-column: 3 !important; /* Ensure it's in the third column */
  }
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