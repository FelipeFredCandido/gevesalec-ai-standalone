import type { Metadata } from 'next'
import FAQContent from './FAQContent'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | GEVESALEC',
  description: 'Resuelve todas tus dudas sobre nuestros servicios contables potenciados con inteligencia artificial. Seguridad, migración, implementación y más.',
  keywords: [
    'preguntas frecuentes contabilidad',
    'faq despacho contable',
    'dudas contabilidad IA',
    'seguridad contable',
    'migración contable',
    'soporte contable méxico'
  ].join(', '),
  openGraph: {
    title: 'Preguntas Frecuentes | GEVESALEC',
    description: 'Todo lo que necesitas saber sobre nuestros servicios contables con IA.',
    type: 'website',
    locale: 'es_MX',
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQPage() {
  return <FAQContent />
}