'use client'

import { motion } from 'framer-motion'
import TaxCalculator from '@/app/components/interactive/TaxCalculator'
import { useAnalytics, trackPageView } from '@/app/lib/analytics'
import { useEffect } from 'react'

export default function CalculadoraPage() {
  const { trackPageView: trackPage } = useAnalytics()

  useEffect(() => {
    trackPage('/calculadora', 'Calculadora de Impuestos - GEVESALEC')
  }, [trackPage])

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50/30 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-padding">
        <TaxCalculator />
      </div>
    </motion.div>
  )
}