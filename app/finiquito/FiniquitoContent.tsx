'use client'

import { motion } from 'framer-motion'
import { 
  Scale, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  Calculator,
  AlertCircle,
  Award,
  Zap,
  Lock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import CalculadoraFiniquito from '@/app/components/interactive/CalculadoraFiniquito'

export default function FiniquitoContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="ai" size="lg" icon={<Scale size={16} />} className="mb-6">
              ⚖️ Calculadora Laboral Oficial
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Calculadora de{' '}
              <span className="text-gradient">Finiquitos y Liquidaciones</span>
              {' '}México 2025
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Obtén un cálculo preciso de tus derechos laborales según la Ley Federal del Trabajo. 
              Prima de antigüedad, vacaciones, aguinaldo e indemnización constitucional al instante.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
              <Badge variant="success" icon={<Award size={16} />}>
                100% Legal LFT 2025
              </Badge>
              <Badge variant="default" icon={<Lock size={16} />}>
                Sin registro requerido
              </Badge>
              <Badge variant="ai" icon={<Zap size={16} />}>
                Cálculo instantáneo
              </Badge>
            </div>

            {/* Dynamic Counter */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-neutral-200 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Users size={20} className="text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                <strong className="text-primary-600">247</strong> cálculos realizados esta semana
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Finiquito vs Liquidación
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              ¿Cuál me corresponde según mi situación laboral?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Finiquito Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-green-700">Finiquito</CardTitle>
                  <p className="text-neutral-600">Terminación normal de contrato</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">¿Cuándo aplica?</h4>
                    <div className="space-y-2">
                      {[
                        'Renuncia voluntaria',
                        'Término de contrato por tiempo determinado',
                        'Despido justificado',
                        'Mutuo acuerdo'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Incluye:</h4>
                    <div className="space-y-2">
                      {[
                        'Aguinaldo proporcional',
                        'Vacaciones pendientes + prima',
                        'Salarios pendientes',
                        'Prima de antigüedad (si aplica)'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Liquidación Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full border-2 border-red-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale size={32} className="text-red-600" />
                  </div>
                  <CardTitle className="text-2xl text-red-700">Liquidación</CardTitle>
                  <p className="text-neutral-600">Despido injustificado</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">¿Cuándo aplica?</h4>
                    <div className="space-y-2">
                      {[
                        'Despido sin causa justificada',
                        'Despido por reestructura',
                        'Cierre de empresa',
                        'Reducción de personal'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-red-600" />
                          <span className="text-sm text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Incluye TODO el finiquito MÁS:</h4>
                    <div className="space-y-2">
                      {[
                        'Indemnización constitucional (3 meses)',
                        'Prima de antigüedad (12 días/año)',
                        'Salarios vencidos',
                        'Intereses moratorios'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-red-600" />
                          <span className="text-sm text-neutral-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="ai"
              size="lg"
              icon={<Calculator size={20} />}
              onClick={() => {
                document.getElementById('calculadora')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              Calcular Mi Caso Ahora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalculadoraFiniquito />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-neutral-600">
              Resuelve tus dudas sobre finiquitos y liquidaciones en México
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: '¿Cuándo me corresponde finiquito vs liquidación?',
                answer: 'El finiquito se paga en cualquier terminación laboral (renuncia, despido justificado, fin de contrato). La liquidación incluye el finiquito MÁS indemnización constitucional y solo aplica en despidos injustificados.'
              },
              {
                question: '¿Cómo se calcula la prima de antigüedad?',
                answer: 'Se calculan 12 días de salario por cada año trabajado, con tope máximo de 2 salarios mínimos por día. Solo aplica si tienes al menos 1 año de antigüedad en la empresa.'
              },
              {
                question: '¿Qué pasa si mi patrón no me paga el finiquito?',
                answer: 'Tienes derecho a demandarlo ante la Junta de Conciliación y Arbitraje. El patrón deberá pagar tu finiquito más salarios vencidos e intereses moratorios del 2% mensual.'
              },
              {
                question: '¿Puedo renunciar y recibir liquidación?',
                answer: 'No. Si renuncias voluntariamente solo tienes derecho a finiquito. La liquidación con indemnización únicamente aplica en despidos injustificados por parte del patrón.'
              },
              {
                question: '¿Cómo se calculan las vacaciones en el finiquito?',
                answer: 'Se pagan los días de vacaciones correspondientes según tu antigüedad (12-30 días anuales) más el 25% de prima vacacional, de forma proporcional al tiempo trabajado.'
              },
              {
                question: '¿El finiquito está exento de impuestos?',
                answer: 'El finiquito está exento hasta por 30 días de salario mínimo general ($7,467.90 en 2025). La liquidación por despido injustificado está exenta hasta 90 días de salario mínimo general.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-neutral-900 mb-3 flex items-start space-x-2">
                      <AlertCircle size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-neutral-700 leading-relaxed ml-7">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start space-x-3">
              <Shield size={24} className="text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Aviso Legal Importante
                </h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Esta calculadora proporciona estimaciones basadas en la Ley Federal del Trabajo vigente. 
                  Los resultados son orientativos y pueden variar según circunstancias específicas de cada caso. 
                  Para asesoría legal especializada y defensa de tus derechos laborales, consulta con nuestros 
                  abogados laboralistas certificados.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}