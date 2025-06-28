'use client'

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/app/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: 'default' | 'ai' | 'success' | 'error'
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    fullWidth = true,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseClasses = 'rounded-lg border px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const variants = {
      default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
      ai: 'border-primary-300 focus:border-primary-500 focus:ring-primary-500 bg-gradient-ai-light/30',
      success: 'border-success-300 focus:border-success-500 focus:ring-success-500',
      error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    }

    const inputClasses = cn(
      baseClasses,
      variants[error ? 'error' : variant],
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      fullWidth && 'w-full',
      className
    )

    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={cn(
            'text-xs',
            error ? 'text-red-600' : 'text-neutral-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input