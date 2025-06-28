'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/app/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'accent' | 'warning' | 'error' | 'ai'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  children: ReactNode
}

export default function Badge({
  className,
  variant = 'default',
  size = 'md',
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200'

  const variants = {
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    primary: 'bg-primary-100 text-primary-800 border border-primary-200',
    success: 'bg-success-100 text-success-800 border border-success-200',
    accent: 'bg-accent-100 text-accent-800 border border-accent-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    ai: 'bg-gradient-ai-light text-primary-800 border border-primary-200 shadow-sm',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-0.5 text-xs gap-1.5',
    lg: 'px-3 py-1 text-sm gap-2',
  }

  const badgeClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  )

  return (
    <div className={badgeClasses} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}