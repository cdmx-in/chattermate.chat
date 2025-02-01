<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import OrganizationSettingsSetup from '@/components/organization/Organizations.vue'
</script>

<template>
  <DashboardLayout>
    <div class="dashboard-container">
      <div class="settings-section">
        <OrganizationSettingsSetup />
      </div>
    </div>
  </DashboardLayout>
</template>

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
</style> 