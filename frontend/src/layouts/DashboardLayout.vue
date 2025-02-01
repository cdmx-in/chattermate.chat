<script setup lang="ts">
import { ref, onMounted, watch, provide, readonly, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import userAvatar from '@/assets/user.svg'
import notificationIcon from '@/assets/notification.svg'
import NotificationList from '@/components/notifications/NotificationList.vue'
import { userService } from '@/services/user'
import type { User } from '@/types/user'
import { useNotifications } from '@/composables/useNotifications'
import { notificationService } from '@/services/notification'
import UserSettings from '@/components/user/UserSettings.vue'
import { useRoute } from 'vue-router'
import { updateUserStatus } from '@/services/users'

const isSidebarOpen = ref(true)
const showUserMenu = ref(false)
const showNotifications = ref(false)
const showSettings = ref(false)
const currentUser = ref<User>(userService.getCurrentUser() as User)
const userName = ref(userService.getUserName())
const userRole = ref(userService.getUserRole())
const unreadCount = ref(0)
const statusUpdating = ref(false)
const { logout } = useAuth()
useNotifications()
const route = useRoute()

const userAvatarSrc = computed(() => {
  if (currentUser.value?.profile_pic) {
    const timestamp = new Date().getTime()
    return `${import.meta.env.VITE_API_URL}${currentUser.value.profile_pic}?t=${timestamp}`
  }
  return userAvatar
})

const toggleOnlineStatus = async () => {
  if (statusUpdating.value) return
  
  try {
    statusUpdating.value = true
    const newStatus = !currentUser.value?.is_online
    await updateUserStatus(currentUser.value?.id as string, newStatus)
    
    // Update local state
    currentUser.value = {
      ...currentUser.value,
      is_online: newStatus,
      last_seen: new Date().toISOString()
    } as User
    
    userService.setCurrentUser(currentUser.value as User)
    showUserMenu.value = false
  } catch (error) {
    console.error('Failed to update status:', error)
  } finally {
    statusUpdating.value = false
  }
}

// Add this watch to close settings when route changes
watch(
  () => route.path,
  () => {
    showSettings.value = false
    showUserMenu.value = false
    showNotifications.value = false
  }
)

const fetchUnreadCount = async () => {
    try {
        unreadCount.value = await notificationService.getUnreadCount()
    } catch (err) {
        console.error('Error fetching unread count:', err)
    }
}

onMounted(fetchUnreadCount)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const closeSettings = () => {
  showSettings.value = false
}

const openSettings = () => {
  showSettings.value = true
  showUserMenu.value = false
}

const refreshUserInfo = () => {
  userName.value = userService.getUserName()
  userRole.value = userService.getUserRole()
  const user = userService.getCurrentUser() as User
  currentUser.value = user
}

// Provide both methods
provide('refreshUserInfo', refreshUserInfo)
provide('openSettings', openSettings)
provide('showSettings', readonly(showSettings))
</script>

<template>
    <div class="dashboard-layout" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
        <AppSidebar :isCollapsed="!isSidebarOpen" @toggle="toggleSidebar" @navigate="closeSettings" />

        <!-- Main Content -->
        <div class="main-content">
            <!-- Header -->
            <header class="header">
                <div class="header-content">
                    <div class="search">

                    </div>
                    <div class="user-menu">
                        <button class="notification-button" @click="showNotifications = !showNotifications">
                            <img :src="notificationIcon" alt="Notifications" class="notification-icon" />
                            <span v-if="unreadCount > 0" class="notification-badge">
                                {{ unreadCount > 99 ? '99+' : unreadCount }}
                            </span>
                        </button>

                        <NotificationList :is-open="showNotifications" @close="showNotifications = false"
                            @notification-read="fetchUnreadCount" />

                        <div class="user-profile">
                            <div class="profile-trigger" @click="showUserMenu = !showUserMenu">
                                <div class="avatar-wrapper">
                                    <img :src="userAvatarSrc" alt="User" class="avatar" />
                                    <span 
                                        class="status-indicator" 
                                        :class="{ 'online': currentUser?.is_online }"
                                    ></span>
                                </div>
                                <div class="user-info" v-if="isSidebarOpen">
                                    <span class="name">{{ userName }}</span>
                                    <span class="role">{{ userRole }}</span>
                                </div>
                            </div>
                            <div class="dropdown-menu" v-if="showUserMenu">
                                <div class="status-menu-item">
                                  <span class="status-label">Status:</span>
                                  <button 
                                    class="status-toggle" 
                                    :class="{ 'online': currentUser?.is_online }"
                                    @click="toggleOnlineStatus"
                                    :disabled="statusUpdating"
                                  >
                                    {{ currentUser?.is_online ? 'Online' : 'Offline' }}
                                  </button>
                                </div>
                                <div class="menu-divider"></div>
                                <button class="menu-item" @click="openSettings">
                                    Settings
                                </button>
                                <button class="menu-item" @click="logout">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content Area -->
            <main class="content">
                <UserSettings v-if="showSettings" @close="closeSettings" />
                <slot v-else></slot>
            </main>

            <!-- Footer -->
            <footer class="footer">
                <div class="footer-content">
                    <p>&copy; 2024 ChatterMate. All rights reserved.</p>
                    <nav class="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </nav>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.dashboard-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 100vh;
    transition: grid-template-columns var(--transition-normal);
}

/* Sidebar Styles */
.sidebar {
    background: var(--background-soft);
    border-right: 1px solid var(--border-color);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--border-color);
}

.logo {
    height: 32px;
}

.toggle-btn {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.7;
    transition: var(--transition-fast);
}

.toggle-btn:hover {
    opacity: 1;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm);
    color: var(--text-color);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
}

.nav-item:hover {
    background: var(--background-mute);
}

.nav-item.active {
    background: var(--primary-color);
    color: var(--background-color);
}

/* Header Styles */
.header {
    background: var(--background-soft);
    border-bottom: 1px solid var(--border-color);
    padding: var(--space-md) var(--space-xl);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search input {
    background: var(--background-mute);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    padding: var(--space-sm) var(--space-lg);
    color: var(--text-color);
}

.user-menu {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.notifications {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.7;
    transition: var(--transition-fast);
}

.notifications:hover {
    opacity: 1;
}

.user-profile {
    position: relative;
    cursor: pointer;
}

.profile-trigger {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.avatar-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.name {
    font-weight: 500;
}

.role {
    font-size: var(--text-sm);
    opacity: 0.7;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--background-soft);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--space-xs);
    margin-top: var(--space-xs);
    min-width: 150px;
    z-index: 100;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.menu-item {
    display: block;
    width: 100%;
    padding: var(--space-sm);
    text-align: left;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    border-radius: var(--radius-sm);
}

.menu-item:hover {
    background: var(--background-mute);
}

/* Content Styles */
.content {
    padding: var(--space-xl);
    min-height: calc(100vh - 180px);
}

/* Footer Styles */
.footer {
    background: var(--background-soft);
    border-top: 1px solid var(--border-color);
    padding: var(--space-lg) var(--space-xl);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-links {
    display: flex;
    gap: var(--space-lg);
}

.footer-links a {
    color: var(--text-color);
    text-decoration: none;
    opacity: 0.7;
    transition: var(--transition-fast);
}

.footer-links a:hover {
    opacity: 1;
}

.notification-button {
    background: none;
    border: none;
    padding: var(--space-sm);
    cursor: pointer;
    position: relative;
    opacity: 0.7;
    transition: var(--transition-fast);
}

.notification-button:hover {
    opacity: 1;
}

.notification-icon {
    width: 24px;
    height: 24px;
}

.notification-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    background-color: var(--error-color);
    color: white;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--text-muted);
    border: 2px solid var(--background-soft);
}

.status-indicator.online {
    background-color: #22c55e;
}

.status-menu-item {
    padding: var(--space-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
}

.status-label {
    color: var(--text-muted);
    font-size: 0.9rem;
}

.status-toggle {
    background: var(--background-mute);
    border: none;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.status-toggle.online {
    background: var(--success-color);
    color: white;
}

.status-toggle:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.menu-divider {
    height: 1px;
    background: var(--border-color);
    margin: var(--space-xs) 0;
}
</style>