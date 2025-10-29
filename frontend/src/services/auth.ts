import type { AxiosError } from 'axios'
import api from './api'
import { userService } from './user'
import type { User } from '../types/user'
interface ErrorResponse {
  detail: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: User
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const formData = new URLSearchParams()
      formData.append('username', email)
      formData.append('password', password)

      // Get shop_id from URL query params if it exists
      const urlParams = new URLSearchParams(window.location.search)
      const shopId = urlParams.get('shop_id')
      
      // Build the URL with query params if shop_id exists
      let url = '/users/login'
      if (shopId) {
        url += `?shop_id=${encodeURIComponent(shopId)}`
      }

      const response = await api.post<LoginResponse>(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      userService.setCurrentUser(response.data.user)
      return response.data.user
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      throw new Error(axiosError.response?.data?.detail || 'Login failed')
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/users/logout')
      userService.clearCurrentUser()
      localStorage.removeItem('agents')
      localStorage.removeItem('current_subscription')
      localStorage.removeItem('exploreView_customization')
      localStorage.removeItem('exploreView_selectedColor')
      localStorage.removeItem('exploreView_url')
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      throw new Error(axiosError.response?.data?.detail || 'Logout failed')
    }
  },
}
