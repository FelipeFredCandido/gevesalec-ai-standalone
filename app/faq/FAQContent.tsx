'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, ChevronUp, Search, Shield, Clock, Users, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { useAnalytics } from '@/app/lib/analytics'

interface FAQ {
  question: string
  answer: string
  category: string
}

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { trackCTAClick } = useAnalytics()

  const faqs: FAQ[] = [
    {
      category: 'IA y Tecnología',
      question: '¿Cómo funciona la IA en los servicios contables?',
      answer: 'Nuestra inteligencia artificial analiza patrones en tus transacciones, aprende de tu negocio y automatiza tareas repetitivas como clasificación de gastos, detección de errores y generación de reportes. Todo supervisado por contadores certificados.',
    },
    {
      category: 'Seguridad',
      question: '¿Es seguro usar IA para mi contabilidad?',
      answer: 'Absolutamente. Nuestra IA cumple con todos los estándares de seguridad bancaria, encripta toda la información con protocolos AES-256 y está supervisada por contadores públicos certificados. Además, cumplimos con la normativa mexicana de protección de datos.',
    },
    {
      category: 'IA y Tecnología',
      question: '¿Qué pasa si la IA comete un error?',
      answer: 'Todos los procesos de IA son revisados por nuestros contadores expertos antes de finalizar cualquier operación. Además, ofrecemos garantía total en caso de errores y contamos con seguro de responsabilidad profesional por hasta $10 MDP.',
    },
    {
      category: 'Migración',
      question: '¿Puedo migrar desde mi actual despacho contable?',
      answer: 'Sí, ofrecemos migración gratuita de todos tus datos. Nuestro equipo se encarga de la transición completa sin interrumpir tus operaciones. El proceso incluye auditoría inicial, migración de datos y verificación completa.',
    },
    {
      category: 'Implementación',
      question: '¿Cuánto tiempo toma implementar el sistema?',
      answer: 'La implementación básica toma 24-48 horas para pequeñas empresas. Para empresas medianas, el proceso completo toma 3-5 días. Empresas grandes con procesos complejos pueden requerir hasta 2 semanas para una implementación personalizada.',
    },
    {
      category: 'Soporte',
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, ofrecemos soporte 24/7 a través de nuestro asistente virtual IA para consultas inmediatas, soporte humano especializado en horarios de oficina (9 AM - 7 PM) y soporte prioritario para clientes premium con tiempo de respuesta menor a 1 hora.',
    },
    {
      category: 'Precios',
      question: '¿Cuáles son los costos del servicio?',
      answer: 'Nuestros planes inician desde $2,499 MXN mensuales para emprendedores. Ofrecemos planes personalizados para PyMEs y empresas grandes. Todos incluyen actualizaciones gratuitas, soporte técnico y sin costos de instalación.',
    },
    {
      category: 'Servicios',
      question: '¿Qué servicios incluye el paquete básico?',
      answer: 'El paquete básico incluye: contabilidad mensual, declaraciones fiscales (ISR, IVA, DIOT), generación de estados financieros, asesoría fiscal básica, portal de cliente y hasta 100 CFDIs mensuales.',
    },
    {
      category: 'Seguridad',
      question: '¿Cómo protegen mi información fiscal?',
      answer: 'Utilizamos encriptación de grado militar, servidores en México certificados, autenticación de dos factores, respaldos automáticos cada 6 horas y cumplimiento total con la Ley Federal de Protección de Datos Personales.',
    },
    {
      category: 'Implementación',
      question: '¿Necesito cambiar mi sistema actual?',
      answer: 'No necesariamente. Nuestro sistema se integra con los principales ERPs y sistemas contables del mercado (SAP, CONTPAQi, Aspel, etc.). Podemos trabajar en paralelo durante la transición.',
    },
    {
      category: 'Calculadora de Finiquitos',
      question: '¿La calculadora de finiquitos es gratuita?',
      answer: 'Sí, nuestra calculadora de finiquitos y liquidaciones es 100% gratuita, sin límite de uso y sin necesidad de registro. Calcula automáticamente prima de antigüedad, vacaciones, aguinaldo e indemnización según la LFT 2025.',
    },
    {
      category: 'Calculadora de Finiquitos',
      question: '¿Qué tan precisa es la calculadora de finiquitos?',
      answer: 'Nuestra calculadora tiene 99.8% de precisión ya que utiliza las tablas y fórmulas oficiales de la Ley Federal del Trabajo actualizada a 2025, incluyendo los topes de prima de antigüedad y las indemnizaciones constitucionales.',
    }
  ]

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleContactClick = () => {
    trackCTAClick('Contactar desde FAQ', 'faq-page')
    window.location.href = '/#contacto'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-accent-50 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home */}
          <Link href="/" className="inline-flex items-center text-neutral-600 hover:text-primary-600 mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Volver al inicio
          </Link>

          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" size="lg" icon={<HelpCircle size={16} />} className="mb-6">
              Centro de Ayuda
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Todo lo que necesitas saber sobre nuestros servicios contables con IA
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar en las preguntas frecuentes..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {category === 'all' ? 'Todas' : category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-neutral-600 mb-4">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <Button variant="primary" onClick={() => {setSearchTerm(''); setSelectedCategory('all')}}>
                Limpiar filtros
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex-1 pr-4">
                          <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-2">
                            {faq.category}
                          </span>
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {openIndex === index ? (
                            <ChevronUp className="text-primary-600" size={24} />
                          ) : (
                            <ChevronDown className="text-neutral-400" size={24} />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-5 text-neutral-600 border-t border-neutral-100">
                              <p className="pt-4 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary-600 to-accent-600 border-0">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                ¿No encontraste lo que buscabas?
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos está listo para resolver todas tus dudas y ayudarte a transformar tu contabilidad con IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleContactClick}
                  className="bg-white text-primary-600 hover:bg-neutral-100"
                >
                  Contactar a un Experto
                </Button>
                <Link href="/finiquito">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    Calcular Finiquito Gratis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}