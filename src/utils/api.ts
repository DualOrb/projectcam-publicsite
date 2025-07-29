import type { EmailSignupData, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://5kkn526el7.execute-api.us-east-1.amazonaws.com/prod/api'
  : 'http://localhost:3000/api'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'An error occurred')
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Handle network errors
    throw new ApiError(
      0,
      error instanceof Error ? error.message : 'Network error'
    )
  }
}

export const api = {
  // Email signup
  subscribeEmail: async (data: EmailSignupData): Promise<ApiResponse> => {
    return apiRequest('/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Contact form
  sendContactForm: async (data: { 
    name: string; 
    email: string; 
    company?: string; 
    message: string; 
    subject?: string 
  }): Promise<ApiResponse> => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Health check
  healthCheck: async (): Promise<ApiResponse> => {
    return apiRequest('/health')
  },
}

export { ApiError }