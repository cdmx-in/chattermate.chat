// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const getProgress = vi.fn()
const getAgentById = vi.fn()
vi.mock('@/services/onboarding', () => ({
  onboardingService: { getProgress: () => getProgress(), hide: vi.fn() }
}))
vi.mock('@/services/agent', () => ({
  agentService: { getAgentById: (id: string) => getAgentById(id) }
}))
vi.mock('@/services/user', () => ({
  userService: { getCurrentUser: () => ({ organization_id: 'org-1' }) }
}))
vi.mock('@/utils/permissions', () => ({ permissionChecks: { canManageAgents: () => true } }))

const STORAGE_KEY = 'chattermate:onboarding:v1'
const stubs = {
  StepCreate: { template: '<div class="step-create" />' },
  StepTeach: { props: ['agentId'], template: '<div class="step-teach">{{ agentId }}</div>' },
  StepTest: { props: ['widgetId'], template: '<div class="step-test">{{ widgetId }}</div>' },
  StepLaunch: { props: ['widgetId'], template: '<div class="step-launch">{{ widgetId }}</div>' },
}

const mountWizard = async () => {
  vi.resetModules()
  const { default: AIAgentOnboarding } = await import('@/components/aiagent/onboarding/AIAgentOnboarding.vue')
  const wrapper = mount(AIAgentOnboarding, { global: { stubs } })
  await flushPromises()
  return wrapper
}

describe('AIAgentOnboarding - where it resumes', () => {
  beforeEach(() => {
    localStorage.clear()
    getProgress.mockReset()
    getAgentById.mockReset().mockResolvedValue({ id: 'agent-9', name: 'Tom', agent_type: 'CUSTOMER_SUPPORT' })
  })

  it('on a fresh device, opens at the step the server reports', async () => {
    getProgress.mockResolvedValue({ step: 'test', agent_id: 'agent-9', widget_id: 'w-9', hidden: false })
    const wrapper = await mountWizard()
    expect(wrapper.find('.step-test').text()).toBe('w-9')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)['org-1'].agentId).toBe('agent-9')
  })

  it('opens Launch for an org that has tested but is not live', async () => {
    getProgress.mockResolvedValue({ step: 'launch', agent_id: 'agent-9', widget_id: 'w-9', hidden: false })
    const wrapper = await mountWizard()
    expect(wrapper.find('.step-launch').exists()).toBe(true)
  })

  it('starts at Create when the org has no agent', async () => {
    getProgress.mockResolvedValue({ step: 'create', agent_id: null, widget_id: null, hidden: false })
    const wrapper = await mountWizard()
    expect(wrapper.find('.step-create').exists()).toBe(true)
  })

  it("prefers this browser's own run over the server", async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      'org-1': { skipped: false, currentStep: 1, completedSteps: [0], agentId: 'agent-9', agentName: 'Tom', widgetId: null, updatedAt: 1 },
    }))
    const wrapper = await mountWizard()
    expect(getProgress).not.toHaveBeenCalled()
    expect(wrapper.find('.step-teach').text()).toBe('agent-9')
  })
})
