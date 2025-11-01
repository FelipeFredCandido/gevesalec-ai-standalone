'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, CheckCircle2, FileText, Lock } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import { useAnalytics } from '@/app/lib/analytics'

export default function ExitIntentPopup() {
  const { trackCTAClick } = useAnalytics()
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    const shownBefore = sessionStorage.getItem('exit-intent-shown')
    if (shownBefore) {
      setHasShown(true)
      return
    }

    // Minimum time on page before showing (5 seconds)
    const minTime = 5000
    const startTime = Date.now()

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of page
      if (
        e.clientY <= 0 &&
        !hasShown &&
        Date.now() - startTime > minTime
      ) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exit-intent-shown', 'true')
        trackCTAClick('Exit Intent Triggered', 'exit-intent')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown, trackCTAClick])

  const handleClose = () => {
    setIsVisible(false)
    trackCTAClick('Exit Intent Closed', 'exit-intent')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    try {
      trackCTAClick('Exit Intent - Lead Magnet Downloaded', 'exit-intent')

      // In production, send to your email service
      // For now, just show success
      setIsSubmitted(true)

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting:', error)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X size={20} className="text-neutral-600" />
              </button>

              {!isSubmitted ? (
                <div className="p-8 md:p-12">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-8 h-8 text-warning-600" />
                  </div>

                  {/* Headline */}
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
                    ¡Espera! Antes de irte...
                  </h3>

                  <p className="text-lg text-neutral-600 mb-6 text-center">
                    Descarga GRATIS nuestra guía exclusiva:
                  </p>

                  {/* Lead Magnet Title */}
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 mb-6 border-2 border-primary-200">
                    <h4 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 text-center">
                      "Checklist: ¿Tu Contador está dejando dinero sobre la mesa?"
                    </h4>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">15 señales de alerta que debes conocer</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">Calculadora de ahorro potencial</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">Preguntas para tu contador actual</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                        <span className="text-neutral-700">Checklist de deducciones comunes</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@empresa.com"
                        className="w-full px-6 py-4 border-2 border-neutral-200 rounded-lg text-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="ai"
                      size="lg"
                      icon={<Download size={20} />}
                      fullWidth
                      className="shadow-xl"
                    >
                      Descargar Checklist Gratis (PDF)
                    </Button>
                  </form>

                  {/* Trust */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-neutral-500">
                    <Lock className="w-4 h-4" />
                    <span>0 spam. Solo contenido valioso para PYMEs.</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 md:p-12 text-center">
                  {/* Success State */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-success-600" />
                  </motion.div>

                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                    ¡Listo! Revisa tu Email
                  </h3>

                  <p className="text-lg text-neutral-600 mb-6">
                    Te acabamos de enviar el checklist a <strong>{email}</strong>
                  </p>

                  <div className="bg-primary-50 rounded-lg p-4 text-left">
                    <p className="text-sm text-neutral-700 mb-2">
                      <strong className="text-neutral-900">Próximo paso:</strong>
                    </p>
                    <p className="text-sm text-neutral-600">
                      Revisa el checklist y si identificas 3+ señales de alerta,
                      agenda un diagnóstico gratis con nosotros.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
