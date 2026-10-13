import { describe, it, expect, vi, beforeEach } from 'vitest'

const getProgress = vi.fn()
const hideRequest = vi.fn()
const canManageAgents = vi.fn()
vi.mock('@/services/onboarding', () => ({
  onboardingService: { getProgress: () => getProgress(), hide: () => hideRequest() }
}))
let userId = 'user-1'
vi.mock('@/services/user', () => ({ userService: { getUserId: () => userId } }))
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
    userId = 'user-1'
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

  it("never shows the previous sign-in's progress", async () => {
    const setup = await fresh()
    getProgress.mockResolvedValue(progress('teach'))
    await setup.load()

    userId = 'user-2'
    let answer: (v: unknown) => void = () => {}
    getProgress.mockReturnValue(new Promise((r) => (answer = r)))
    const loading = setup.load()
    expect(setup.progress.value).toBeNull() // not user-1's step while user-2's loads
    answer(progress('live'))
    await loading
    expect(setup.progress.value?.step).toBe('live')
  })

  it('a forced load waits for the one in flight, then fetches again', async () => {
    const setup = await fresh()
    let first: (v: unknown) => void = () => {}
    getProgress.mockReturnValueOnce(new Promise((r) => (first = r))).mockResolvedValue(progress('live'))
    const stale = setup.load()
    const forced = setup.load(true)
    first(progress('teach'))
    await Promise.all([stale, forced])
    expect(getProgress).toHaveBeenCalledTimes(2)
    expect(setup.progress.value?.step).toBe('live')
  })
})
