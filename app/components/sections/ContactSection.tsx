'use client'

import { motion } from 'framer-motion'
import { Clock, Shield, CheckCircle2 } from 'lucide-react'
import CalendlyWidget from '@/app/components/ui/CalendlyWidget'
import { useAnalytics } from '@/app/lib/analytics'

export default function ContactSection() {
  const { trackCTAClick } = useAnalytics()

  return (
    <section id="contacto" className="section-padding bg-gradient-ai text-white">
      <div className="container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Agenda tu Diagnóstico Gratis
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              En solo 15 minutos descubre <strong className="text-white">cuánto dinero estás dejando sobre la mesa</strong> con tu contador actual.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">15 minutos por videollamada</h3>
                  <p className="text-white/80">Rápido, sin compromiso, 100% gratis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Análisis personalizado</h3>
                  <p className="text-white/80">Revisamos tu situación fiscal actual y te decimos exactamente qué optimizar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Reporte PDF incluido</h3>
                  <p className="text-white/80">Recibes un reporte con oportunidades de ahorro identificadas</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-sm text-white/90 mb-3">
                <strong className="text-white">Lo que descubrirás:</strong>
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Deducciones que no estás aplicando
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Errores comunes que detectamos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Potencial de ahorro anual
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Tiempo que recuperarías al mes
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Calendly Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Selecciona día y hora
                </h3>
                <p className="text-neutral-600">
                  Elige el horario que mejor te convenga
                </p>
              </div>

              <CalendlyWidget />

              <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
                <p className="text-sm text-neutral-600 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-success-600" />
                  <span>
                    <strong className="text-neutral-900">100% seguro.</strong> Tus datos están protegidos.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}