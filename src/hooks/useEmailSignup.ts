import { useState } from 'react'
import { api, ApiError } from '@/utils/api'
import type { EmailSignupData } from '@/types'

interface UseEmailSignupReturn {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: string | null
  submitEmail: (data: EmailSignupData) => Promise<void>
  reset: () => void
}

export function useEmailSignup(): UseEmailSignupReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitEmail = async (data: EmailSignupData) => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)
    setError(null)

    try {
      await api.subscribeEmail(data)
      setIsSuccess(true)
    } catch (err) {
      setIsError(true)
      
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setIsError(false)
    setIsSuccess(false)
    setError(null)
  }

  return {
    isLoading,
    isError,
    isSuccess,
    error,
    submitEmail,
    reset
  }
}