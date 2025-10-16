<template>
  <div class="shopify-success-page">
    <div class="success-container">
      <div class="success-icon">✓</div>
      <h1>Shopify Integration Complete!</h1>
      <p>Your Shopify store <strong>{{ shopName }}</strong> has been successfully connected to ChatterMate.</p>
      
      <div v-if="agentsConnected" class="connected-info">
        <p class="highlight">
          ✨ <strong>{{ agentsConnected }}</strong> AI agent{{ agentsConnected !== '1' ? 's' : '' }} 
          {{ agentsConnected !== '1' ? 'are' : 'is' }} now connected and ready to assist your customers!
        </p>
      </div>

      <div v-if="widgetId" class="widget-info-box">
        <h3>📋 Widget Configuration</h3>
        <p>Your Widget ID for Shopify:</p>
        <div class="widget-id-display">
          <code>{{ widgetId }}</code>
        </div>
        <p class="widget-note">
          💡 Use this Widget ID in your Shopify theme settings to display the chat widget on your store.
        </p>
        
        <!-- Configuration Instructions with Screenshot -->
        <div class="config-instructions">
          <h4>How to Add Widget ID:</h4>
          <ol>
            <li>Click "Setup Widget in Shopify" button below</li>
            <li>In Shopify theme editor, go to "Apps" section</li>
            <li>Find "ChatterMate Chat" app</li>
            <li>Paste your Widget ID in the configuration field</li>
            <li>Save and publish your theme</li>
          </ol>
          
          <div class="config-screenshot">
            <img src="@/assets/widget_config.png" alt="Widget Configuration in Shopify" />
            <p class="screenshot-caption">Example: Adding Widget ID in Shopify theme settings</p>
          </div>
        </div>
      </div>

      <div class="features-list">
        <h3>Your AI agents can now:</h3>
        <ul>
          <li>🛍️ Search and display products from your store</li>
          <li>📦 Check order status and tracking</li>
          <li>💡 Recommend products to customers</li>
          <li>❓ Answer product questions instantly</li>
        </ul>
      </div>

      <div v-if="!isEmbedded" class="action-buttons">
        <button class="primary-button" @click="goToHome">Go to Dashboard</button>
        <button class="secondary-button" @click="openShopify">Setup Widget in Shopify</button>
      </div>
      
      <div v-else class="embedded-note">
        <p>💡 You can now configure the widget in your Shopify theme editor using the Widget ID above.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Get shop name from URL query parameters
const shopName = computed(() => {
  const shop = route.query.shop as string
  return shop ? shop.replace('.myshopify.com', '') : 'your store'
})

// Get number of connected agents
const agentsConnected = computed(() => route.query.agents_connected as string)

// Get widget ID from URL query parameters
const widgetId = computed(() => route.query.widget_id as string)

// Check if page is loaded in embedded context (inside Shopify admin)
const isEmbedded = computed(() => {
  // Check query parameter
  const embedded = route.query.embedded as string
  if (embedded === '1' || embedded === 'true') {
    return true
  }
  
  // Check if page is in an iframe
  try {
    return window.self !== window.top
  } catch (e) {
    // If we can't access window.top due to cross-origin, we're likely in an iframe
    return true
  }
})

// Function to go to home (app.chattermate.chat)
const goToHome = () => {
  window.location.href = 'https://app.chattermate.chat'
}

// Function to open the dashboard
const openDashboard = () => {
  router.push({ name: 'ai-agents' })
}

// Function to return to Shopify
const openShopify = () => {
  const shop = route.query.shop as string
  if (shop) {
    window.open(`https://${shop}/admin/themes/current/editor?context=apps`, '_blank')
  }
}

// For analytics or tracking
onMounted(() => {
  console.log('Shopify connection success page loaded for shop:', shopName.value)
  console.log('Agents connected:', agentsConnected.value)
})
</script>

<style scoped>
.shopify-success-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #1F2937;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #F9FAFB;
}

.success-container {
  max-width: 700px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #111827;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.success-icon {
  color: #10B981;
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  margin-bottom: 16px;
  color: #4B5563;
}

.connected-info {
  background-color: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
}

.highlight {
  color: #047857;
  font-size: 1.1rem;
  margin: 0;
}

.widget-info-box {
  background-color: #FFF7ED;
  border: 1px solid #FB923C;
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  text-align: left;
}

.widget-info-box h3 {
  margin: 0 0 12px;
  color: #111827;
  font-size: 1.1rem;
}

.widget-info-box p {
  margin: 8px 0;
  color: #4B5563;
  font-size: 0.95rem;
}

.widget-id-display {
  background-color: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  font-family: 'Monaco', 'Courier New', monospace;
  overflow-x: auto;
}

.widget-id-display code {
  color: #F24611;
  font-size: 0.95rem;
  font-weight: 500;
  word-break: break-all;
  user-select: all;
}

.widget-note {
  color: #6B7280;
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 12px;
}

.config-instructions {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #FED7AA;
}

.config-instructions h4 {
  color: #111827;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 12px;
}

.config-instructions ol {
  text-align: left;
  color: #4B5563;
  font-size: 0.9rem;
  line-height: 1.8;
  padding-left: 20px;
  margin: 0 0 20px;
}

.config-instructions li {
  margin-bottom: 8px;
}

.config-screenshot {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #E5E7EB;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-screenshot img {
  width: 100%;
  height: auto;
  display: block;
}

.screenshot-caption {
  background-color: #F9FAFB;
  padding: 8px 12px;
  margin: 0;
  font-size: 0.8rem;
  color: #6B7280;
  font-style: italic;
  text-align: center;
  border-top: 1px solid #E5E7EB;
}

.features-list {
  text-align: left;
  margin: 32px 0;
  padding: 20px;
  background-color: #F9FAFB;
  border-radius: 8px;
}

.features-list h3 {
  color: #111827;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.1rem;
}

.features-list ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.features-list li {
  padding: 8px 0;
  color: #4B5563;
  font-size: 0.95rem;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.embedded-note {
  margin-top: 20px;
  padding: 16px;
  background-color: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 8px;
  text-align: center;
}

.embedded-note p {
  color: #1E40AF;
  font-size: 0.95rem;
  margin: 0;
  font-weight: 500;
}

.primary-button,
.secondary-button {
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
  font-size: 1rem;
}

.primary-button {
  background-color: #F24611;
  color: white;
}

.primary-button:hover {
  background-color: #D93B0A;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(242, 70, 17, 0.2);
}

.secondary-button {
  background-color: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
}

.secondary-button:hover {
  background-color: #E5E7EB;
}
</style> 