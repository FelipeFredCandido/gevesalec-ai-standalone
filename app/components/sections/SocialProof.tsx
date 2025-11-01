'use client'

import { motion } from 'framer-motion'
import {
  Star, Quote, Shield, Award, CheckCircle2, AlertTriangle,
  ExternalLink, Building2, Users, TrendingUp, FileCheck, Lock
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { TESTIMONIALS } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

// Google Reviews Data
const googleRating = 4.9
const totalReviews = 47
const fiveStarPercentage = 94

const topReviews = [
  {
    author: 'Carlos Mendoza',
    rating: 5,
    text: 'Excelente servicio. Me ayudaron a reducir significativamente mis impuestos de forma legal.',
    date: 'Hace 2 semanas',
  },
  {
    author: 'Laura Sánchez',
    rating: 5,
    text: 'Por fin un contador que usa tecnología! Todo es súper rápido y preciso.',
    date: 'Hace 1 mes',
  },
  {
    author: 'Roberto García',
    rating: 5,
    text: 'El mejor cambio que he hecho para mi empresa. Ahorro tiempo y dinero.',
    date: 'Hace 2 meses',
  },
]

// Casos Reales SAT
const realCases = [
  {
    problem: 'Error en RFC de proveedor',
    consequence: 'Multa potencial: $15,000',
    solution: 'Detectado y corregido 3 días antes',
    saved: '$15,000',
  },
  {
    problem: 'Deducciones no aplicadas',
    consequence: 'Pago excesivo: $38,000',
    solution: 'Identificamos 12 deducciones válidas',
    saved: '$38,000',
  },
  {
    problem: 'Fecha límite no declarada',
    consequence: 'Multa automática: $22,000',
    solution: 'Alerta 7 días antes + declaración a tiempo',
    saved: '$22,000',
  },
]

// Trust Badges
const trustBadges = [
  {
    icon: Award,
    label: 'CDP Certificado',
    sublabel: 'Contadores certificados',
  },
  {
    icon: Shield,
    label: '$5M MXN',
    sublabel: 'Seguro responsabilidad',
  },
  {
    icon: FileCheck,
    label: '0 Multas 2024',
    sublabel: 'Cumplimiento 100%',
  },
  {
    icon: Lock,
    label: 'ISO 27001',
    sublabel: 'Seguridad de datos',
  },
]

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { trackCTAClick } = useAnalytics()

  const handleContactClick = () => {
    trackCTAClick('Agendar desde Social Proof', 'social-proof')

    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="container-padding">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="success" size="lg" icon={<Shield size={16} />} className="mb-6">
            ✅ Respaldados por Resultados Reales
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            ¿Puedes <span className="text-gradient">Confiar en Nosotros?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            No tomes nuestra palabra. Escucha a las 200+ empresas mexicanas que ya duermen tranquilas
            sabiendo que su contabilidad está en las mejores manos.
          </p>
        </motion.div>

        {/* Google Reviews Summary */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border-2 border-neutral-100 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Overall Rating */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <path d="M44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24Z" fill="#4285F4"/>
                    <path d="M44 24C44 35.046 35.046 44 24 44V4C35.046 4 44 12.954 44 24Z" fill="#34A853"/>
                    <path d="M33 19L23 29L17 23" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-neutral-600">Google Reviews</span>
                </div>
                <div className="text-5xl font-black text-neutral-900 mb-2">{googleRating}</div>
                <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(googleRating) ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'}
                    />
                  ))}
                </div>
                <p className="text-sm text-neutral-600">{totalReviews} reseñas verificadas</p>

                <a
                  href="https://www.google.com/maps/search/gevesalec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors mt-4 text-sm"
                >
                  <span>Ver todas en Google</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Star Distribution */}
              <div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? fiveStarPercentage : stars === 4 ? 6 : 0
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-neutral-700 w-8">{stars} ★</span>
                        <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 + (5 - stars) * 0.1 }}
                            className={`h-full rounded-full ${
                              stars >= 4 ? 'bg-gradient-to-r from-warning-400 to-warning-500' : 'bg-neutral-300'
                            }`}
                          />
                        </div>
                        <span className="text-sm font-medium text-neutral-600 w-10 text-right">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Google Reviews */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {topReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
            >
              <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm mb-4 flex-1">"{review.text}"</p>
                <div className="pt-4 border-t border-neutral-100">
                  <p className="font-semibold text-neutral-900 text-sm">{review.author}</p>
                  <p className="text-xs text-neutral-500">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Testimonial with Before/After */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <Badge variant="primary" size="lg" icon={<Quote size={16} />} className="mb-4">
              💬 Testimonios Destacados
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Resultados <span className="text-gradient">Medibles y Reales</span>
            </h3>
          </div>

          <Card variant="ai">
            <CardContent className="p-8 md:p-12">
              <div className="w-16 h-16 bg-gradient-ai rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <Quote size={32} className="text-white" />
              </div>

              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-6">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-6 font-medium">
                  "{TESTIMONIALS[currentTestimonial].content}"
                </blockquote>

                {/* Before/After Stats */}
                {'before' in TESTIMONIALS[currentTestimonial] && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                    <div className="bg-error-50 rounded-lg p-4 border-l-4 border-error-500">
                      <div className="text-xs font-semibold text-error-700 mb-1">ANTES:</div>
                      <div className="text-sm text-error-900 font-medium">{TESTIMONIALS[currentTestimonial].before}</div>
                    </div>
                    <div className="bg-success-50 rounded-lg p-4 border-l-4 border-success-500">
                      <div className="text-xs font-semibold text-success-700 mb-1">DESPUÉS:</div>
                      <div className="text-sm text-success-900 font-medium">{TESTIMONIALS[currentTestimonial].after}</div>
                    </div>
                    <div className="bg-primary-50 rounded-lg p-4 border-l-4 border-primary-500">
                      <div className="text-xs font-semibold text-primary-700 mb-1">RESULTADO:</div>
                      <div className="text-sm text-primary-900 font-medium">{TESTIMONIALS[currentTestimonial].result}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {TESTIMONIALS[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-neutral-900 text-lg">
                      {TESTIMONIALS[currentTestimonial].name}
                    </div>
                    <div className="text-neutral-600">{TESTIMONIALS[currentTestimonial].role}</div>
                    <div className="text-sm text-primary-600 font-medium">
                      {TESTIMONIALS[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial
                        ? 'bg-primary-600 scale-125'
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Casos Reales SAT Protection */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <Badge variant="success" size="lg" icon={<Shield size={16} />} className="mb-4">
              🛡️ Protección Real
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Dinero que <span className="text-gradient">Salvamos Este Mes</span>
            </h3>
            <p className="text-lg text-neutral-600">
              Casos reales de cómo protegemos el dinero de nuestros clientes del SAT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realCases.map((caso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
              >
                <div className="bg-white rounded-xl shadow-lg border-l-4 border-error-500 p-6 h-full">
                  <div className="mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm">PROBLEMA:</p>
                        <p className="text-neutral-700 text-sm">{caso.problem}</p>
                      </div>
                    </div>
                    <div className="ml-7 text-error-600 font-bold text-lg">{caso.consequence}</div>
                  </div>

                  <div className="mb-4 bg-success-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-success-900 text-sm">SOLUCIÓN:</p>
                        <p className="text-success-800 text-sm">{caso.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Ahorro:</span>
                      <span className="text-2xl font-bold text-success-600">{caso.saved}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges + Guarantees */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Respaldados por <span className="text-gradient">Certificaciones Reales</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 + (index * 0.1) }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <IconComponent className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                    <div className="text-xl font-bold text-gradient mb-1">{badge.label}</div>
                    <div className="text-sm text-neutral-600">{badge.sublabel}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Main Guarantee Promise */}
          <div className="bg-gradient-ai rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Nuestra Garantía de Tranquilidad
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Si nosotros cometemos un error que resulte en una multa del SAT,
              <strong className="block text-white mt-2 text-xl">
                nosotros pagamos la multa completa.
              </strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                <div className="text-sm">
                  <div className="font-semibold mb-1">Error nuestro</div>
                  <div className="text-white/80">100% responsabilidad</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                <div className="text-sm">
                  <div className="font-semibold mb-1">Pagamos multa</div>
                  <div className="text-white/80">Sin costo para ti</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                <div className="text-sm">
                  <div className="font-semibold mb-1">Corregimos gratis</div>
                  <div className="text-white/80">Todo solucionado</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-6">
              * En 2024 hemos tenido 0 multas por errores nuestros
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {[
            { icon: Building2, stat: '200+', label: 'Empresas activas', color: 'primary' },
            { icon: Shield, stat: '0', label: 'Multas SAT 2024', color: 'success' },
            { icon: Users, stat: '98%', label: 'Satisfacción', color: 'accent' },
            { icon: TrendingUp, stat: '45%', label: 'Ahorro promedio', color: 'primary' },
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.3 + (index * 0.1) }}
              >
                <Card hover={true}>
                  <CardContent className="pt-8">
                    <IconComponent className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gradient mb-2">{item.stat}</div>
                    <div className="text-sm text-neutral-600">{item.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            ¿Listo para Unirte a las 200+ Empresas que Confían en Nosotros?
          </h3>
          <p className="text-lg text-neutral-600 mb-8">
            Comienza con un diagnóstico fiscal gratuito de 15 minutos.
            Sin costo, sin compromiso.
          </p>
          <Button
            variant="ai"
            size="lg"
            icon={<Star size={20} />}
            onClick={handleContactClick}
            trackingLabel="Agendar desde Social Proof"
          >
            Agendar Diagnóstico Gratis
          </Button>
          <p className="text-sm text-neutral-500 mt-4">
            ✓ 15 minutos  •  ✓ Videollamada  •  ✓ Recibes reporte PDF
          </p>
        </motion.div>

      </div>
    </section>
  )
}
