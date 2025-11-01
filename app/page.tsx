import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroBeforeAfter from '@/app/components/sections/HeroBeforeAfter'
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

const SocialProof = dynamic(() => import('@/app/components/sections/SocialProof'), {
  loading: () => <div className="min-h-[800px] bg-gradient-to-br from-neutral-50 via-white to-primary-50/30" />,
})

const FAQ = dynamic(() => import('@/app/components/sections/FAQ'), {
  loading: () => <div className="min-h-[600px] bg-white" />,
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
      {/* 1. HERO (con logos integrados) */}
      <HeroBeforeAfter />

      {/* 2. URGENCIA */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-warning-50 via-white to-error-50" />}>
        <UrgencySection />
      </Suspense>

      {/* 3. SERVICIOS */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-neutral-50 to-white" />}>
        <Services />
      </Suspense>

      {/* 4. ROI CALCULATOR */}
      <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-br from-accent-50 via-white to-primary-50" />}>
        <ROICalculator />
      </Suspense>

      {/* 5. CÓMO FUNCIONA */}
      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <HowItWorks />
      </Suspense>

      {/* 6. SOCIAL PROOF (consolidado: Reviews + Testimonials + SAT + Guarantees) */}
      <Suspense fallback={<div className="min-h-[800px] bg-gradient-to-br from-neutral-50 via-white to-primary-50/30" />}>
        <SocialProof />
      </Suspense>

      {/* 7. FAQ */}
      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <FAQ />
      </Suspense>

      {/* 8. CONTACTO */}
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