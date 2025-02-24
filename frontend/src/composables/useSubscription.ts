import { ref } from 'vue'
import type { Ref } from 'vue'

// Define subscription store types
interface Plan {
    id: string;
    name: string;
    type: string;
    price_per_agent: number;
    billing_interval: string;
    is_active: boolean;
    max_agents: number | null;
    max_knowledge_sources: number;
    max_sub_pages: number;
    data_retention_days: number;
    features: Record<string, boolean>;
}

interface Subscription {
    id: string;
    plan: Plan;
    status: string;
    trial_end?: string;
    current_period_end?: string;
    cancel_at_period_end?: boolean;
    history: Array<{
        id: string;
        status: string;
        plan_id: string;
        trial_start: string | null;
        trial_end: string | null;
        current_period_start: string | null;
        current_period_end: string | null;
        payment_provider: string;
        created_at: string;
    }>;
}

export interface SubscriptionStore {
    currentPlan: Ref<Subscription | null>;
    isLoadingPlan: Ref<boolean>;
    isInTrial: Ref<boolean>;
    trialDaysLeft: Ref<number>;
    fetchCurrentPlan: () => Promise<void>;
}

// Default subscription store for open source version
const defaultSubscriptionStore: SubscriptionStore = {
    currentPlan: ref(null),
    isLoadingPlan: ref(false),
    isInTrial: ref(false),
    trialDaysLeft: ref(0),
    fetchCurrentPlan: async () => {}
}

// Check for enterprise module using dynamic import
const hasEnterpriseModule = async (): Promise<boolean> => {
    try {
        // Use a more reliable way to check for module existence
        const enterpriseModule = await import('@/modules/enterprise/views/SignupView.vue')
            .then(() => true)
            .catch(() => false)
        return enterpriseModule
    } catch {
        return false
    }
}

// Get subscription store based on availability
export const useSubscription = async (): Promise<SubscriptionStore> => {
    const isEnterpriseAvailable = await hasEnterpriseModule()
    
    if (!isEnterpriseAvailable) {
        return defaultSubscriptionStore
    }

    try {
        // Use dynamic import with explicit error handling
        const enterpriseStore = await import('@/modules/enterprise/composables/useSubscriptionStore')
            .then(module => module.subscriptionStore)
            .catch(() => null)

        if (enterpriseStore) {
            return enterpriseStore
        }
    } catch {
        // Fail silently and return default store
    }

    return defaultSubscriptionStore
} 