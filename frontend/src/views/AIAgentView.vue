<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AIAgentSetup from '@/components/aiagent/AIAgentSetup.vue';

const selectedModel = ref('openai')
</script>

<template>
    <DashboardLayout>
        <div class="dashboard-container">
            <!-- Main Chat Area -->
            <div class="chat-section">
                <AIAgentSetup :model="selectedModel" />
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

.chat-section {
    flex: 1;
    padding: var(--space-lg);
}
</style>