import { CheckCircle2, XCircle, Clock, Brain, Shield } from 'lucide-react'
import Badge from '@/app/components/ui/Badge'
import HeroEnhancements from './HeroEnhancements'
import HeroButtons from './HeroButtons'

export default function HeroBeforeAfter() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 ai-grid opacity-30" />

      <div className="container-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LADO IZQUIERDO - Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex mb-6">
              <Badge variant="ai" size="lg" icon={<Brain size={16} />}>
                🇲🇽 #1 Despacho Contable con IA para PYMEs
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 leading-tight mb-6">
              Reduce{' '}
              <span className="text-gradient">
                30% tus Impuestos
              </span>
              {' '}
              <span className="relative inline-block">
                Legalmente
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-ai opacity-30 rounded-full" />
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-neutral-700">
                Sin Mover un Dedo
              </span>
            </h1>

            <div className="bg-primary-50 border-l-4 border-primary-600 rounded-lg p-4 mb-6 max-w-2xl mx-auto lg:mx-0">
              <p className="text-lg md:text-xl text-neutral-900 leading-relaxed">
                Nuestros clientes ahorran <strong className="text-primary-600 text-2xl">$127,000 MXN promedio</strong> en su primer año.
              </p>
            </div>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Tú solo envías facturas por WhatsApp, nosotros hacemos{' '}
              <strong className="text-primary-600">TODO lo demás:</strong> contabilidad, nómina, declaraciones y optimización fiscal.
            </p>

            <HeroButtons />

            {/* Social Proof */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                  <span className="text-2xl">⭐</span>
                  <div className="text-2xl lg:text-3xl font-bold text-gradient">
                    4.9/5
                  </div>
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  200+ empresas
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Shield className="text-success-600" size={20} />
                  <div className="text-2xl lg:text-3xl font-bold text-success-600">
                    0
                  </div>
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  Multas SAT 2024
                </div>
              </div>

              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                  15 hrs
                </div>
                <div className="text-sm text-neutral-600 font-medium">
                  Ahorradas/semana
                </div>
              </div>
            </div>
          </div>

          {/* LADO DERECHO - Visual Antes/Después */}
          <div className="relative">
            {/* Título del comparativo */}
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                Tu vida antes y después de GEVESALEC
              </h3>
            </div>

            {/* ANTES - Card Roja */}
            <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-4 border-error-500 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-7 h-7 text-error-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-neutral-900">ANTES 😰</h4>
                  <p className="text-sm text-neutral-600">Sin GEVESALEC</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    <strong className="text-error-700">15 horas/semana</strong> perdidas en papeleo
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    Estrés constante por <strong className="text-error-700">fechas límite</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    <strong className="text-error-700">Miedo al SAT</strong> y multas sorpresa
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-error-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    Facturas <strong className="text-error-700">desordenadas</strong> y atrasadas
                  </span>
                </div>
              </div>
            </div>

            {/* Flecha separadora */}
            <div className="flex justify-center -my-3 relative z-10">
              <div className="bg-gradient-ai text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm">
                CON GEVESALEC ↓
              </div>
            </div>

            {/* DESPUÉS - Card Verde */}
            <div className="relative bg-gradient-to-br from-success-50 to-primary-50 rounded-2xl shadow-xl p-6 md:p-8 border-l-4 border-success-500 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-ai rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-neutral-900">DESPUÉS 😊</h4>
                  <p className="text-sm text-neutral-600">Con GEVESALEC</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    <strong className="text-success-700">0 horas</strong> - Nosotros lo hacemos todo
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    <strong className="text-success-700">Duermes tranquilo</strong>, todo en orden
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    <strong className="text-success-700">Cumplimiento 100%</strong> garantizado
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                  <span className="text-neutral-700">
                    Solo envías facturas por <strong className="text-success-700">WhatsApp</strong>
                  </span>
                </div>
              </div>

              {/* Badge destacado */}
              <div className="mt-6 pt-4 border-t border-success-200">
                <div className="flex items-center justify-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-semibold text-neutral-900">
                    Tú te enfocas en <span className="text-primary-600">cerrar más ventas</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial rápido */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-4 border border-neutral-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-ai rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  MG
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-neutral-900">María González</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-warning-500 text-xs">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 italic">
                    "Pasé de perder noches antes del cierre fiscal a olvidarme del tema por completo"
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">CEO, TechStartup MX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroEnhancements />
    </section>
  )
}
