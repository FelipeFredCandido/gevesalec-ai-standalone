import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroBeforeAfter from '@/app/components/sections/HeroBeforeAfter'
import ClientLogos from '@/app/components/ui/ClientLogos'
import PageAnalytics from '@/app/components/analytics/PageAnalytics'

const UrgencySection = dynamic(() => import('@/app/components/sections/UrgencySection'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-warning-50 via-white to-error-50" />,
})

const Services = dynamic(() => import('@/app/components/sections/Services'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />,
})

const ROICalculator = dynamic(() => import('@/app/components/sections/ROICalculator'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-accent-50 via-white to-primary-50" />,
})

const HowItWorks = dynamic(() => import('@/app/components/sections/HowItWorks'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
})

const SATProtection = dynamic(() => import('@/app/components/sections/SATProtection'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-primary-50/30" />,
})

const Guarantees = dynamic(() => import('@/app/components/sections/Guarantees'), {
  loading: () => <div className="min-h-[600px] bg-gradient-to-br from-primary-50/50 via-white to-success-50/50" />,
})

const ReviewsWidget = dynamic(() => import('@/app/components/ui/ReviewsWidget'), {
  loading: () => <div className="min-h-[400px] bg-gradient-to-br from-neutral-50 to-white" />,
})

const Testimonials = dynamic(() => import('@/app/components/sections/Testimonials'), {
  loading: () => <div className="min-h-[400px] bg-white" />,
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
      <HeroBeforeAfter />

      <ClientLogos />

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-warning-50 via-white to-error-50" />}>
        <UrgencySection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Services />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-accent-50 via-white to-primary-50" />}>
        <ROICalculator />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <HowItWorks />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-primary-50/30" />}>
        <SATProtection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-primary-50/50 via-white to-success-50/50" />}>
        <Guarantees />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <ReviewsWidget />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px] bg-white" />}>
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