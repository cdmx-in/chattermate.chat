import type { AxiosError } from 'axios'
import api from './api'
import { userService, type UserInfo } from './user'

interface ErrorResponse {
  detail: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: UserInfo
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const formData = new URLSearchParams()
      formData.append('username', email)
      formData.append('password', password)

      const response = await api.post<LoginResponse>('/users/login', formData, {
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
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>
      throw new Error(axiosError.response?.data?.detail || 'Logout failed')
    }
  },
}
