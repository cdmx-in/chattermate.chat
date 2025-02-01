<script setup lang="ts">
import { useAgentEdit } from '@/composables/useAgentEdit'
import type { Agent } from '@/types/agent'

const props = defineProps<{
    agent: Agent
}>()

const emit = defineEmits<{
    (e: 'save', agent: Agent): void
    (e: 'cancel'): void
}>()

const {
    displayName,
    isActive,
    instructions,
    isLoading,
    error,
    addInstruction,
    removeInstruction,
    handleSave,
} = useAgentEdit(props.agent)

const onSave = async () => {
    try {
        const updatedAgent = await handleSave()
        emit('save', updatedAgent)
    } catch {
        // Error is handled in the composable
    }
}
</script>

<template>
    <div class="agent-edit">
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        <form @submit.prevent="onSave">
            <div class="form-group">
                <label>Display Name</label>
                <input type="text" v-model="displayName" placeholder="Enter display name" :disabled="isLoading">
            </div>

            <div class="form-group">
                <label class="toggle-label">
                    Status
                    <div class="toggle-wrapper">
                        <button type="button" class="status-toggle" :class="{ 'active': isActive }"
                            @click="isActive = !isActive" :disabled="isLoading">
                            {{ isActive ? 'Online' : 'Offline' }}
                        </button>
                    </div>
                </label>
            </div>

            <div class="form-group">
                <label>Instructions</label>
                <div class="instructions-list">
                    <div v-for="(instruction, index) in instructions" :key="index" class="instruction-field">
                        <div class="input-wrapper">
                            <input type="text" v-model="instructions[index]" placeholder="Enter instruction"
                                :disabled="isLoading">
                            <button type="button" class="icon-button remove" @click="removeInstruction(index)"
                                :disabled="instructions.length === 1 || isLoading">
                                -
                            </button>
                        </div>
                    </div>
                    <button type="button" class="add-button" @click="addInstruction" :disabled="isLoading">
                        + Add Instruction
                    </button>
                </div>
                <span v-if="!instructions.some(i => i.trim())" class="error-text">
                    At least one instruction is required
                </span>
            </div>

            <div class="form-actions">
                <button type="button" class="cancel-button" @click="$emit('cancel')"
                    :disabled="isLoading">Cancel</button>
                <button type="submit" class="save-button"
                    :disabled="!displayName.trim() || !instructions.some(i => i.trim()) || isLoading">
                    {{ isLoading ? 'Saving...' : 'Save Changes' }}
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.agent-edit {
    padding: var(--space-md);
}

.form-group {
    margin-bottom: var(--space-lg);
}

.form-group label {
    display: block;
    margin-bottom: var(--space-sm);
    color: var(--text-muted);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: var(--space-sm);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--background);
    color: var(--text-color);
    font-family: inherit;
}

.form-actions {
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end;
}

.cancel-button,
.save-button {
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-lg);
    cursor: pointer;
}

.cancel-button {
    background: var(--background-soft);
    border: none;
    color: var(--text-color);
}

.save-button {
    background: var(--primary-color);
    color: white;
    border: none;
}

.save-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error-text {
    color: var(--error-color);
    font-size: 0.75rem;
    margin-top: var(--space-xs);
    display: block;
}

.instructions-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.instruction-field {
    display: flex;
    gap: var(--space-sm);
    width: 100%;
}

.input-wrapper {
    display: flex;
    gap: var(--space-sm);
    width: 100%;
}

.input-wrapper input {
    flex: 1;
}

.icon-button {
    min-width: 32px;
    height: 32px;
    padding: var(--space-sm);
    border-radius: var(--radius-lg);
    border: none;
    background: var(--background-soft);
    cursor: pointer;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.icon-button.remove {
    background: var(--error-color);
}

.add-button {
    padding: var(--space-sm);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius-lg);
    background: transparent;
    color: var(--text-color);
    cursor: pointer;
    margin-top: var(--space-xs);
}

.add-button:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.toggle-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.toggle-wrapper {
    display: flex;
    align-items: center;
}

.status-toggle {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-lg);
    border: none;
    background: var(--error-color);
    color: white;
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.status-toggle.active {
    background: var(--success-color);
}

.error-message {
    padding: var(--space-sm);
    margin-bottom: var(--space-md);
    background: var(--error-color-soft);
    color: var(--error-color);
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
}

.loading {
    opacity: 0.7;
    cursor: wait;
}
</style>