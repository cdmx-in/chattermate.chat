<template>
  <div class="setup-tab">
    <div class="success-icon">✓</div>
    <h2>Integration Complete!</h2>
    <p>Your Shopify store is successfully connected to ChatterMate.</p>
    
    <div v-if="agentsConnected" class="connected-info">
      <p class="highlight">
        ✨ <strong>{{ agentsConnected }}</strong> AI agent{{ agentsConnected !== 1 ? 's' : '' }} 
        {{ agentsConnected !== 1 ? 'are' : 'is' }} now connected and ready to assist your customers!
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
      
      <div class="config-instructions">
        <h4>How to Add Widget ID:</h4>
        <ol>
          <li>Click "Setup Widget in Shopify" button below</li>
          <li>In Shopify theme editor, go to "Apps" section</li>
          <li>Find "ChatterMate Chat" app</li>
          <li>Paste your Widget ID in the configuration field</li>
          <li>Save and publish your theme</li>
        </ol>
        
        <button class="primary-button" @click="emit('open-theme-editor')">
          Setup Widget in Shopify
        </button>
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  agentsConnected: number
  widgetId: string | undefined
}>()

const emit = defineEmits<{
  (e: 'open-theme-editor'): void
}>()
</script>

<style scoped>
.setup-tab {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.success-icon {
  color: #10B981;
  font-size: 48px;
  margin-bottom: 20px;
}

.setup-tab h2 {
  color: #111827;
  margin-bottom: 10px;
  font-size: 1.5rem;
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

.widget-id-display {
  background-color: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  font-family: 'Monaco', 'Courier New', monospace;
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

.primary-button {
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s;
  font-size: 1rem;
  background-color: #F24611;
  color: white;
}

.primary-button:hover {
  background-color: #D93B0A;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(242, 70, 17, 0.2);
}
</style>

