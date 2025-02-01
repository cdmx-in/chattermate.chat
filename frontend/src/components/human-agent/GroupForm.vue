<script setup lang="ts">
import { ref } from 'vue'
import type { UserGroup } from '@/types/user'

const props = defineProps<{
  group?: UserGroup | null
}>()

const emit = defineEmits<{
  submit: [groupData: Partial<UserGroup>]
  cancel: []
}>()

const formData = ref({
  name: props.group?.name || '',
  description: props.group?.description || ''
})

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="group-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-input"
        rows="3"
      />
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="emit('cancel')">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        {{ props.group ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.group-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-input {
  padding: var(--space-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-md);
}
</style> 