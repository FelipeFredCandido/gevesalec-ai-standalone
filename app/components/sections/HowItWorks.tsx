'use client'

import { motion } from 'framer-motion'
import { Send, Cog, CheckCircle2, Clock, Smartphone, FileText, ArrowRight, Zap } from 'lucide-react'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { useAnalytics } from '@/app/lib/analytics'

const steps = [
  {
    number: '1',
    icon: Send,
    title: 'Envías tus Facturas',
    subtitle: 'Súper fácil, por WhatsApp',
    description: 'Solo nos mandas tus facturas por WhatsApp o email. Toma literalmente 30 segundos de tu día.',
    details: [
      'Por WhatsApp, email o subes a carpeta compartida',
      'No necesitas ordenarlas ni clasificarlas',
      'Nosotros nos encargamos de todo lo demás',
    ],
    timeIcon: Clock,
    time: '30 segundos',
    color: 'primary',
    visual: 'whatsapp',
  },
  {
    number: '2',
    icon: Cog,
    title: 'Nosotros lo Procesamos',
    subtitle: 'Mientras duermes o cierras ventas',
    description: 'Nuestro equipo y tecnología clasifican, revisan y preparan todo. Tú no mueves ni un dedo.',
    details: [
      'Clasificación automática de cada gasto',
      'Revisión por contador certificado',
      'Detección de errores y optimizaciones',
    ],
    timeIcon: Zap,
    time: 'Automático',
    color: 'accent',
    visual: 'processing',
  },
  {
    number: '3',
    icon: CheckCircle2,
    title: 'Recibes Todo Listo',
    subtitle: 'Declaraciones, reportes y avisos',
    description: 'Te enviamos todo completo, presentado al SAT y listo. Solo disfrutas de tu tranquilidad.',
    details: [
      'Declaraciones presentadas al SAT',
      'Reportes financieros claros y sencillos',
      'Avisos de fechas importantes',
    ],
    timeIcon: CheckCircle2,
    time: 'Completo',
    color: 'success',
    visual: 'done',
  },
]

export default function HowItWorks() {
  const { trackCTAClick } = useAnalytics()

  const handleStartClick = () => {
    trackCTAClick('Empezar Ahora - How It Works', 'how-it-works')

    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
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
          <Badge variant="ai" size="lg" icon={<Smartphone size={16} />} className="mb-6">
            ⚡ Proceso Simple
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Trabajar con Nosotros{' '}
            <br />
            es <span className="text-gradient">Súper Fácil</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Olvídate de software complicado, capacitaciones o procesos tediosos.
            Solo 3 pasos sencillos y <strong className="text-primary-600">tú te olvidas del resto.</strong>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const TimeIcon = step.timeIcon

            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Connector line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-32 w-0.5 h-32 bg-gradient-to-b from-primary-300 to-transparent transform -translate-x-1/2 z-0" />
                )}

                <div className={`
                  grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24
                  ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}
                `}>
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {/* Step number badge */}
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold
                        ${step.color === 'primary' ? 'bg-primary-600' :
                          step.color === 'accent' ? 'bg-accent-600' :
                          'bg-success-600'}
                      `}>
                        {step.number}
                      </div>
                      <div className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        ${step.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                          step.color === 'accent' ? 'bg-accent-100 text-accent-700' :
                          'bg-success-100 text-success-700'}
                      `}>
                        <div className="flex items-center gap-2">
                          <TimeIcon size={14} />
                          <span>{step.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg text-neutral-600 mb-4">{step.subtitle}</p>

                    {/* Description */}
                    <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: (index * 0.2) + (detailIndex * 0.1) }}
                        >
                          <CheckCircle2 className={`
                            w-5 h-5 mt-0.5 shrink-0
                            ${step.color === 'primary' ? 'text-primary-600' :
                              step.color === 'accent' ? 'text-accent-600' :
                              'text-success-600'}
                          `} />
                          <span className="text-neutral-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.visual === 'whatsapp' && (
                        <div className="bg-gradient-to-br from-success-50 to-primary-50 rounded-2xl shadow-2xl p-8 border-2 border-success-200">
                          <div className="bg-white rounded-xl shadow-lg p-6">
                            {/* WhatsApp mockup */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-200">
                              <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center text-white font-bold">
                                G
                              </div>
                              <div>
                                <div className="font-semibold text-neutral-900">GEVESALEC</div>
                                <div className="text-xs text-neutral-600">en línea</div>
                              </div>
                            </div>

                            {/* Messages */}
                            <div className="space-y-3">
                              <div className="flex justify-end">
                                <div className="bg-primary-100 rounded-lg rounded-tr-none p-3 max-w-xs">
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText size={16} className="text-primary-600" />
                                    <span className="text-sm font-medium text-primary-900">factura_marzo.pdf</span>
                                  </div>
                                  <p className="text-sm text-neutral-700">Aquí está la factura de este mes 📄</p>
                                  <div className="text-xs text-neutral-500 mt-1">10:23 AM</div>
                                </div>
                              </div>

                              <div className="flex justify-start">
                                <div className="bg-neutral-100 rounded-lg rounded-tl-none p-3 max-w-xs">
                                  <p className="text-sm text-neutral-700">¡Perfecto! Ya la recibimos y procesamos ✅</p>
                                  <p className="text-sm text-neutral-700 mt-1">Todo está en orden 😊</p>
                                  <div className="text-xs text-neutral-500 mt-1">10:24 AM</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Floating emoji */}
                          <motion.div
                            className="absolute -top-4 -right-4 text-5xl"
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            📱
                          </motion.div>
                        </div>
                      )}

                      {step.visual === 'processing' && (
                        <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl shadow-2xl p-8 border-2 border-accent-200">
                          <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center mb-4">
                              <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-3">
                                <Cog className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
                              </div>
                              <h4 className="font-bold text-neutral-900">Procesando...</h4>
                              <p className="text-sm text-neutral-600">Tu equipo está trabajando</p>
                            </div>

                            <div className="space-y-3">
                              {[
                                { task: 'Clasificando gastos', status: 'done' },
                                { task: 'Validando RFC', status: 'done' },
                                { task: 'Revisando deducciones', status: 'progress' },
                                { task: 'Preparando declaración', status: 'pending' },
                              ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  {item.status === 'done' && <CheckCircle2 size={18} className="text-success-600" />}
                                  {item.status === 'progress' && (
                                    <div className="w-4 h-4 border-2 border-accent-600 border-t-transparent rounded-full animate-spin" />
                                  )}
                                  {item.status === 'pending' && <div className="w-4 h-4 rounded-full bg-neutral-300" />}
                                  <span className={`text-sm ${item.status === 'pending' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                                    {item.task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Floating emoji */}
                          <motion.div
                            className="absolute -top-4 -right-4 text-5xl"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ⚙️
                          </motion.div>
                        </div>
                      )}

                      {step.visual === 'done' && (
                        <div className="bg-gradient-to-br from-success-50 to-primary-50 rounded-2xl shadow-2xl p-8 border-2 border-success-200">
                          <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="text-center mb-4">
                              <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                              </div>
                              <h4 className="font-bold text-success-900 text-lg">¡Todo Completo!</h4>
                              <p className="text-sm text-neutral-600">Declaración presentada al SAT</p>
                            </div>

                            <div className="space-y-3 bg-success-50 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-neutral-700">Estado:</span>
                                <Badge variant="success" size="sm">Presentada</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-neutral-700">Fecha:</span>
                                <span className="text-sm font-semibold text-neutral-900">31 Oct 2024</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-neutral-700">Próxima fecha:</span>
                                <span className="text-sm font-semibold text-neutral-900">30 Nov 2024</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
                              <p className="text-sm text-neutral-600">
                                📧 Reporte enviado a tu correo
                              </p>
                            </div>
                          </div>

                          {/* Floating emoji */}
                          <motion.div
                            className="absolute -top-4 -right-4 text-5xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            ✅
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary Box */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border-2 border-primary-200">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
              Eso es TODO lo que haces 👆
            </h3>
            <p className="text-lg text-neutral-700 text-center mb-6">
              Solo envías facturas. Nosotros hacemos literalmente todo lo demás.
              <strong className="block text-primary-600 mt-2">Cero software que aprender. Cero complicaciones.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">30 seg</div>
                <div className="text-sm text-neutral-600">Tu tiempo al mes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success-600">0</div>
                <div className="text-sm text-neutral-600">Software que usar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-600">100%</div>
                <div className="text-sm text-neutral-600">Nosotros trabajamos</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            ¿Listo para la Forma Más Fácil de Hacer tu Contabilidad?
          </h3>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Empieza hoy mismo. La configuración toma 10 minutos
            y estarás listo para enviarnos tu primera factura.
          </p>

          <Button
            variant="ai"
            size="lg"
            icon={<ArrowRight size={20} />}
            iconPosition="right"
            onClick={handleStartClick}
            trackingLabel="Empezar Ahora - How It Works"
          >
            Empezar Ahora
          </Button>

          <p className="text-sm text-neutral-500 mt-4">
            ✓ Sin contratos largos  •  ✓ Cancela cuando quieras  •  ✓ Primer mes con descuento
          </p>
        </motion.div>
      </div>
    </section>
  )
}
