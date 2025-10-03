'use client'

import { TrendingDown } from 'lucide-react'
import Button from '@/app/components/ui/Button'
import { COMPANY_INFO } from '@/app/lib/constants'

interface UrgencyButtonProps {
  daysRemaining: number
}

export default function UrgencyButton({ daysRemaining }: UrgencyButtonProps) {
  const handleUrgentCTA = () => {
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsapp}?text=Hola, solo quedan ${daysRemaining} días para el cierre fiscal. Necesito ayuda urgente para optimizar mis impuestos.`,
      '_blank'
    )
  }

  return (
    <Button
      variant="secondary"
      size="xl"
      icon={<TrendingDown size={24} />}
      onClick={handleUrgentCTA}
      className="bg-white text-primary-600 hover:bg-neutral-100"
    >
      Agenda Tu Diagnóstico Gratuito Hoy
    </Button>
  )
}
