/**
 * ChatterMate - Workflow Node Service
 * Copyright (C) 2024 ChatterMate
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>
 */

import api from './api'
import type { WorkflowNodesResponse, WorkflowNode, WorkflowConnection } from '@/types/workflow'

export const workflowNodeService = {
  /**
   * Get all nodes and connections for a workflow
   */
  async getWorkflowNodes(workflowId: string): Promise<WorkflowNodesResponse> {
    const response = await api.get(`/workflow/${workflowId}/nodes`)
    return response.data
  },

  /**
   * Create a new workflow node
   */
  async createWorkflowNode(workflowId: string, nodeData: Partial<WorkflowNode>): Promise<WorkflowNode> {
    const response = await api.post(`/workflow/${workflowId}/nodes`, nodeData)
    return response.data
  },

  /**
   * Update a workflow node
   */
  async updateWorkflowNode(workflowId: string, nodeId: string, nodeData: Partial<WorkflowNode>): Promise<WorkflowNode> {
    const response = await api.put(`/workflow/${workflowId}/nodes/${nodeId}`, nodeData)
    return response.data
  },

  /**
   * Delete a workflow node
   */
  async deleteWorkflowNode(workflowId: string, nodeId: string): Promise<void> {
    await api.delete(`/workflow/${workflowId}/nodes/${nodeId}`)
  },

  /**
   * Update multiple workflow nodes and connections
   */
  async updateWorkflowNodes(workflowId: string, data: {
    nodes: Partial<WorkflowNode>[]
    connections: Partial<WorkflowConnection>[]
  }): Promise<WorkflowNodesResponse> {
    const response = await api.put(`/workflow/${workflowId}/nodes`, data)
    return response.data
  },

  /**
   * Update a single workflow node with its properties and variables
   */
  async updateSingleNodeWithVariables(workflowId: string, nodeId: string, data: {
    node_data: any
    variables_data?: any[]
  }): Promise<{
    node: WorkflowNode
    variables: any[]
    updated_variables_count?: number
  }> {
    const response = await api.put(`/workflow/${workflowId}/nodes/${nodeId}`, data)
    return response.data
  },

  /**
   * Get a single workflow node with its variables
   */
  async getNodeWithVariables(workflowId: string, nodeId: string): Promise<{
    node: WorkflowNode
    variables: any[]
  }> {
    const response = await api.get(`/workflow/${workflowId}/nodes/${nodeId}`)
    return response.data
  },

  /**
   * Create a workflow connection
   */
  async createWorkflowConnection(workflowId: string, connectionData: Partial<WorkflowConnection>): Promise<WorkflowConnection> {
    const response = await api.post(`/workflow/${workflowId}/connections`, connectionData)
    return response.data
  },

  /**
   * Update a workflow connection
   */
  async updateWorkflowConnection(workflowId: string, connectionId: string, connectionData: Partial<WorkflowConnection>): Promise<WorkflowConnection> {
    const response = await api.put(`/workflow/${workflowId}/connections/${connectionId}`, connectionData)
    return response.data
  },

  /**
   * Delete a workflow connection
   */
  async deleteWorkflowConnection(workflowId: string, connectionId: string): Promise<void> {
    await api.delete(`/workflow/${workflowId}/connections/${connectionId}`)
  }
} 