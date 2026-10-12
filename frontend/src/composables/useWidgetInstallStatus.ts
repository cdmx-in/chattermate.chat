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

import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import type { WidgetInstallStatus } from '@/types/widget'
import { widgetService } from '@/services/widget'

const POLL_MS = 10_000

/**
 * Where a widget is live (or blocked), refreshed while the page is open so
 * "Live on example.com" appears once someone loads their site. Stops polling
 * once it is live; skips ticks while the tab is hidden.
 */
export function useWidgetInstallStatus(widgetId: Ref<string | null>) {
  const status = ref<WidgetInstallStatus | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const hostOf = (origin: string | null | undefined) => {
    if (!origin) return null
    try {
      return new URL(origin).host
    } catch {
      return origin
    }
  }

  const refresh = async () => {
    if (!widgetId.value || document.hidden) return
    try {
      status.value = await widgetService.getInstallStatus(widgetId.value)
      if (status.value.installed_at) stop()
    } catch (err) {
      // Status is a nicety: keep the last known value and try again next tick.
      console.error('Failed to load widget install status:', err)
    }
  }

  const stop = () => {
    if (timer) clearInterval(timer)
    timer = null
  }

  const start = () => {
    stop()
    status.value = null
    if (!widgetId.value) return
    refresh()
    timer = setInterval(refresh, POLL_MS)
  }

  onMounted(start)
  watch(widgetId, start)
  onBeforeUnmount(stop)

  return {
    status,
    liveOn: computed(() => hostOf(status.value?.installed_origin)),
    blockedOn: computed(() => hostOf(status.value?.blocked_origin)),
  }
}
