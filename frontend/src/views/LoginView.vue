<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'
import { permissionChecks } from '@/utils/permissions'
import type { AxiosError } from 'axios'

interface ErrorResponse {
    detail: string
}

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const getInitialRoute = () => {
    // Check permissions in order of priority
    if (permissionChecks.canManageAgents()) {
        return '/ai-agents'
    }
    if (permissionChecks.canViewChats()) {
        return '/conversations'
    }
    if (permissionChecks.canManageUsers()) {
        return '/human-agents'
    }
    if (permissionChecks.canViewOrganization()) {
        return '/settings/organization'
    }
    if (permissionChecks.canViewAIConfig()) {
        return '/settings/ai-config'
    }
    // Default route if no specific permissions
    return '/403'
}

const handleLogin = async () => {
    try {
        isLoading.value = true
        error.value = ''

        const user = await authService.login(email.value, password.value)
        console.log('Logged in user:', user)

        // Determine initial route based on permissions
        const initialRoute = getInitialRoute()
        router.push(initialRoute)

    } catch (err) {
        console.log(err)
        const axiosError = err as AxiosError<ErrorResponse>
        error.value = axiosError.response?.data?.detail || 'Login failed'
        console.error('Login error:', err)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="login-page">
        <div class="login-container">
            <div class="logo-container">
                <img src="@/assets/logo.svg" alt="Logo" class="logo" />
            </div>

            <h1>Welcome Back</h1>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" v-model="password" type="password" required
                        placeholder="Enter your password" />
                </div>

                <div v-if="error" class="error-message" role="alert">
                    {{ error }}
                </div>

                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    background: var(--background-color);
}

.login-container {
    width: 100%;
    max-width: 400px;
    padding: var(--space-xl);
    background: var(--background-soft);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
}

.logo-container {
    text-align: center;
    margin-bottom: var(--space-xl);
}

.logo {
    width: 120px;
    height: auto;
}

h1 {
    text-align: center;
    color: var(--text-color);
    margin-bottom: var(--space-xl);
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.form-group label {
    color: var(--text-color);
    font-size: var(--text-sm);
}

.form-group input {
    padding: var(--space-sm) var(--space-md);
    background: var(--background-mute);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-color);
}

.error-message {
    color: var(--error-color);
    text-align: center;
    padding: var(--space-sm);
    background: rgba(244, 67, 54, 0.1);
    border-radius: var(--radius-sm);
}
</style>