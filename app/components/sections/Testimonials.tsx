'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight, Building2, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { TESTIMONIALS } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { trackCTAClick } = useAnalytics()

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const handleContactClick = () => {
    trackCTAClick('Contactar desde Testimonios', 'testimonials')
  }

  return (
    <section id="testimonios" className="section-padding bg-white">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="success" size="lg" icon={<Star size={16} />} className="mb-6">
            ⭐ Testimonios Reales
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Lo que Dicen{' '}
            <span className="text-gradient">Nuestros Clientes</span>
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Descubre cómo empresas como la tuya están revolucionando
            su contabilidad con GEVESALEC y experimentando resultados
            extraordinarios desde el primer día.
          </p>
        </motion.div>

        {/* Main Testimonial Showcase */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="ai" className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-gradient-ai rounded-2xl flex items-center justify-center mb-8 mx-auto">
                <Quote size={32} className="text-white" />
              </div>

              {/* Testimonial Content */}
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex items-center justify-center mb-6">
                  {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 font-medium">
                  &ldquo;{TESTIMONIALS[currentTestimonial].content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {TESTIMONIALS[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-neutral-900 text-lg">
                      {TESTIMONIALS[currentTestimonial].name}
                    </div>
                    <div className="text-neutral-600">
                      {TESTIMONIALS[currentTestimonial].role}
                    </div>
                    <div className="text-sm text-primary-600 font-medium">
                      {TESTIMONIALS[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowLeft size={16} />}
                  onClick={prevTestimonial}
                  className="w-12 h-12 p-0"
                />
                
                {/* Dots */}
                <div className="flex space-x-2">
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
                
                <Button
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight size={16} />}
                  onClick={nextTestimonial}
                  className="w-12 h-12 p-0"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            {
              icon: Building2,
              stat: '500+',
              label: 'Empresas Satisfechas',
              description: 'Clientes activos en todo México',
              color: 'primary',
            },
            {
              icon: Users,
              stat: '98%',
              label: 'Satisfacción Cliente',
              description: 'Recomendarían nuestros servicios',
              color: 'success',
            },
            {
              icon: TrendingUp,
              stat: '45%',
              label: 'Ahorro Promedio',
              description: 'En costos operativos anuales',
              color: 'accent',
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
            >
              <Card hover={true} className="text-center h-full">
                <CardContent className="pt-8">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6
                    ${item.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                      item.color === 'success' ? 'bg-success-100 text-success-600' :
                      'bg-accent-100 text-accent-600'}
                  `}>
                    <item.icon size={32} />
                  </div>
                  
                  <div className="text-3xl font-bold text-gradient mb-2">
                    {item.stat}
                  </div>
                  
                  <div className="text-lg font-semibold text-neutral-900 mb-2">
                    {item.label}
                  </div>
                  
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>


        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              ¿Quieres ser el próximo caso de éxito?
            </h3>
            
            <p className="text-lg text-neutral-600 mb-8">
              Únete a cientos de empresas mexicanas que ya están experimentando
              los beneficios de la contabilidad inteligente. Tu transformación
              digital comienza aquí.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="ai"
                size="lg"
                icon={<Star size={20} />}
                onClick={handleContactClick}
                trackingLabel="Contactar desde Testimonios"
              >
                Comenzar mi Transformación
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                trackingLabel="Ver más casos"
                onClick={() => trackCTAClick('Ver más casos', 'testimonials')}
              >
                Ver más casos de éxito
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}