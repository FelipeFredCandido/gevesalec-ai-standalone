'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, X } from 'lucide-react'
import { useAnalytics } from '@/app/lib/analytics'

export default function FiniquitoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldShow, setShouldShow] = useState(true)
  const { trackCTAClick } = useAnalytics()

  useEffect(() => {
    // Check if user has closed the banner recently
    const closedAt = localStorage.getItem('finiquitoBannerClosed')
    if (closedAt) {
      const daysSinceClosed = (Date.now() - parseInt(closedAt)) / (1000 * 60 * 60 * 24)
      if (daysSinceClosed < 7) {
        setShouldShow(false)
        return
      }
    }

    // Show banner after delay or scroll
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 8000)

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / document.documentElement.scrollHeight) * 100
      if (scrollPercentage > 30) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Auto-hide on small mobile after 5 seconds
    if (window.innerWidth < 640) {
      setTimeout(() => {
        if (isVisible) {
          setTimeout(() => setIsVisible(false), 5000)
        }
      }, 8000)
    }

    return () => {
      clearTimeout(showTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    setShouldShow(false)
    localStorage.setItem('finiquitoBannerClosed', Date.now().toString())
    trackCTAClick('Cerrar Banner Finiquito', 'finiquito-banner')
  }

  const handleClick = () => {
    trackCTAClick('Click Banner Finiquito', 'finiquito-banner')
    window.location.href = '/finiquito'
  }

  if (!shouldShow) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-sm"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl shadow-2xl p-4 pr-10 cursor-pointer hover:shadow-3xl transition-shadow duration-300"
               onClick={handleClick}>
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
              className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
              aria-label="Cerrar banner"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Calculator className="text-white" size={24} />
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">
                  Calcula tu finiquito gratis
                </p>
                <p className="text-xs opacity-90">
                  Obtén tu cálculo en 3 minutos →
                </p>
              </div>
            </div>

            {/* Pulse animation */}
            <motion.div
              className="absolute -inset-1 bg-white/20 rounded-2xl -z-10"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}