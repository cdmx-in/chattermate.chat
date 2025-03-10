import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AIAgentSetup from '../../../components/aiagent/AIAgentSetup.vue'
import { nextTick } from 'vue'
import { AxiosError } from 'axios'

// Mock the child components
vi.mock('../../../components/ai/AISetup.vue', () => ({
  default: {
    name: 'AISetup',
    template: '<div class="ai-setup"></div>',
    emits: ['ai-setup-complete']
  }
}))

vi.mock('../../../components/agent/AgentList.vue', () => ({
  default: {
    name: 'AgentList',
    template: '<div class="agent-list"></div>'
  }
}))

// Mock the services
vi.mock('../../../services/ai', () => ({
  aiService: {
    getOrganizationConfig: vi.fn()
  }
}))

vi.mock('../../../services/agent', () => ({
  agentService: {
    getOrganizationAgents: vi.fn()
  }
}))

// Mock the storage utility
const mockAgentStorage = {
  getAgents: vi.fn(),
  setAgents: vi.fn()
}

vi.mock('../../../utils/storage', () => ({
  useAgentStorage: () => mockAgentStorage
}))

// Import mocked services
import { aiService } from '../../../services/ai'
import { agentService } from '../../../services/agent'

describe('AIAgentSetup', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    // Reset mock default returns
    mockAgentStorage.getAgents.mockReturnValue([])
    ;(aiService.getOrganizationConfig as any).mockResolvedValue({})
    ;(agentService.getOrganizationAgents as any).mockResolvedValue([])
  })

  const mountComponent = async () => {
    wrapper = mount(AIAgentSetup)
    await flushPromises()
    await nextTick()
    return wrapper
  }

  const waitForComponentUpdate = async () => {
    await flushPromises()
    await nextTick()
    await nextTick() // Double nextTick to ensure all reactive updates are processed
  }

  const waitForStateUpdate = async () => {
    await flushPromises()
    for (let i = 0; i < 3; i++) {
      await nextTick()
    }
    // Add a small delay to ensure all async operations complete
    await new Promise(resolve => setTimeout(resolve, 50))
    await nextTick()
  }

  it('renders properly', async () => {
    await mountComponent()
    expect(wrapper.find('.chat-window').exists()).toBe(true)
    expect(wrapper.find('.messages').exists()).toBe(true)
  })

  it('shows loading state initially', async () => {
    mockAgentStorage.getAgents.mockReturnValue([])
    ;(aiService.getOrganizationConfig as any).mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
      return {}
    })

    wrapper = mount(AIAgentSetup)
    await nextTick()

    expect(wrapper.find('.loading-container').exists()).toBe(true)
    expect(wrapper.find('.loader').exists()).toBe(true)
  })

  it('checks for existing agents on mount', async () => {
    await mountComponent()
    expect(mockAgentStorage.getAgents).toHaveBeenCalled()
  })

  it('skips AI config check if agents exist in storage', async () => {
    mockAgentStorage.getAgents.mockReturnValue([{ id: 1, name: 'Test Agent' }])
    await mountComponent()
    await waitForComponentUpdate()

    expect(aiService.getOrganizationConfig).not.toHaveBeenCalled()
    expect(agentService.getOrganizationAgents).not.toHaveBeenCalled()
  })

  it('checks AI config when no agents exist', async () => {
    await mountComponent()
    await waitForComponentUpdate()

    expect(aiService.getOrganizationConfig).toHaveBeenCalled()
  })

  it('fetches agents after successful AI config check', async () => {
    await mountComponent()
    await waitForComponentUpdate()

    expect(agentService.getOrganizationAgents).toHaveBeenCalled()
  })

  it('stores fetched agents in storage', async () => {
    const mockAgents = [{ id: 1, name: 'Test Agent' }]
    ;(agentService.getOrganizationAgents as any).mockResolvedValue(mockAgents)

    await mountComponent()
    await waitForComponentUpdate()

    expect(mockAgentStorage.setAgents).toHaveBeenCalledWith(mockAgents)
  })

  it('shows AI setup mode when no config exists', async () => {
    // Create a proper AxiosError instance
    const error = new AxiosError(
      'Not Found',
      '404',
      undefined,
      undefined,
      {
        status: 404,
        data: { detail: { error: 'AI configuration not found' } }
      } as any
    )

    // Mock the API error before mounting
    ;(aiService.getOrganizationConfig as any).mockRejectedValueOnce(error)
    mockAgentStorage.getAgents.mockReturnValue([])

    await mountComponent()
    await waitForStateUpdate()

    // Check the rendered content
    const setupMessages = wrapper.find('.setup-messages')
    expect(setupMessages.exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AISetup' }).exists()).toBe(true)
  })

  it('shows agent list when config exists', async () => {
    // Mock successful API responses
    ;(aiService.getOrganizationConfig as any).mockResolvedValue({})
    ;(agentService.getOrganizationAgents as any).mockResolvedValue([{ id: 1, name: 'Test Agent' }])
    mockAgentStorage.getAgents.mockReturnValue([])

    await mountComponent()
    await waitForStateUpdate()

    // Check the rendered content
    expect(wrapper.find('.agent-list-container').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AgentList' }).exists()).toBe(true)
  })

  it('handles AI config check error', async () => {
    // Mock the error without actually throwing it
    const errorMessage = 'Failed to check AI configuration'
    ;(aiService.getOrganizationConfig as any).mockImplementation(() => {
      return Promise.reject(new Error(errorMessage))
    })
    mockAgentStorage.getAgents.mockReturnValue([])

    await mountComponent()
    await waitForStateUpdate()

    // Verify error state
    const errorElement = wrapper.find('.error-message')
    expect(errorElement.exists()).toBe(true)
    expect(errorElement.text()).toBe(errorMessage)
  })

  it('handles agent fetch error', async () => {
    // Mock successful AI config check
    ;(aiService.getOrganizationConfig as any).mockResolvedValue({})
    
    // Mock the agent fetch error without actually throwing it
    const errorMessage = 'Failed to fetch agents'
    ;(agentService.getOrganizationAgents as any).mockImplementation(() => {
      return Promise.reject(new Error(errorMessage))
    })
    mockAgentStorage.getAgents.mockReturnValue([])

    await mountComponent()
    await waitForStateUpdate()

    // Verify error state
    const errorElement = wrapper.find('.error-message')
    expect(errorElement.exists()).toBe(true)
    expect(errorElement.text()).toBe(errorMessage)
  })

  it('rechecks AI config when setup is completed', async () => {
    // Create a proper AxiosError instance for the first call
    const error = new AxiosError(
      'Not Found',
      '404',
      undefined,
      undefined,
      {
        status: 404,
        data: { detail: { error: 'AI configuration not found' } }
      } as any
    )

    // Mock the API responses
    ;(aiService.getOrganizationConfig as any)
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce({})
    ;(agentService.getOrganizationAgents as any).mockResolvedValue([{ id: 1, name: 'Test Agent' }])
    mockAgentStorage.getAgents.mockReturnValue([])

    await mountComponent()
    await waitForStateUpdate()

    // Find and trigger the setup complete event
    const aiSetup = wrapper.findComponent({ name: 'AISetup' })
    expect(aiSetup.exists()).toBe(true)
    
    // Trigger the setup complete event
    await aiSetup.vm.$emit('ai-setup-complete')
    await waitForStateUpdate()

    // Verify the state transition
    expect(aiService.getOrganizationConfig).toHaveBeenCalledTimes(2)
    expect(agentService.getOrganizationAgents).toHaveBeenCalled()
    
    // Check that the component has transitioned to showing the agent list
    expect(wrapper.find('.agent-list-container').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AgentList' }).exists()).toBe(true)
  })

  it('applies correct styling', async () => {
    await mountComponent()
    
    const chatWindow = wrapper.find('.chat-window')
    expect(chatWindow.classes()).toContain('chat-window')
    
    const messages = wrapper.find('.messages')
    expect(messages.classes()).toContain('messages')
  })
}) 