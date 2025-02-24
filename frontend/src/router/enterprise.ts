import type { RouteRecordRaw, NavigationGuardWithThis } from 'vue-router'
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'

// Empty component for fallback using render function instead of template
const EmptyComponent = defineComponent({
    name: 'EmptyComponent',
    render() {
        return h('div', { class: 'empty-enterprise-component' }, 'This feature requires the enterprise version')
    }
})

// Enterprise routes
export const enterpriseRoutes: RouteRecordRaw[] = __ENTERPRISE_AVAILABLE__ ? [
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/modules/enterprise/views/SignupView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/settings/subscription',
        name: 'subscription',
        component: () => import('@/modules/enterprise/views/SubscriptionView.vue'),
        meta: {
            requiresAuth: true,
            layout: 'dashboard',
            title: 'Subscription Plans'
        }
    },
    {
        path: '/settings/subscription/setup/:planId',
        name: 'billing-setup',
        component: () => import('@/modules/enterprise/views/BillingSetupView.vue'),
        meta: { requiresAuth: true }
    }
] : [
    {
        path: '/signup',
        name: 'signup',
        component: EmptyComponent,
        meta: { requiresAuth: false }
    },
    {
        path: '/settings/subscription',
        name: 'subscription',
        component: EmptyComponent,
        meta: {
            requiresAuth: true,
            layout: 'dashboard',
            title: 'Subscription Plans'
        }
    },
    {
        path: '/settings/subscription/setup/:planId',
        name: 'billing-setup',
        component: EmptyComponent,
        meta: { requiresAuth: true }
    }
]

// Helper function to load subscription guard
export const loadSubscriptionGuard = async (): Promise<NavigationGuardWithThis<undefined> | null> => {
    if (!__ENTERPRISE_AVAILABLE__) {
        console.debug('Enterprise subscription guard not available')
        return null
    }

    try {
        const module = await import('@/modules/enterprise/router/guards/subscription')
        return module.subscriptionGuard
    } catch (error) {
        console.debug('Failed to load enterprise subscription guard:', error)
        return null
    }
} 