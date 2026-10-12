// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const push = vi.fn()
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))
const getProgress = vi.fn()
const hideRequest = vi.fn()
vi.mock('@/services/onboarding', () => ({
  onboardingService: { getProgress: () => getProgress(), hide: () => hideRequest() }
}))
vi.mock('@/utils/permissions', () => ({ permissionChecks: { canManageAgents: () => true } }))

const mountBar = async (step: string, hidden = false) => {
  vi.resetModules()
  getProgress.mockResolvedValue({ step, agent_id: 'a-1', widget_id: 'w-1', hidden })
  const { default: SetupProgressBar } = await import('@/components/onboarding/SetupProgressBar.vue')
  const wrapper = mount(SetupProgressBar)
  await flushPromises()
  return wrapper
}

describe('SetupProgressBar', () => {
  beforeEach(() => {
    push.mockReset()
    hideRequest.mockReset().mockResolvedValue(undefined)
  })

  it('names the step and links back into the wizard', async () => {
    const wrapper = await mountBar('teach')
    expect(wrapper.text()).toContain('step 2 of 4')
    expect(wrapper.text()).toContain('Teach it your business')
    await wrapper.find('.setup-cta').trigger('click')
    expect(push).toHaveBeenCalledWith({ name: 'ai-agents', query: { setup: '1' } })
  })

  it('goes away when hidden', async () => {
    const wrapper = await mountBar('launch')
    await wrapper.find('.setup-hide').trigger('click')
    await flushPromises()
    expect(hideRequest).toHaveBeenCalled()
    expect(wrapper.find('.setup-bar').exists()).toBe(false)
  })

  it('renders nothing once live or hidden', async () => {
    expect((await mountBar('live')).find('.setup-bar').exists()).toBe(false)
    expect((await mountBar('create', true)).find('.setup-bar').exists()).toBe(false)
  })
})
