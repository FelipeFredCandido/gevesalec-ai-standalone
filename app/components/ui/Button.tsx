'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/app/lib/utils'
import { useAnalytics } from '@/app/lib/analytics'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'ai' | 'success' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  animate?: boolean
  trackingLabel?: string
  trackingCategory?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    animate = true,
    trackingLabel,
    trackingCategory = 'button',
    children,
    onClick,
    disabled,
    ...props
  }, ref) => {
    const { trackCTAClick } = useAnalytics()

    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500 border border-neutral-300',
      outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ai: 'bg-gradient-ai text-white hover:shadow-ai-lg focus:ring-primary-500 shadow-lg',
      success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-lg hover:shadow-success',
      accent: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-accent',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
      md: 'px-4 py-2 text-sm rounded-lg gap-2',
      lg: 'px-6 py-3 text-base rounded-lg gap-2.5',
      xl: 'px-8 py-4 text-lg rounded-xl gap-3',
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track analytics
      if (trackingLabel) {
        trackCTAClick(trackingLabel, trackingCategory)
      }

      // Call original onClick
      onClick?.(event)
    }

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <div className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {icon && iconPosition === 'left' && (
            <span className="shrink-0">{icon}</span>
          )}
          
          {children && <span>{children}</span>}
          
          {icon && iconPosition === 'right' && (
            <span className="shrink-0">{icon}</span>
          )}
        </div>

        {/* Shimmer effect for AI variant */}
        {variant === 'ai' && (
          <div className="absolute inset-0 -top-full transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-y-full" />
        )}
      </>
    )

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          onClick={handleClick}
          disabled={disabled || loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          {...props}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button