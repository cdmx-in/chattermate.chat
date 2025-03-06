<!--
ChatterMate - Integrations Settings
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
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { checkJiraConnection, getJiraAuthUrl, disconnectJira } from '@/services/jira'

// Import logos
import jiraLogo from '@/assets/jira-logo.svg'
import slackLogo from '@/assets/slack-logo.svg'
import zendeskLogo from '@/assets/zendesk-logo.svg'

const route = useRoute()

const jiraConnected = ref(false)
const jiraSiteUrl = ref('')
const isLoading = ref(true)

// Check if Jira is connected
const fetchJiraStatus = async () => {
  try {
    isLoading.value = true
    const data = await checkJiraConnection()
    jiraConnected.value = data.connected
    jiraSiteUrl.value = data.site_url || ''
  } catch (error) {
    console.error('Error checking Jira connection:', error)
    jiraConnected.value = false
  } finally {
    isLoading.value = false
  }
}

// Connect to Jira
const connectJira = () => {
  try {
    window.location.href = getJiraAuthUrl()
  } catch (error) {
    console.error('Error connecting to Jira:', error)
    toast.error('Error connecting to Jira')
  }
}

// Disconnect from Jira
const handleDisconnectJira = async () => {
  try {
    isLoading.value = true
    await disconnectJira()
    jiraConnected.value = false
    jiraSiteUrl.value = ''
    toast.success('Jira disconnected successfully')
  } catch (error) {
    console.error('Error disconnecting from Jira:', error)
    toast.error('Error disconnecting from Jira')
  } finally {
    isLoading.value = false
  }
}

// List of available integrations
const availableIntegrations = computed(() => [
  {
    id: 'jira',
    name: 'Jira',
    description: 'Connect to Jira to create issues directly from ChatterMate.',
    logo: jiraLogo,
    connected: jiraConnected.value,
    siteUrl: jiraSiteUrl.value,
    isLoading: isLoading.value,
    connectAction: connectJira,
    disconnectAction: handleDisconnectJira
  },
  // Future integrations
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect to Slack to send notifications and interact with channels.',
    logo: slackLogo,
    connected: false,
    comingSoon: true
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Connect to Zendesk to manage customer support tickets.',
    logo: zendeskLogo,
    connected: false,
    comingSoon: true
  }
])

onMounted(async () => {
  await fetchJiraStatus()
  
  // Check if we're returning from a successful OAuth flow
  if (route.query.status === 'success') {
    toast.success('Jira connected successfully!')
    // Remove the query parameter to avoid showing the toast on refresh
    window.history.replaceState({}, document.title, window.location.pathname)
  }
})
</script>

<template>
  <DashboardLayout>
    <div class="integrations-settings">
      <div class="page-header">
        <h1 class="page-title">Integrations</h1>
        <p class="page-description">
          Connect ChatterMate with your favorite tools and services to enhance your workflow.
        </p>
      </div>
      
      <div class="settings-section">
        <div class="section-header">
          <h2>Available Integrations</h2>
          <p>Connect ChatterMate with your favorite tools and services.</p>
        </div>
        
        <div class="integration-cards">
          <!-- Dynamic Integration Cards -->
          <div 
            v-for="integration in availableIntegrations" 
            :key="integration.id"
            class="integration-card"
            :class="{ 'coming-soon': integration.comingSoon }"
          >
            <div class="integration-header">
              <img 
                v-if="integration.logo" 
                :src="integration.logo" 
                :alt="`${integration.name} Logo`" 
                class="integration-logo" 
              />
              <div v-else class="integration-logo placeholder">
                <span>{{ integration.name.charAt(0) }}</span>
              </div>
              <div class="integration-info">
                <h3>{{ integration.name }}</h3>
                <p>{{ integration.description }}</p>
              </div>
            </div>
            
            <div class="integration-status">
              <!-- Jira specific loading state -->
              <span v-if="integration.id === 'jira' && integration.isLoading" class="loading-indicator">
                <span class="loading-spinner"></span>
                Loading...
              </span>
              <template v-else>
                <!-- Connected status for Jira -->
                <div v-if="integration.id === 'jira' && integration.connected" class="connected-info">
                  <span class="status-badge connected">
                    <span class="status-icon">✓</span>
                    Connected
                  </span>
                  <a v-if="integration.siteUrl" :href="integration.siteUrl" target="_blank" class="site-link">
                    <span class="link-icon">↗</span>
                    Visit {{ integration.name }} Site
                  </a>
                </div>
                <!-- Not connected status for Jira -->
                <span v-else-if="integration.id === 'jira'" class="status-badge not-connected">
                  Not Connected
                </span>
                <!-- Coming soon status -->
                <span v-else-if="integration.comingSoon" class="status-badge coming-soon">
                  Coming Soon
                </span>
              </template>
            </div>
            
            <div class="integration-actions">
              <!-- Jira connect/disconnect buttons -->
              <template v-if="integration.id === 'jira'">
                <button 
                  v-if="!integration.connected" 
                  @click="integration.connectAction" 
                  class="btn btn-primary"
                  :disabled="integration.isLoading"
                >
                  <span class="btn-icon">+</span>
                  Connect
                </button>
                <button 
                  v-else 
                  @click="integration.disconnectAction" 
                  class="btn btn-danger"
                  :disabled="integration.isLoading"
                >
                  <span class="btn-icon">×</span>
                  Disconnect
                </button>
              </template>
              <!-- Coming soon button -->
              <button 
                v-else-if="integration.comingSoon" 
                class="btn btn-coming-soon" 
                disabled
              >
                <span class="btn-icon">⏳</span>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
:root {
  --primary-color-rgb: 59, 130, 246; /* This is a typical blue color in RGB format */
}

.integrations-settings {
  padding: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--space-xl);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.page-description {
  color: var(--text-muted);
  font-size: var(--text-md);
}

.settings-section {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--border-color);
}

.section-header h2 {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.section-header p {
  color: var(--text-muted);
}

.integration-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-lg);
}

.integration-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  background-color: white;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.integration-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.integration-card.coming-soon {
  opacity: 0.7;
  background-color: var(--background-soft);
}

.integration-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.integration-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.integration-logo.placeholder {
  background-color: var(--background-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xl);
  font-weight: bold;
  color: var(--text-muted);
}

.integration-info h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.integration-info p {
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: 1.5;
}

.integration-status {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.loading-indicator {
  color: var(--text-muted);
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.connected-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.site-link {
  font-size: var(--text-sm);
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  transition: all 0.2s;
  margin-top: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  background-color: #f0f7ff; /* Light blue background */
  width: fit-content;
}

.site-link:hover {
  color: var(--primary-dark);
  background-color: #e0f0ff; /* Slightly darker blue on hover */
  transform: translateY(-1px);
}

.link-icon {
  font-size: 12px;
}

.status-badge {
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.status-icon {
  font-size: 10px;
}

.status-badge.connected {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.status-badge.not-connected {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.status-badge.coming-soon {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: white;
}

.integration-actions {
  margin-top: auto;
  padding-top: var(--space-md);
}

.btn {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-full);
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all var(--transition-fast);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  height: 38px;
}

.btn-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: var(--danger-dark);
  transform: translateY(-1px);
}

.btn-coming-soon {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: white;
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-disabled {
  background-color: var(--background-mute);
  color: var(--text-muted);
  cursor: not-allowed;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .integration-cards {
    grid-template-columns: 1fr;
  }
  
  .integrations-settings {
    padding: var(--space-md);
  }
}
</style> 