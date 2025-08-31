'use client'

import { useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/app/components/sections/Hero'

// Lazy load heavy sections for improved performance
const Services = lazy(() => import('@/app/components/sections/Services'))
const AIFeatures = lazy(() => import('@/app/components/sections/AIFeatures'))
const Testimonials = lazy(() => import('@/app/components/sections/Testimonials'))
import { useAnalytics, trackScrollDepth, trackTimeOnPage } from '@/app/lib/analytics'

// Lazy load heavy components
const ContactSection = lazy(() => import('@/app/components/sections/ContactSection'))
const FiniquitoBanner = lazy(() => import('@/app/components/ui/FiniquitoBanner'))
// const ChatBot = lazy(() => import('@/app/components/interactive/ChatBot'))

export default function HomePage() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view
    trackPageView('/', 'Inicio - GEVESALEC')

    // Setup scroll tracking
    const cleanupScroll = trackScrollDepth()
    
    // Setup time tracking
    const cleanupTime = trackTimeOnPage()

    // Cleanup on unmount
    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [trackPageView])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Services />
      </Suspense>

      {/* AI Features Section */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-primary-50 to-white" />}>
        <AIFeatures />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Testimonials />
      </Suspense>

      {/* Contact/CTA Section */}
      <Suspense fallback={<div className="h-96 bg-gradient-ai animate-pulse" />}>
        <ContactSection />
      </Suspense>

      {/* Finiquito Banner */}
      <Suspense fallback={null}>
        <FiniquitoBanner />
      </Suspense>
      
      {/* ChatBot - Temporarily Disabled */}
      {/* <ChatBot /> */}
    </motion.div>
  )
}

