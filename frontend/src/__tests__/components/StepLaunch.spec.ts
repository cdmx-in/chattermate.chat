// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// The live/blocked status is an enterprise component (tested there): stub
// the slot so this spec covers the open-source step only.
vi.mock('@/composables/useEnterpriseFeatures', async () => {
  const { defineComponent, h } = await import('vue')
  const Slot = defineComponent({
    props: { widgetId: { type: String, default: null } },
    setup: (props) => () => h('p', { class: 'install-slot' }, props.widgetId),
  })
  return {
    useEnterpriseFeatures: () => ({
      moduleImports: { widgetInstallStatus: 'install-status' },
      enterpriseComponent: () => Slot,
    }),
  }
})
vi.mock('vue-sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

import StepLaunch from '@/components/aiagent/onboarding/steps/StepLaunch.vue'
import { WIDGET_INSTALL_GUIDE_URL } from '@/config/docs'

const mountStep = async (widgetId: string | null = 'w-1') => {
  const wrapper = mount(StepLaunch, { props: { widgetId, agentType: 'CUSTOMER_SUPPORT' } })
  await flushPromises()
  return wrapper
}

describe('StepLaunch', () => {
  it('offers a mailto with the real snippet and the install guide', async () => {
    const wrapper = await mountStep()

    const mailto = wrapper.find('a[href^="mailto:"]').attributes('href')!
    const body = new URLSearchParams(mailto.slice('mailto:?'.length)).get('body')!
    expect(body).toContain("window.chattermateId = 'w-1'")
    expect(body).toContain(WIDGET_INSTALL_GUIDE_URL)
    expect(mailto).not.toContain('+') // spaces encoded as %20 for mail clients
    expect(wrapper.find(`a[href="${WIDGET_INSTALL_GUIDE_URL}"]`).exists()).toBe(true)
  })

  it('hands the widget to the install status (hosted edition)', async () => {
    const wrapper = await mountStep()
    expect(wrapper.find('.install-slot').text()).toBe('w-1')
  })

  it('offers no mailto without a widget', async () => {
    const wrapper = await mountStep(null)
    expect(wrapper.find('a[href^="mailto:"]').exists()).toBe(false)
  })
})
