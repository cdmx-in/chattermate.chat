<template>
  <div class="shopify-selection-container">
    <div class="shopify-selection-card">
      <!-- Header -->
      <div class="header">
        <h1>Connect Shopify to Your AI Agents</h1>
        <p class="subtitle">Select which AI agents should have access to your Shopify store data</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Loading your AI agents...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p class="error-message">{{ error }}</p>
        <button @click="loadAgents" class="btn-secondary">Try Again</button>
      </div>

      <!-- Agent Selection -->
      <div v-else-if="agents.length > 0" class="agent-selection">
        <div class="selection-header">
          <h2>Select AI Agents</h2>
          <button @click="toggleSelectAll" class="btn-text">
            {{ allSelected ? 'Deselect All' : 'Select All' }}
          </button>
        </div>

        <div class="agent-list">
          <div
            v-for="agent in agents"
            :key="agent.id"
            class="agent-item"
            :class="{ selected: selectedAgents.includes(agent.id) }"
          >
            <label class="agent-item-label">
              <div class="agent-checkbox">
                <input
                  type="checkbox"
                  :checked="selectedAgents.includes(agent.id)"
                  @change="toggleAgent(agent.id)"
                />
              </div>
              <div class="agent-info">
                <h3>{{ agent.display_name || agent.name }}</h3>
                <p v-if="agent.description">{{ agent.description }}</p>
                <div class="agent-meta">
                  <span class="badge" :class="{ 'active': agent.is_active }">
                    {{ agent.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Info Box -->
        <div class="info-box">
          <div class="info-icon">ℹ️</div>
          <div class="info-content">
            <strong>What will selected agents be able to do?</strong>
            <ul>
              <li>Search and display products from your Shopify store</li>
              <li>Check order status and tracking information</li>
              <li>Provide product recommendations</li>
              <li>Answer customer questions about products and orders</li>
            </ul>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button
            @click="cancelInstallation"
            class="btn-secondary"
            :disabled="saving"
          >
            Cancel
          </button>
          <button
            @click="saveConfiguration"
            class="btn-primary"
            :disabled="selectedAgents.length === 0 || saving"
          >
            <div v-if="saving" class="btn-spinner"></div>
            <span v-if="saving">Connecting...</span>
            <span v-else>
              Connect {{ selectedAgents.length }} Agent{{ selectedAgents.length !== 1 ? 's' : '' }}
            </span>
          </button>
        </div>
      </div>

      <!-- No Agents State -->
      <div v-else class="empty-state">
        <div class="empty-icon">🤖</div>
        <h2>No AI Agents Found</h2>
        <p>You need to create at least one AI agent before connecting Shopify.</p>
        <button @click="goToAgents" class="btn-primary">Create AI Agent</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { agentService } from '@/services/agent'
import { enableShopifyForAgents, getShopAuthInfo } from '@/services/shopify'
import type { Agent } from '@/types/agent'

const router = useRouter()
const route = useRoute()

const agents = ref<Agent[]>([])
const selectedAgents = ref<string[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)

const shopDomain = computed(() => route.query.shop as string)
const shopId = computed(() => route.query.shop_id as string)

const allSelected = computed(() => 
  agents.value.length > 0 && selectedAgents.value.length === agents.value.length
)

// Load agents from API
const loadAgents = async () => {
  loading.value = true
  error.value = null
  
  try {
    agents.value = await agentService.getOrganizationAgents()
    
    if (agents.value.length === 0) {
      loading.value = false
      return
    }
    
    // Auto-select all agents by default for better UX
    selectedAgents.value = agents.value.map(a => a.id)
    
  } catch (err: any) {
    console.error('Failed to load agents:', err)
    error.value = err.response?.data?.detail || 'Failed to load AI agents. Please try again.'
  } finally {
    loading.value = false
  }
}

// Toggle agent selection
const toggleAgent = (agentId: string) => {
  const index = selectedAgents.value.indexOf(agentId)
  if (index > -1) {
    selectedAgents.value.splice(index, 1)
  } else {
    selectedAgents.value.push(agentId)
  }
}

// Toggle select all
const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedAgents.value = []
  } else {
    selectedAgents.value = agents.value.map(a => a.id)
  }
}

// Save configuration
const saveConfiguration = async () => {
  if (selectedAgents.value.length === 0) return
  
  saving.value = true
  error.value = null
  
  try {
    // Enable Shopify for each selected agent
    await enableShopifyForAgents(selectedAgents.value, shopId.value)
    
    // Show success message and redirect
    router.push({
      name: 'shopify-success',
      query: {
        shop: shopDomain.value,
        agents_connected: selectedAgents.value.length.toString()
      }
    })
    
  } catch (err: any) {
    console.error('Failed to save Shopify configuration:', err)
    error.value = err.response?.data?.detail || 'Failed to save configuration. Please try again.'
    saving.value = false
  }
}

// Cancel installation
const cancelInstallation = () => {
  if (confirm('Are you sure you want to cancel? Shopify integration will not be enabled.')) {
    router.push({ name: 'ai-agents' })
  }
}

// Go to agents page
const goToAgents = () => {
  router.push({ name: 'ai-agents' })
}

onMounted(async () => {
  // If we have shop info in query params, use it
  if (shopDomain.value && shopId.value) {
    loadAgents()
    return
  }
  
  // Otherwise, try to get shop info from the URL or from an API call
  // For embedded Shopify apps, the shop param might be in the URL differently
  const urlParams = new URLSearchParams(window.location.search)
  const shopFromUrl = urlParams.get('shop')
  
  if (shopFromUrl) {
    // Try to fetch shop info from backend
    try {
      loading.value = true
      const shopAuthData = await getShopAuthInfo(shopFromUrl, true)
      
      if (shopAuthData.status === 'already_installed') {
        console.log('Shop already installed, redirecting to agent selection page')
        // Update the URL with the shop info and reload
        await router.replace({
          name: 'shopify-agent-selection',
          query: {
            shop: shopAuthData.shop,
            shop_id: shopAuthData.shop_id
          }
        })
        
        // Now load agents
        await loadAgents()
      } else {
        error.value = 'Shop not connected. Please complete the installation first.'
        loading.value = false
      }
    } catch (err: any) {
      console.error('Failed to get shop info:', err)
      error.value = 'Failed to connect to Shopify. Please try again.'
      loading.value = false
    }
  } else {
    error.value = 'Missing Shopify store information. Please try installing again.'
    loading.value = false
  }
})
</script>

<style scoped>
.shopify-selection-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background-soft) 0%, var(--background-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
}

.shopify-selection-card {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  width: 100%;
  padding: var(--space-xl);
  border: 1px solid var(--border-color);
}

/* Header */
.header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #95bf47 0%, #5e8e3e 100%);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-sm);
  box-shadow: 0 4px 16px rgba(149, 191, 71, 0.2);
}

.shopify-icon {
  width: 28px;
  height: 28px;
  color: white;
}

.header h1 {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: var(--font-family);
}

.subtitle {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
}

.loading-text {
  color: var(--text-muted);
  margin-top: var(--space-md);
  font-size: var(--text-sm);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--background-mute);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
}

.error-icon {
  font-size: 56px;
  margin-bottom: var(--space-md);
}

.error-message {
  color: var(--error-color);
  margin-bottom: var(--space-lg);
  font-size: var(--text-base);
}

/* Agent Selection */
.selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.selection-header h2 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.agent-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: var(--space-lg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--background-soft);
}

.agent-item {
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-fast);
  background: var(--background-color);
}

.agent-item:last-child {
  border-bottom: none;
}

.agent-item-label {
  display: flex;
  align-items: flex-start;
  padding: var(--space-md);
  cursor: pointer;
  width: 100%;
}

.agent-item:hover {
  background: linear-gradient(135deg, var(--background-soft) 0%, var(--background-color) 100%);
  transform: translateX(4px);
}

.agent-item.selected {
  background: linear-gradient(135deg, rgba(243, 70, 17, 0.05) 0%, rgba(243, 70, 17, 0.02) 100%);
  border-left: 3px solid var(--primary-color);
}

.agent-checkbox {
  margin-right: var(--space-md);
  padding-top: 2px;
}

.agent-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.agent-info {
  flex: 1;
}

.agent-info h3 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs);
}

.agent-info p {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin: 0 0 var(--space-sm);
  line-height: 1.5;
}

.agent-meta {
  display: flex;
  gap: var(--space-sm);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  text-transform: capitalize;
  background: var(--background-mute);
  color: var(--text-muted);
}

.badge.active {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

/* Info Box */
.info-box {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-lg);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.info-icon {
  font-size: 20px;
  flex-shrink: 0;
  padding-top: 2px;
}

.info-content {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: 1.5;
}

.info-content strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-weight: 600;
  font-size: var(--text-sm);
}

.info-content ul {
  margin: 0;
  padding-left: var(--space-lg);
}

.info-content li {
  margin-bottom: var(--space-xs);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-2xl) var(--space-lg);
}

.empty-icon {
  font-size: 72px;
  margin-bottom: var(--space-lg);
  opacity: 0.7;
}

.empty-state h2 {
  font-size: var(--text-xl);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
  font-weight: 600;
}

.empty-state p {
  color: var(--text-muted);
  margin-bottom: var(--space-lg);
  font-size: var(--text-base);
}

/* Buttons */
.action-buttons {
  display: flex;
  gap: var(--space-md);
  justify-content: flex-end;
}

.btn-primary,
.btn-secondary,
.btn-text {
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-family);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(243, 70, 17, 0.2);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(243, 70, 17, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--background-soft);
  border-color: var(--border-color-hover);
}

.btn-text {
  background: none;
  color: var(--primary-color);
  padding: var(--space-sm) var(--space-md);
}

.btn-text:hover {
  background: rgba(243, 70, 17, 0.05);
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .shopify-selection-container {
    padding: var(--space-md);
  }

  .shopify-selection-card {
    padding: var(--space-lg);
  }

  .header h1 {
    font-size: var(--text-xl);
  }

  .action-buttons {
    flex-direction: column-reverse;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .agent-list {
    max-height: 300px;
  }
}
</style>

