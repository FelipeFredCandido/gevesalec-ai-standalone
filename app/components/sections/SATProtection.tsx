'use client'

import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle2, TrendingUp, FileWarning, Clock, DollarSign, Brain } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { useAnalytics } from '@/app/lib/analytics'

const protectionFeatures = [
  {
    icon: Shield,
    title: 'Detección Temprana',
    description: 'Identificamos errores fiscales ANTES de que lleguen al SAT. Tu tranquilidad es nuestra prioridad.',
    stat: '99.2%',
    statLabel: 'Errores detectados',
    color: 'success',
  },
  {
    icon: AlertTriangle,
    title: 'Alertas Preventivas',
    description: 'Te avisamos con tiempo sobre fechas límite y obligaciones. Nunca más una multa por olvido.',
    stat: '100%',
    statLabel: 'Cumplimiento',
    color: 'warning',
  },
  {
    icon: FileWarning,
    title: 'Revisión Doble',
    description: 'Todo pasa por nuestro sistema y por un contador experto. Doble verificación, cero errores.',
    stat: '0',
    statLabel: 'Multas en 2024',
    color: 'primary',
  },
  {
    icon: DollarSign,
    title: 'Optimización Legal',
    description: 'Encontramos deducciones que otros contadores pasan por alto. Pagas solo lo justo.',
    stat: '30%',
    statLabel: 'Ahorro promedio',
    color: 'accent',
  },
]

const realCases = [
  {
    problem: 'Error en RFC de proveedor',
    consequence: 'Multa potencial: $15,000',
    solution: 'Detectado y corregido 3 días antes del cierre',
    saved: '$15,000',
  },
  {
    problem: 'Deducciones no aplicadas',
    consequence: 'Pago excesivo: $38,000',
    solution: 'Identificamos 12 deducciones válidas',
    saved: '$38,000',
  },
  {
    problem: 'Fecha límite no declarada',
    consequence: 'Multa automática: $22,000',
    solution: 'Alerta 7 días antes + declaración a tiempo',
    saved: '$22,000',
  },
]

export default function SATProtection() {
  const { trackCTAClick } = useAnalytics()

  const handleProtectionClick = () => {
    trackCTAClick('Diagnóstico Gratis SAT', 'sat-protection')

    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section id="proteccion-sat" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="ai" size="lg" icon={<Shield size={16} />} className="mb-6">
            🛡️ Protección Garantizada
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Por Qué Nunca Tendrás{' '}
            <br />
            <span className="text-gradient">Problemas con el SAT</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            Mientras otros despachos solo <strong>reaccionan</strong> cuando hay problemas,
            nosotros los <strong className="text-primary-600">prevenimos antes de que sucedan.</strong>{' '}
            Así duermes tranquilo cada noche.
          </p>
        </motion.div>

        {/* Protection Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {protectionFeatures.map((feature, index) => {
            const IconComponent = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  variant="default"
                  hover={true}
                  className="text-center h-full group"
                >
                  <CardContent className="pt-8">
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6
                      group-hover:scale-110 transition-transform duration-300
                      ${feature.color === 'success' ? 'bg-success-500' :
                        feature.color === 'warning' ? 'bg-warning-500' :
                        feature.color === 'primary' ? 'bg-primary-600' :
                        'bg-accent-500'}
                      text-white
                    `}>
                      <IconComponent size={32} />
                    </div>

                    {/* Stat */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gradient mb-1">
                        {feature.stat}
                      </div>
                      <div className="text-sm font-medium text-neutral-600">
                        {feature.statLabel}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Real Cases Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <Badge variant="success" size="lg" icon={<CheckCircle2 size={16} />} className="mb-4">
              💰 Casos Reales de Clientes
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Problemas que <span className="text-gradient">Evitamos Este Mes</span>
            </h3>
            <p className="text-lg text-neutral-600">
              Ejemplos reales de cómo protegemos el dinero de nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realCases.map((caso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              >
                <div className="bg-white rounded-xl shadow-lg border-l-4 border-error-500 p-6 h-full">
                  {/* Problema */}
                  <div className="mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm">PROBLEMA:</p>
                        <p className="text-neutral-700 text-sm">{caso.problem}</p>
                      </div>
                    </div>
                    <div className="ml-7 text-error-600 font-bold text-lg">
                      {caso.consequence}
                    </div>
                  </div>

                  {/* Solución */}
                  <div className="mb-4 bg-success-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-success-900 text-sm">SOLUCIÓN:</p>
                        <p className="text-success-800 text-sm">{caso.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ahorro */}
                  <div className="pt-3 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Cliente ahorró:</span>
                      <span className="text-2xl font-bold text-success-600">{caso.saved}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How We Protect You */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Content */}
          <div>
            <Badge variant="primary" size="lg" icon={<Brain size={16} />} className="mb-6">
              🎯 Tecnología + Experiencia
            </Badge>

            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Cómo Te <span className="text-gradient">Protegemos</span> Todos los Días
            </h3>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Combinamos tecnología inteligente con contadores expertos.
              El resultado: <strong className="text-primary-600">detectamos problemas que otros nunca ven.</strong>
            </p>

            {/* Process List */}
            <div className="space-y-4 mb-8">
              {[
                {
                  step: '1',
                  title: 'Análisis Automático 24/7',
                  desc: 'Nuestro sistema revisa cada factura y transacción buscando inconsistencias'
                },
                {
                  step: '2',
                  title: 'Revisión por Contador Experto',
                  desc: 'Un profesional certificado valida todo antes de enviarlo al SAT'
                },
                {
                  step: '3',
                  title: 'Alertas Tempranas',
                  desc: 'Te avisamos días antes si detectamos algo que necesita atención'
                },
                {
                  step: '4',
                  title: 'Solución Inmediata',
                  desc: 'No solo te decimos qué está mal, nosotros lo corregimos'
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                >
                  <div className="w-10 h-10 bg-gradient-ai rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-neutral-900 mb-1">{item.title}</h4>
                    <p className="text-neutral-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              variant="ai"
              size="lg"
              icon={<Shield size={20} />}
              onClick={handleProtectionClick}
              trackingLabel="Diagnóstico Gratis SAT"
            >
              Quiero Esta Protección
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-success-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                <div>
                  <h4 className="font-bold text-neutral-900 text-lg">
                    Sistema de Protección
                  </h4>
                  <p className="text-sm text-neutral-600">
                    Monitoreando tu empresa 24/7
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse" />
                  <span className="text-sm text-success-600 font-semibold">Activo</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-success-50 rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 text-success-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-success-600">0</div>
                  <div className="text-xs text-neutral-600">Multas este año</div>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-primary-600">47</div>
                  <div className="text-xs text-neutral-600">Errores prevenidos</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-neutral-700 mb-3">Actividad Reciente:</p>

                {[
                  { icon: CheckCircle2, text: 'RFC validado correctamente', color: 'success', time: '2 min' },
                  { icon: AlertTriangle, text: 'Fecha límite en 5 días - recordatorio enviado', color: 'warning', time: '1 hora' },
                  { icon: CheckCircle2, text: 'Declaración mensual enviada', color: 'success', time: '2 días' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                  >
                    <activity.icon className={`
                      w-5 h-5 mt-0.5 shrink-0
                      ${activity.color === 'success' ? 'text-success-600' : 'text-warning-600'}
                    `} />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-700">{activity.text}</p>
                      <p className="text-xs text-neutral-500 mt-1">Hace {activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-ai text-white rounded-xl shadow-xl p-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs opacity-90">Monitoreando</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-ai rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Diagnóstico Gratuito: ¿Cuánto Riesgo Tienes con el SAT?
            </h3>

            <p className="text-lg text-white/90 mb-8">
              En 15 minutos revisamos tu situación actual y te decimos
              exactamente qué debes corregir para evitar multas.
              <strong className="block mt-2">Sin costo, sin compromiso.</strong>
            </p>

            <Button
              variant="secondary"
              size="lg"
              icon={<Shield size={20} />}
              trackingLabel="Diagnóstico Gratis Final"
              className="bg-white text-primary-600 hover:bg-neutral-50"
              onClick={handleProtectionClick}
            >
              Solicitar Diagnóstico Gratis
            </Button>

            <p className="text-sm text-white/80 mt-4">
              ✓ 15 minutos por videollamada  •  ✓ Sin costo  •  ✓ Recibes reporte PDF
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
