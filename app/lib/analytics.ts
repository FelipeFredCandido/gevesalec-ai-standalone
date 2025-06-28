'use client'

import { ANALYTICS } from './constants'

// Tipos para eventos de analytics
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

// Eventos personalizados para GEVESALEC
export const EVENTS = {
  // Interacciones generales
  CLICK_CTA: 'click_cta',
  VIEW_SERVICE: 'view_service',
  DOWNLOAD_GUIDE: 'download_guide',
  
  // Formularios
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ERROR: 'form_error',
  
  // Calculadoras
  USE_TAX_CALCULATOR: 'use_tax_calculator',
  USE_PAYROLL_CALCULATOR: 'use_payroll_calculator',
  
  // Chat/Asistente IA
  OPEN_CHAT: 'open_chat',
  SEND_MESSAGE: 'send_message',
  
  // Conversiones
  REQUEST_QUOTE: 'request_quote',
  SCHEDULE_MEETING: 'schedule_meeting',
  CONTACT_WHATSAPP: 'contact_whatsapp',
  
  // Navegación
  SCROLL_DEPTH: 'scroll_depth',
  PAGE_VIEW: 'page_view',
  TIME_ON_PAGE: 'time_on_page',
} as const

// Función para inicializar Google Analytics
export function initializeAnalytics(): void {
  if (typeof window === 'undefined' || !ANALYTICS.googleAnalyticsId) return

  // Cargar Google Analytics
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.googleAnalyticsId}`
  script.async = true
  document.head.appendChild(script)

  // Configurar gtag
  window.dataLayer = window.dataLayer || []
  
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  gtag('js', new Date())
  gtag('config', ANALYTICS.googleAnalyticsId, {
    page_title: document.title,
    page_location: window.location.href,
  })

  // Hacer gtag disponible globalmente
  ;(window as any).gtag = gtag
}

// Función para trackear eventos
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if ((window as any).gtag) {
    ;(window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    })
  }

  // Facebook Pixel
  if ((window as any).fbq) {
    ;(window as any).fbq('track', 'CustomEvent', {
      action: event.action,
      category: event.category,
      label: event.label,
    })
  }

  // Console log para desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event)
  }
}

// Trackear page views
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined') return

  if ((window as any).gtag) {
    ;(window as any).gtag('config', ANALYTICS.googleAnalyticsId, {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Trackear conversiones
export function trackConversion(event: string, value?: number): void {
  trackEvent({
    action: event,
    category: 'conversion',
    value: value,
  })
}

// Trackear interacciones de formulario
export function trackFormInteraction(
  formName: string,
  step: 'start' | 'complete' | 'error',
  errorMessage?: string
): void {
  trackEvent({
    action: `form_${step}`,
    category: 'form',
    label: errorMessage ? `${formName}_${errorMessage}` : formName,
  })
}

// Trackear uso de calculadoras
export function trackCalculatorUsage(
  calculatorType: string,
  result?: number
): void {
  trackEvent({
    action: 'use_calculator',
    category: 'tools',
    label: calculatorType,
    value: result,
  })
}

// Trackear interacciones con el chat IA
export function trackChatInteraction(
  action: 'open' | 'message' | 'close',
  messageType?: string
): void {
  trackEvent({
    action: `chat_${action}`,
    category: 'ai_assistant',
    label: messageType,
  })
}

// Trackear profundidad de scroll
export function trackScrollDepth(): () => void {
  if (typeof window === 'undefined') return () => {}
  
  let maxScroll = 0
  const milestones = [25, 50, 75, 90, 100]
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100
    )
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      const milestone = milestones.find(m => scrollPercent >= m && maxScroll < m)
      if (milestone) {
        trackEvent({
          action: EVENTS.SCROLL_DEPTH,
          category: 'engagement',
          label: `${milestone}%`,
          value: milestone,
        })
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Trackear tiempo en página
export function trackTimeOnPage(): () => void {
  if (typeof window === 'undefined') return () => {}
  
  const startTime = Date.now()
  
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    
    // Solo trackear si el usuario estuvo al menos 10 segundos
    if (timeSpent >= 10) {
      trackEvent({
        action: EVENTS.TIME_ON_PAGE,
        category: 'engagement',
        value: timeSpent,
      })
    }
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  
  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}

// Trackear clics en CTAs
export function trackCTAClick(ctaText: string, location: string): void {
  trackEvent({
    action: EVENTS.CLICK_CTA,
    category: 'engagement',
    label: `${ctaText}_${location}`,
  })
}

// Trackear visualización de servicios
export function trackServiceView(serviceName: string): void {
  trackEvent({
    action: EVENTS.VIEW_SERVICE,
    category: 'services',
    label: serviceName,
  })
}

// Trackear contacto por WhatsApp
export function trackWhatsAppContact(source: string): void {
  trackEvent({
    action: EVENTS.CONTACT_WHATSAPP,
    category: 'contact',
    label: source,
  })
}

// Trackear descarga de guías
export function trackGuideDownload(guideName: string): void {
  trackEvent({
    action: EVENTS.DOWNLOAD_GUIDE,
    category: 'resources',
    label: guideName,
  })
}

// Función para identificar usuarios (para CRM)
export function identifyUser(userId: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined') return

  // Aquí puedes integrar con tu CRM o sistema de analytics personalizado
  if (process.env.NODE_ENV === 'development') {
    console.log('👤 User Identified:', { userId, properties })
  }
}

// Hook personalizado para usar analytics en componentes
export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormInteraction,
    trackCalculatorUsage,
    trackChatInteraction,
    trackCTAClick,
    trackServiceView,
    trackWhatsAppContact,
    trackGuideDownload,
    identifyUser,
  }
}

// Declaración de tipos para window
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}