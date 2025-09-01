import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import { SEO_DEFAULTS } from '@/app/lib/constants'
import dynamic from 'next/dynamic'

const OptimizedAnalytics = dynamic(
  () => import('@/app/components/analytics/OptimizedAnalytics'),
  { ssr: false }
)
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then(mod => mod.SpeedInsights),
  { ssr: false }
)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
  weight: ['400', '600'],
  preload: false,
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['600', '700'],
  display: 'optional',
  preload: false,
})

export const metadata: Metadata = {
  title: SEO_DEFAULTS.title,
  description: SEO_DEFAULTS.description,
  keywords: SEO_DEFAULTS.keywords,
  authors: [{ name: 'GEVESALEC' }],
  creator: 'GEVESALEC',
  publisher: 'GEVESALEC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gevesalec.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/es-mx',
      'es-ES': '/es-es',
    },
  },
  openGraph: {
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    url: 'https://gevesalec.com',
    siteName: 'GEVESALEC',
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: 'GEVESALEC - Despacho Contable con IA',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: SEO_DEFAULTS.twitterCard as any,
    title: SEO_DEFAULTS.title,
    description: SEO_DEFAULTS.description,
    images: [SEO_DEFAULTS.ogImage],
    creator: '@gevesalec',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
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
              description: 'El primer despacho contable mexicano potenciado por inteligencia artificial. Servicios de contabilidad, nómina y fiscal con tecnología avanzada.',
              priceRange: '$$',
              serviceType: 'Contabilidad, Servicios Fiscales, Nómina Digital',
            }),
          }}
        />
        
        {/* Preconnect only to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical logo */}
        <link rel="preload" href="/logo-typo-5.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Optimized Analytics */}
        <OptimizedAnalytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  )
}