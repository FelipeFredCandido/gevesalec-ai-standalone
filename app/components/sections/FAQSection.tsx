'use client'

import { motion } from 'framer-motion'
import { useAnalytics } from '@/app/lib/analytics'

export default function FAQSection() {
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