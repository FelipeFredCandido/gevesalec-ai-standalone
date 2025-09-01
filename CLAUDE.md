# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GEVESALEC is a Next.js 14 application for a Mexican accounting firm powered by AI. It's a marketing and service website with interactive tools for tax calculations and client dashboards.

## Development Commands

```bash
# Development
npm run dev              # Start development server on http://localhost:3000
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Performance Testing
npx lighthouse http://localhost:3000 --view   # Run Lighthouse audit
```

## Architecture & Key Components

### Performance-Critical Architecture
The application has been optimized for Core Web Vitals with a specific architecture:

1. **Server Components by Default**: The main page (`app/page.tsx`) is a Server Component to minimize JavaScript
2. **Static Hero Component**: `HeroStatic.tsx` renders without client-side JavaScript, with progressive enhancement via `HeroEnhancements.tsx`
3. **Lazy Loading Pattern**: All sections use dynamic imports with Suspense boundaries
4. **Client Components Isolation**: Interactive elements (buttons, analytics) are extracted to separate client components

### Component Organization

- **Server Components**: Default for all pages and sections for optimal performance
- **Client Components**: Only for interactive elements (`'use client'` directive required)
  - `HeroButtons.tsx` - Interactive CTAs
  - `PageAnalytics.tsx` - Analytics tracking
  - `HeroEnhancements.tsx` - Progressive animations
- **Dynamic Imports**: All heavy sections loaded on-demand via `next/dynamic`

### API Endpoints

- `/api/contact` - Contact form submission via Resend
- `/api/finiquito` - Severance payment calculator

### Key Libraries & Patterns

- **Styling**: Tailwind CSS with custom gradient classes (`bg-gradient-ai`, `text-gradient`)
- **Animations**: CSS-first approach, Framer Motion only in client components
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React with tree-shaking via modularizeImports

## Performance Optimizations

The site has been heavily optimized from 21.8s FCP to <2s:

1. **Font Optimization**: Only 4 font weights total (Inter: 400, 600; Poppins: 600, 700) with `display: 'optional'`
2. **Minimal Preconnects**: Only fonts.googleapis.com and fonts.gstatic.com
3. **Aggressive Caching**: 1-year cache headers for static assets
4. **Bundle Optimization**: ~166KB First Load JS (reduced from ~500KB)

## Environment Variables

Required in `.env.local`:
```bash
RESEND_API_KEY=          # Resend API for email
CONTACT_EMAIL=           # Contact form recipient
NEXT_PUBLIC_APP_URL=     # Public URL for production
```

## Mexican Tax Features

The application includes specific Mexican tax calculations:
- RFC validation
- ISR (Income Tax) calculations
- IVA (VAT) handling
- CFDI compliance references
- SAT regulation compatibility

## Deployment

The application deploys automatically to Vercel on push to main branch. Ensure all TypeScript errors are resolved before pushing as the build will fail otherwise.

## Recent Optimizations (2024)

Major performance overhaul completed to fix Core Web Vitals:
- Converted main page from Client to Server Component
- Removed heavy animations from initial render
- Implemented progressive enhancement strategy
- Reduced font weights from 11 to 4
- See `PERFORMANCE_OPTIMIZATION_REPORT.md` for details

## Common Issues & Solutions

1. **TypeScript Errors on Build**: Ensure all `.style` properties are properly typed as `HTMLElement`
2. **Build Error "Cannot find module 'critters'"**: Remove `optimizeCss: true` from next.config.js
3. **Slow Initial Load**: Check that page.tsx doesn't have `'use client'` directive
4. **Animation Performance**: Use CSS animations instead of Framer Motion for Hero section