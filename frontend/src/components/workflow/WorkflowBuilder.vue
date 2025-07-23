<!--
ChatterMate - Workflow Builder
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
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow, type Node, type Edge, type NodeMouseEvent } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { toast } from 'vue-sonner'
import { workflowNodeService } from '../../services/workflowNode'
import { workflowService } from '../../services/workflow'
import type { WorkflowResponse } from '@/types/workflow'
import { WorkflowStatus } from '@/types/workflow'
import PropertiesPanel from './PropertiesPanel.vue'

// Import Vue Flow styles
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const props = defineProps<{
  workflow: WorkflowResponse
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Vue Flow setup
const { onConnect, addNodes, removeNodes, addEdges, getNodes, getEdges, vueFlowRef } = useVueFlow({
  id: 'workflow-builder',
  nodes: [],
  edges: [],
  snapToGrid: true,
  snapGrid: [20, 20],
  defaultEdgeOptions: {
    style: { strokeWidth: 2 }
  }
})

// Node types configuration - using default Vue Flow nodes for now
const nodeTypes = {}

// Available node types for sidebar
const availableNodeTypes = [
  {
    type: 'landingPage',
    label: 'Landing Page',
    icon: '🏠',
    description: 'Display a welcome screen with customizable heading and content',
    color: '#6366F1'
  },
  {
    type: 'message',
    label: 'Message',
    icon: '💬',
    description: 'Send a predefined message to the user',
    color: '#3B82F6'
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: '🤖',
    description: 'AI model processing with configurable prompts',
    color: '#8B5CF6'
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: '🔀',
    description: 'Branch conversation based on conditions',
    color: '#F59E0B'
  },
  {
    type: 'form',
    label: 'Form',
    icon: '📝',
    description: 'Collect structured data from users',
    color: '#10B981'
  },
  // {
  //   type: 'action',
  //   label: 'Action',
  //   icon: '⚡',
  //   description: 'Trigger external actions or API calls',
  //   color: '#EF4444'
  // },
  {
    type: 'humanTransfer',
    label: 'Human Agent',
    icon: '👤',
    description: 'Let a human agent handle the conversation',
    color: '#F97316'
  },
  // {
  //   type: 'wait',
  //   label: 'Wait',
  //   icon: '⏱️',
  //   description: 'Pause execution for time-based triggers',
  //   color: '#6B7280'
  // },
  {
    type: 'end',
    label: 'End',
    icon: '🏁',
    description: 'Terminate conversation flow',
    color: '#DC2626'
  }
]

// State management
const loading = ref(false)
const draggedType = ref<string | null>(null)
const nodeIdCounter = ref(1)
const showPropertiesPanel = ref(false)
const selectedNode = ref<Node | null>(null)
const workflowStatus = ref<WorkflowStatus>(props.workflow.status)
const publishLoading = ref(false)

// Helper function to generate UUID-like IDs
const generateNodeId = (type: string) => {
  return `${type}-${nodeIdCounter.value++}`
}

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

// Computed properties
const hasNodes = computed(() => getNodes.value.length > 0)
const isPublished = computed(() => workflowStatus.value === WorkflowStatus.PUBLISHED)
const isDraft = computed(() => workflowStatus.value === WorkflowStatus.DRAFT)
const hasValidConnections = computed(() => {
  const nodes = getNodes.value
  const edges = getEdges.value
  
  // Single node is always valid
  if (nodes.length <= 1) return true
  
  // Multiple nodes must have connections
  if (edges.length === 0) return false
  
  // Check for isolated nodes
  const connectedNodeIds = new Set<string>()
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source)
    connectedNodeIds.add(edge.target)
  })
  
  // All nodes must be connected
  return nodes.every(node => connectedNodeIds.has(node.id))
})
const canPublish = computed(() => hasNodes.value && isDraft.value && hasValidConnections.value)

// Map backend node types to frontend enum values
const mapNodeTypeToFrontend = (backendType: string) => {
  const mapping = {
    'landing_page': 'landingPage', // Backend snake_case to frontend camelCase
    'message': 'message',
    'llm': 'llm',
    'condition': 'condition',
    'form': 'form',
    'action': 'action',
    'human_transfer': 'humanTransfer', // Backend snake_case to frontend camelCase
    'wait': 'wait',
    'end': 'end'
  }
  return mapping[backendType as keyof typeof mapping] || 'message'
}

// Map frontend node types to backend enum values
const mapNodeTypeToBackend = (frontendType: string) => {
  const mapping = {
    'landingPage': 'landing_page', // Frontend camelCase to backend snake_case
    'message': 'message',
    'llm': 'llm',
    'condition': 'condition',
    'form': 'form',
    'action': 'action',
    'humanTransfer': 'human_transfer', // Frontend camelCase to backend snake_case
    'wait': 'wait',
    'end': 'end'
  }
  return mapping[frontendType as keyof typeof mapping] || 'message'
}

// Load workflow data
const loadWorkflowData = async () => {
  try {
    loading.value = true
    const data = await workflowNodeService.getWorkflowNodes(props.workflow.id)

    // Convert backend nodes to Vue Flow nodes
    const nodes: Node[] = data.nodes.map((node: any) => {
      const frontendNodeType = mapNodeTypeToFrontend(node.node_type)
      const nodeType = availableNodeTypes.find(t => t.type === frontendNodeType)
      return {
        id: node.id,
        type: 'default', // Use default Vue Flow node type
        position: { x: node.position_x, y: node.position_y },
        data: {
          label: `${nodeType?.icon || '📄'} ${node.name}`, // Always show with icon
          cleanName: node.name, // Store clean name from backend
          description: node.description,
          config: node.config,
          nodeType: frontendNodeType, // Store the mapped frontend type
          icon: nodeType?.icon || '📄',
          color: nodeType?.color || '#6B7280',
          // Store all backend properties directly in data for easy access
          message_text: node.config?.message_text,
          system_prompt: node.system_prompt,
          temperature: node.temperature,
          model_id: node.model_id,
          form_fields: node.form_fields,
          form_title: node.form_title,
          form_description: node.form_description,
          submit_button_text: node.submit_button_text,
          form_full_screen: node.form_full_screen,
          condition_expression: node.condition_expression,
          action_type: node.action_type,
          action_config: node.action_config,
          transfer_rules: node.transfer_rules,
          wait_duration: node.wait_duration,
          wait_until_condition: node.wait_until_condition,
          landing_page_heading: node.landing_page_heading,
          landing_page_content: node.landing_page_content,
          // Also spread config for backward compatibility
          ...node.config
        },
        style: {
          backgroundColor: nodeType?.color || '#6B7280',
          color: 'white',
          borderColor: nodeType?.color || '#6B7280'
        }
      }
    })

    // Convert backend connections to Vue Flow edges
    const edges: Edge[] = data.connections.map((conn: any) => ({
      id: conn.id,
      source: conn.source_node_id,
      target: conn.target_node_id,
      sourceHandle: conn.source_handle,
      targetHandle: conn.target_handle,
      label: conn.label,
      data: {
        condition: conn.condition,
        priority: conn.priority,
        metadata: conn.connection_metadata
      }
    }))

    addNodes(nodes)
    addEdges(edges)
    
    // Update counter for new nodes - extract counter from text IDs like "message-1", "llm-2"
    const maxCounter = nodes.reduce((max, node) => {
      const match = node.id.match(/-(\d+)$/)
      if (match) {
        return Math.max(max, parseInt(match[1]))
      }
      return max
    }, 0)
    nodeIdCounter.value = maxCounter + 1
  } catch (error: any) {
    console.error('Error loading workflow data:', error)
    
    // Don't show error toast for 404 - it means workflow exists but has no nodes yet (normal state)
    if (error.response?.status !== 404) {
      toast.error('Failed to load workflow data', {
        position: 'top-center'
      })
    }
    
    // For 404, just log and continue with empty workflow
    if (error.response?.status === 404) {
      console.log('No nodes found for workflow - starting with empty canvas')
    }
  } finally {
    loading.value = false
  }
}

// Handle node drag start
const handleDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
  draggedType.value = nodeType
}

// Handle drop on canvas
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  
  const type = event.dataTransfer?.getData('application/vueflow')
  if (!type) return

  const vueFlowBounds = vueFlowRef.value?.getBoundingClientRect()
  if (!vueFlowBounds) return

  const position = {
    x: event.clientX - vueFlowBounds.left,
    y: event.clientY - vueFlowBounds.top
  }

  const nodeType = availableNodeTypes.find(t => t.type === type)
  const newNode: Node = {
    id: generateNodeId(type),
    type: 'default', // Use default Vue Flow node type
    position,
    data: {
      label: `${nodeType?.icon || '📄'} ${nodeType?.label || 'Node'}`, // Display with icon
      cleanName: nodeType?.label || 'Node', // Store clean name for backend
      description: '',
      config: {},
      nodeType: type, // Store the original type for later use
      icon: nodeType?.icon || '📄',
      color: nodeType?.color || '#6B7280'
    },
    style: {
      backgroundColor: nodeType?.color || '#6B7280',
      color: 'white',
      borderColor: nodeType?.color || '#6B7280'
    }
  }

  addNodes([newNode])
  
  // Auto-connect to the last node if it exists
  autoConnectToLastNode(newNode)
  
  draggedType.value = null
}

// Auto-connect functionality
const autoConnectToLastNode = (newNode: Node) => {
  const nodes = getNodes.value
  if (nodes.length <= 1) return

  // Find the last node (excluding the new one)
  const otherNodes = nodes.filter(n => n.id !== newNode.id)
  const lastNode = otherNodes[otherNodes.length - 1]

  if (lastNode) {
    const newEdge: Edge = {
      id: `${lastNode.id}-${newNode.id}`,
      source: lastNode.id,
      target: newNode.id,
      animated: true
    }
    
    addEdges([newEdge])
  }
}

// Handle node click for editing
const handleNodeClick = (event: NodeMouseEvent) => {
  selectedNode.value = event.node
  showPropertiesPanel.value = true
  console.log('Node clicked:', event.node.id)
  
  // Add class to body to adjust toast positioning
  document.body.classList.add('workflow-properties-panel-open')
}

// Handle properties panel close
const closePropertiesPanel = () => {
  showPropertiesPanel.value = false
  selectedNode.value = null
  
  // Remove class from body to reset toast positioning
  document.body.classList.remove('workflow-properties-panel-open')
}

// Handle node property save
const saveNodeProperties = (properties: any) => {
  if (selectedNode.value) {
    // Check for validation errors before processing
    if (properties.hasValidationErrors) {
      console.log('Validation errors detected, not saving:', properties.validationErrors)
      return
    }
    
    // If we have an updated node from the API, use that data
    if (properties.updatedNode) {
      const updatedNode = properties.updatedNode
      const frontendNodeType = mapNodeTypeToFrontend(updatedNode.node_type)
      const nodeType = availableNodeTypes.find(t => t.type === frontendNodeType)
      
      // Update the node with the backend response
      selectedNode.value.data = {
        ...selectedNode.value.data,
        label: `${nodeType?.icon || '📄'} ${updatedNode.name}`,
        cleanName: updatedNode.name,
        description: updatedNode.description,
        config: updatedNode.config || {},
        // Store backend data in the config
        message_text: updatedNode.message_text,
        system_prompt: updatedNode.system_prompt,
        temperature: updatedNode.temperature,
        condition_expression: updatedNode.condition_expression,
        action_type: updatedNode.action_type,
        action_config: updatedNode.action_config,
        transfer_rules: updatedNode.transfer_rules,
        wait_duration: updatedNode.wait_duration,
        wait_until_condition: updatedNode.wait_until_condition,
        form_fields: updatedNode.form_fields,
        form_title: updatedNode.form_title,
        form_description: updatedNode.form_description,
        submit_button_text: updatedNode.submit_button_text,
        landing_page_heading: updatedNode.landing_page_heading,
        landing_page_content: updatedNode.landing_page_content
      }
      
      // Update position if it changed
      if (updatedNode.position_x !== undefined && updatedNode.position_y !== undefined) {
        selectedNode.value.position.x = updatedNode.position_x
        selectedNode.value.position.y = updatedNode.position_y
      }
      
      // Clear any validation error styling for this node
      resetNodeValidationStyle(selectedNode.value)
    } else if (properties.needsWorkflowSave) {
      // Node hasn't been saved yet, update local data and trigger workflow save
      selectedNode.value.data = {
        ...selectedNode.value.data,
        description: properties.description,
        cleanName: properties.name,
        config: {
          ...selectedNode.value.data.config,
          // Filter out only the relevant properties based on node type
          ...(selectedNode.value.data.nodeType === 'message' && {
            message_text: properties.message_text
          }),
          ...(selectedNode.value.data.nodeType === 'llm' && {
            system_prompt: properties.system_prompt,
            temperature: properties.temperature
          }),
          ...(selectedNode.value.data.nodeType === 'condition' && {
            condition_expression: properties.condition_expression
          }),
          ...(selectedNode.value.data.nodeType === 'form' && {
            form_fields: properties.form_fields,
            form_title: properties.form_title,
            form_description: properties.form_description,
            submit_button_text: properties.submit_button_text,
            form_full_screen: properties.form_full_screen
          }),
          ...(selectedNode.value.data.nodeType === 'action' && {
            action_type: properties.action_type,
            action_url: properties.action_url
          }),
          ...(selectedNode.value.data.nodeType === 'humanTransfer' && {
            transfer_department: properties.transfer_department,
            transfer_message: properties.transfer_message
          }),
          ...(selectedNode.value.data.nodeType === 'wait' && {
            wait_duration: properties.wait_duration,
            wait_unit: properties.wait_unit
          }),
          ...(selectedNode.value.data.nodeType === 'end' && {
            final_message: properties.final_message
          }),
          ...(selectedNode.value.data.nodeType === 'landingPage' && {
            landing_page_heading: properties.landing_page_heading,
            landing_page_content: properties.landing_page_content
          })
        }
      }
      
      // Update the node data directly for immediate validation access
      Object.assign(selectedNode.value.data, {
        message_text: properties.message_text,
        system_prompt: properties.system_prompt,
        temperature: properties.temperature,
        condition_expression: properties.condition_expression,
        llm_conditions: properties.llm_conditions,
        action_type: properties.action_type,
        action_url: properties.action_url,
        transfer_department: properties.transfer_department,
        transfer_message: properties.transfer_message,
        wait_duration: properties.wait_duration,
        wait_unit: properties.wait_unit,
        final_message: properties.final_message,
        form_fields: properties.form_fields,
        form_title: properties.form_title,
        form_description: properties.form_description,
        submit_button_text: properties.submit_button_text,
        landing_page_heading: properties.landing_page_heading,
        landing_page_content: properties.landing_page_content
      })
      
      // Update the label to include the new name with icon
      const nodeType = availableNodeTypes.find(t => t.type === selectedNode.value?.data.nodeType)
      selectedNode.value.data.label = `${nodeType?.icon || '📄'} ${properties.name}`
      
      // Clear any validation error styling for this node
      resetNodeValidationStyle(selectedNode.value)
      
      // Update form_full_screen property specifically
      if (selectedNode.value.data.nodeType === 'form') {
        selectedNode.value.data.form_full_screen = properties.form_full_screen
      }
      
      // Auto-save the workflow to persist the changes
      saveWorkflow()
    } else {
      // Fallback to the old method if no updated node is provided
      selectedNode.value.data = {
        ...selectedNode.value.data,
        description: properties.description,
        cleanName: properties.name,
        config: {
          ...selectedNode.value.data.config,
          // Filter out only the relevant properties based on node type
          ...(selectedNode.value.data.nodeType === 'message' && {
            message_text: properties.message_text
          }),
          ...(selectedNode.value.data.nodeType === 'llm' && {
            system_prompt: properties.system_prompt,
            temperature: properties.temperature
          }),
          ...(selectedNode.value.data.nodeType === 'condition' && {
            condition_expression: properties.condition_expression
          }),
          ...(selectedNode.value.data.nodeType === 'form' && {
            form_fields: properties.form_fields,
            form_title: properties.form_title,
            form_description: properties.form_description,
            submit_button_text: properties.submit_button_text,
            form_full_screen: properties.form_full_screen
          }),
          ...(selectedNode.value.data.nodeType === 'action' && {
            action_type: properties.action_type,
            action_url: properties.action_url
          }),
          ...(selectedNode.value.data.nodeType === 'humanTransfer' && {
            transfer_department: properties.transfer_department,
            transfer_message: properties.transfer_message
          }),
          ...(selectedNode.value.data.nodeType === 'wait' && {
            wait_duration: properties.wait_duration,
            wait_unit: properties.wait_unit
          }),
          ...(selectedNode.value.data.nodeType === 'end' && {
            final_message: properties.final_message
          }),
          ...(selectedNode.value.data.nodeType === 'landingPage' && {
            landing_page_heading: properties.landing_page_heading,
            landing_page_content: properties.landing_page_content
          })
        }
      }
      
      // Update the node data directly for immediate validation access
      Object.assign(selectedNode.value.data, {
        message_text: properties.message_text,
        system_prompt: properties.system_prompt,
        temperature: properties.temperature,
        condition_expression: properties.condition_expression,
        llm_conditions: properties.llm_conditions,
        action_type: properties.action_type,
        action_url: properties.action_url,
        transfer_department: properties.transfer_department,
        transfer_message: properties.transfer_message,
        wait_duration: properties.wait_duration,
        wait_unit: properties.wait_unit,
        final_message: properties.final_message,
        form_fields: properties.form_fields,
        form_title: properties.form_title,
        form_description: properties.form_description,
        submit_button_text: properties.submit_button_text,
        landing_page_heading: properties.landing_page_heading,
        landing_page_content: properties.landing_page_content
      })
      
      // Update form_full_screen property specifically for form nodes
      if (selectedNode.value.data.nodeType === 'form') {
        selectedNode.value.data.form_full_screen = properties.form_full_screen
      }
      
      // Update the label to include the new name with icon
      const nodeType = availableNodeTypes.find(t => t.type === selectedNode.value?.data.nodeType)
      selectedNode.value.data.label = `${nodeType?.icon || '📄'} ${properties.name}`
      
      // Clear any validation error styling for this node
      resetNodeValidationStyle(selectedNode.value)
    }
  }
  
  // Reset all validation styling to refresh the validation state
  resetAllNodesValidationStyle()
  
  closePropertiesPanel()
}

// Handle node deletion
const deleteSelectedNode = () => {
  if (selectedNode.value) {
    removeNodes([selectedNode.value.id])
    toast.success('Node deleted', {
      position: 'top-center'
    })
    closePropertiesPanel()
  }
}

// Validate all nodes before saving
const validateAllNodes = (): { isValid: boolean; errors: string[] } => {
  const nodes = getNodes.value
  const errors: string[] = []
  
  for (const node of nodes) {
    const nodeType = node.data.nodeType
    const nodeData = node.data
    
    // Check required fields for each node type
    switch (nodeType) {
      case 'message':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.message_text || nodeData.message_text.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Message text is required`)
        }
        break
      
      case 'llm':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.system_prompt || nodeData.system_prompt.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": System prompt is required`)
        }
        break
      
      case 'condition':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        
        // Check if condition node is connected to an LLM node from above
        const edges = getEdges.value
        const incomingEdges = edges.filter(edge => edge.target === node.id)
        const isConnectedToLLM = incomingEdges.some(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source)
          return sourceNode?.data.nodeType === 'llm'
        })
        
        if (isConnectedToLLM) {
          // If connected to LLM, check that at least one LLM condition is selected
          const llmConditions = nodeData.llm_conditions || nodeData.config?.llm_conditions
          if (!llmConditions || (!llmConditions.user_frustrated && !llmConditions.request_human_agent && !llmConditions.no_knowledge)) {
            errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": At least one LLM condition must be selected`)
          }
        } else {
          // If not connected to LLM, check for condition expression
          if (!nodeData.condition_expression || nodeData.condition_expression.trim() === '') {
            errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Condition expression is required`)
          }
        }
        break
      
      case 'form':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        const formFields = nodeData.form_fields || nodeData.config?.form_fields || []
        if (!formFields || formFields.length === 0) {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": At least one form field is required`)
        } else {
          for (let i = 0; i < formFields.length; i++) {
            const field = formFields[i]
            if (!field.name || field.name.trim() === '') {
              errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}" field ${i + 1}: Field name is required`)
            }
            if (!field.label || field.label.trim() === '') {
              errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}" field ${i + 1}: Display label is required`)
            }
          }
        }
        break
      
      case 'action':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.action_type || nodeData.action_type.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Action type is required`)
        }
        if (!nodeData.action_url || nodeData.action_url.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Action URL is required`)
        }
        break
      
      case 'humanTransfer':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.transfer_department || nodeData.transfer_department.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Department is required`)
        }
        break
      
      case 'wait':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.wait_duration || nodeData.wait_duration < 1) {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Wait duration must be at least 1`)
        }
        if (!nodeData.wait_unit || nodeData.wait_unit.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Time unit is required`)
        }
        break
      
      case 'landingPage':
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        if (!nodeData.landing_page_heading || nodeData.landing_page_heading.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Heading is required`)
        }
        if (!nodeData.landing_page_content || nodeData.landing_page_content.trim() === '') {
          errors.push(`${nodeType} node "${nodeData.cleanName || 'Unnamed'}": Content is required`)
        }
        break
      
      default:
        if (!nodeData.cleanName || nodeData.cleanName.trim() === '') {
          errors.push(`${nodeType} node: Name is required`)
        }
        break
    }
  }
  
  return { isValid: errors.length === 0, errors }
}

// Add visual indicators for nodes with validation errors
const highlightNodesWithErrors = () => {
  const nodes = getNodes.value
  const validation = validateAllNodes()
  
  if (!validation.isValid) {
    // Update node styles to show validation errors
    nodes.forEach(node => {
      const nodeType = node.data.nodeType
      const nodeData = node.data
      let hasError = false
      
      // Check if this node has validation errors
      switch (nodeType) {
        case 'message':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.message_text || nodeData.message_text.trim() === ''
          break
        case 'llm':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.system_prompt || nodeData.system_prompt.trim() === ''
          break
        case 'condition':
          // Check if condition node is connected to an LLM node from above
          const edges = getEdges.value
          const incomingEdges = edges.filter(edge => edge.target === node.id)
          const isConnectedToLLM = incomingEdges.some(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source)
            return sourceNode?.data.nodeType === 'llm'
          })
          
          if (isConnectedToLLM) {
            // If connected to LLM, check that at least one LLM condition is selected
            const llmConditions = nodeData.llm_conditions || nodeData.config?.llm_conditions
            hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                      !llmConditions || (!llmConditions.user_frustrated && !llmConditions.request_human_agent && !llmConditions.no_knowledge)
          } else {
            // If not connected to LLM, check for condition expression
            hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                      !nodeData.condition_expression || nodeData.condition_expression.trim() === ''
          }
          break
        case 'form':
          const formFields = nodeData.form_fields || nodeData.config?.form_fields || []
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !formFields || formFields.length === 0 ||
                    formFields.some((field: any) => !field.name || field.name.trim() === '' || 
                                                   !field.label || field.label.trim() === '')
          break
        case 'action':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.action_type || nodeData.action_type.trim() === '' ||
                    !nodeData.action_url || nodeData.action_url.trim() === ''
          break
        case 'humanTransfer':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.transfer_department || nodeData.transfer_department.trim() === ''
          break
        case 'wait':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.wait_duration || nodeData.wait_duration < 1 ||
                    !nodeData.wait_unit || nodeData.wait_unit.trim() === ''
          break
        case 'landingPage':
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === '' || 
                    !nodeData.landing_page_heading || nodeData.landing_page_heading.trim() === '' ||
                    !nodeData.landing_page_content || nodeData.landing_page_content.trim() === ''
          break
        default:
          hasError = !nodeData.cleanName || nodeData.cleanName.trim() === ''
          break
      }
      
      // Update node style based on validation
      if (hasError) {
        node.style = {
          ...node.style,
          borderColor: '#EF4444',
          borderWidth: '2px',
          borderStyle: 'solid',
          boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.2)'
        }
      } else {
        // Reset to original style
        const nodeType = availableNodeTypes.find(t => t.type === node.data.nodeType)
        node.style = {
          backgroundColor: nodeType?.color || '#6B7280',
          color: 'white',
          borderColor: nodeType?.color || '#6B7280'
        }
      }
    })
  }
}

// Reset a specific node's validation styling
const resetNodeValidationStyle = (node: Node) => {
  const nodeType = availableNodeTypes.find(t => t.type === node.data.nodeType)
  node.style = {
    backgroundColor: nodeType?.color || '#6B7280',
    color: 'white',
    borderColor: nodeType?.color || '#6B7280'
  }
}

// Reset all nodes validation styling
const resetAllNodesValidationStyle = () => {
  const nodes = getNodes.value
  nodes.forEach(node => {
    resetNodeValidationStyle(node)
  })
}

// Save workflow
const saveWorkflow = async () => {
  const nodes = getNodes.value
  const edges = getEdges.value
  
  // Check if there are no nodes to save
  if (nodes.length === 0) {
    toast.info('Nothing to save - add some nodes first', {
      duration: 3000,
      closeButton: true,
      position: 'top-center'
    })
    return
  }
  
  // Validate connections between nodes
  if (nodes.length > 1 && edges.length === 0) {
    toast.error('Workflow must have connections between nodes. Please connect your nodes before saving.', {
      duration: 5000,
      closeButton: true,
      position: 'top-center'
    })
    return
  }
  
  // Advanced connection validation: Check for isolated nodes
  if (nodes.length > 1) {
    const connectedNodeIds = new Set<string>()
    
    // Collect all nodes that are connected (either as source or target)
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source)
      connectedNodeIds.add(edge.target)
    })
    
    // Find isolated nodes (nodes that are not connected to anything)
    const isolatedNodes = nodes.filter(node => !connectedNodeIds.has(node.id))
    
    if (isolatedNodes.length > 0) {
      const isolatedNodeNames = isolatedNodes.map(node => 
        node.data.cleanName || node.data.label || 'Unnamed node'
      ).join(', ')
      
      toast.error(`The following nodes are not connected to the workflow: ${isolatedNodeNames}. Please connect all nodes before saving.`, {
        duration: 6000,
        closeButton: true,
        position: 'top-center'
      })
      return
    }
  }
  
  // Validate all nodes before saving
  const validation = validateAllNodes()
  if (!validation.isValid) {
    highlightNodesWithErrors()
    toast.error('Please fix the following validation errors:\n' + validation.errors.join('\n'), {
      duration: 8000,
      closeButton: true,
      position: 'top-center'
    })
    return
  }

  try {
    loading.value = true
    
    // Helper function to clean node names - remove ALL emojis and icons
    const cleanNodeName = (label: string, nodeType: string) => {
      if (!label) return getCleanNodeTypeName(nodeType)
      
      // Remove all emojis and common icon characters
      let cleanName = label
        .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // Unicode emojis
        .replace(/[💬🤖🔀📝⚡👤⏱️🏁📄]/g, '') // Specific icons we use
        .replace(/^\s+|\s+$/g, '') // Trim whitespace
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      
      return cleanName || getCleanNodeTypeName(nodeType)
    }
    
    // Get clean node type name without icons
    const getCleanNodeTypeName = (nodeType: string) => {
      const typeNames = {
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
      return typeNames[nodeType as keyof typeof typeNames] || 'Node'
    }

    // Convert Vue Flow nodes to backend format
    const backendNodes = nodes.map(node => ({
      id: node.id,
      node_type: mapNodeTypeToBackend(node.data.nodeType || 'message'), // Map to backend enum value
      name: node.data.cleanName || cleanNodeName(node.data.label, node.data.nodeType || 'message'),
      description: node.data.description || '',
      position_x: node.position.x,
      position_y: node.position.y,
      config: node.data.config || {}
    }))

    // Convert Vue Flow edges to backend format
    const backendConnections = edges.map(edge => ({
      id: edge.id,
      source_node_id: edge.source,
      target_node_id: edge.target,
      source_handle: edge.sourceHandle || undefined,
      target_handle: edge.targetHandle || undefined,
      label: typeof edge.label === 'string' ? edge.label : undefined,
      condition: edge.data?.condition,
      priority: edge.data?.priority || 1,
      connection_metadata: edge.data?.metadata || {}
    }))

    const result = await workflowNodeService.updateWorkflowNodes(props.workflow.id, {
      nodes: backendNodes,
      connections: backendConnections
    })

    // Update the Vue Flow with the response data (which contains UUIDs)
    // This ensures the frontend is in sync with the backend
    const updatedNodes: Node[] = result.nodes.map((node: any) => {
      const frontendNodeType = mapNodeTypeToFrontend(node.node_type)
      const nodeType = availableNodeTypes.find(t => t.type === frontendNodeType)
      return {
        id: node.id,
        type: 'default',
        position: { x: node.position_x, y: node.position_y },
        data: {
          label: `${nodeType?.icon || '📄'} ${node.name}`, // Always show with icon
          cleanName: node.name, // Store clean name from backend
          description: node.description,
          config: node.config,
          nodeType: frontendNodeType,
          icon: nodeType?.icon || '📄',
          color: nodeType?.color || '#6B7280',
          // Store all backend properties directly in data for easy access
          message_text: node.config?.message_text,
          system_prompt: node.system_prompt,
          temperature: node.temperature,
          model_id: node.model_id,
          form_fields: node.form_fields,
          form_title: node.form_title,
          form_description: node.form_description,
          submit_button_text: node.submit_button_text,
          form_full_screen: node.form_full_screen,
          condition_expression: node.condition_expression,
          action_type: node.action_type,
          action_config: node.action_config,
          transfer_rules: node.transfer_rules,
          wait_duration: node.wait_duration,
          wait_until_condition: node.wait_until_condition,
          // Also spread config for backward compatibility
          ...node.config
        },
        style: {
          backgroundColor: nodeType?.color || '#6B7280',
          color: 'white',
          borderColor: nodeType?.color || '#6B7280'
        }
      }
    })

    const updatedEdges: Edge[] = result.connections.map((conn: any) => ({
      id: conn.id,
      source: conn.source_node_id,
      target: conn.target_node_id,
      sourceHandle: conn.source_handle,
      targetHandle: conn.target_handle,
      label: conn.label,
      animated: true,
      data: {
        condition: conn.condition,
        priority: conn.priority,
        metadata: conn.connection_metadata
      }
    }))

    // Replace current nodes and edges with the updated ones
    const currentNodes = getNodes.value
    const currentEdges = getEdges.value
    
    removeNodes(currentNodes.map(n => n.id))
    addNodes(updatedNodes)
    
    // Remove old edges and add new ones
    currentEdges.forEach(edge => {
      const edgeElement = document.querySelector(`[data-id="${edge.id}"]`)
      if (edgeElement) {
        edgeElement.remove()
      }
    })
    addEdges(updatedEdges)

    toast.success('Workflow saved successfully', {
      position: 'top-center'
    })
  } catch (error) {
    console.error('Error saving workflow:', error)
    toast.error('Failed to save workflow', {
      position: 'top-center'
    })
  } finally {
    loading.value = false
  }
}

// Handle connection creation
onConnect((params) => {
  const newEdge: Edge = {
    ...params,
    id: `${params.source}-${params.target}`,
    animated: true
  }
  addEdges([newEdge])
})

// Publish/Unpublish workflow
const publishWorkflow = async () => {
  try {
    publishLoading.value = true
    
    const nodes = getNodes.value
    const edges = getEdges.value
    
    // Validate connections before publishing
    if (nodes.length > 1 && edges.length === 0) {
      toast.error('Cannot publish workflow without connections between nodes. Please connect your nodes before publishing.', {
        duration: 5000,
        closeButton: true,
        position: 'top-center'
      })
      return
    }
    
    // Advanced connection validation: Check for isolated nodes
    if (nodes.length > 1) {
      const connectedNodeIds = new Set<string>()
      
      // Collect all nodes that are connected (either as source or target)
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source)
        connectedNodeIds.add(edge.target)
      })
      
      // Find isolated nodes (nodes that are not connected to anything)
      const isolatedNodes = nodes.filter(node => !connectedNodeIds.has(node.id))
      
      if (isolatedNodes.length > 0) {
        const isolatedNodeNames = isolatedNodes.map(node => 
          node.data.cleanName || node.data.label || 'Unnamed node'
        ).join(', ')
        
        toast.error(`Cannot publish workflow with isolated nodes: ${isolatedNodeNames}. Please connect all nodes before publishing.`, {
          duration: 6000,
          closeButton: true,
          position: 'top-center'
        })
        return
      }
    }
    
    // Validate before publishing
    const validation = validateAllNodes()
    if (!validation.isValid) {
      highlightNodesWithErrors()
      toast.error('Please fix validation errors before publishing:\n' + validation.errors.join('\n'), {
        duration: 8000,
        closeButton: true,
        position: 'top-center'
      })
      return
    }
    
    // First save the workflow to ensure all changes are persisted
    await saveWorkflow()
    
    // Then publish it
    const updatedWorkflow = await workflowService.publishWorkflow(props.workflow.id)
    workflowStatus.value = updatedWorkflow.status
    
    toast.success('Workflow published successfully! It\'s now live and ready to handle conversations.', {
      position: 'top-center'
    })
  } catch (error) {
    console.error('Error publishing workflow:', error)
    toast.error('Failed to publish workflow', {
      position: 'top-center'
    })
  } finally {
    publishLoading.value = false
  }
}

const unpublishWorkflow = async () => {
  try {
    publishLoading.value = true
    
    const updatedWorkflow = await workflowService.unpublishWorkflow(props.workflow.id)
    workflowStatus.value = updatedWorkflow.status
    
    toast.success('Workflow unpublished successfully! It\'s now in draft mode.', {
      position: 'top-center'
    })
  } catch (error) {
    console.error('Error unpublishing workflow:', error)
    toast.error('Failed to unpublish workflow', {
      position: 'top-center'
    })
  } finally {
    publishLoading.value = false
  }
}

// Close workflow builder
const closeBuilder = () => {
  // Clean up body class when closing
  document.body.classList.remove('workflow-properties-panel-open')
  emit('close')
}

// Load data on mount
onMounted(() => {
  loadWorkflowData()
})

// Handle nodes deletion - close properties panel if selected node is deleted
const handleNodesDelete = (deletedNodes: Node[]) => {
  console.log('handleNodesDelete called with:', deletedNodes)
  console.log('Current selectedNode:', selectedNode.value)
  
  // Check if the currently selected node was deleted
  if (selectedNode.value && deletedNodes.some(node => node.id === selectedNode.value?.id)) {
    console.log('Selected node was deleted, closing properties panel')
    closePropertiesPanel()
    toast.success('Node deleted', {
      position: 'top-center'
    })
  } else if (selectedNode.value) {
    console.log('Selected node was NOT in deleted list')
  } else {
    console.log('No selected node')
  }
}

// Handle nodes change (e.g., node added, moved, deleted)
const handleNodesChange = (changes: any) => {
  console.log('Nodes changed:', changes)
  // Check if any nodes were deleted
  const deletedChanges = changes.filter((change: any) => change.type === 'remove')
  if (deletedChanges.length > 0) {
    console.log('Node removal detected:', deletedChanges)
    // Extract node info from the changes
    const deletedNodes = deletedChanges.map((change: any) => ({ id: change.id }))
    handleNodesDelete(deletedNodes)
  }
}

// Handle delete event from Vue Flow
const handleDeleteEvent = (event: any) => {
  console.log('Vue Flow delete event:', event)
  // This might be triggered when nodes or edges are removed from the canvas.
  if (Array.isArray(event)) {
    // If event is an array of deleted items
    const deletedNodes = event.filter((item: any) => item.type === 'node' || !item.type)
    if (deletedNodes.length > 0) {
      handleNodesDelete(deletedNodes)
    }
  } else if (event.nodes) {
    // If event contains nodes property
    handleNodesDelete(event.nodes)
  } else if (event.id) {
    // If it's a single node deletion
    handleNodesDelete([event])
  }
}
</script>

<template>
  <div class="workflow-builder" :class="{ 'properties-panel-open': showPropertiesPanel }" @dragover.prevent @drop="handleDrop">
    <!-- Header -->
    <div class="builder-header">
      <div class="header-left">
        <h2 class="header-title">{{ workflow.name }}</h2>
        <span class="header-status" :class="{ 
          'status-published': isPublished, 
          'status-draft': isDraft 
        }">
          {{ isPublished ? 'Published' : 'Draft' }}
        </span>
      </div>
      <div class="header-actions">
        <button class="action-btn secondary" @click="closeBuilder">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Close
        </button>
        
        <!-- Publish/Unpublish button -->
        <button 
          v-if="isPublished" 
          class="action-btn warning" 
          @click="unpublishWorkflow" 
          :disabled="publishLoading"
        >
          <div v-if="publishLoading" class="btn-spinner"></div>
          <svg v-else class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          Unpublish
        </button>
        
        <button 
          v-else 
          class="action-btn success" 
          @click="publishWorkflow" 
          :disabled="!canPublish || publishLoading"
          :title="!hasNodes ? 'Add nodes to the workflow before publishing' : 
                  !hasValidConnections ? 'Connect all nodes before publishing' : 
                  'Publish workflow to make it live'"
        >
          <div v-if="publishLoading" class="btn-spinner"></div>
          <svg v-else class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
          Publish
        </button>
        
        <button class="action-btn primary" @click="saveWorkflow" :disabled="loading">
          <div v-if="loading" class="btn-spinner"></div>
          <svg v-else class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17,21 17,13 7,13 7,21"></polyline>
            <polyline points="7,3 7,8 15,8"></polyline>
          </svg>
          Save
        </button>
      </div>
    </div>

    <div class="builder-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>Node Types</h3>
          <p>Drag nodes to canvas</p>
        </div>
        
        <div class="node-types">
          <div
            v-for="nodeType in availableNodeTypes"
            :key="nodeType.type"
            class="node-type-item"
            draggable="true"
            @dragstart="handleDragStart($event, nodeType.type)"
          >
            <div class="node-type-icon" :style="{ backgroundColor: nodeType.color }">
              {{ nodeType.icon }}
            </div>
            <div class="node-type-content">
              <h4>{{ nodeType.label }}</h4>
              <p>{{ nodeType.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Canvas -->
      <div class="canvas-container">
        <div v-if="loading" class="canvas-loading">
          <div class="loading-spinner"></div>
          <p>Loading workflow...</p>
        </div>
        
        <VueFlow
          v-else
          :node-types="nodeTypes"
          class="workflow-canvas"
          :default-viewport="{ zoom: 1 }"
          :min-zoom="0.2"
          :max-zoom="4"
          @node-click="handleNodeClick"
          @nodes-delete="handleNodesDelete"
          @nodes-change="handleNodesChange"
          @delete="handleDeleteEvent"
          @nodes-remove="handleNodesDelete"
          @elements-remove="handleDeleteEvent"
        >
          <Background pattern-color="#aaa" :gap="16" />
          <Controls />
          <MiniMap />
          
          <!-- Empty state -->
          <div v-if="!hasNodes" class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>Start Building Your Workflow</h3>
            <p>Drag nodes from the sidebar to create your conversation flow</p>
            <div v-if="isPublished" class="empty-state-warning">
              <svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <p>This workflow is published but has no nodes. Add nodes to make it functional.</p>
            </div>
          </div>
        </VueFlow>
      </div>

      <!-- Properties Panel -->
      <PropertiesPanel
        v-if="showPropertiesPanel && selectedNode"
        :selected-node="selectedNode"
        :available-node-types="availableNodeTypes"
        :workflow-id="workflow.id"
        :agent-id="workflow.agent_id"
        :organization-id="workflow.organization_id"
        :current-edges="getEdges"
        :current-nodes="getNodes"
        @save="saveNodeProperties"
        @close="closePropertiesPanel"
        @delete="deleteSelectedNode"
      />
    </div>


  </div>
</template>

<style scoped>
.workflow-builder {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-color);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

/* Ensure toast positioning is centered and doesn't cover buttons */
.workflow-builder :deep([data-sonner-toaster]) {
  top: 80px !important;
}

.workflow-builder :deep([data-sonner-toaster][data-theme]) {
  top: 80px !important;
}

.workflow-builder :deep(.sonner-toaster) {
  top: 80px !important;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-color);
  background: var(--background-soft);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.header-status {
  padding: var(--space-xs) var(--space-sm);
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
}

.header-status.status-published {
  background: var(--success-color, #10B981);
}

.header-status.status-draft {
  background: var(--warning-color, #F59E0B);
}

.header-actions {
  display: flex;
  gap: var(--space-sm);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: var(--text-sm);
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: var(--primary-dark);
}

.action-btn.secondary {
  background: var(--background-muted);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  background: var(--background-alt);
  color: var(--text-color);
}

.action-btn.success {
  background: var(--success-color, #10B981);
  color: white;
}

.action-btn.success:hover:not(:disabled) {
  background: var(--success-dark, #059669);
}

.action-btn.warning {
  background: var(--warning-color, #F59E0B);
  color: white;
}

.action-btn.warning:hover:not(:disabled) {
  background: var(--warning-dark, #D97706);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.builder-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  background: var(--background-soft);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
  color: var(--text-color);
}

.sidebar-header p {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

.node-types {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
}

.node-type-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  cursor: grab;
  transition: all 0.2s ease;
  margin-bottom: var(--space-sm);
  background: var(--background-color);
  border: 1px solid var(--border-color);
}

.node-type-item:hover {
  background: var(--background-alt);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.node-type-item:active {
  cursor: grabbing;
}

.node-type-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;
}

.node-type-content {
  flex: 1;
  min-width: 0;
}

.node-type-content h4 {
  font-size: var(--text-sm);
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
  color: var(--text-color);
}

.node-type-content p {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.3;
}

.canvas-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.canvas-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-md);
}

.workflow-canvas {
  width: 100%;
  height: 100%;
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--space-md);
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 var(--space-sm) 0;
}

.empty-state p {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

.empty-state-warning {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background: var(--warning-soft, #FEF3C7);
  border: 1px solid var(--warning-color, #F59E0B);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  max-width: 400px;
}

.warning-icon {
  width: 20px;
  height: 20px;
  color: var(--warning-color, #F59E0B);
  flex-shrink: 0;
}

.empty-state-warning p {
  color: var(--warning-dark, #92400E);
  font-size: var(--text-sm);
  margin: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Vue Flow Styles */
:deep(.vue-flow__node) {
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  background: var(--background-color);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
  min-width: 120px;
}

:deep(.vue-flow__node:hover) {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

:deep(.vue-flow__node.selected) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-soft);
}

:deep(.vue-flow__node-default) {
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  min-width: 120px;
  text-align: center;
}

:deep(.vue-flow__node-default .vue-flow__node-label) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}

:deep(.vue-flow__node-default .node-icon) {
  font-size: 1.2rem;
  margin-bottom: var(--space-xs);
}

:deep(.vue-flow__node-default .node-label) {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-color);
}

:deep(.vue-flow__edge) {
  stroke: var(--border-color);
  stroke-width: 2px;
}

:deep(.vue-flow__edge.selected) {
  stroke: var(--primary-color);
}

:deep(.vue-flow__edge.animated) {
  stroke-dasharray: 5;
  animation: dashdraw 0.5s linear infinite;
}

@keyframes dashdraw {
  to {
    stroke-dashoffset: -10;
  }
}

:deep(.vue-flow__controls) {
  bottom: var(--space-md);
  left: var(--space-md);
}

:deep(.vue-flow__minimap) {
  bottom: var(--space-md);
  right: var(--space-md);
}

</style> 