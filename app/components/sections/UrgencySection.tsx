import { Clock, AlertTriangle, TrendingDown, DollarSign, Calendar } from 'lucide-react'
import UrgencyButton from './UrgencyButton'

function calculateDaysRemaining(): number {
  const today = new Date()
  const currentYear = today.getFullYear()
  let fiscalDeadline = new Date(currentYear, 2, 31) // Marzo es mes 2 (0-indexed)

  // Si ya pasó marzo, calcular para el próximo año
  if (today > fiscalDeadline) {
    fiscalDeadline = new Date(currentYear + 1, 2, 31)
  }

  const timeDiff = fiscalDeadline.getTime() - today.getTime()
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return days
}

export default function UrgencySection() {
  const daysRemaining = calculateDaysRemaining()

  return (
    <section className="relative py-16 bg-gradient-to-br from-warning-50 via-white to-error-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
        }} />
      </div>

      <div className="container-padding relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Timer Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-error-100 text-error-700 px-6 py-3 rounded-full border-2 border-error-200">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-lg">
                ⏰ Atención: Quedan {daysRemaining} días para el cierre fiscal
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              ¿Sabías que el <span className="text-error-600">73% de PYMEs mexicanas</span> pagan de más al SAT por no planificar a tiempo?
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-error-500">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-error-500" />
                <h3 className="font-bold text-lg">Deducciones no aplicadas</h3>
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">$38,000 MXN</p>
              <p className="text-neutral-600">Promedio perdido por empresa al año</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-warning-500">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-8 h-8 text-warning-500" />
                <h3 className="font-bold text-lg">Multas por errores</h3>
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">Hasta $150,000</p>
              <p className="text-neutral-600">Por declaraciones incorrectas o tardías</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary-500">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-8 h-8 text-primary-500" />
                <h3 className="font-bold text-lg">Tiempo en auditorías</h3>
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">3-6 meses</p>
              <p className="text-neutral-600">Perdidos si no tienes documentación lista</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎁 No pierdas más dinero este año fiscal
            </h3>
            <p className="text-lg mb-6 opacity-95">
              Agenda tu diagnóstico gratuito HOY y descubre cuánto puedes ahorrar legalmente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <UrgencyButton daysRemaining={daysRemaining} />
              <span className="text-sm font-medium">
                ⚡ Solo 5 lugares disponibles esta semana
              </span>
            </div>
          </div>

          {/* Trust Element */}
          <div className="text-center mt-8">
            <p className="text-sm text-neutral-600">
              💼 Más de 500 empresas ya optimizaron sus impuestos con nosotros
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
