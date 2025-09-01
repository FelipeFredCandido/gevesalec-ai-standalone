'use client'

import { useEffect } from 'react'
import { useAnalytics, trackScrollDepth, trackTimeOnPage } from '@/app/lib/analytics'

export default function PageAnalytics() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView('/', 'Inicio - GEVESALEC')
    
    const cleanupScroll = trackScrollDepth()
    const cleanupTime = trackTimeOnPage()

    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [trackPageView])

  return null
}