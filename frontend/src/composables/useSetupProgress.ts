/*
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
*/

import { computed, ref } from 'vue'
import { onboardingService, type SetupProgress, type SetupStep } from '@/services/onboarding'
import { permissionChecks } from '@/utils/permissions'

// The wizard's four steps; "live" is past the end.
const WIZARD_STEPS: SetupStep[] = ['create', 'teach', 'test', 'launch']
const STALE_AFTER_MS = 60_000

// Shared by every page in the session: fetched once, refreshed when stale or
// when something (the wizard) says it changed. Never polled.
const progress = ref<SetupProgress | null>(null)
let loadedAt = 0
let inFlight: Promise<void> | null = null

export function useSetupProgress() {
  const load = (force = false): Promise<void> => {
    if (inFlight) return inFlight
    if (!force && progress.value && Date.now() - loadedAt < STALE_AFTER_MS) return Promise.resolve()
    inFlight = onboardingService
      .getProgress()
      .then((value) => {
        progress.value = value
        loadedAt = Date.now()
      })
      .catch((err) => console.error('Failed to load setup progress:', err))
      .finally(() => {
        inFlight = null
      })
    return inFlight
  }

  const hide = async () => {
    await onboardingService.hide()
    if (progress.value) progress.value = { ...progress.value, hidden: true }
  }

  /** 1-based wizard step, or null once live. */
  const stepNumber = computed(() => {
    const index = progress.value ? WIZARD_STEPS.indexOf(progress.value.step) : -1
    return index >= 0 ? index + 1 : null
  })

  const showBar = computed(
    () => !!progress.value && !progress.value.hidden && stepNumber.value !== null && permissionChecks.canManageAgents(),
  )

  return { progress, stepNumber, stepCount: WIZARD_STEPS.length, showBar, load, hide }
}
