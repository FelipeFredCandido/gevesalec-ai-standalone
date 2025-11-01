'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/app/lib/analytics'

interface CalendlyWidgetProps {
  url?: string
  prefill?: {
    name?: string
    email?: string
    customAnswers?: Record<string, string>
  }
}

export default function CalendlyWidget({
  url = 'https://calendly.com/gevesalec/diagnostico-15min',
  prefill
}: CalendlyWidgetProps) {
  const { trackCTAClick } = useAnalytics()

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    // Track when widget is loaded
    script.onload = () => {
      trackCTAClick('Calendly Widget Loaded', 'calendly')
    }

    // Cleanup
    return () => {
      document.body.removeChild(script)
    }
  }, [trackCTAClick])

  // Build Calendly URL with prefill data
  const calendlyUrl = new URL(url)
  if (prefill) {
    if (prefill.name) calendlyUrl.searchParams.set('name', prefill.name)
    if (prefill.email) calendlyUrl.searchParams.set('email', prefill.email)
  }

  return (
    <div
      className="calendly-inline-widget"
      data-url={calendlyUrl.toString()}
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
