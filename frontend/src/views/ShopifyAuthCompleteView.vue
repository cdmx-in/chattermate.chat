<template>
  <div class="auth-complete">
    <div class="spinner"></div>
    <h2>Login Successful!</h2>
    <p>Redirecting back to Shopify...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  const shop = route.query.shop as string
  const shopId = route.query.shop_id as string
  const host = route.query.host as string
  
  // Redirect to agent selection in embedded context
  const params = new URLSearchParams()
  if (shop) params.append('shop', shop)
  if (shopId) params.append('shop_id', shopId)
  if (host) params.append('host', host)
  
  window.location.href = `/shopify/agent-selection?${params.toString()}`
})
</script>

<style scoped>
.auth-complete {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f8f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f4f6;
  border-top-color: #f34611;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 24px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

h2 {
  font-size: 24px;
  color: #1F2937;
  margin: 0 0 12px;
  font-weight: 600;
}

p {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}
</style>

