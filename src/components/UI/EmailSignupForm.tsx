import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Loader2, Check, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEmailSignup } from '@/hooks/useEmailSignup'
import { validateEmail } from '@/utils/helpers'
import type { EmailSignupData } from '@/types'

interface EmailSignupFormProps {
  className?: string
  placeholder?: string
  buttonText?: string
  showName?: boolean
  source?: string
}

interface FormData extends EmailSignupData {
  name?: string
}

const EmailSignupForm = ({ 
  className = '',
  placeholder = 'Enter your email address',
  buttonText = 'Get Early Access',
  showName = false,
  source = 'website'
}: EmailSignupFormProps) => {
  const { isLoading, isError, error, submitEmail, reset } = useEmailSignup()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await submitEmail({
        email: data.email,
        name: showName ? data.name : undefined,
        source
      })
      
      setShowSuccess(true)
      resetForm()
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
        reset()
      }, 5000)
    } catch (err) {
      // Error handled by useEmailSignup hook
    }
  }

  const handleTryAgain = () => {
    reset()
    setShowSuccess(false)
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center p-6 bg-green-50 border border-green-200 rounded-2xl"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-display font-semibold text-lg text-green-800 mb-2">
              Welcome to Project Cam!
            </h3>
            <p className="text-green-700 text-sm mb-4">
              You'll be among the first to know when we launch. Check your email for confirmation.
            </p>
            <button
              onClick={handleTryAgain}
              className="text-green-600 text-sm hover:text-green-700 font-medium"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {showName && (
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your name (optional)"
                  className="input"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="relative">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-gray-medium" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    validate: (value) => 
                      validateEmail(value) || 'Please enter a valid email address'
                  })}
                  type="email"
                  placeholder={placeholder}
                  className={`input pl-12 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  disabled={isLoading}
                />
              </div>
              
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full btn-lg relative overflow-hidden group"
            >
              <span className={`flex items-center justify-center transition-opacity duration-200 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}>
                {buttonText}
              </span>
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-dark to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {isError && error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-700 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </p>
              </motion.div>
            )}

            <p className="text-xs text-brand-gray-medium text-center">
              By signing up, you agree to our{' '}
              <button
                type="button"
                onClick={() => window.open('/terms', '_blank')}
                className="text-brand-orange hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => window.open('/privacy', '_blank')}
                className="text-brand-orange hover:underline"
              >
                Privacy Policy
              </button>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EmailSignupForm