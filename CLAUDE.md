# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GEVESALEC is a Next.js 14 marketing and service website for a Mexican accounting firm. The site targets Mexican SMEs (PYMEs), independent professionals, and entrepreneurs, focusing on converting visitors through trust-building and addressing emotional pain points around Mexican tax compliance (SAT).

**Target Audience**: Mexican business owners with low initial trust, high decision friction, and medium-low digital sophistication.

## Development Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
```

## Architecture & Key Patterns

### Performance-Critical Architecture

The application has been heavily optimized for Core Web Vitals (reduced from 21.8s FCP to <2s):

1. **Server Components by Default**: Main page (`app/page.tsx`) is a Server Component
2. **Strategic Dynamic Imports**: All sections use `next/dynamic` with Suspense boundaries
3. **Client Components Isolation**: Only interactive elements marked with `'use client'`
4. **Font Optimization**: Limited to 4 font weights total (Inter: 400, 600; Poppins: 600, 700) with `display: 'optional'`

### Page Structure (8 Sections - Optimized for Mexican Service Market)

The homepage follows a conversion-optimized structure for professional services in Mexico:

```
1. HeroBeforeAfter (with integrated client logos)
2. UrgencySection (deadline-based, not artificial scarcity)
3. Services
4. ROICalculator (interactive engagement)
5. HowItWorks (3-step delegation model)
6. SocialProof (MEGA consolidated section - see below)
7. FAQ (objection handling)
8. ContactSection (Calendly widget)
```

### SocialProof Consolidation Pattern

**Critical**: The `SocialProof.tsx` component consolidates 4 separate trust-building elements into ONE powerful section:
- Google Reviews (4.9/5 rating display)
- Featured testimonials with Before/After metrics
- Real SAT protection cases (money saved)
- Trust badges (certifications, insurance, guarantees)

This consolidation pattern is specifically designed for Mexican professional services where trust-building requires more evidence than typical SaaS products.

### Component Organization

- **Server Components**: Default for pages and sections (optimal performance)
- **Client Components**: Interactive elements only (`'use client'` directive)
  - `HeroButtons.tsx` - CTAs with scroll behavior
  - `PageAnalytics.tsx` - Analytics tracking
  - `HeroEnhancements.tsx` - Progressive animations
  - All components in `app/components/interactive/`
- **Dynamic Imports**: Heavy sections in `app/page.tsx` loaded via `next/dynamic`

### Custom Gradient System

Tailwind custom classes for brand consistency:
- `bg-gradient-ai` - Main brand gradient (blue → purple → green)
- `text-gradient` - Animated gradient text
- `ai-grid` - Background grid pattern

Access via `className` without additional imports.

### Mexican Tax Features

Components handle specific Mexican business logic:
- RFC validation patterns
- ISR (Income Tax) calculations
- IVA (VAT) handling
- SAT compliance references
- Regime fiscal types (Persona Física/Moral)

## API Endpoints

- `/api/contact` - Contact form submission via Resend
- `/api/finiquito` - Severance payment calculator

## Environment Variables

Required in `.env.local`:
```bash
RESEND_API_KEY=          # Resend API for email
CONTACT_EMAIL=           # Contact form recipient
NEXT_PUBLIC_APP_URL=     # Public URL for production
```

## Data Management

### Constants Pattern (`app/lib/constants.ts`)

All content, copy, and business data centralized in `constants.ts`:
- `COMPANY_INFO` - Contact, address, social media
- `SERVICES` - Service catalog with pricing
- `TESTIMONIALS` - Client testimonials with Before/After/Result metrics
- `STATS` - Homepage statistics
- `SEO_DEFAULTS` - Meta descriptions and keywords

**Important**: When updating copy or business info, modify `constants.ts` rather than hardcoding in components.

### Testimonials Data Structure

Testimonials support optional Before/After/Result fields for conversion optimization:
```typescript
{
  name: string
  role: string
  company: string
  content: string
  rating: number
  before?: string    // "ANTES" state
  after?: string     // "DESPUÉS" state
  result?: string    // "RESULTADO" quantified
}
```

## Styling Guidelines

### Tailwind Configuration

Custom color system in `tailwind.config.ts`:
- `primary`: Corporate blue (#1e40af)
- `success`: AI green (#10b981)
- `accent`: Tech purple (#8b5cf6)
- `warning`: Warning yellow (#eab308)
- `error`: Error red (#ef4444)

All with full 50-950 scales.

### Custom Animations

Available Tailwind animations:
- `animate-fade-in-up` - Entry animations
- `animate-pulse-slow` - Subtle attention
- `animate-float` - Floating elements
- `animate-gradient` - Animated gradients

### Responsive Breakpoints

```
xs: 475px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
3xl: 1920px
```

## Performance Optimizations

Recent major optimizations (see commit history):

1. **Bundle Optimization**: ~166KB First Load JS (reduced from ~500KB)
2. **Minimal Preconnects**: Only fonts.googleapis.com and fonts.gstatic.com
3. **Aggressive Caching**: 1-year cache headers for static assets (configured in `next.config.js`)
4. **Icon Tree-shaking**: Lucide React modularized via `modularizeImports`

## Common Development Patterns

### Adding New Sections

1. Create component in `app/components/sections/`
2. Export as Server Component by default
3. Add dynamic import in `app/page.tsx`:
```typescript
const NewSection = dynamic(() => import('@/app/components/sections/NewSection'), {
  loading: () => <div className="min-h-[600px] bg-neutral-50" />,
})
```
4. Wrap in Suspense in page return

### CTA Pattern (Important for Conversion)

All CTAs should scroll to Calendly widget (not WhatsApp links):
```typescript
const handleClick = () => {
  const contactSection = document.getElementById('contacto')
  contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
```

### Analytics Tracking

Use custom hook:
```typescript
import { useAnalytics } from '@/app/lib/analytics'

const { trackCTAClick } = useAnalytics()
trackCTAClick('Button Label', 'section-name')
```

## Marketing & Conversion Strategy

### Copy Guidelines

**Tone**: Direct, benefits-focused, addresses Mexican PYME pain points
**Avoid**: Tech jargon, SaaS-style copy, "revolutionary" claims
**Focus**: Delegation ("we do everything"), fear reduction (SAT compliance), time savings

### Messaging Hierarchy

1. **Hero**: Quantified outcome ($127,000 MXN average savings)
2. **Urgency**: Real deadline benefits (not false scarcity)
3. **Services**: "What's included" not feature lists
4. **ROI Calculator**: Personalized value demonstration
5. **How It Works**: 3 simple steps emphasizing delegation
6. **Social Proof**: Multiple trust signals (reviews, cases, guarantees)
7. **FAQ**: Objection handling (migration fears, error concerns, pricing)

### Mexican Market Considerations

- Higher need for social proof than USA SaaS (4 types vs 1)
- Process explanation critical (lower digital sophistication)
- FAQ essential for risk-averse decision-making
- Certification badges matter (CDP, insurance, ISO)
- WhatsApp as primary contact channel

## TypeScript Patterns

- Strict mode enabled
- All props and state typed
- `as const` for constants ensuring literal types
- Utility types from constants exported for reuse

## Build & Deployment

Deploys automatically to Vercel on push to main branch.

**Build Requirements**:
- All TypeScript errors must be resolved
- ESLint warnings should be addressed
- Next.js build must complete successfully

**Vercel Configuration**:
- Framework: Next.js 14
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Common Issues

1. **TypeScript Build Errors**: Ensure `.style` properties typed as `HTMLElement`
2. **"Cannot find module 'critters'"**: Removed from config (was causing issues)
3. **Slow Initial Load**: Verify page.tsx doesn't have `'use client'` directive
4. **Animation Performance**: Use CSS animations for critical path, Framer Motion for enhancements

## Project Context & Evolution

**Recent Major Optimization** (Dec 2024): Consolidated 12 sections → 8 sections, reducing scroll fatigue by 33% while maintaining trust-building for Mexican service market. This structure balances USA SaaS best practices (5-6 sections) with Mexican professional services needs (higher trust requirements).

**Key Architectural Decision**: Server Components + Progressive Enhancement pattern chosen over Client-Side Rendering for optimal Core Web Vitals, critical for SEO and conversion in competitive accounting services market.
