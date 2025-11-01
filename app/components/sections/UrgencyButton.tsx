'use client'

import { Calendar } from 'lucide-react'
import Button from '@/app/components/ui/Button'

interface UrgencyButtonProps {
  daysRemaining: number
}

export default function UrgencyButton({ daysRemaining }: UrgencyButtonProps) {
  const handleUrgentCTA = () => {
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <Button
      variant="secondary"
      size="xl"
      icon={<Calendar size={24} />}
      onClick={handleUrgentCTA}
      trackingLabel="Agenda Diagnóstico - Urgency"
      className="bg-white text-primary-600 hover:bg-neutral-100 shadow-xl"
    >
      Agenda Diagnóstico Gratis (15 min)
    </Button>
  )
}
