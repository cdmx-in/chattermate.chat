import type { Agent } from '@/types/agent'
import type { UserGroup } from '@/types/user'

const STORAGE_KEYS = {
  ACTIVE_AGENT: 'active_agent',
  AGENTS: 'agents',
} as const

export const agentStorage = {
  // Store all agents
  setAgents(agents: Agent[]): void {
    localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents))
  },

  // Get all agents
  getAgents(): Agent[] {
    const stored = localStorage.getItem(STORAGE_KEYS.AGENTS)
    if (!stored) return []
    try {
      return JSON.parse(stored) as Agent[]
    } catch (e) {
      console.error('Failed to parse stored agents:', e)
      return []
    }
  },
  setAgent(agent: Agent): void {
    const agents = this.getAgents()
    const index = agents.findIndex((a) => a.id === agent.id)
    if (index !== -1) {
      agents[index] = agent
    }
  },

  // Update specific agent
  updateAgent(updatedAgent: Agent): void {
    const agents = this.getAgents()
    const index = agents.findIndex((a) => a.id === updatedAgent.id)
    if (index !== -1) {
      agents[index] = updatedAgent
      this.setAgents(agents)
    }
  },



  // Update agent knowledge
  updateAgentKnowledge(agentId: string, knowledge: Agent['knowledge']): void {
    const agents = this.getAgents()
    const index = agents.findIndex((a) => a.id === agentId)
    if (index !== -1) {
      agents[index] = {
        ...agents[index],
        knowledge: knowledge,
      }
      this.setAgents(agents)

      // Update active agent if it's the same one
      const activeAgent = this.getActiveAgent()
      if (activeAgent && activeAgent.id === agentId) {
        this.setActiveAgent(agents[index])
      }
    }
  },

  // Get active agent
  getActiveAgent(): Agent | null {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_AGENT)
    if (!stored) return null
    try {
      return JSON.parse(stored) as Agent
    } catch (e) {
      console.error('Failed to parse active agent:', e)
      return null
    }
  },

  // Set active agent
  setActiveAgent(agent: Agent): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_AGENT, JSON.stringify(agent))
  },

  // Clear all stored agent data
  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_AGENT)
    localStorage.removeItem(STORAGE_KEYS.AGENTS)
  },
}

// Workflow cache storage
export const workflowCacheStorage = {
  // Generate cache key for a workflow
  getCacheKey(workflowId: string): string {
    return `workflow_info_${workflowId}`
  },

  // Get workflow cache for a specific workflow
  getWorkflowCache(workflowId: string): any {
    const stored = localStorage.getItem(this.getCacheKey(workflowId))
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse workflow cache:', e)
      return null
    }
  },

  // Set workflow cache for a specific workflow
  setWorkflowCache(workflowId: string, data: any): void {
    const cacheData = {
      ...data,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(this.getCacheKey(workflowId), JSON.stringify(cacheData))
  },

  // Clear specific workflow cache
  clearWorkflowCache(workflowId: string): void {
    localStorage.removeItem(this.getCacheKey(workflowId))
  },

  // Clear all workflow caches (for cleanup)
  clearAllWorkflowCache(): void {
    // Find and remove all workflow cache keys
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('workflow_info_')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  },

  // Update a single node in the cache
  updateNodeInCache(workflowId: string, node: any): void {
    const cache = this.getWorkflowCache(workflowId)
    if (!cache) return

    const nodeIndex = cache.nodes.findIndex((n: any) => n.id === node.id)
    if (nodeIndex !== -1) {
      cache.nodes[nodeIndex] = node
    } else {
      cache.nodes.push(node)
    }
    
    this.setWorkflowCache(workflowId, cache)
  },

  // Remove a node from the cache
  removeNodeFromCache(workflowId: string, nodeId: string): void {
    const cache = this.getWorkflowCache(workflowId)
    if (!cache) return
    console.log('Removing node from cache:', nodeId)
    
    cache.nodes = cache.nodes.filter((n: any) => n.id !== nodeId)
    // Also remove any connections involving this node
    cache.connections = cache.connections.filter((c: any) => 
      c.source_node_id !== nodeId && c.target_node_id !== nodeId
    )
    
    this.setWorkflowCache(workflowId, cache)
  },

  // Add a connection to the cache
  addConnectionToCache(workflowId: string, connection: any): void {
    const cache = this.getWorkflowCache(workflowId)
    if (!cache) return

    const existingIndex = cache.connections.findIndex((c: any) => c.id === connection.id)
    if (existingIndex !== -1) {
      cache.connections[existingIndex] = connection
    } else {
      cache.connections.push(connection)
    }
    
    this.setWorkflowCache(workflowId, cache)
  },

  // Remove a connection from the cache
  removeConnectionFromCache(workflowId: string, connectionId: string): void {
    const cache = this.getWorkflowCache(workflowId)
    if (!cache) return

    cache.connections = cache.connections.filter((c: any) => c.id !== connectionId)
    this.setWorkflowCache(workflowId, cache)
  }
}

// Create a composable for agent storage
export function useAgentStorage() {
  return {
    ...agentStorage,
  }
}

// Create a composable for workflow cache storage
export function useWorkflowCacheStorage() {
  return {
    ...workflowCacheStorage,
  }
}
