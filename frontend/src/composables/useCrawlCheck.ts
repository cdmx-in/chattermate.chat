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

import type { Ref } from 'vue'
import type { QueueItem } from '@/types/knowledge'

const CHECK_FOR_MS = 15_000
const POLL_EVERY_MS = 2_500

const normalizeSource = (source: string) => source.trim().toLowerCase().replace(/\/+$/, '')
const sameSource = (a: string, b: string) => normalizeSource(a) === normalizeSource(b)

/** The newest row for each source: a retry must not be judged by the old failure.
 *  The queue API lists newest first. */
const newestPerSource = (items: QueueItem[]) => {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = normalizeSource(item.source)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Watch just-queued sources long enough to catch a fast failure - a domain
 * that doesn't resolve, a refused connection - before the wizard moves on.
 * Crawls that are still running when time is up carry on in the background.
 */
export function useCrawlCheck(fetchQueueItems: () => Promise<unknown>, queueItems: Ref<QueueItem[]>) {
  let cancelled = false

  /** The first of `sources` that failed within the window, or null. */
  const firstFailure = async (sources: string[], checkForMs = CHECK_FOR_MS): Promise<QueueItem | null> => {
    cancelled = false
    const deadline = Date.now() + checkForMs
    while (!cancelled) {
      await fetchQueueItems()
      const mine = newestPerSource(queueItems.value).filter((item) => sources.some((s) => sameSource(s, item.source)))
      const failed = mine.find((item) => item.status === 'failed')
      if (failed) return failed
      const unsettled = mine.some((item) => item.status === 'pending' || item.status === 'processing')
      if (!unsettled || Date.now() >= deadline) return null
      await new Promise((resolve) => setTimeout(resolve, POLL_EVERY_MS))
    }
    return null
  }

  /** Stop waiting (the user went Back, or the step unmounted). */
  const cancel = () => {
    cancelled = true
  }

  return { firstFailure, cancel }
}
