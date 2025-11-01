'use client'

import { motion } from 'framer-motion'
import { Shield, Award, Lock, FileCheck, Users, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'

const guarantees = [
  {
    icon: Award,
    title: 'Contadores Certificados',
    description: 'Todos nuestros contadores son Contadores Públicos Certificados con cédula profesional y experiencia comprobada en el SAT.',
    highlight: 'CDP Certificado',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Seguro de Responsabilidad',
    description: 'Contamos con seguro de responsabilidad civil profesional que protege tu empresa ante cualquier eventualidad.',
    highlight: '$5M MXN de cobertura',
    color: 'success',
  },
  {
    icon: FileCheck,
    title: 'Garantía de Cumplimiento',
    description: 'Si hay una multa del SAT por error nuestro, nosotros la pagamos. Así de seguro estamos de nuestro trabajo.',
    highlight: '100% Garantizado',
    color: 'accent',
  },
  {
    icon: Lock,
    title: 'Seguridad de Datos',
    description: 'Tu información está protegida con encriptación bancaria. Cumplimos con LFPDPPP y estándares internacionales.',
    highlight: 'Certificación ISO 27001',
    color: 'primary',
  },
]

const trustIndicators = [
  {
    stat: '200+',
    label: 'Empresas Activas',
    description: 'PYMEs que confían en nosotros',
    icon: Users,
  },
  {
    stat: '0',
    label: 'Multas SAT 2024',
    description: 'Cumplimiento perfecto',
    icon: Shield,
  },
  {
    stat: '5+',
    label: 'Años de Experiencia',
    description: 'Especializados en PYMEs',
    icon: TrendingUp,
  },
  {
    stat: '4.9/5',
    label: 'Calificación',
    description: 'Satisfacción de clientes',
    icon: Award,
  },
]

export default function Guarantees() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50/50 via-white to-success-50/50">
      <div className="container-padding">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="ai" size="lg" icon={<Shield size={16} />} className="mb-6">
            🛡️ Tu Tranquilidad Garantizada
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Respaldados por{' '}
            <span className="text-gradient">Garantías Reales</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            No somos un contador freelance improvisado. Somos un despacho formal
            con todas las certificaciones, seguros y respaldos que tu empresa necesita.
          </p>
        </motion.div>

        {/* Main Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon

            return (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover={true} className="h-full group">
                  <CardContent className="pt-8">
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                      group-hover:scale-110 transition-transform duration-300
                      ${guarantee.color === 'primary' ? 'bg-primary-600' :
                        guarantee.color === 'success' ? 'bg-success-600' :
                        'bg-accent-600'}
                      text-white
                    `}>
                      <IconComponent size={32} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {guarantee.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 leading-relaxed mb-4">
                      {guarantee.description}
                    </p>

                    {/* Highlight */}
                    <div className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                      ${guarantee.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                        guarantee.color === 'success' ? 'bg-success-100 text-success-700' :
                        'bg-accent-100 text-accent-700'}
                    `}>
                      <CheckCircle2 size={16} />
                      <span>{guarantee.highlight}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Números que <span className="text-gradient">Hablan por Nosotros</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon

              return (
                <motion.div
                  key={indicator.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                    <IconComponent className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {indicator.stat}
                    </div>
                    <div className="font-semibold text-neutral-900 mb-1">
                      {indicator.label}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {indicator.description}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Main Guarantee Promise */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-gradient-ai rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white" />

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Nuestra Promesa de Tranquilidad
            </h3>

            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Si nosotros cometemos un error que resulte en una multa del SAT,
              <strong className="block text-white mt-2 text-xl">
                nosotros pagamos la multa completa.
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Error nuestro</div>
                  <div className="text-sm text-white/80">Asumimos 100% responsabilidad</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Pagamos la multa</div>
                  <div className="text-sm text-white/80">Sin costo para ti</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <div className="font-semibold mb-1">Corregimos gratis</div>
                  <div className="text-sm text-white/80">Y lo solucionamos todo</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/70 mt-6">
              * En 2024 hemos tenido 0 multas por errores nuestros. Esta garantía nunca la hemos tenido que usar.
            </p>
          </div>
        </motion.div>

        {/* What's NOT Guaranteed (Transparency) */}
        <motion.div
          className="max-w-3xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-warning-50 border-l-4 border-warning-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-warning-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-warning-900 mb-2">Importante - Transparencia Total:</h4>
                <p className="text-sm text-warning-800 mb-3">
                  No cubrimos multas por información incorrecta que nos proporciones,
                  facturas falsas, o incumplimientos deliberados. Solo nos hacemos
                  responsables de errores en nuestro proceso de trabajo.
                </p>
                <p className="text-sm text-warning-800">
                  <strong>Honestidad primero:</strong> Trabajamos en equipo contigo para
                  asegurar que todo esté en orden desde el inicio.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
