'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData, companyTypeLabels } from '@/app/lib/schemas'
import Hero from '@/app/components/sections/Hero'
import Services from '@/app/components/sections/Services'
import AIFeatures from '@/app/components/sections/AIFeatures'
import Testimonials from '@/app/components/sections/Testimonials'
import ChatBot from '@/app/components/interactive/ChatBot'
import { useAnalytics, trackScrollDepth, trackTimeOnPage } from '@/app/lib/analytics'

export default function HomePage() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view
    trackPageView('/', 'Inicio - GEVESALEC')

    // Setup scroll tracking
    const cleanupScroll = trackScrollDepth()
    
    // Setup time tracking
    const cleanupTime = trackTimeOnPage()

    // Cleanup on unmount
    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [trackPageView])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* AI Features Section */}
      <AIFeatures />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact/CTA Section */}
      <ContactSection />

      {/* FAQ Section */}
      <FAQSection />
      
      {/* ChatBot */}
      <ChatBot />
    </motion.div>
  )
}

// Contact Section Component
function ContactSection() {
  const { trackCTAClick } = useAnalytics()
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      trackCTAClick('Formulario Contacto', 'contact')
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        reset()
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.message || 'Error al enviar formulario')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Error handling is done by React Hook Form
    }
  }

  return (
    <section id="contacto" className="section-padding bg-gradient-ai text-white">
      <div className="container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Transformar tu Contabilidad?
            </h2>
            
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Agenda una consulta gratuita con nuestros expertos en IA contable.
              Te mostraremos cómo puedes automatizar tus procesos y optimizar
              tu situación fiscal en menos de 30 días.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">✓</span>
                </div>
                <span>Consulta gratuita de 30 minutos</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">✓</span>
                </div>
                <span>Análisis personalizado de tu situación</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">✓</span>
                </div>
                <span>Propuesta de implementación sin compromiso</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Agendar Consulta Gratuita</h3>
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">¡Consulta Agendada!</h4>
                  <p className="text-white/90">
                    Gracias por tu interés. Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Nombre completo"
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 transition-colors ${
                          errors.name ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-white/50'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Email corporativo"
                        className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 transition-colors ${
                          errors.email ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-white/50'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="Teléfono"
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-white/50'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <select
                      {...register('companyType')}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                        errors.companyType ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-white/50'
                      }`}
                    >
                      <option value="" className="text-neutral-900">Tipo de empresa</option>
                      {Object.entries(companyTypeLabels).map(([value, label]) => (
                        <option key={value} value={value} className="text-neutral-900">
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.companyType && (
                      <p className="text-red-300 text-sm mt-1">{errors.companyType.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <textarea
                      {...register('situation')}
                      placeholder="Cuéntanos sobre tu situación contable actual..."
                      rows={4}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 resize-none transition-colors ${
                        errors.situation ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-white/50'
                      }`}
                    />
                    {errors.situation && (
                      <p className="text-red-300 text-sm mt-1">{errors.situation.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-primary-600 font-semibold py-4 rounded-lg hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      'Agendar Consulta Gratuita'
                    )}
                  </button>
                </form>
              )}
              
              <p className="text-center text-white/70 text-sm mt-4">
                Respuesta garantizada en menos de 24 horas
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// FAQ Section Component
function FAQSection() {
  const { trackCTAClick } = useAnalytics()

  const faqs = [
    {
      question: '¿Cómo funciona la IA en los servicios contables?',
      answer: 'Nuestra inteligencia artificial analiza patrones en tus transacciones, aprende de tu negocio y automatiza tareas repetitivas como clasificación de gastos, detección de errores y generación de reportes.',
    },
    {
      question: '¿Es seguro usar IA para mi contabilidad?',
      answer: 'Absolutamente. Nuestra IA cumple con todos los estándares de seguridad bancaria, encripta toda la información y está supervisada por contadores públicos certificados.',
    },
    {
      question: '¿Qué pasa si la IA comete un error?',
      answer: 'Todos los procesos de IA son revisados por nuestros contadores expertos. Además, ofrecemos garantía total en caso de errores y seguro de responsabilidad profesional.',
    },
    {
      question: '¿Puedo migrar desde mi actual despacho contable?',
      answer: 'Sí, ofrecemos migración gratuita de todos tus datos. Nuestro equipo se encarga de la transición sin interrumpir tus operaciones.',
    },
    {
      question: '¿Cuánto tiempo toma implementar el sistema?',
      answer: 'La implementación básica toma 24-48 horas. Para empresas grandes con procesos complejos, puede tomar hasta una semana.',
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, ofrecemos soporte 24/7 a través de nuestro asistente virtual IA y soporte humano especializado en horarios de oficina.',
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-padding">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Preguntas Frecuentes
          </h2>
          
          <p className="text-lg text-neutral-600">
            Resolvemos las dudas más comunes sobre nuestros servicios
            de contabilidad inteligente.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200"
              >
                <h3 className="font-semibold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-neutral-600 mb-6">
              ¿No encuentras la respuesta que buscas?
            </p>
            
            <button
              onClick={() => trackCTAClick('Contactar FAQ', 'faq')}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <span>Contáctanos directamente</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}