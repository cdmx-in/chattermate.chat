import { createRouter, createWebHistory } from 'vue-router'
import { userService } from '@/services/user'
import { listOrganizations } from '@/services/organization'
import { permissionChecks, hasAnyPermission } from '@/utils/permissions'
import HumanAgentView from '@/views/HumanAgentView.vue'
import OrganizationSettings from '@/views/settings/OrganizationSettings.vue'
import AIConfigSettings from '@/views/settings/AIConfigSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ai-agents',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/SetupView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/ai-agents',
      name: 'ai-agents',
      component: () => import('../views/AIAgentView.vue'),
      meta: { requiresAuth: true },
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
  ],
})

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
