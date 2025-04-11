<!--
ChatterMate - Agent Integrations Tab
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
import { computed, ref, watch, onMounted } from 'vue'
import { checkShopifyConnection } from '@/services/shopify'

interface JiraProject {
  id: string;
  key: string;
  name: string;
}

interface JiraIssueType {
  id: string;
  name: string;
  description?: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
}

const props = defineProps({
  // Jira props
  jiraConnected: {
    type: Boolean,
    required: true
  },
  jiraLoading: {
    type: Boolean,
    required: true
  },
  createTicketEnabled: {
    type: Boolean,
    required: true
  },
  jiraProjects: {
    type: Array as () => JiraProject[],
    required: true
  },
  jiraIssueTypes: {
    type: Array as () => JiraIssueType[],
    required: true
  },
  selectedProject: {
    type: String,
    required: true
  },
  selectedIssueType: {
    type: String,
    required: true
  },
  loadingProjects: {
    type: Boolean,
    required: true
  },
  loadingIssueTypes: {
    type: Boolean,
    required: true
  },
  // Shopify props
  shopifyIntegrationEnabled: {
    type: Boolean,
    default: false
  }
})

// Local state for Shopify connection
const shopifyConnected = ref(false)
const shopifyShopDomain = ref('')
const shopifyLoading = ref(true)

const emit = defineEmits([
  'toggle-create-ticket',
  'handle-project-change',
  'handle-issue-type-change',
  'save-jira-config',
  'toggle-shopify-integration',
  'save-shopify-config'
])

// Create local copies of the props
const localSelectedProject = ref(props.selectedProject)
const localSelectedIssueType = ref(props.selectedIssueType)

// Watch for changes in the props to update the local copies
watch(() => props.selectedProject, (newValue) => {
  localSelectedProject.value = newValue
})

watch(() => props.selectedIssueType, (newValue) => {
  localSelectedIssueType.value = newValue
})

const ticketReasons = [
  "Issues without immediate resolution",
  "No transfer agent available",
  "Transfer requests not attended",
  "Customer follow-ups",
  "Complex issues requiring tracking"
]

const ticketTooltipContent = computed(() => {
  return `Create tickets when:\n${ticketReasons.map(reason => `• ${reason}`).join('\n')}`
})

const shopifyReasons = [
  "Display product information",
  "Answer product-specific questions",
  "Handle product recommendations",
  "Check stock availability",
  "Process product inquiries"
]

const shopifyTooltipContent = computed(() => {
  return `Enable Shopify features for:\n${shopifyReasons.map(reason => `• ${reason}`).join('\n')}`
})

const toggleCreateTicket = () => {
  emit('toggle-create-ticket')
}

const toggleShopifyIntegration = () => {
  emit('toggle-shopify-integration')
}

const handleProjectChange = () => {
  emit('handle-project-change', localSelectedProject.value)
}

const handleIssueTypeChange = () => {
  emit('handle-issue-type-change', localSelectedIssueType.value)
}

const saveJiraConfig = () => {
  emit('save-jira-config', {
    projectKey: localSelectedProject.value,
    issueTypeId: localSelectedIssueType.value
  })
}

const saveShopifyConfig = () => {
  emit('save-shopify-config')
}

// Fetch Shopify connection status
const fetchShopifyStatus = async () => {
  try {
    shopifyLoading.value = true
    const data = await checkShopifyConnection()
    shopifyConnected.value = data.connected
    shopifyShopDomain.value = data.shop_domain || ''
    console.log('Shopify connection status:', data)
  } catch (error) {
    console.error('Error checking Shopify connection:', error)
    shopifyConnected.value = false
  } finally {
    shopifyLoading.value = false
  }
}

// Fetch connection status on component mount
onMounted(async () => {
  await fetchShopifyStatus()
})
</script>

<template>
  <section class="detail-section">
    <h4>Integrations</h4>
    
    <!-- Jira Integration -->
    <div class="integration-section">
      <h5 class="integration-title">Jira Integration</h5>
      <!-- Jira Ticket Creation Toggle -->
      <div class="ticket-toggle">
        <div class="toggle-header">
          <h4>Create Jira Tickets</h4>
          <label class="switch" v-tooltip="ticketTooltipContent">
            <input type="checkbox" 
              :checked="createTicketEnabled"
              @change="toggleCreateTicket"
            >
            <span class="slider"></span>
          </label>
        </div>
        <p class="helper-text">Create Jira tickets for issues that need further attention</p>
        
        <!-- Jira Connection Status -->
        <div v-if="jiraLoading" class="jira-status loading">
          Checking Jira connection...
        </div>
        <div v-else-if="!jiraConnected" class="jira-status not-connected">
          <span class="status-icon">⚠️</span>
          Jira is not connected
          <router-link to="/settings/integrations" class="connect-link">
            Connect Jira
          </router-link>
        </div>
        <div v-else class="jira-status connected">
          <span class="status-icon">✓</span>
          Jira is connected
        </div>
        
        <!-- Jira Project Selection -->
        <div v-if="createTicketEnabled && jiraConnected" class="jira-config">
          <div class="form-group">
            <label for="jira-project">Jira Project</label>
            <div v-if="loadingProjects" class="loading-indicator">Loading projects...</div>
            <select 
              v-else
              id="jira-project" 
              v-model="localSelectedProject"
              @change="handleProjectChange"
              :disabled="loadingProjects"
            >
              <option value="">Select a project</option>
              <option 
                v-for="project in jiraProjects" 
                :key="project.id" 
                :value="project.key"
              >
                {{ project.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="issue-type">Issue Type</label>
            <div v-if="loadingIssueTypes" class="loading-indicator">Loading issue types...</div>
            <select 
              v-else
              id="issue-type" 
              v-model="localSelectedIssueType"
              @change="handleIssueTypeChange"
              :disabled="!localSelectedProject || loadingIssueTypes"
            >
              <option value="">Select an issue type</option>
              <option 
                v-for="issueType in jiraIssueTypes" 
                :key="issueType.id" 
                :value="issueType.id"
              >
                {{ issueType.name }}
              </option>
            </select>
          </div>
          
          <button 
            class="save-config-btn"
            @click="saveJiraConfig"
            :disabled="!localSelectedProject || !localSelectedIssueType"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
    
    <!-- Shopify Integration -->
    <div class="integration-section">
      <h5 class="integration-title">Shopify Integration</h5>
      <div class="ticket-toggle">
        <div class="toggle-header">
          <h4>Enable Shopify Features</h4>
          <label class="switch" v-tooltip="shopifyTooltipContent">
            <input type="checkbox" 
              :checked="shopifyIntegrationEnabled"
              @change="toggleShopifyIntegration"
            >
            <span class="slider"></span>
          </label>
        </div>
        <p class="helper-text">Enable Shopify product information and features for this agent</p>
        
        <!-- Shopify Connection Status -->
        <div v-if="shopifyLoading" class="jira-status loading">
          Checking Shopify connection...
        </div>
        <div v-else-if="!shopifyConnected" class="jira-status not-connected">
          <span class="status-icon">⚠️</span>
          Shopify is not connected
          <router-link to="/settings/integrations" class="connect-link">
            Connect Shopify
          </router-link>
        </div>
        <div v-else class="jira-status connected">
          <span class="status-icon">✓</span>
          Connected to {{ shopifyShopDomain }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail-section {
  margin-bottom: var(--space-xl);
}

.detail-section h4 {
  margin-bottom: var(--space-md);
  color: var(--text-muted);
}

.integration-section {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  background-color: var(--background-soft);
  margin-bottom: var(--space-lg);
}

.integration-title {
  margin-bottom: var(--space-sm);
  color: var(--text-secondary);
  font-size: var(--text-md);
  font-weight: 600;
}

.ticket-toggle {
  margin-top: var(--space-sm);
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
  background-color: rgb(252, 0, 0);
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
}

input:checked + .slider {
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.jira-status {
  margin-top: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.jira-status.loading {
  background-color: var(--background-mute);
  color: var(--text-muted);
}

.jira-status.connected {
  background-color: var(--success-light);
  color: var(--success);
}

.jira-status.not-connected {
  background-color: var(--warning-light);
  color: var(--warning);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.connect-link {
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--primary-soft);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.connect-link:hover {
  background-color: var(--primary-color);
  color: white;
}

.jira-config {
  margin-top: var(--space-md);
  padding: var(--space-md);
  background-color: var(--background-soft);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.shopify-info {
  background-color: var(--background-soft);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-color);
}

.shopify-info p {
  margin-bottom: var(--space-xs);
  font-size: var(--text-sm);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-muted);
}

.form-group select {
  padding: var(--space-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: var(--text-sm);
}

.form-group select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-indicator {
  font-size: var(--text-sm);
  color: var(--text-muted);
  padding: var(--space-sm);
}

.save-config-btn {
  margin-top: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.save-config-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.save-config-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  filter: grayscale(0.5);
}
</style> 