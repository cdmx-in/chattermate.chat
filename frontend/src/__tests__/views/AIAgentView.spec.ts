import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import AIAgentView from '../../views/AIAgentView.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock the components
vi.mock('@/layouts/DashboardLayout.vue', () => ({
  default: {
    name: 'DashboardLayout',
    template: '<div class="dashboard-layout"><slot /></div>',
    __isTeleport: false,
    __name: 'DashboardLayout'
  }
}))

vi.mock('@/components/aiagent/AIAgentSetup.vue', () => ({
  default: {
    name: 'AIAgentSetup',
    template: '<div class="ai-agent-setup"></div>',
    props: ['model'],
    __isTeleport: false,
    __name: 'AIAgentSetup'
  }
}))

describe('AIAgentView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(AIAgentView)
  })

  it('renders properly', () => {
    expect(wrapper.find('.dashboard-container').exists()).toBe(true)
    expect(wrapper.find('.chat-section').exists()).toBe(true)
  })

  it('contains AIAgentSetup component with correct props', () => {
    const aiAgentSetup = wrapper.findComponent({ name: 'AIAgentSetup' })
    expect(aiAgentSetup.exists()).toBe(true)
    expect(aiAgentSetup.props('model')).toBe('openai')
  })

  it('is wrapped in DashboardLayout', () => {
    const dashboardLayout = wrapper.findComponent({ name: 'DashboardLayout' })
    expect(dashboardLayout.exists()).toBe(true)
  })
}) 