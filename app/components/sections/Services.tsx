'use client'

import { motion } from 'framer-motion'
import { Brain, FileText, Users, TrendingUp, Target, Calculator, Zap, ArrowRight, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { SERVICES } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

const serviceIcons = {
  Brain,
  FileText,
  Users,
  TrendingUp,
  Target,
  Calculator,
  Zap,
}

export default function Services() {
  const { trackServiceView, trackCTAClick } = useAnalytics()

  const handleServiceClick = (serviceName: string) => {
    trackServiceView(serviceName)
  }

  const handleContactClick = (serviceName: string) => {
    trackCTAClick(`Contactar ${serviceName}`, 'services')
    
    // Scroll suave al formulario de contacto
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleAgendarClick = () => {
    trackCTAClick('Consulta Gratuita', 'services')
    
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="servicios" className="section-padding bg-white">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary" size="lg" className="mb-6">
            🚀 Servicios Potenciados por IA
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Servicios que{' '}
            <span className="text-gradient">Revolucionan</span>
            <br />
            tu Contabilidad
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Descubre cómo nuestros servicios inteligentes transforman
            la manera de manejar las finanzas de tu empresa con
            precisión, velocidad y eficiencia sin precedentes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service, index) => {
            const IconComponent = serviceIcons[service.icon as keyof typeof serviceIcons]
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleServiceClick(service.title)}
              >
                <Card 
                  variant={service.color === 'primary' ? 'ai' : 'default'}
                  hover={true}
                  className="h-full group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${service.color === 'primary' ? 'bg-gradient-ai' : 
                          service.color === 'success' ? 'bg-success-500' : 
                          'bg-accent-500'}
                        text-white group-hover:scale-110 transition-transform duration-200
                      `}>
                        <IconComponent size={24} />
                      </div>
                      
                      <Badge 
                        variant={service.color as any} 
                        size="sm"
                        className="opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        {service.color === 'primary' ? 'IA' : 
                         service.color === 'success' ? 'Auto' : 'Pro'}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {service.title}
                    </CardTitle>
                    
                    <p className="text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent>
                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: (index * 0.1) + (featureIndex * 0.05) 
                          }}
                        >
                          <div className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center mt-0.5 shrink-0">
                            <Check size={12} className="text-success-600" />
                          </div>
                          <span className="text-sm text-neutral-700 leading-relaxed">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <div className="text-lg font-bold text-neutral-900">
                          {service.price}
                        </div>
                        <div className="text-xs text-neutral-500">
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ArrowRight size={16} />}
                        iconPosition="right"
                        onClick={() => handleContactClick(service.title)}
                        trackingLabel={`Contactar ${service.title}`}
                        className="group-hover:bg-primary-50 group-hover:border-primary-300 group-hover:text-primary-700"
                      >
                        Contactar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-ai-light rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              ¿No estás seguro cuál servicio necesitas?
            </h3>
            
            <p className="text-lg text-neutral-600 mb-8">
              Nuestros expertos te ayudarán a identificar
              la solución perfecta para tu negocio. Agenda una consulta
              gratuita y descubre cómo optimizar tus procesos.
            </p>
            
            <div className="flex justify-center">
              <Button
                variant="ai"
                size="lg"
                icon={<Brain size={20} />}
                trackingLabel="Consulta Gratuita Services"
                onClick={() => handleAgendarClick()}
              >
                Agendar Consulta Gratuita
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-primary-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">15 min</div>
                <div className="text-sm text-neutral-600">Consulta express</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">100%</div>
                <div className="text-sm text-neutral-600">Sin compromiso</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">24h</div>
                <div className="text-sm text-neutral-600">Respuesta garantizada</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}