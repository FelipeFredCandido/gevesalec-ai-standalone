'use client'

import { Calendar, Play, Clock } from 'lucide-react'
import Button from '@/app/components/ui/Button'

export default function HeroButtons() {
  const handleScheduleClick = () => {
    // Scroll suavemente a la sección de contacto (Calendly)
    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleHowItWorksClick = () => {
    // Scroll a la sección "Cómo Funciona"
    const howItWorksSection = document.querySelector('[id*="como"]') ||
                             document.querySelector('section:nth-of-type(4)')
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <div className="relative">
        <Button
          variant="ai"
          size="lg"
          icon={<Calendar size={20} />}
          onClick={handleScheduleClick}
          trackingLabel="Agenda Diagnóstico Gratis - Hero"
          className="shadow-2xl hover:shadow-ai-lg w-full sm:w-auto group"
        >
          <span className="flex flex-col items-start">
            <span className="font-bold">Agenda Diagnóstico Gratis</span>
            <span className="text-xs opacity-90 font-normal">15 min • Esta semana</span>
          </span>
        </Button>
        <span className="absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
          Gratis
        </span>
      </div>

      <Button
        variant="outline"
        size="lg"
        icon={<Play size={20} />}
        onClick={handleHowItWorksClick}
        trackingLabel="Ver Cómo Funciona - Hero"
        className="w-full sm:w-auto"
      >
        Ver Cómo Funciona (2 min)
      </Button>
    </div>
  )
}