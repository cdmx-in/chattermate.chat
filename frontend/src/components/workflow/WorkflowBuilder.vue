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
import type { WorkflowResponse } from '@/types/workflow'
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
  {
    type: 'action',
    label: 'Action',
    icon: '⚡',
    description: 'Trigger external actions or API calls',
    color: '#EF4444'
  },
  {
    type: 'humanTransfer',
    label: 'Human Transfer',
    icon: '👤',
    description: 'Transfer conversation to human agent',
    color: '#F97316'
  },
  {
    type: 'wait',
    label: 'Wait',
    icon: '⏱️',
    description: 'Pause execution for time-based triggers',
    color: '#6B7280'
  },
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

// Helper function to generate UUID-like IDs
const generateNodeId = (type: string) => {
  return `${type}-${nodeIdCounter.value++}`
}

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

// Computed properties
const hasNodes = computed(() => getNodes.value.length > 0)

// Load workflow data
const loadWorkflowData = async () => {
  try {
    loading.value = true
    const data = await workflowNodeService.getWorkflowNodes(props.workflow.id)
    
    // Convert backend nodes to Vue Flow nodes
    const nodes: Node[] = data.nodes.map((node: any) => {
      const nodeType = availableNodeTypes.find(t => t.type === node.node_type)
      return {
        id: node.id,
        type: 'default', // Use default Vue Flow node type
        position: { x: node.position_x, y: node.position_y },
        data: {
          label: `${nodeType?.icon || '📄'} ${node.name}`, // Always show with icon
          cleanName: node.name, // Store clean name from backend
          description: node.description,
          config: node.config,
          nodeType: node.node_type, // Store the original type
          icon: nodeType?.icon || '📄',
          color: nodeType?.color || '#6B7280',
          // Store all backend properties directly in data for easy access
          message_text: node.message_text,
          system_prompt: node.system_prompt,
          temperature: node.temperature,
          model_id: node.model_id,
          form_fields: node.form_fields,
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
      toast.error('Failed to load workflow data')
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
}

// Handle properties panel close
const closePropertiesPanel = () => {
  showPropertiesPanel.value = false
  selectedNode.value = null
}

// Handle node property save
const saveNodeProperties = (properties: any) => {
  if (selectedNode.value) {
    // If we have an updated node from the API, use that data
    if (properties.updatedNode) {
      const updatedNode = properties.updatedNode
      const nodeType = availableNodeTypes.find(t => t.type === updatedNode.node_type)
      
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
        wait_until_condition: updatedNode.wait_until_condition
      }
      
      // Update position if it changed
      if (updatedNode.position_x !== undefined && updatedNode.position_y !== undefined) {
        selectedNode.value.position.x = updatedNode.position_x
        selectedNode.value.position.y = updatedNode.position_y
      }
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
          })
        }
      }
      
      // Update the label to include the new name with icon
      const nodeType = availableNodeTypes.find(t => t.type === selectedNode.value?.data.nodeType)
      selectedNode.value.data.label = `${nodeType?.icon || '📄'} ${properties.name}`
    }
  }
  closePropertiesPanel()
}

// Handle node deletion
const deleteSelectedNode = () => {
  if (selectedNode.value) {
    removeNodes([selectedNode.value.id])
    toast.success('Node deleted')
    closePropertiesPanel()
  }
}

// Save workflow
const saveWorkflow = async () => {
  const nodes = getNodes.value
  const edges = getEdges.value
  
  // Check if there are no nodes to save
  if (nodes.length === 0) {
    toast.info('Nothing to save - add some nodes first', {
      duration: 3000,
      closeButton: true
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
      node_type: node.data.nodeType || 'message', // Use the stored original type
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
      const nodeType = availableNodeTypes.find(t => t.type === node.node_type)
      return {
        id: node.id,
        type: 'default',
        position: { x: node.position_x, y: node.position_y },
        data: {
          label: `${nodeType?.icon || '📄'} ${node.name}`, // Always show with icon
          cleanName: node.name, // Store clean name from backend
          description: node.description,
          config: node.config,
          nodeType: node.node_type,
          icon: nodeType?.icon || '📄',
          color: nodeType?.color || '#6B7280',
          // Store all backend properties directly in data for easy access
          message_text: node.message_text,
          system_prompt: node.system_prompt,
          temperature: node.temperature,
          model_id: node.model_id,
          form_fields: node.form_fields,
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

    toast.success('Workflow saved successfully')
  } catch (error) {
    console.error('Error saving workflow:', error)
    toast.error('Failed to save workflow')
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

// Close workflow builder
const closeBuilder = () => {
  emit('close')
}

// Load data on mount
onMounted(() => {
  loadWorkflowData()
})
</script>

<template>
  <div class="workflow-builder" @dragover.prevent @drop="handleDrop">
    <!-- Header -->
    <div class="builder-header">
      <div class="header-left">
        <h2 class="header-title">{{ workflow.name }}</h2>
        <span class="header-status">Workflow Builder</span>
      </div>
      <div class="header-actions">
        <button class="action-btn secondary" @click="closeBuilder">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Close
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
        >
          <Background pattern-color="#aaa" :gap="16" />
          <Controls />
          <MiniMap />
          
          <!-- Empty state -->
          <div v-if="!hasNodes" class="empty-state">
            <div class="empty-icon">🎯</div>
            <h3>Start Building Your Workflow</h3>
            <p>Drag nodes from the sidebar to create your conversation flow</p>
          </div>
        </VueFlow>
      </div>

      <!-- Properties Panel -->
      <PropertiesPanel
        v-if="showPropertiesPanel && selectedNode"
        :selected-node="selectedNode"
        :available-node-types="availableNodeTypes"
        :workflow-id="workflow.id"
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