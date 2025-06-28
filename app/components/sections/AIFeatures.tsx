'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, BarChart3, MessageCircle, ArrowRight, Sparkles, Target, Clock } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { AI_FEATURES } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

const featureIcons = {
  Zap,
  Shield,
  BarChart3,
  MessageCircle,
}

export default function AIFeatures() {
  const { trackCTAClick } = useAnalytics()

  const handleLearnMoreClick = () => {
    trackCTAClick('Conocer más IA', 'ai-features')
    
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handlePruebaGratisClick = () => {
    trackCTAClick('Prueba Gratis IA', 'ai-features')
    
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="ia-features" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="ai" size="lg" icon={<Sparkles size={16} />} className="mb-6">
            🤖 Inteligencia Artificial Avanzada
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            La{' '}
            <span className="text-gradient">Tecnología IA</span>
            <br />
            que Potencia tu Contabilidad
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Nuestros algoritmos de inteligencia artificial han sido específicamente
            entrenados para el ecosistema fiscal mexicano, proporcionando
            precisión y eficiencia sin precedentes.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {AI_FEATURES.map((feature, index) => {
            const IconComponent = featureIcons[feature.icon as keyof typeof featureIcons]
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  variant="ai" 
                  hover={true}
                  className="text-center h-full group"
                >
                  <CardContent className="pt-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-ai rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    
                    {/* Stat */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {feature.stat}
                      </div>
                      <div className="text-sm font-medium text-primary-600">
                        {feature.statLabel}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Feature Showcase */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Content */}
          <div>
            <Badge variant="success" size="lg" icon={<Target size={16} />} className="mb-6">
              🎯 Precisión Certificada
            </Badge>
            
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Tecnología{' '}
              <span className="text-gradient">Entrenada</span>
              <br />
              para México
            </h3>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Nuestros modelos de IA han sido entrenados específicamente con
              millones de transacciones del mercado mexicano, asegurando
              compatibilidad total con el SAT y las mejores prácticas fiscales.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {[
                'Reconocimiento automático de CFDI',
                'Clasificación inteligente según catálogo SAT',
                'Detección de anomalías fiscales',
                'Predicción de obligaciones futuras',
                'Optimización automática de deducciones'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                >
                  <div className="w-2 h-2 bg-gradient-ai rounded-full" />
                  <span className="text-neutral-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <Button
              variant="ai"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              onClick={handleLearnMoreClick}
              trackingLabel="Conocer más IA"
            >
              Conocer más sobre nuestra IA
            </Button>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            {/* Main Dashboard */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-neutral-200 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">
                    Análisis IA en Tiempo Real
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Procesando 847 documentos...
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">Activo</span>
                </div>
              </div>

              {/* Processing Animation */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-700">Clasificación automática</span>
                  <span className="text-sm font-medium text-primary-600">99.2%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-ai rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '99.2%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Recent Activities */}
              <div className="space-y-3">
                {[
                  { type: 'success', text: 'Factura clasificada: Gastos de oficina', time: 'Hace 2 seg' },
                  { type: 'warning', text: 'Posible error detectado en RFC', time: 'Hace 15 seg' },
                  { type: 'info', text: 'Backup automático completado', time: 'Hace 1 min' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-neutral-50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.2) }}
                  >
                    <div className={`
                      w-2 h-2 rounded-full mt-2 shrink-0
                      ${activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}
                    `} />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-700 font-medium">
                        {activity.text}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-ai rounded-full flex items-center justify-center text-white shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={20} />
              </motion.div>
            </div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-neutral-200"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-primary-600" />
                <div>
                  <div className="text-sm font-medium text-neutral-900">
                    75% menos tiempo
                  </div>
                  <div className="text-xs text-neutral-500">
                    vs. método tradicional
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-8 -left-8 bg-success-500 text-white rounded-lg shadow-lg p-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-sm font-bold">99.8%</div>
              <div className="text-xs opacity-90">Precisión</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-ai rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para experimentar el futuro de la contabilidad?
            </h3>
            
            <p className="text-lg text-white/90 mb-8">
              Únete a más de 500 empresas que ya están transformando
              sus procesos contables con nuestra tecnología de IA.
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              icon={<MessageCircle size={20} />}
              trackingLabel="Prueba Gratis IA"
              className="bg-white text-primary-600 hover:bg-neutral-50"
              onClick={handlePruebaGratisClick}
            >
              Comenzar Prueba Gratuita
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}