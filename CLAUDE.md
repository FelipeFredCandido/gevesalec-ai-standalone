# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GEVESALEC is a modern Next.js 14 application representing Mexico's first AI-powered accounting firm. It provides automated accounting services, tax optimization, and interactive tools for Mexican businesses.

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with custom corporate theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Development Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Code quality
npm run lint          # ESLint checks
npm run lint:fix      # Auto-fix ESLint issues
npm run type-check    # TypeScript type checking
npm run format        # Prettier formatting
```

## Architecture

### App Router Structure
- `/` - Homepage with hero, services, AI features, and testimonials
- `/calculadora` - Interactive tax calculator with AI simulation
- `/dashboard` - Business metrics dashboard

### Component Organization
- `app/components/interactive/` - Complex stateful components (ChatBot, TaxCalculator, Dashboard)
- `app/components/layout/` - Site-wide layout components (Header, Footer)
- `app/components/sections/` - Page sections (Hero, Services, AIFeatures, Testimonials)
- `app/components/ui/` - Reusable UI primitives (Button, Card, Input, etc.)

### Key Files
- `app/lib/constants.ts` - Central configuration including company info, services, testimonials, and SEO
- `app/lib/utils.ts` - Utilities for currency formatting, RFC validation, tax calculations
- `app/lib/analytics.ts` - Analytics tracking system
- `app/globals.css` - Global styles and Tailwind setup
- `tailwind.config.ts` - Corporate theme with custom colors and animations

## Mexican Tax System Integration

The application includes Mexican-specific functionality:
- **RFC Validation**: Mexican tax ID validation
- **ISR Calculation**: Income tax calculations for different regimes
- **IVA Processing**: VAT calculations
- **Tax Regimes**: Support for "Persona Física" and "Persona Moral"
- **CFDI Processing**: Digital invoice processing

## Design System

### Corporate Colors
- Primary: `#1e40af` (professional blue)
- Success: `#10b981` (AI green)
- Accent: `#8b5cf6` (tech purple)

### Typography
- Primary: Inter (system font)
- Display: Poppins (headings)

### Component Patterns
- All interactive components use Framer Motion for animations
- Consistent card-based layouts with shadow variations
- AI-themed gradient backgrounds and glowing effects
- Mobile-first responsive design

## AI Features

The application simulates AI functionality through:
- Delayed processing animations in calculators
- Predictive text and suggestions in forms
- Contextual chatbot responses
- Automated error detection UI patterns

## Analytics & Tracking

Uses custom analytics system (`app/lib/analytics.ts`) with:
- Page view tracking
- CTA click tracking
- Scroll depth monitoring
- Performance metrics

## SEO Configuration

Comprehensive SEO setup in `app/layout.tsx`:
- Structured data for AccountingService
- OpenGraph and Twitter cards
- Multilingual support (es-MX primary)
- Performance optimizations

## Development Notes

- All components are TypeScript with strict typing
- Use the `cn()` utility for conditional Tailwind classes
- Mexican currency formatting via `formatCurrency()`
- Consistent color scheme from Tailwind config
- Form validation uses Zod schemas
- Analytics tracking on all user interactions

## Mexican Business Logic

Key utilities for Mexican tax/business requirements:
- `validateRFC()` - RFC validation with proper format checking
- `validateCURP()` - CURP validation for Mexican citizens
- `calculateISR()` - Income tax calculation using 2024 brackets
- `calculateIVA()` - VAT calculation (default 16%)
- `getCurrentFiscalPeriod()` - Returns current fiscal year/quarter/month
- `formatPhoneNumber()` - Mexican phone number formatting

## Contact Form Integration

Email system configured via `app/api/contact/route.ts`:
- Uses Resend for email delivery
- Auto-reply functionality enabled
- Templates in `app/lib/email-templates.ts`
- Validation schemas in `app/lib/schemas.ts`