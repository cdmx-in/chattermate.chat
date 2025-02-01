<script setup lang="ts">
defineProps<{
    isCollapsed: boolean
}>()

defineEmits<{
    (e: 'toggle'): void
}>()
</script>

<template>
    <button class="toggle-btn" @click="$emit('toggle')">
        <span class="toggle-icon">{{ isCollapsed ? '▶' : '◀' }}</span>
    </button>
</template>

<style scoped>
.toggle-btn {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: var(--primary-color);
    border: none;
    border-radius: 50%;
    color: var(--background-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.toggle-btn:hover {
    background: var(--secondary-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.toggle-icon {
    font-size: 12px;
}
</style>