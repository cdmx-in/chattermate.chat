import { describe, it, expect, vi, beforeEach } from 'vitest'

const getProgress = vi.fn()
const hideRequest = vi.fn()
const canManageAgents = vi.fn()
vi.mock('@/services/onboarding', () => ({
  onboardingService: { getProgress: () => getProgress(), hide: () => hideRequest() }
}))
vi.mock('@/utils/permissions', () => ({
  permissionChecks: { canManageAgents: () => canManageAgents() }
}))

const progress = (step: string, hidden = false) => ({ step, agent_id: null, widget_id: null, hidden })

// The composable keeps module-level state; give each test a fresh module.
const fresh = async () => {
  vi.resetModules()
  const { useSetupProgress } = await import('@/composables/useSetupProgress')
  return useSetupProgress()
}

describe('useSetupProgress', () => {
  beforeEach(() => {
    getProgress.mockReset()
    hideRequest.mockReset()
    canManageAgents.mockReturnValue(true)
  })

  it('numbers the wizard steps and shows the bar until live', async () => {
    const setup = await fresh()
    getProgress.mockResolvedValue(progress('teach'))
    await setup.load()
    expect(setup.stepNumber.value).toBe(2)
    expect(setup.showBar.value).toBe(true)

    getProgress.mockResolvedValue(progress('live'))
    await setup.load(true)
    expect(setup.stepNumber.value).toBeNull()
    expect(setup.showBar.value).toBe(false)
  })

  it('fetches once and shares the result until forced', async () => {
    const setup = await fresh()
    getProgress.mockResolvedValue(progress('create'))
    await Promise.all([setup.load(), setup.load()])
    await setup.load()
    expect(getProgress).toHaveBeenCalledTimes(1)
    await setup.load(true)
    expect(getProgress).toHaveBeenCalledTimes(2)
  })

  it('stays hidden once hidden, and for people who cannot build agents', async () => {
    const setup = await fresh()
    getProgress.mockResolvedValue(progress('test'))
    await setup.load()
    await setup.hide()
    expect(hideRequest).toHaveBeenCalled()
    expect(setup.showBar.value).toBe(false)

    const viewer = await fresh()
    canManageAgents.mockReturnValue(false)
    await viewer.load()
    expect(viewer.showBar.value).toBe(false)
  })

  it('keeps quiet when the progress call fails', async () => {
    const setup = await fresh()
    getProgress.mockRejectedValue(new Error('offline'))
    await setup.load()
    expect(setup.showBar.value).toBe(false)
  })
})
