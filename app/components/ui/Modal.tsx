'use client'

import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  children: ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  className,
}: ModalProps) {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            className={cn(
              'relative w-full bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden',
              sizes[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <div>
                  {title && (
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-neutral-600">
                      {description}
                    </p>
                  )}
                </div>
                
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                    aria-label="Cerrar modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Subcomponentes para estructura
export function ModalHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between pb-4 border-b border-neutral-200', className)}>
      {children}
    </div>
  )
}

export function ModalTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn('text-xl font-semibold text-neutral-900', className)}>
      {children}
    </h2>
  )
}

export function ModalDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('mt-1 text-sm text-neutral-600', className)}>
      {children}
    </p>
  )
}

export function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('py-4', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 pt-4 border-t border-neutral-200', className)}>
      {children}
    </div>
  )
}