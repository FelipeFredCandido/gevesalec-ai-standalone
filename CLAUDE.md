# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GEVESALEC is a Next.js 14 application representing the first Mexican accounting firm powered by artificial intelligence. It's a professional marketing website with interactive tools for tax calculations, AI-powered features, and client engagement.

## Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)

# Build and Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # TypeScript type checking without emitting files
npm run format       # Format code with Prettier
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with relaxed strict mode (`strict: false`)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for micro-interactions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Email**: Resend API for contact form handling
- **Analytics**: Custom analytics system + Vercel Speed Insights

### Project Structure

```
app/
├── components/
│   ├── interactive/          # Dynamic components (TaxCalculator, ChatBot, Dashboard)
│   ├── layout/              # Header, Footer
│   ├── sections/            # Page sections (Hero, Services, Features, etc.)
│   ├── ui/                  # Reusable UI components (Button, Card, Badge, etc.)
│   └── analytics/           # Analytics components
├── lib/
│   ├── analytics.ts         # Custom tracking system
│   ├── constants.ts         # Business data, services, testimonials
│   ├── schemas.ts           # Zod validation schemas
│   ├── utils.ts             # Utility functions (currency, tax calculations)
│   └── email-templates.ts   # Email template generation
├── api/contact/
│   └── route.ts             # Contact form API endpoint
├── calculadora/             # Tax calculator page
├── dashboard/               # Business dashboard page
├── globals.css              # Global styles with Tailwind
├── layout.tsx               # Root layout with SEO, fonts, structured data
└── page.tsx                 # Homepage
```

## Core Features & Business Logic

### Mexican Tax System Integration
- **ISR (Impuesto Sobre la Renta)** calculations via `calculateISR()` in utils
- **IVA (Impuesto al Valor Agregado)** calculations via `calculateIVA()`
- Support for "Persona Física" vs "Persona Moral" tax regimes
- Tax regime options: General, Simplificado, Incorporación Fiscal, Actividades Empresariales
- RFC validation for Mexican tax identification numbers

### AI-Powered Calculator (`TaxCalculator.tsx`)
- Real-time tax calculation with simulated AI processing delay
- Effective tax rate analysis
- AI recommendations based on deduction ratios and effective rates
- Detailed breakdown of gross income, deductions, taxable income, ISR, and IVA
- Interactive form with person type selection and tax regime dropdown

### Email System (`api/contact/route.ts`)
- Resend integration for transactional emails
- Dual email flow: notification to business + confirmation to client
- Zod schema validation on server side
- Detailed error logging with structured console output
- Email template generation from dedicated template functions

### Analytics System (`lib/analytics.ts`)
- Custom event tracking for CTA clicks, page views, scroll depth
- Integration with Google Analytics and Facebook Pixel
- Performance monitoring with page load times
- Conversion funnel tracking for business optimization

## Design System

### Brand Colors (Tailwind Config)
- **Primary**: Blue palette (`#1e40af` as brand blue)
- **Success**: Green palette (`#10b981` for AI/success states)  
- **Accent**: Purple palette (`#8b5cf6` for tech highlights)
- **Neutral**: Extended gray palette for text and backgrounds

### Typography
- **Primary Font**: Inter (Google Fonts, variable weight)
- **Display Font**: Poppins for headings and emphasis
- Font loading optimized with `display: 'swap'` and preload

### Animation System
- Framer Motion for page transitions and component reveals
- Custom Tailwind keyframes: `fadeIn`, `fadeInUp`, `slideInRight`, `float`, `shimmer`
- Performance-optimized animations with `will-change` considerations

## Business Data Architecture

### Services Configuration (`lib/constants.ts`)
All business services are configured as typed constants:
- Consultoría Financiera, Gestión de Nóminas, Planificación Estratégica
- Contabilidad Integral, Asesoría Fiscal Estratégica, Automatización de Procesos
- Each service includes: features array, pricing, color scheme, Lucide icon

### AI Features Showcase
- Classification accuracy (99.2%), Error detection (24/7), Predictive reports (30% savings)
- Virtual assistant (<1min response time)
- Structured as typed constants for consistent presentation

### SEO & Structured Data
- Complete OpenGraph and Twitter Card metadata
- JSON-LD structured data for AccountingService schema
- Mexican business location and contact information
- Comprehensive robot directives and verification codes

## Environment Configuration

### Required Environment Variables
```bash
RESEND_API_KEY=your_resend_api_key        # For contact form emails
```

### Optional Analytics Variables
```bash
GA_TRACKING_ID=G-XXXXXXXXXX              # Google Analytics
FACEBOOK_PIXEL_ID=1234567890             # Facebook Pixel
```

## Performance Optimizations

### Next.js Configuration (`next.config.js`)
- Package import optimization for `lucide-react` and `framer-motion`
- WebP/AVIF image format support with responsive sizing
- Console removal in production builds
- SWC minification enabled
- Bundle analyzer support via `ANALYZE=true`

### Font and Resource Loading
- Preconnect to Google Fonts and analytics domains
- DNS prefetch for WhatsApp API
- Preload critical SVG assets (logo)
- Resource hints for calculator and dashboard pages

### Image Configuration
- Device-specific sizing: [640, 768, 1024, 1280, 1536]
- Image sizes: [16, 32, 48, 64, 96, 128, 256, 384]
- Automatic format optimization (WebP/AVIF)

## Component Architecture Patterns

### Interactive Components
- Use `'use client'` directive for components requiring browser APIs
- Custom analytics tracking via `useAnalytics()` hook
- Framer Motion for enter/exit animations with staggered delays
- Form state management with useState, validation with Zod schemas

### UI Component System
- Variant-based design system (Button: primary, secondary, ai, outline)
- Card components with consistent padding and shadow patterns
- Badge system with icon support and multiple sizes
- Modal components for interactive overlays

### Layout Components
- Header with responsive navigation and mobile menu
- Footer with structured business links and social media
- Consistent typography scale and spacing system

## Mexican Business Context

### Target Market
- SMEs (Pequeñas y Medianas Empresas) in Mexico
- Focus on SAT (Servicio de Administración Tributaria) compliance
- CFDI (Comprobante Fiscal Digital por Internet) processing
- IMSS (Instituto Mexicano del Seguro Social) payroll compliance

### Competitive Advantages
- AI-powered classification (99.2% accuracy)
- 24/7 virtual assistant availability
- Predictive financial reporting
- Automated error detection and compliance monitoring

### Compliance Requirements
- Mexican tax law integration
- SAT-approved calculation methods
- CFDI digital invoice processing capability
- Multi-regime tax support (Físicas vs Morales)