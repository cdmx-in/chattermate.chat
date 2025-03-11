import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AIAgentSetup from '../../../components/aiagent/AIAgentSetup.vue'
import { nextTick } from 'vue'
import { AxiosError } from 'axios'

// Mock the child components
vi.mock('@/components/ai/AISetup.vue', () => ({
  default: {
    name: 'AISetup',
    template: '<div class="ai-setup"></div>',
    emits: ['ai-setup-complete'],
    __isTeleport: false,
    __name: 'AISetup'
  }
}))

vi.mock('@/components/agent/AgentList.vue', () => ({
  default: {
    name: 'AgentList',
    template: '<div class="agent-list"></div>',
    __isTeleport: false,
    __name: 'AgentList'
  }
}))

// Mock the services
vi.mock('@/services/ai', () => ({
  aiService: {
    getOrganizationConfig: vi.fn()
  }
}))

vi.mock('@/services/agent', () => ({
  agentService: {
    getOrganizationAgents: vi.fn()
  }
}))

// Mock the storage utility
const mockAgentStorage = {
  getAgents: vi.fn(),
  setAgents: vi.fn()
}

vi.mock('@/utils/storage', () => ({
  useAgentStorage: () => mockAgentStorage
}))

// Import mocked services
import { aiService } from '@/services/ai'
import { agentService } from '@/services/agent'

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
    await nextTick()
    return wrapper
  }

  const waitForComponentUpdate = async () => {
    await flushPromises()
    await nextTick()
    await nextTick() // Double nextTick to ensure all reactive updates are processed
  }

  const waitForStateUpdate = async () => {
    await waitForComponentUpdate()
    await new Promise(resolve => setTimeout(resolve, 0))
    await nextTick()
    await nextTick() // Add an extra nextTick to ensure all state updates are processed
  }

  it('renders properly', async () => {
    await mountComponent()
    expect(wrapper.find('.chat-window').exists()).toBe(true)
    expect(wrapper.find('.messages').exists()).toBe(true)
  })

  it('shows loading state initially', async () => {
    mockAgentStorage.getAgents.mockReturnValue([])
    await mountComponent()
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

    await mountComponent()
    await waitForStateUpdate()

    // Debug the component's state
    const vm = wrapper.vm as any
    console.log('Component state:', {
      isAISetupMode: vm.isAISetupMode,
      error: vm.error,
      isLoading: vm.isLoading
    })

    // Now check the rendered content
    expect(vm.isAISetupMode).toBe(true)
    expect(vm.error).toBe(null)
    expect(vm.isLoading).toBe(false)

    // Check the rendered content
    const setupMessages = wrapper.find('.setup-messages')
    expect(setupMessages.exists()).toBe(true)
    const aiSetup = setupMessages.findComponent({ name: 'AISetup' })
    expect(aiSetup.exists()).toBe(true)
  })

  it('shows agent list when config exists', async () => {
    await mountComponent()
    await waitForComponentUpdate()

    expect(wrapper.find('.agent-list-container').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AgentList' }).exists()).toBe(true)
  })

  it('handles AI config check error', async () => {
    const error = new Error('Failed to check AI configuration')
    ;(aiService.getOrganizationConfig as any).mockRejectedValue(error)

    await mountComponent()
    await waitForComponentUpdate()

    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Failed to check AI configuration')
  })

  it('handles agent fetch error', async () => {
    const error = new Error('Failed to fetch agents')
    ;(agentService.getOrganizationAgents as any).mockRejectedValue(error)

    await mountComponent()
    await waitForComponentUpdate()

    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Failed to fetch agents')
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

    await mountComponent()
    await waitForStateUpdate()

    // Debug the component's state before setup complete
    const vm = wrapper.vm as any
    console.log('Component state before setup complete:', {
      isAISetupMode: vm.isAISetupMode,
      error: vm.error,
      isLoading: vm.isLoading
    })

    // Find and trigger the setup complete event
    const setupMessages = wrapper.find('.setup-messages')
    expect(setupMessages.exists()).toBe(true)
    const aiSetup = setupMessages.findComponent({ name: 'AISetup' })
    expect(aiSetup.exists()).toBe(true)
    await aiSetup.vm.$emit('ai-setup-complete')
    
    // Wait for all updates to process
    await waitForStateUpdate()

    // Debug the component's state after setup complete
    console.log('Component state after setup complete:', {
      isAISetupMode: vm.isAISetupMode,
      error: vm.error,
      isLoading: vm.isLoading
    })

    // Verify the state transition
    expect(aiService.getOrganizationConfig).toHaveBeenCalledTimes(2)
    expect(agentService.getOrganizationAgents).toHaveBeenCalled()
    expect(wrapper.find('.agent-list-container').exists()).toBe(true)
  })

  it('applies correct styling', async () => {
    await mountComponent()
    
    const chatWindow = wrapper.find('.chat-window')
    expect(chatWindow.classes()).toContain('chat-window')
    
    const messages = wrapper.find('.messages')
    expect(messages.classes()).toContain('messages')
  })
}) 