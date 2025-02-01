<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <div class="settings-section">
        <header class="page-header">
          <h1>AI Configuration</h1>
          <p class="description">Configure your AI provider settings</p>
        </header>
        <AISetup @ai-setup-complete="handleSetupComplete" />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AISetup from '@/components/ai/AISetup.vue'

const handleSetupComplete = () => {
  // Optionally handle completion
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100%;
  position: relative;
}

.settings-section {
  flex: 1;
  padding: var(--space-lg);
}

.page-header {
  margin-bottom: var(--space-xl);
}

.page-header h1 {
  font-size: var(--text-2xl);
  color: var(--text-color);
  margin-bottom: var(--space-sm);
}

.description {
  color: var(--text-color);
  opacity: 0.7;
}
</style> 