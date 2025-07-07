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
- **Email**: Resend for contact form delivery
- **Analytics**: Vercel Speed Insights integration
- **Validation**: Zod schemas for type-safe form validation

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

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

## Project Configuration

### TypeScript Configuration
- **Target**: ES5 with DOM libraries
- **Strict Mode**: Disabled for flexibility
- **Module Resolution**: Bundler (Next.js optimized)
- **Path Aliases**: `@/*` maps to root directory
- **Incremental Compilation**: Enabled for faster builds

### Prettier Configuration
- **Semi**: false (no semicolons)
- **Single Quotes**: true
- **Tab Width**: 2 spaces
- **Trailing Comma**: ES5 style
- **Print Width**: 80 characters
- **Tailwind Plugin**: Enabled for class sorting

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

## Performance & Optimization

### Next.js Configuration
- **Bundle Optimization**: Package imports optimized for Lucide React and Framer Motion
- **Image Optimization**: WebP/AVIF formats with responsive sizing
- **Compression**: Gzip compression enabled
- **Minification**: SWC minifier for production builds
- **Console Removal**: Production console.log statements removed
- **Modular Imports**: Tree-shaking enabled for icon libraries
- **Bundle Analysis**: Available with `ANALYZE=true` environment variable

### PWA Configuration
- **Manifest**: `/public/manifest.json` with full PWA setup
- **Display Mode**: Standalone app experience
- **Theme Color**: `#1e40af` (corporate blue)
- **Icons**: Multi-resolution icons (16px to 512px)
- **Shortcuts**: Quick access to Calculator and Contact
- **Language**: Spanish (Mexico) primary
- **Categories**: Business, Finance, Productivity

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
- Uses Resend for email delivery with verified domain (`noreply@gevesalec.com`)
- Dual email system: team notifications and client confirmations
- HTML email templates in `app/lib/email-templates.ts`
- Form validation schemas in `app/lib/schemas.ts`
- Environment variable: `RESEND_API_KEY` required for production

## Email Configuration

The contact form sends two emails:
1. **Team Notification**: To `contacto@gevesalec.com` with form details
2. **Client Confirmation**: To user's email with service information

Email templates are responsive HTML with corporate branding and include:
- Professional styling with brand colors
- Contact information and next steps
- WhatsApp integration links

## API Routes

- `POST /api/contact` - Handles contact form submissions with email delivery
- `GET /api/contact` - Health check endpoint for API monitoring

## Important Configuration Notes

- **Resend Domain**: Must use verified domain `gevesalec.com` for email delivery
- **Environment Variables**: `RESEND_API_KEY` must be configured in Vercel
- **Email Templates**: Comprehensive HTML templates with fallback handling
- **Error Handling**: Graceful degradation if email service fails

## Project Information

### Version & Metadata
- **Version**: 1.0.0
- **Name**: gevesalec-ai
- **Description**: GEVESALEC - Primer despacho contable mexicano potenciado por IA
- **Author**: GEVESALEC
- **License**: MIT
- **Language**: Spanish (Mexico)
- **Keywords**: contabilidad, IA, México, despacho contable, inteligencia artificial

### Key Dependencies
- **Next.js**: ^14.0.0 (React framework)
- **React**: ^18.0.0 (UI library)
- **TypeScript**: ^5.0.0 (Type safety)
- **Tailwind CSS**: ^3.3.0 (Styling)
- **Framer Motion**: ^10.16.0 (Animations)
- **Lucide React**: ^0.290.0 (Icons)
- **React Hook Form**: ^7.47.0 (Forms)
- **Zod**: ^3.22.0 (Validation)
- **Resend**: ^4.6.0 (Email delivery)

### Development Dependencies
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting with Tailwind plugin
- **Autoprefixer**: CSS vendor prefixing
- **PostCSS**: CSS processing