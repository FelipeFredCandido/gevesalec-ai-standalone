'use client'

import { MessageCircle, TrendingDown, Gift } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import { COMPANY_INFO } from '@/app/lib/constants'

export default function HeroButtons() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola 👋 Vi que dan diagnóstico fiscal gratis. Mi empresa factura aprox $_____ mensual. ¿Me pueden ayudar a pagar menos ISR legalmente?`, '_blank')
  }

  const handleCaseStudyClick = () => {
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, quiero saber cómo ayudaron a ahorrar $47,000 en ISR. ¿Pueden hacer lo mismo por mi empresa?`, '_blank')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative">
        <Button
          variant="ai"
          size="lg"
          icon={<Gift size={20} />}
          onClick={handleWhatsAppClick}
          trackingLabel="Diagnóstico Gratis CTA"
          className="shadow-2xl hover:shadow-ai-lg w-full sm:w-auto"
        >
          Quiero Mi Diagnóstico Fiscal Gratis
        </Button>
        <span className="absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          Valor $3,500
        </span>
      </div>
      
      <Button
        variant="outline"
        size="lg"
        icon={<TrendingDown size={20} />}
        onClick={handleCaseStudyClick}
        trackingLabel="Caso de Éxito CTA"
      >
        Ver Caso: -$47,000 en ISR
      </Button>
    </div>
  )
}