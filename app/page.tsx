import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroStatic from '@/app/components/sections/HeroStatic'
import PageAnalytics from '@/app/components/analytics/PageAnalytics'

const Services = dynamic(() => import('@/app/components/sections/Services'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />,
})

const AIFeatures = dynamic(() => import('@/app/components/sections/AIFeatures'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-primary-50 to-white" />,
})

const Testimonials = dynamic(() => import('@/app/components/sections/Testimonials'), {
  loading: () => <div className="min-h-[400px] bg-gradient-to-br from-neutral-50 to-white" />,
})

const ContactSection = dynamic(() => import('@/app/components/sections/ContactSection'), {
  loading: () => <div className="h-96 bg-gradient-ai animate-pulse" />,
})

const FiniquitoBanner = dynamic(() => import('@/app/components/ui/FiniquitoBanner'), {
  loading: () => null,
})

export default function HomePage() {
  return (
    <>
      <HeroStatic />
      
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Services />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-primary-50 to-white" />}>
        <AIFeatures />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gradient-ai animate-pulse" />}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={null}>
        <FiniquitoBanner />
      </Suspense>
      
      <PageAnalytics />
    </>
  )
}