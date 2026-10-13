<!--
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { knowledgeService } from '@/services/knowledge'

const props = defineProps<{
  agentId: string
  organizationId: string
}>()

const emit = defineEmits<{
  (e: 'added'): void
}>()

// Titles must be unique per org, and someone may paste more than once (or
// already have an "About us"): stamp it so a second paste isn't refused.
const titleNow = () =>
  `About us (${new Date().toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })})`
const MIN_LENGTH = 40 // enough to answer something from; less is a typo

const content = ref('')
const saving = ref(false)
const error = ref<string | null>(null)
const ready = computed(() => content.value.trim().length >= MIN_LENGTH && !saving.value)

const add = async () => {
  if (!ready.value) return
  saving.value = true
  error.value = null
  try {
    await knowledgeService.addText(props.organizationId, titleNow(), content.value.trim(), props.agentId)
    content.value = ''
    emit('added')
  } catch (err: any) {
    error.value = err?.message || 'Could not add that text'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="text-fallback">
    <textarea
      v-model="content"
      class="text-area"
      rows="6"
      aria-label="Text about your business"
      placeholder="Paste what customers ask about: what you sell, prices, delivery, opening hours…"
      :disabled="saving"
    ></textarea>
    <p v-if="error" class="step-error">{{ error }}</p>
    <button type="button" class="btn-soft" :disabled="!ready" @click="add">
      {{ saving ? 'Adding…' : 'Add this text' }}
    </button>
  </div>
</template>

<style scoped>
.text-fallback {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.text-area {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 16px;
  background: var(--bg);
  border: 1px solid var(--o12);
  border-radius: var(--radius-input);
  color: var(--text);
  font-size: 14px;
  font-family: var(--font-sans);
  line-height: 1.5;
  resize: vertical;
  outline: none;
}

.text-area:focus {
  border-color: var(--accent-ink);
  box-shadow: var(--ring-focus);
}

.btn-soft {
  padding: 11px 18px;
  background: var(--o06);
  border: 1px solid var(--o14);
  border-radius: var(--radius-input);
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-soft:disabled {
  opacity: 0.5;
  cursor: default;
}

.step-error {
  margin: 0;
  font-size: 13.5px;
  color: var(--error-color);
}
</style>
