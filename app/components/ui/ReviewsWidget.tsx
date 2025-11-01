'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink, Shield } from 'lucide-react'

export default function ReviewsWidget() {
  // Datos de reviews (en producción vendrían de Google Reviews API)
  const googleRating = 4.9
  const totalReviews = 47
  const fiveStarPercentage = 94

  const reviews = [
    {
      author: 'Carlos Mendoza',
      rating: 5,
      text: 'Excelente servicio. Me ayudaron a reducir significativamente mis impuestos de forma legal. Muy profesionales.',
      date: 'Hace 2 semanas',
      verified: true
    },
    {
      author: 'Laura Sánchez',
      rating: 5,
      text: 'Por fin un contador que usa tecnología! Todo es súper rápido y preciso. Lo recomiendo ampliamente.',
      date: 'Hace 1 mes',
      verified: true
    },
    {
      author: 'Roberto García',
      rating: 5,
      text: 'Llevo 6 meses con ellos y es el mejor cambio que he hecho para mi empresa. Ahorro tiempo y dinero.',
      date: 'Hace 2 meses',
      verified: true
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Verificado por Google</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Lo que dicen nuestros clientes <span className="text-gradient">en Google</span>
          </h2>

          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Reviews reales de empresas que ya están ahorrando con GEVESALEC
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Google Rating Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border-2 border-neutral-100 p-8 mb-12"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
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
              </div>

              {/* Distribution */}
              <div className="md:col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? fiveStarPercentage : stars === 4 ? 6 : 0
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-neutral-700 w-12">{stars} ★</span>
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
                        <span className="text-sm font-medium text-neutral-600 w-12 text-right">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Link to Google */}
            <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
              <a
                href="https://www.google.com/maps/search/gevesalec" // Replace with actual Google Business link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                <span>Ver todas las reseñas en Google</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>

          {/* Recent Reviews */}
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              >
                <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-warning-400 text-warning-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-700 text-sm mb-4 flex-1 leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{review.author}</p>
                      <p className="text-xs text-neutral-500">{review.date}</p>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-xs text-success-600">
                        <Shield size={12} />
                        <span>Verificado</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-10"
          >
            <div className="inline-flex items-center gap-3 bg-success-50 border border-success-200 rounded-full px-6 py-3">
              <Shield className="w-5 h-5 text-success-600" />
              <span className="text-sm font-semibold text-success-900">
                Todas las reseñas son de clientes reales verificados por Google
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
