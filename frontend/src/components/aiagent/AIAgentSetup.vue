<!--
ChatterMate - A I Agent Setup
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>
-->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AISetup from '../ai/AISetup.vue'
import AgentList from '../agent/AgentList.vue'


import { useAgentStorage } from '@/utils/storage'
import { aiService } from '@/services/ai'
import { agentService } from '@/services/agent'
import { AxiosError } from 'axios'


const agentStorage = useAgentStorage()


const aiSetupRef = ref<InstanceType<typeof AISetup>>()
const error = ref<string | null>(null)
const isLoading = ref(false)
const isAISetupMode = ref(false)

const checkAIConfig = async () => {
    try {
        isLoading.value = true
        await aiService.getOrganizationConfig()
        isAISetupMode.value = false
        await fetchAgents()
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 404) {
            // No AI config found
            isAISetupMode.value = true
        } else {
            error.value = 'Failed to check AI configuration'
            console.error(err)
        }
    } finally {
        isLoading.value = false
    }
}

const fetchAgents = async () => {
    try {
        isLoading.value = true
        const agents = await agentService.getOrganizationAgents()
        if (agents.length > 0) {
            agentStorage.setAgents(agents)
        }
    } catch (err) {
        error.value = 'Failed to fetch agents'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    const agents = agentStorage.getAgents()
    if (agents.length === 0) {
        await checkAIConfig()
    }
})
</script>

<template>
    <div class="chat-window">
        <div class="messages">
            <div v-if="isLoading" class="loading-container">
                <div class="loader"></div>
            </div>

            <div v-else-if="error" class="error-message">
                {{ error }}
            </div>

            <div v-else-if="isAISetupMode" class="setup-messages">
                <AISetup ref="aiSetupRef" @ai-setup-complete="checkAIConfig" />
            </div>
            <div v-else class="agent-list-container">
                <AgentList />
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-window {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 15px rgb(131, 129, 129);
}

.messages {
    flex: 1;
    padding: var(--space-lg);
    background: transparent;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.agent-list-container {
    flex: 1;
    overflow-y: auto;
}

.error-message {
    padding: var(--space-md);
    background: var(--error-color-soft);
    color: var(--error-color);
    border-radius: var(--radius-lg);
    text-align: center;
    margin-bottom: var(--space-md);
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid var(--primary-color-soft);
    border-bottom-color: var(--primary-color);
    border-radius: 50%;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>