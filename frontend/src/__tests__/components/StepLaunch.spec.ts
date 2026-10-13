// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const getInstallStatus = vi.fn()
vi.mock('@/services/widget', () => ({
  widgetService: { getInstallStatus: (id: string) => getInstallStatus(id) }
}))
vi.mock('vue-sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

import StepLaunch from '@/components/aiagent/onboarding/steps/StepLaunch.vue'
import { WIDGET_INSTALL_GUIDE_URL } from '@/config/docs'

const none = { installed_at: null, installed_origin: null, blocked_origin: null, blocked_origin_seen_at: null, allowed_domain: 'teeckbox.com' }

const mountStep = async (widgetId: string | null = 'w-1') => {
  const wrapper = mount(StepLaunch, { props: { widgetId, agentType: 'CUSTOMER_SUPPORT' } })
  await flushPromises()
  return wrapper
}

describe('StepLaunch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    getInstallStatus.mockReset()
  })
  afterEach(() => vi.useRealTimers())

  it('offers a mailto with the real snippet and the install guide', async () => {
    getInstallStatus.mockResolvedValue(none)
    const wrapper = await mountStep()

    const mailto = wrapper.find('a[href^="mailto:"]').attributes('href')!
    const body = new URLSearchParams(mailto.slice('mailto:?'.length)).get('body')!
    expect(body).toContain("window.chattermateId = 'w-1'")
    expect(body).toContain(WIDGET_INSTALL_GUIDE_URL)
    expect(mailto).not.toContain('+') // spaces encoded as %20 for mail clients
    expect(wrapper.find(`a[href="${WIDGET_INSTALL_GUIDE_URL}"]`).exists()).toBe(true)
  })

  it('shows where the widget is live, and stops polling', async () => {
    getInstallStatus.mockResolvedValue({ ...none, installed_at: '2026-10-12T10:00:00Z', installed_origin: 'https://www.teeckbox.com' })
    const wrapper = await mountStep()

    expect(wrapper.text()).toContain('Live on www.teeckbox.com')
    await vi.advanceTimersByTimeAsync(30_000)
    expect(getInstallStatus).toHaveBeenCalledTimes(1)
  })

  it('warns about a blocked site and keeps checking', async () => {
    getInstallStatus.mockResolvedValue({ ...none, blocked_origin: 'https://shop.teeckbox.com', blocked_origin_seen_at: '2026-10-12T10:00:00Z' })
    const wrapper = await mountStep()

    expect(wrapper.text()).toContain('Blocked on shop.teeckbox.com: the chat only shows on teeckbox.com.')
    await vi.advanceTimersByTimeAsync(10_000)
    expect(getInstallStatus).toHaveBeenCalledTimes(2)
  })

  it('shows nothing and does not fetch without a widget', async () => {
    const wrapper = await mountStep(null)
    expect(getInstallStatus).not.toHaveBeenCalled()
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(false)
    expect(wrapper.find('.install-status').exists()).toBe(false)
  })

  it('survives a failed status check', async () => {
    getInstallStatus.mockRejectedValue(new Error('offline'))
    const wrapper = await mountStep()
    expect(wrapper.find('.install-status').exists()).toBe(false)
  })

  it("ignores a status that arrives for the widget it showed before", async () => {
    let releaseOld: (v: unknown) => void = () => {}
    getInstallStatus.mockImplementation((id: string) => id === 'w-1'
      ? new Promise((r) => (releaseOld = r))
      : Promise.resolve(none))
    const wrapper = await mountStep('w-1')
    await wrapper.setProps({ widgetId: 'w-2' })
    await flushPromises()

    releaseOld({ ...none, installed_at: '2026-10-12T10:00:00Z', installed_origin: 'https://old-site.com' })
    await flushPromises()

    expect(wrapper.text()).not.toContain('old-site.com')
  })
})
