import { Brain, MessageCircle, Play } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { COMPANY_INFO, STATS } from '@/app/lib/constants'
import HeroEnhancements from './HeroEnhancements'

export default function HeroStatic() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 ai-grid opacity-30" />
      
      <div className="container-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex mb-6">
              <Badge variant="ai" size="lg" icon={<Brain size={16} />}>
                🇲🇽 Primer despacho contable con IA en México
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 leading-tight mb-6">
              Contabilidad{' '}
              <span className="text-gradient">
                Inteligente
              </span>
              <br />
              para tu{' '}
              <span className="relative">
                Empresa
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-ai opacity-30 rounded-full" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Revoluciona tu contabilidad con{' '}
              <strong className="text-primary-600">inteligencia artificial</strong>.
              Automatiza procesos, detecta errores y optimiza tu situación fiscal
              con la tecnología más avanzada del mercado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="ai"
                size="lg"
                icon={<MessageCircle size={20} />}
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, me interesa conocer más sobre los servicios de GEVESALEC`}
                trackingLabel="WhatsApp Hero CTA"
                className="shadow-2xl hover:shadow-ai-lg"
              >
                Comenzar Gratis
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<Play size={20} />}
                trackingLabel="Ver Demo Hero"
              >
                Ver Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-ai rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Dashboard IA</h3>
                    <p className="text-sm text-neutral-600">Análisis en tiempo real</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">
                  En línea
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-ai-light p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Automatización
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">95%</div>
                </div>
                
                <div className="bg-gradient-to-br from-success-50 to-success-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Ahorro Tiempo
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-success-600">75%</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Clasificación Automática
                    </span>
                    <span className="text-sm text-neutral-600">99.2%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-ai h-2 rounded-full progress-bar" style={{ width: '99.2%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Detección de Errores
                    </span>
                    <span className="text-sm text-neutral-600">97.8%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-success-500 to-accent-500 h-2 rounded-full progress-bar" style={{ width: '97.8%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      Optimización Fiscal
                    </span>
                    <span className="text-sm text-neutral-600">94.5%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full progress-bar" style={{ width: '94.5%' }} />
                  </div>
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