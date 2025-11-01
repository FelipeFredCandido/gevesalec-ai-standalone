'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react'
import Badge from '@/app/components/ui/Badge'

const faqs = [
  {
    question: '¿Qué pasa con mi contador actual? ¿Tengo que dar alguna explicación?',
    answer: 'No necesitas dar explicaciones ni enfrentamientos incómodos. Nosotros nos encargamos de TODO el proceso de migración. Solicitamos tu información directamente al SAT (con tu autorización) y en 48 horas ya estamos operando. Tu contador actual ni siquiera tiene que saber que estás buscando alternativas.',
    category: 'Migración',
  },
  {
    question: '¿Es complicado el cambio? ¿Voy a tener que hacer mucho papeleo?',
    answer: 'El cambio es SÚPER simple. Solo necesitas: 1) Darnos acceso al SAT (15 minutos), 2) Compartir tu información básica (RFC, facturas recientes), y YA. Nosotros hacemos TODO lo demás. En promedio, nuestros clientes invierten menos de 30 minutos TOTALES en el proceso de cambio.',
    category: 'Migración',
  },
  {
    question: '¿Cuánto tarda en estar todo funcionando?',
    answer: 'Desde que nos das acceso hasta que recibimos tu primera factura: 48 horas máximo. Para el primer mes completo de operación: 1 semana. No hay "período de prueba" donde las cosas estén a medias - o estamos operando al 100% o no cobramos.',
    category: 'Migración',
  },
  {
    question: '¿Qué pasa si cometen un error y el SAT me multa?',
    answer: 'Si el error es nuestro, NOSOTROS PAGAMOS LA MULTA COMPLETA. Así de simple. Además, tenemos un seguro de responsabilidad civil de $5M MXN que nos respalda. En 2024 hemos tenido CERO multas por errores nuestros. Pero si alguna vez pasa, no pagas ni un peso de tu bolsillo.',
    category: 'Seguridad',
  },
  {
    question: '¿Cuánto cuesta? ¿Es más caro que mi contador actual?',
    answer: 'El 87% de nuestros clientes pagan LO MISMO o MENOS que con su contador anterior. La diferencia es que incluimos todo: nómina, declaraciones, optimización fiscal, alertas, soporte por WhatsApp, etc. Sin costos ocultos ni "cobros extras" por cada trámite. Agenda tu diagnóstico y te damos un precio exacto basado en tu caso.',
    category: 'Precios',
  },
  {
    question: '¿De verdad funciona eso de la "IA"? ¿O es puro marketing?',
    answer: 'La IA no hace magia - hace el trabajo pesado y repetitivo que un humano haría en 10 horas, pero en 10 minutos. Después, un Contador Público CERTIFICADO revisa todo antes de enviarlo al SAT. Es tecnología + experiencia humana. El resultado: detectamos deducciones y errores que otros contadores NO ven, y lo hacemos más rápido.',
    category: 'Tecnología',
  },
  {
    question: '¿Qué pasa si mi empresa crece? ¿Van a poder con el volumen?',
    answer: 'Tenemos clientes desde $50,000 hasta $15M MXN de facturación mensual. El sistema escala automáticamente. De hecho, mientras MÁS facturas tengas, más ventaja te da nuestra tecnología (porque un contador tradicional te cobraría más por el volumen, nosotros no).',
    category: 'Escalabilidad',
  },
  {
    question: '¿Necesito entender de contabilidad o tecnología?',
    answer: 'CERO. Solo necesitas saber usar WhatsApp. Nos mandas foto de la factura → nosotros hacemos todo → te avisamos cuando esté listo. Así de simple. Si quieres ver reportes detallados, tenemos un dashboard. Si no, solo recibe alertas y listo.',
    category: 'Facilidad',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary" size="lg" icon={<HelpCircle size={16} />} className="mb-6">
            ❓ Preguntas Frecuentes
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Todo lo que Necesitas{' '}
            <span className="text-gradient">Saber Antes de Cambiar</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Sabemos que cambiar de contador da miedo. Aquí respondemos las preguntas
            que TODOS nuestros clientes tenían antes de dar el paso.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className={`
                  bg-white border-2 rounded-xl overflow-hidden transition-all duration-300
                  ${openIndex === index
                    ? 'border-primary-500 shadow-lg'
                    : 'border-neutral-200 hover:border-neutral-300 shadow'
                  }
                `}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {faq.category}
                    </div>

                    {/* Question */}
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors pr-8">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className={`
                    w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300
                    ${openIndex === index ? 'rotate-180 bg-primary-600' : ''}
                  `}>
                    <ChevronDown
                      size={20}
                      className={openIndex === index ? 'text-white' : 'text-primary-600'}
                    />
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-neutral-200 pt-4">
                          <p className="text-neutral-700 leading-relaxed text-base md:text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Message */}
        <motion.div
          className="mt-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-success-50 border-2 border-success-200 rounded-xl p-8">
            <CheckCircle2 className="w-12 h-12 text-success-600 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3">
              ¿Tienes más preguntas?
            </h3>
            <p className="text-neutral-700 mb-4">
              En el diagnóstico gratuito de 15 minutos resolvemos TODAS tus dudas específicas
              sobre tu caso particular. Sin presión, sin compromiso.
            </p>
            <p className="text-sm text-neutral-600">
              <strong>Tip:</strong> El 94% de las personas que agendan el diagnóstico descubren
              al menos 3 deducciones que su contador actual está pasando por alto.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
