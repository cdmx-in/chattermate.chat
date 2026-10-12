// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

const getOrganization = vi.fn()
const getKnowledgeByAgent = vi.fn()
const getKnowledgeByOrganization = vi.fn()
const getAgentQueueItems = vi.fn()
const addUrls = vi.fn()
const planLimits = vi.fn()

vi.mock('@/services/organization', () => ({
  organizationService: { getOrganization: (id: string) => getOrganization(id) }
}))
vi.mock('@/services/knowledge', () => ({
  knowledgeService: {
    getKnowledgeByAgent: (...a: unknown[]) => getKnowledgeByAgent(...a),
    getKnowledgeByOrganization: (...a: unknown[]) => getKnowledgeByOrganization(...a),
    addUrls: (...a: unknown[]) => addUrls(...a),
    getAgentQueueItems: (...a: unknown[]) => getAgentQueueItems(...a)
  }
}))
vi.mock('@/utils/storage', () => ({
  subscriptionStorage: { getPlanLimits: () => planLimits() }
}))

import StepTeach from '@/components/aiagent/onboarding/steps/StepTeach.vue'

const empty = { knowledge: [], pagination: { total_pages: 0 } }

const mountStep = async () => {
  const wrapper = mount(StepTeach, {
    props: { agentId: 'agent-1', organizationId: 'org-1' },
    global: { plugins: [createPinia()] }
  })
  await flushPromises()
  return wrapper
}

const clickContinue = async (wrapper: any) => {
  const cont = wrapper.findAll('button').find((b: any) => b.text().includes('Continue'))!
  await cont.trigger('click')
  await flushPromises()
}

const typeAndAdd = async (wrapper: any, url: string) => {
  await wrapper.find('input[type="text"]').setValue(url)
  await wrapper.findAll('button').find((b: any) => b.text() === 'Add')!.trigger('click')
}

const staged = (wrapper: any) =>
  wrapper.findAll('.source-list:not(.indexed) .source-name').map((n: any) => n.text())

describe('StepTeach - only advances when the sources were accepted', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    getKnowledgeByAgent.mockResolvedValue(empty)
    getKnowledgeByOrganization.mockResolvedValue(empty)
    getAgentQueueItems.mockResolvedValue({ queue_items: [] })
    getOrganization.mockResolvedValue({ id: 'org-1', domain: 'teeckbox.com' })
    planLimits.mockReturnValue({ maxKnowledgeSources: 0 })
  })

  it('stays on the step and shows the server reason when the add is refused', async () => {
    addUrls.mockRejectedValue(new Error('Cannot add URLs: Maximum number of knowledge sources (1) would be exceeded'))
    const wrapper = await mountStep()

    await clickContinue(wrapper)

    expect(wrapper.emitted('next')).toBeFalsy()
    expect(wrapper.find('.step-error').text()).toContain('Maximum number of knowledge sources')
    // The batch stays staged so the user can fix it.
    expect(staged(wrapper)).toEqual(['https://teeckbox.com'])
  })

  it('stays on the step when the URL already exists', async () => {
    addUrls.mockResolvedValue({ error: 'Some URLs already exist in your knowledge base', duplicate_urls: ['https://teeckbox.com'] })
    const wrapper = await mountStep()

    await clickContinue(wrapper)

    expect(wrapper.emitted('next')).toBeFalsy()
    expect(wrapper.find('.step-error').text()).toContain('already exist')
  })

  it('advances once the add is accepted', async () => {
    addUrls.mockResolvedValue({ message: 'Queued' })
    const wrapper = await mountStep()

    await clickContinue(wrapper)

    expect(wrapper.emitted('next')).toBeTruthy()
  })

  it('advances with nothing staged', async () => {
    getOrganization.mockResolvedValue({ id: 'org-1', domain: '' })
    const wrapper = await mountStep()

    await clickContinue(wrapper)

    expect(addUrls).not.toHaveBeenCalled()
    expect(wrapper.emitted('next')).toBeTruthy()
  })
})

describe('StepTeach - plan source cap', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    getKnowledgeByAgent.mockResolvedValue(empty)
    getKnowledgeByOrganization.mockResolvedValue(empty)
    getAgentQueueItems.mockResolvedValue({ queue_items: [] })
    getOrganization.mockResolvedValue({ id: 'org-1', domain: 'teeckbox.com' })
    addUrls.mockResolvedValue({ message: 'Queued' })
  })

  it('on a one-source plan, a typed URL replaces the staged signup domain', async () => {
    planLimits.mockReturnValue({ maxKnowledgeSources: 1 })
    const wrapper = await mountStep()

    await typeAndAdd(wrapper, 'www.teeckbox.com')

    expect(staged(wrapper)).toEqual(['https://www.teeckbox.com'])
    expect(wrapper.find('.step-error').exists()).toBe(false)
    await clickContinue(wrapper)
    expect(addUrls.mock.calls[0][1]).toEqual(['https://www.teeckbox.com'])
    expect(wrapper.emitted('next')).toBeTruthy()
  })

  it('says so when the cap is already used by a source on any agent', async () => {
    planLimits.mockReturnValue({ maxKnowledgeSources: 1 })
    getKnowledgeByOrganization.mockResolvedValue({
      knowledge: [{ id: 1, name: 'https://elsewhere.com' }],
      pagination: { total_pages: 1, total_count: 1 }
    })
    const wrapper = await mountStep()

    await typeAndAdd(wrapper, 'docs.teeckbox.com')

    expect(staged(wrapper)).toEqual([])
    expect(wrapper.find('.step-error').text()).toContain('already in use')
  })

  it('keeps every staged source when the plan has room', async () => {
    planLimits.mockReturnValue({ maxKnowledgeSources: 5 })
    const wrapper = await mountStep()

    await typeAndAdd(wrapper, 'docs.teeckbox.com')

    expect(staged(wrapper)).toEqual(['https://teeckbox.com', 'https://docs.teeckbox.com'])
  })
  it('counts a crawl that is still running against the cap', async () => {
    planLimits.mockReturnValue({ maxKnowledgeSources: 1 })
    getAgentQueueItems.mockResolvedValue({
      queue_items: [{ id: 9, source: 'https://docs.other.com', source_type: 'website', status: 'processing', created_at: '' }]
    })
    const wrapper = await mountStep()

    await typeAndAdd(wrapper, 'blog.teeckbox.com')

    expect(staged(wrapper)).toEqual([])
    expect(wrapper.find('.step-error').text()).toContain('already in use')
  })

  it('back from a later step, does not re-stage a domain that is still crawling', async () => {
    planLimits.mockReturnValue({ maxKnowledgeSources: 1 })
    getAgentQueueItems.mockResolvedValue({
      queue_items: [{ id: 9, source: 'https://teeckbox.com', source_type: 'website', status: 'pending', created_at: '' }]
    })
    const wrapper = await mountStep()

    expect(staged(wrapper)).toEqual([])
    await clickContinue(wrapper)
    expect(addUrls).not.toHaveBeenCalled()
    expect(wrapper.emitted('next')).toBeTruthy()
  })
})
