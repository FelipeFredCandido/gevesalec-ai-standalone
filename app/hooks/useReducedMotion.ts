'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if the user prefers reduced motion or is on a mobile device
 * Returns true if animations should be reduced
 */
export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    // Check if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     window.innerWidth < 768

    // Reduce motion on mobile or if user prefers
    setShouldReduceMotion(mediaQuery.matches || isMobile)

    // Listen for changes
    const handleChange = () => setShouldReduceMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return shouldReduceMotion
}

/**
 * Get animation variants based on reduced motion preference
 * @param fullVariants - Full animation variants
 * @param reducedVariants - Reduced animation variants (optional)
 * @returns Appropriate variants based on user preference
 */
export function getMotionVariants(
  fullVariants: any,
  reducedVariants?: any,
  shouldReduce?: boolean
) {
  if (shouldReduce === undefined) {
    // Server-side, return full variants
    return fullVariants
  }
  
  return shouldReduce 
    ? reducedVariants || { 
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : fullVariants
}