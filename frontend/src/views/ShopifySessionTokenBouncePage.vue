<template>
  <div class="bounce-container">
    <div class="loading-content">
      <div class="spinner"></div>
      <p>Loading Shopify app...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Get the reload path from query
  const reloadPath = route.query['shopify-reload'] as string
  
  if (reloadPath) {
    // App Bridge is now loaded via index.html, redirect to original path
    console.log('🔄 Bounce page loaded, redirecting to:', reloadPath)
    router.replace(reloadPath)
  } else {
    console.warn('⚠️ No shopify-reload parameter found, redirecting to agent management')
    router.replace('/shopify/agent-management')
  }
})
</script>

<style scoped>
.bounce-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-soft, #f9fafb);
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--background-mute, #e1e3e5);
  border-top-color: var(--primary-color, #f34611);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-content p {
  color: var(--text-muted, #6d7175);
  font-size: var(--text-base, 14px);
}
</style>

