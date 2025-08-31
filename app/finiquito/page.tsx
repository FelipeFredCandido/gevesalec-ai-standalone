import type { Metadata } from 'next'
import FiniquitoContent from './FiniquitoContent'

// Metadata SEO específica para finiquitos
export const metadata: Metadata = {
  title: 'Calculadora de Finiquitos y Liquidaciones México 2025 | GEVESALEC',
  description: 'Calcula tu finiquito o liquidación laboral gratis según la Ley Federal del Trabajo 2025. Prima de antigüedad, vacaciones, aguinaldo e indemnización constitucional.',
  keywords: [
    'calculadora finiquito méxico',
    'liquidación laboral 2025',
    'derechos laborales méxico',
    'prima de antigüedad',
    'indemnización constitucional',
    'finiquito vs liquidación',
    'ley federal trabajo',
    'calculadora laboral gratuita',
    'despido injustificado',
    'renuncia laboral'
  ].join(', '),
  openGraph: {
    title: 'Calculadora de Finiquitos México | GEVESALEC',
    description: 'Calcula tu finiquito o liquidación laboral según la LFT 2025. Prima, vacaciones, aguinaldo e indemnización.',
    type: 'website',
    locale: 'es_MX',
  },
  alternates: {
    canonical: '/finiquito',
  },
}

export default function FiniquitoPage() {
  return <FiniquitoContent />
}