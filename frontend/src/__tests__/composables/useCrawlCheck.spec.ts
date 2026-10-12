import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import type { QueueItem } from '@/types/knowledge'
import { useCrawlCheck } from '@/composables/useCrawlCheck'

const item = (source: string, status: QueueItem['status'], id = 1): QueueItem =>
  ({ id, source, source_type: 'website', status, created_at: '' }) as QueueItem

describe('useCrawlCheck', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const setup = (snapshots: QueueItem[][]) => {
    const queue = ref<QueueItem[]>([])
    let call = 0
    const fetch = vi.fn(async () => {
      queue.value = snapshots[Math.min(call, snapshots.length - 1)]
      call += 1
    })
    return { fetch, ...useCrawlCheck(fetch, queue) }
  }

  it('reports a fast failure', async () => {
    const { firstFailure } = setup([[item('https://x.com', 'pending')], [item('https://x.com/', 'failed')]])
    const result = firstFailure(['https://x.com'])
    await vi.advanceTimersByTimeAsync(3000)
    expect((await result)?.status).toBe('failed')
  })

  it('gives up waiting once time is up and the crawl carries on', async () => {
    const { firstFailure, fetch } = setup([[item('https://x.com', 'processing')]])
    const result = firstFailure(['https://x.com'], 5000)
    await vi.advanceTimersByTimeAsync(6000)
    expect(await result).toBeNull()
    expect(fetch.mock.calls.length).toBeGreaterThan(1)
  })

  it('returns at once when the source already finished', async () => {
    const { firstFailure, fetch } = setup([[]]) // completed items drop off the list
    expect(await firstFailure(['https://x.com'])).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('judges a retry by its newest row, not an older failure', async () => {
    const { firstFailure } = setup([[item('https://x.com', 'pending', 2), item('https://x.com', 'failed', 1)], []])
    const result = firstFailure(['https://x.com'])
    await vi.advanceTimersByTimeAsync(3000)
    expect(await result).toBeNull()
  })

  it('stops when cancelled', async () => {
    const { firstFailure, cancel } = setup([[item('https://x.com', 'processing')]])
    const result = firstFailure(['https://x.com'])
    cancel()
    await vi.advanceTimersByTimeAsync(3000)
    expect(await result).toBeNull()
  })
})
