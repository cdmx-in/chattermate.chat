import api from './api'
import type { OrganizationCreate, OrganizationResponse, OrganizationUpdate } from '@/types/organization'
import type { AxiosError } from 'axios'
import { userService } from './user'
import type { Organization } from '@/types/organization'


interface ErrorResponse {
  detail: string
}

export const createOrganization = async (data: OrganizationCreate) => {
  const response = await api.post<OrganizationResponse>('/organizations', data)

  // Store user info if available in response
  if (response.data.user) {
    userService.setCurrentUser(response.data.user)
  }

  return response.data
}

export async function listOrganizations(): Promise<boolean> {
  try {
    const response = await api.get<Organization[]>('/organizations')
    // Check if we have at least one active organization
    return !!(response.data && response.data.length > 0 && response.data[0].is_active)
  } catch (err) {
    const axiosError = err as AxiosError<ErrorResponse>
    if (axiosError.response?.status === 404) {
      return false
    }
    // For other errors, assume no organization
    return false
  }
}

export const organizationService = {
  async getOrganization(id: string): Promise<Organization> {
    const response = await api.get(`/organizations/${id}`)
    return response.data
  },

  async updateOrganization(id: string, data: OrganizationUpdate): Promise<Organization> {
    const response = await api.patch(`/organizations/${id}`, data)
    return response.data
  },

  async getOrganizationStats(id: string) {
    const response = await api.get(`/organizations/${id}/stats`)
    return response.data
  }
}
