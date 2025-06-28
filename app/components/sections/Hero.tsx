'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, TrendingUp, MessageCircle, ArrowRight, Play } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { COMPANY_INFO, STATS } from '@/app/lib/constants'
import { useAnalytics } from '@/app/lib/analytics'

export default function Hero() {
  const { trackCTAClick } = useAnalytics()

  const handleWhatsAppClick = () => {
    trackCTAClick('WhatsApp Hero', 'hero')
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, me interesa conocer más sobre los servicios de GEVESALEC`, '_blank')
  }

  const handleDemoClick = () => {
    trackCTAClick('Ver Demo', 'hero')
    // TODO: Implement demo modal or navigation
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Elements */}
      <div className="absolute inset-0 ai-grid opacity-30" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-ai rounded-full opacity-10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-success-400 to-accent-400 rounded-full opacity-10 blur-3xl animate-float animation-delay-1000" />
      
      <div className="container-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="ai" size="lg" icon={<Brain size={16} />}>
                🇲🇽 Primer despacho contable con IA en México
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contabilidad{' '}
              <span className="text-gradient">
                Inteligente
              </span>
              <br />
              para tu{' '}
              <span className="relative">
                Empresa
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-ai opacity-30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Revoluciona tu contabilidad con{' '}
              <strong className="text-primary-600">inteligencia artificial</strong>.
              Automatiza procesos, detecta errores y optimiza tu situación fiscal
              con la tecnología más avanzada del mercado.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="ai"
                size="lg"
                icon={<MessageCircle size={20} />}
                onClick={handleWhatsAppClick}
                trackingLabel="WhatsApp Hero CTA"
                className="shadow-2xl hover:shadow-ai-lg"
              >
                Comenzar Gratis
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<Play size={20} />}
                onClick={handleDemoClick}
                trackingLabel="Ver Demo Hero"
              >
                Ver Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {STATS.map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-ai rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Dashboard IA</h3>
                    <p className="text-sm text-neutral-600">Análisis en tiempo real</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  En línea
                </Badge>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-ai-light p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700">
                      Automatización
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">95%</div>
                </div>
                
                <div className="bg-gradient-to-br from-success-50 to-success-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-success-600" />
                    <span className="text-sm font-medium text-neutral-700">
                      Ahorro Tiempo
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-success-600">75%</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Clasificación Automática
                    </span>
                    <span className="text-sm text-neutral-600">99.2%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-ai h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '99.2%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Detección de Errores
                    </span>
                    <span className="text-sm text-neutral-600">97.8%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-success-500 to-accent-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '97.8%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Optimización Fiscal
                    </span>
                    <span className="text-sm text-neutral-600">94.5%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '94.5%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                IA
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center text-white"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -top-8 -left-8 bg-white rounded-lg shadow-lg p-4 border border-neutral-200"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  Backup automático
                </span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-4 border border-neutral-200"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-neutral-700">
                  Procesando...
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}