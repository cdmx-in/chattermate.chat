import type { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent, defineComponent } from 'vue'

// Empty component for fallback
const EmptyComponent = defineComponent({
    name: 'EmptyComponent',
    template: '<div></div>'
})

// Enterprise routes with lazy loading
export const enterpriseRoutes: RouteRecordRaw[] = [
    {
        path: '/signup',
        name: 'signup',
        component: defineAsyncComponent({
            loader: () => import('@/modules/enterprise/views/SignupView.vue')
                .catch(() => EmptyComponent),
            onError: () => console.warn('Enterprise SignupView not available'),
        }),
        meta: { requiresAuth: false }
    },
    {
        path: '/settings/subscription',
        name: 'subscription',
        component: defineAsyncComponent({
            loader: () => import('@/modules/enterprise/views/SubscriptionView.vue')
                .catch(() => EmptyComponent),
            onError: () => console.warn('Enterprise SubscriptionView not available'),
        }),
        meta: {
            requiresAuth: true,
            layout: 'dashboard',
            title: 'Subscription Plans'
        }
    },
    {
        path: '/settings/subscription/setup/:planId',
        name: 'billing-setup',
        component: defineAsyncComponent({
            loader: () => import('@/modules/enterprise/views/BillingSetupView.vue')
                .catch(() => EmptyComponent),
            onError: () => console.warn('Enterprise BillingSetupView not available'),
        }),
        meta: { requiresAuth: true }
    }
]

// Helper function to load subscription guard
export const loadSubscriptionGuard = async () => {
    try {
        const { subscriptionGuard } = await import('@/modules/enterprise/router/guards/subscription')
        return subscriptionGuard
    } catch (error) {
        console.warn('Subscription guard not available')
        return null
    }
} 