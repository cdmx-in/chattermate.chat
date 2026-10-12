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
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSetupProgress } from '@/composables/useSetupProgress'

const STEP_LABELS: Record<string, string> = {
  create: 'Create your agent',
  teach: 'Teach it your business',
  test: 'Try it out',
  launch: 'Put it on your site',
}

const router = useRouter()
const { progress, stepNumber, stepCount, showBar, load, hide } = useSetupProgress()

const label = computed(() => (progress.value ? STEP_LABELS[progress.value.step] : ''))

const resume = () => router.push({ name: 'ai-agents', query: { setup: '1' } })

const hideBar = async () => {
  try {
    await hide()
  } catch (err) {
    console.error('Failed to hide setup bar:', err)
  }
}

onMounted(() => load())
</script>

<template>
  <div v-if="showBar" class="setup-bar" role="status">
    <div class="setup-text">
      <span class="setup-step">Finish setup · step {{ stepNumber }} of {{ stepCount }}</span>
      <span class="setup-label">{{ label }}</span>
    </div>
    <div class="setup-actions">
      <button type="button" class="setup-hide" @click="hideBar">Hide</button>
      <button type="button" class="setup-cta" @click="resume">Continue setup →</button>
    </div>
  </div>
</template>

<style scoped>
.setup-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
  margin-bottom: 18px;
  background: linear-gradient(120deg, var(--purple-bg), var(--accent-bg-08));
  border: 1px solid var(--o10);
  border-radius: 14px;
}

.setup-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.setup-step {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.setup-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--text);
}

.setup-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.setup-hide {
  background: none;
  border: 0;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
}

.setup-cta {
  padding: 9px 16px;
  background: var(--accent-solid);
  color: var(--on-accent-solid);
  border: 0;
  border-radius: var(--radius-btn);
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .setup-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .setup-actions {
    justify-content: space-between;
  }
}
</style>
