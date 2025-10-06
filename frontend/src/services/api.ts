import axios, { AxiosError } from 'axios'
import router from '@/router'
import { getApiUrl } from '@/config/api'
import { userService } from '@/services/user'

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // If there's no authenticated user, do not attempt refresh. Go to login directly.
      if (!userService.isAuthenticated()) {
        // Clear any stale user info
        document.cookie = 'user_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        userService.clearCurrentUser()
        router.push('/login')
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        // Try to refresh token
        await axios.post(
          '/users/refresh',
          {},
          {
            withCredentials: true,
            baseURL: getApiUrl(),
          },
        )

        // Retry original request
        return api(originalRequest)
      } catch (refreshError) {
        // Clear user info cookie
        document.cookie = 'user_info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        // Remove any cached auth state so guards don't think we're logged in
        try {
          userService.clearCurrentUser()
        } catch {}

        // Redirect to login if refresh fails
        router.push('/login')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
// Add type for extended axios config
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean
  }
}
