'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from '@/app/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ai' | 'outlined' | 'glass' | 'gradient'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps & MotionProps>(
  ({
    className,
    variant = 'default',
    hover = true,
    padding = 'md',
    animate = true,
    children,
    ...props
  }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-200'

    const variants = {
      default: 'bg-white shadow-lg border border-neutral-200',
      ai: 'bg-gradient-ai-light border border-primary-200 shadow-lg',
      outlined: 'bg-transparent border-2 border-neutral-200',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl',
      gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    const hoverEffects = hover
      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
      : ''

    const aiEffects = variant === 'ai'
      ? 'hover:shadow-ai group'
      : ''

    const cardClasses = cn(
      baseClasses,
      variants[variant],
      paddings[padding],
      hoverEffects,
      aiEffects,
      className
    )

    const content = (
      <>
        {children}
        
        {/* AI glow effect */}
        {variant === 'ai' && (
          <div className="absolute inset-0 rounded-xl bg-gradient-ai opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
        )}
      </>
    )

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={cn(cardClasses, 'relative')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={hover ? { y: -4 } : undefined}
          {...props}
        >
          {content}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(cardClasses, 'relative')}
        {...props}
      >
        {content}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Subcomponentes para estructura
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}