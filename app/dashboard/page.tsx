'use client'

import { motion } from 'framer-motion'
import Dashboard from '@/app/components/interactive/Dashboard'
import { useAnalytics, trackPageView } from '@/app/lib/analytics'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { trackPageView: trackPage } = useAnalytics()

  useEffect(() => {
    trackPage('/dashboard', 'Dashboard Inteligente - GEVESALEC')
  }, [trackPage])

  return (
    <motion.div
      className="min-h-screen bg-neutral-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Dashboard />
    </motion.div>
  )
}