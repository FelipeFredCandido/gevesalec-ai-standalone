'use client'

import { motion } from 'framer-motion'
import { 
  Scale, 
  FileText, 
  Calculator, 
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { useAnalytics } from '@/app/lib/analytics'

export default function FiniquitoPromoSection() {
  const { trackCTAClick } = useAnalytics()

  const handleCTAClick = () => {
    trackCTAClick('Calcular Finiquito desde Homepage', 'homepage-finiquito-section')
    window.location.href = '/finiquito'
  }

  const calculationTypes = [
    {
      icon: <FileText size={24} />,
      title: 'Finiquito',
      description: 'Renuncia, contrato terminado, despido justificado',
      color: 'bg-green-100 text-green-600',
      borderColor: 'border-green-200'
    },
    {
      icon: <Scale size={24} />,
      title: 'Liquidación',
      description: 'Despido injustificado con indemnización completa',
      color: 'bg-red-100 text-red-600',
      borderColor: 'border-red-200'
    }
  ]

  const features = [
    {
      icon: <Shield size={20} />,
      title: 'Base Legal LFT 2025',
      description: 'Cumple regulaciones vigentes'
    },
    {
      icon: <Calculator size={20} />,
      title: 'Cálculo Automático',
      description: 'Prima, vacaciones e indemnización'
    },
    {
      icon: <Clock size={20} />,
      title: 'Resultados Inmediatos',
      description: 'Sin registro ni esperas'
    },
    {
      icon: <Users size={20} />,
      title: 'Más de 200 Cálculos',
      description: 'Realizados esta semana'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="ai" size="lg" icon={<Scale size={16} />} className="mb-4">
            🆕 Nueva Calculadora
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Calculadora de{' '}
            <span className="text-gradient">Finiquitos y Liquidaciones</span>
          </h2>
          
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            La primera calculadora laboral de México con IA. Obtén el cálculo exacto 
            de tus derechos laborales según la Ley Federal del Trabajo 2025.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Calculation Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                ¿Qué puedes calcular?
              </h3>
              
              <div className="space-y-4">
                {calculationTypes.map((type, index) => (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Card className={`border-2 ${type.borderColor} hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${type.color}`}>
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                              {type.title}
                            </h4>
                            <p className="text-neutral-600 text-sm">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="text-center p-4 bg-white rounded-lg border border-neutral-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <div className="text-primary-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h5 className="font-semibold text-neutral-900 text-sm mb-1">
                    {feature.title}
                  </h5>
                  <p className="text-xs text-neutral-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-2 border-primary-200 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-500 rounded-full blur-2xl" />
              </div>

              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-neutral-900 mb-2">
                  ¡Calcula Gratis!
                </CardTitle>
                <p className="text-neutral-600">
                  Obtén tu cálculo profesional en menos de 3 minutos
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                {/* Included items */}
                <div className="space-y-3">
                  {[
                    'Prima de antigüedad calculada',
                    'Aguinaldo proporcional exacto',
                    'Vacaciones + prima vacacional',
                    'Indemnización (si aplica)',
                    'Base legal de cada concepto'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant="ai"
                  size="lg"
                  className="w-full"
                  onClick={handleCTAClick}
                  icon={<ArrowRight size={20} />}
                >
                  Calcular Mi Finiquito Gratis
                </Button>

                {/* Trust indicator */}
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-xs text-neutral-500">
                    <Shield size={14} />
                    <span>Sin registro • 100% gratuito • Datos seguros</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { number: '247', label: 'Cálculos esta semana', subtext: 'Y subiendo cada día' },
            { number: '99.8%', label: 'Precisión legal', subtext: 'Basado en LFT vigente' },
            { number: '<3min', label: 'Tiempo promedio', subtext: 'Resultados inmediatos' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-neutral-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-neutral-600">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}