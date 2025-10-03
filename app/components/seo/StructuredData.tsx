export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'GEVESALEC',
    image: 'https://gevesalec.com/logoneg.svg',
    '@id': 'https://gevesalec.com',
    url: 'https://gevesalec.com',
    telephone: '+52-81-1680-1924',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Insurgentes Sur 1234',
      addressLocality: 'Monterrey',
      addressRegion: 'NL',
      postalCode: '64500',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.432608,
      longitude: -99.133209,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/gevesalec',
      'https://www.twitter.com/gevesalec',
      'https://www.linkedin.com/company/gevesalec',
      'https://www.instagram.com/gevesalec',
    ],
    description:
      'El primer despacho contable mexicano potenciado por inteligencia artificial. Servicios de contabilidad, nómina y fiscal con tecnología avanzada.',
    priceRange: '$$',
    serviceType: 'Contabilidad, Servicios Fiscales, Nómina Digital',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
