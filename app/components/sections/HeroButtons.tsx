'use client'

import { MessageCircle, Play } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import { COMPANY_INFO } from '@/app/lib/constants'

export default function HeroButtons() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, me interesa conocer más sobre los servicios de GEVESALEC`, '_blank')
  }

  const handleDemoClick = () => {
    // TODO: Implement demo modal or navigation
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Button
        variant="ai"
        size="lg"
        icon={<MessageCircle size={20} />}
        onClick={handleWhatsAppClick}
        trackingLabel="WhatsApp Hero CTA"
        className="shadow-2xl hover:shadow-ai-lg"
      >
        Comenzar Gratis
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        icon={<Play size={20} />}
        onClick={handleDemoClick}
        trackingLabel="Ver Demo Hero"
      >
        Ver Demo
      </Button>
    </div>
  )
}