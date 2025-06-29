'use client'

import { useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/app/components/sections/Hero'
import Services from '@/app/components/sections/Services'
import AIFeatures from '@/app/components/sections/AIFeatures'
import Testimonials from '@/app/components/sections/Testimonials'
import { useAnalytics, trackScrollDepth, trackTimeOnPage } from '@/app/lib/analytics'

// Lazy load heavy components
const ContactSection = lazy(() => import('@/app/components/sections/ContactSection'))
const FAQSection = lazy(() => import('@/app/components/sections/FAQSection'))
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
      <Services />

      {/* AI Features Section */}
      <AIFeatures />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact/CTA Section */}
      <Suspense fallback={<div className="h-96 bg-gradient-ai animate-pulse" />}>
        <ContactSection />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<div className="h-96 bg-neutral-50 animate-pulse" />}>
        <FAQSection />
      </Suspense>
      
      {/* ChatBot - Temporarily Disabled */}
      {/* <ChatBot /> */}
    </motion.div>
  )
}

