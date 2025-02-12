import { createRouter, createWebHistory } from 'vue-router'
import { userService } from '@/services/user'
import { listOrganizations } from '@/services/organization'
import { permissionChecks, hasAnyPermission } from '@/utils/permissions'
import HumanAgentView from '@/views/HumanAgentView.vue'
import OrganizationSettings from '@/views/settings/OrganizationSettings.vue'
import AIConfigSettings from '@/views/settings/AIConfigSettings.vue'

// Base routes
const baseRoutes = [
  {
    path: '/',
    redirect: '/ai-agents',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('@/views/SetupView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/ai-agents',
    name: 'ai-agents',
    component: () => import('@/views/AIAgentView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('@/views/AnalyticsView.vue'),
    meta: { 
      requiresAuth: true,
      layout: 'dashboard',
      title: 'Analytics Dashboard',
      permissions: ['view_analytics']
    }
  },
  {
    path: '/widget/:id',
    name: 'widget',
    component: () => import('@/webclient/WidgetBuilder.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/conversations',
    name: 'conversations',
    component: () => import('../views/ConversationsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/human-agents',
    name: 'human-agents',
    component: HumanAgentView,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings/organization',
    name: 'organization-settings',
    component: OrganizationSettings,
    meta: {
      requiresAuth: true,
      layout: 'dashboard',
      permissions: ['manage_organization', 'view_organization']
    }
  },
  {
    path: '/settings/ai-config',
    name: 'ai-config-settings',
    component: AIConfigSettings,
    meta: {
      requiresAuth: true,
      layout: 'dashboard',
      permissions: ['manage_ai_config', 'view_ai_config']
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/ai-agents',
  },
]

// Check for enterprise module
const enterpriseModules = import.meta.glob([
  '@/modules/enterprise/views/SignupView.vue',
  '@/modules/enterprise/router/guards/subscription.ts'
])
const hasEnterpriseModule = Object.keys(enterpriseModules).length > 0

// Combine routes based on module availability
const allRoutes = hasEnterpriseModule ? [
  ...baseRoutes,
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
] : baseRoutes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})

// Add subscription guard only if enterprise module is available
if (hasEnterpriseModule) {
  import('@/modules/enterprise/router/guards/subscription').then(({ subscriptionGuard }) => {
    router.beforeEach(subscriptionGuard)
  }).catch(error => {
    console.error('Error loading subscription guard:', error)
  })
}

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = userService.isAuthenticated()
  const hasOrganization = await listOrganizations()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiredPermissions = to.meta.permissions as string[] | undefined

  if (!hasOrganization && to.path !== '/setup') {
    next('/setup')
  } else if (!isAuthenticated && requiresAuth) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/ai-agents')
  } else if (to.path === '/setup' && hasOrganization) {
    next('/ai-agents')
  } else if (requiredPermissions && !hasAnyPermission(requiredPermissions)) {
    // Redirect to 403 page or dashboard if user lacks required permissions
    next('/403')
  } else {
    next()
  }
})

export default router
