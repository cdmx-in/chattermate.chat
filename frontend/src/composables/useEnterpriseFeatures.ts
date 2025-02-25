import { ref, readonly, defineComponent, h } from 'vue'
import type { Component } from 'vue'

// Create a proper Vue component for the fallback
const NotAvailableComponent = defineComponent({
  name: 'NotAvailable',
  setup() {
    return () => h('div', 'Feature not available in open source version')
  }
})

// Check for enterprise module
const enterpriseModules = import.meta.glob([
  '@/modules/enterprise/views/SignupView.vue',
  '@/modules/enterprise/composables/useSubscriptionStore',
  '@/modules/enterprise/router/guards/subscription'
])
const hasEnterpriseModule = Object.keys(enterpriseModules).length > 0

interface Plan {
  type: string
  name: string
}

interface SubscriptionPlan {
  plan: Plan
}

interface SubscriptionStore {
  currentPlan: SubscriptionPlan | null
  isLoadingPlan: boolean
  isInTrial: boolean
  trialDaysLeft: number
  fetchCurrentPlan: () => Promise<void>
}

interface SubscriptionGuard {
  subscriptionGuard: (to: any, from: any, next: any) => void
}

type EnterpriseModule = {
  default?: Component
  subscriptionStore?: SubscriptionStore
  subscriptionGuard?: (to: any, from: any, next: any) => void
}

// Create a mapping of module paths to their glob imports
const moduleImports = {
  signupView: '/src/modules/enterprise/views/SignupView.vue',
  subscriptionView: '/src/modules/enterprise/views/SubscriptionView.vue',
  billingSetupView: '/src/modules/enterprise/views/BillingSetupView.vue',
  subscriptionStore: '/src/modules/enterprise/composables/useSubscriptionStore',
  subscriptionGuard: '/src/modules/enterprise/router/guards/subscription'
}

// Default subscription state
const defaultSubscriptionState: SubscriptionStore = {
  currentPlan: null,
  isLoadingPlan: false,
  isInTrial: false,
  trialDaysLeft: 0,
  fetchCurrentPlan: () => Promise.resolve()
}

export const useEnterpriseFeatures = () => {
  const subscriptionStore = ref<SubscriptionStore>(defaultSubscriptionState)

  // Create a single glob pattern that matches all possible enterprise module paths
  const modules = import.meta.glob<EnterpriseModule>([
    '/src/modules/enterprise/**/*.vue',
    '/src/modules/enterprise/**/*.ts'
  ])

  // Check if any enterprise modules exist
  const hasEnterpriseModule = Object.keys(modules).length > 0

  const loadModule = async (modulePath: string): Promise<EnterpriseModule | null> => {
    if (!hasEnterpriseModule) {
      return null
    }

    try {
      if (modules[modulePath]) {
        const module = await modules[modulePath]()
        return module
      }
      
      console.warn(`Enterprise module not found: ${modulePath}`)
      return null
    } catch (error) {
      console.warn(`Failed to load enterprise module: ${modulePath}`, error)
      return null
    }
  }

  const initializeSubscriptionStore = async () => {
    if (hasEnterpriseModule) {
      try {
        const module = await loadModule(moduleImports.subscriptionStore)
        if (module?.subscriptionStore) {
          subscriptionStore.value = module.subscriptionStore
        }
      } catch (error) {
        console.warn('Enterprise subscription store not available:', error)
      }
    }
  }

  return {
    hasEnterpriseModule,
    subscriptionStore: readonly(subscriptionStore),
    initializeSubscriptionStore,
    loadModule,
    moduleImports,
    NotAvailableComponent
  }
} 