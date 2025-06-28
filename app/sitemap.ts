import { MetadataRoute } from 'next'
import { COMPANY_INFO, SERVICES } from '@/app/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gevesalec.com'
  const currentDate = new Date()

  // Páginas principales
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculadora`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Páginas de servicios (usando los servicios definidos en constants)
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/servicios/${service.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Páginas adicionales importantes
  const additionalPages = [
    {
      url: `${baseUrl}/nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ayuda`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return [
    ...mainPages,
    ...servicePages,
    ...additionalPages,
  ]
}