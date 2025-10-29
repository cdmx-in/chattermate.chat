<template>
  <div class="shopify-home">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading ChatterMate...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h2>Connection Error</h2>
      <p>{{ error }}</p>
      <button @click="retry" class="btn-primary">Retry</button>
    </div>

    <!-- Welcome / Setup Content -->
    <div v-else class="home-content">
      <div class="header">
        <h1>Welcome to ChatterMate</h1>
        <p>AI-powered customer support for your Shopify store</p>
      </div>

      <!-- Configuration Status -->
      <div v-if="configStatus" class="status-card">
        <div v-if="configStatus.agents_connected > 0" class="status-success">
          <div class="status-icon">✓</div>
          <div class="status-content">
            <h3>ChatterMate is Active</h3>
            <p>{{ configStatus.agents_connected }} AI agent{{ configStatus.agents_connected !== 1 ? 's' : '' }} connected</p>
            <div v-if="configStatus.widget_id" class="widget-info">
              <strong>Widget ID:</strong>
              <code class="widget-id">{{ configStatus.widget_id }}</code>
            </div>
          </div>
        </div>

        <div v-else class="status-warning">
          <div class="status-icon">⚠️</div>
          <div class="status-content">
            <h3>Setup Required</h3>
            <p>No agents are configured yet. Complete the setup to start using ChatterMate.</p>
            <button @click="goToAgentSelection" class="btn-primary">Configure Now</button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="actions-grid">
          <button @click="goToAgentSelection" class="action-card">
            <span class="action-icon">🤖</span>
            <span class="action-label">Configure Agents</span>
          </button>
          <button @click="goToThemeEditor" class="action-card">
            <span class="action-icon">🎨</span>
            <span class="action-label">Setup Widget</span>
          </button>
          <button @click="goToDashboard" class="action-card">
            <span class="action-icon">📊</span>
            <span class="action-label">View Dashboard</span>
          </button>
        </div>
      </div>

      <!-- Features -->
      <div class="features">
        <h3>What ChatterMate Can Do</h3>
        <ul class="features-list">
          <li>🛍️ Search and display products</li>
          <li>📦 Check order status and tracking</li>
          <li>💡 Recommend products to customers</li>
          <li>❓ Answer product questions instantly</li>
          <li>🌐 24/7 customer support</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getShopConfigStatus } from '@/services/shopify'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref<string | null>(null)
const configStatus = ref<any>(null)
const shopifyApp = ref<any>(null)

// Get shop from URL
const shop = ref('')
const host = ref('')

// Initialize Shopify App Bridge
const initializeAppBridge = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    host.value = urlParams.get('host') || ''
    shop.value = urlParams.get('shop') || ''

    if (!shop.value) {
      error.value = 'Missing shop parameter. Please reinstall the app from Shopify.'
      loading.value = false
      return
    }

    // App Bridge is already loaded in index.html
    const AppBridge = (window as any)['app-bridge']
    if (AppBridge && AppBridge.default && host.value) {
      const apiKey = (window.APP_CONFIG as any)?.VITE_SHOPIFY_API_KEY || ''
      shopifyApp.value = AppBridge.default.createApp({
        apiKey: apiKey,
        host: host.value,
        forceRedirect: true
      })
      console.log('App Bridge initialized successfully')
    } else {
      console.warn('App Bridge not available or no host parameter')
    }
    
    // Check shop status
    checkShopStatus()
  } catch (err: any) {
    console.error('Failed to initialize App Bridge:', err)
    error.value = 'Failed to initialize embedded app'
    loading.value = false
  }
}

// Check if shop is installed and configured
const checkShopStatus = async () => {
  try {
    loading.value = true
    error.value = null

    // Check if shop needs OAuth
    const authCheckResponse = await api.get(`/shopify/auth?shop=${shop.value}&embedded=1`, {
      validateStatus: (status) => status < 500 // Accept 404 as valid response
    })

    // If we get HTML response, it means we need OAuth
    if (typeof authCheckResponse.data === 'string') {
      // Redirect to OAuth flow
      window.location.href = `${window.APP_CONFIG?.API_URL || ''}/shopify/auth?shop=${shop.value}&embedded=1`
      return
    }

    // Get shop configuration status
    const status = await getShopConfigStatus(shop.value)
    configStatus.value = status
    
    // Automatically route based on configuration status
    if (status.is_installed && status.agents_connected > 0) {
      // Already installed and agents connected, go to success page
      console.log('Shop configured, redirecting to success page')
      redirectTo('/shopify/success', {
        shop: shop.value,
        shop_id: status.shop_id,
        agents_connected: status.agents_connected.toString(),
        widget_id: status.widget_id || ''
      })
    } else if (status.is_installed && status.agents_connected === 0) {
      // Installed but no agents connected, go to agent selection
      console.log('No agents connected, redirecting to agent selection')
      redirectTo('/shopify/agent-selection', {
        shop: shop.value,
        shop_id: status.shop_id
      })
    }
    
    loading.value = false

  } catch (err: any) {
    console.error('Failed to check shop status:', err)
    
    // If 401 or auth error, redirect to OAuth
    if (err.response?.status === 401 || err.response?.status === 403) {
      window.location.href = `${window.APP_CONFIG?.API_URL || ''}/shopify/auth?shop=${shop.value}&embedded=1`
      return
    }
    
    error.value = 'Failed to load shop information. Please try again.'
    loading.value = false
  }
}

// Helper function to redirect using App Bridge or Vue Router
const redirectTo = (path: string, query: Record<string, string>) => {
  if (shopifyApp.value) {
    try {
      const Redirect = (window as any)['app-bridge'].actions.Redirect
      const redirect = Redirect.create(shopifyApp.value)
      const queryString = new URLSearchParams(query).toString()
      const fullPath = `${path}?${queryString}`
      redirect.dispatch(Redirect.Action.APP, fullPath)
    } catch (err) {
      console.error('App Bridge redirect failed:', err)
      router.push({ path, query })
    }
  } else {
    router.push({ path, query })
  }
}

// Navigate to agent selection
const goToAgentSelection = () => {
  redirectTo('/shopify/agent-selection', {
    shop: shop.value,
    shop_id: configStatus.value?.shop_id || '',
    host: host.value
  })
}

// Navigate to theme editor
const goToThemeEditor = () => {
  if (shop.value) {
    const themeEditorUrl = `https://${shop.value}/admin/themes/current/editor?context=apps`
    
    if (shopifyApp.value) {
      try {
        const Redirect = (window as any)['app-bridge'].actions.Redirect
        const redirect = Redirect.create(shopifyApp.value)
        redirect.dispatch(Redirect.Action.REMOTE, themeEditorUrl)
      } catch (err) {
        console.error('Failed to redirect:', err)
        window.open(themeEditorUrl, '_blank')
      }
    } else {
      window.open(themeEditorUrl, '_blank')
    }
  }
}

// Navigate to dashboard
const goToDashboard = () => {
  window.open('https://app.chattermate.chat', '_blank')
}

// Retry loading
const retry = () => {
  error.value = null
  checkShopStatus()
}

onMounted(() => {
  initializeAppBridge()
})
</script>

<style scoped>
.shopify-home {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background-soft) 0%, var(--background-color) 100%);
  padding: var(--space-xl);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--background-mute);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: var(--space-md);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.error-icon {
  font-size: 64px;
  margin-bottom: var(--space-md);
}

.error-container h2 {
  color: var(--error-color);
  margin-bottom: var(--space-sm);
}

.error-container p {
  color: var(--text-muted);
  margin-bottom: var(--space-lg);
}

/* Home Content */
.home-content {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.header h1 {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.header p {
  font-size: var(--text-base);
  color: var(--text-muted);
}

/* Status Card */
.status-card {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
  border: 1px solid var(--border-color);
}

.status-success,
.status-warning {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.status-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.status-content {
  flex: 1;
}

.status-content h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-xs);
}

.status-content p {
  color: var(--text-muted);
  margin: 0 0 var(--space-md);
}

.widget-info {
  background: var(--background-soft);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  margin-top: var(--space-md);
}

.widget-info strong {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.widget-id {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  background: var(--background-mute);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: var(--text-sm);
  color: var(--primary-color);
  user-select: all;
}

/* Quick Actions */
.quick-actions {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
  border: 1px solid var(--border-color);
}

.quick-actions h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-lg);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-md);
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg);
  background: var(--background-soft);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-card:hover {
  background: linear-gradient(135deg, rgba(243, 70, 17, 0.05) 0%, rgba(243, 70, 17, 0.02) 100%);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(243, 70, 17, 0.15);
}

.action-icon {
  font-size: 32px;
}

.action-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

/* Features */
.features {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: var(--space-xl);
  border: 1px solid var(--border-color);
}

.features h3 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-lg);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
}

.features-list li {
  padding: var(--space-sm);
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

/* Buttons */
.btn-primary {
  background: var(--primary-color);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  border: none;
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px rgba(243, 70, 17, 0.2);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(243, 70, 17, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .shopify-home {
    padding: var(--space-md);
  }

  .status-success,
  .status-warning {
    flex-direction: column;
    text-align: center;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>

