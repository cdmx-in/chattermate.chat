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

      <div class="features-list">
        <h3>Your AI agents can now:</h3>
        <ul>
          <li>🛍️ Search and display products from your store</li>
          <li>📦 Check order status and tracking</li>
          <li>💡 Recommend products to customers</li>
          <li>❓ Answer product questions instantly</li>
        </ul>
      </div>

      <div class="action-buttons">
        <button class="primary-button" @click="openDashboard">Go to Dashboard</button>
        <button class="secondary-button" @click="openShopify">Back to Shopify</button>
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

// Function to open the dashboard
const openDashboard = () => {
  router.push({ name: 'ai-agents' })
}

// Function to return to Shopify
const openShopify = () => {
  const shop = route.query.shop as string
  if (shop) {
    window.location.href = `https://${shop}/admin/themes/current/editor?context=apps`
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
  max-width: 600px;
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