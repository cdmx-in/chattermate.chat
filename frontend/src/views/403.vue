<template>
  <DashboardLayout>
    <div class="unauthorized">
      <h1>Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <router-link to="/" class="back-link">
        Return to Dashboard
      </router-link>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.unauthorized {
  padding: var(--space-xl);
  text-align: center;
}

.back-link {
  display: inline-block;
  margin-top: var(--space-lg);
  color: var(--primary-color);
  text-decoration: none;
}
</style> 