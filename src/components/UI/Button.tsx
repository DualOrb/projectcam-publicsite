import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/helpers'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
  
  const variantClasses = {
    primary: 'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange shadow-brand hover:shadow-brand-lg',
    secondary: 'bg-brand-black text-white hover:bg-brand-black-light focus:ring-brand-black shadow-dark hover:shadow-dark-lg',
    outline: 'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white focus:ring-brand-orange',
    ghost: 'text-brand-orange hover:bg-brand-orange/10 focus:ring-brand-orange'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      <span className={cn(
        'flex items-center justify-center transition-opacity duration-200',
        isLoading ? 'opacity-0' : 'opacity-100'
      )}>
        {children}
      </span>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner 
            size={size === 'lg' ? 'md' : 'sm'} 
            color={variant === 'outline' || variant === 'ghost' ? 'orange' : 'white'} 
          />
        </div>
      )}
      
      {/* Hover effect overlay */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-dark to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {variant === 'secondary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black-light to-brand-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  )
}

export default Button