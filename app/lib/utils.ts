import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind CSS de manera inteligente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea números como moneda mexicana
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatea números con separadores de miles
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('es-MX').format(number)
}

/**
 * Formatea fechas en español mexicano
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Genera un ID único para elementos
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Valida RFC mexicano
 */
export function validateRFC(rfc: string): boolean {
  const rfcPattern = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/
  return rfcPattern.test(rfc.toUpperCase().replace(/\s/g, ''))
}

/**
 * Valida CURP mexicano
 */
export function validateCURP(curp: string): boolean {
  const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/
  return curpPattern.test(curp.toUpperCase().replace(/\s/g, ''))
}

/**
 * Valida email
 */
export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

/**
 * Calcula porcentaje de un número
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

/**
 * Convierte texto a slug URL-friendly
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remueve acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remueve caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-') // Remueve guiones múltiples
}

/**
 * Debounce función para optimizar búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

/**
 * Copia texto al clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Error al copiar al clipboard:', err)
    return false
  }
}

/**
 * Calcula edad a partir de fecha de nacimiento
 */
export function calculateAge(birthDate: Date | string): number {
  const today = new Date()
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * Obtiene el período fiscal actual
 */
export function getCurrentFiscalPeriod(): {
  year: number
  quarter: number
  month: number
} {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // JavaScript months are 0-indexed
  const quarter = Math.ceil(month / 3)
  
  return { year, quarter, month }
}

/**
 * Calcula ISR anual (simplificado)
 */
export function calculateISR(annualIncome: number): number {
  // Tabla ISR 2024 simplificada (personas físicas)
  const brackets = [
    { min: 0, max: 125900, rate: 0.0192, lowerLimit: 0 },
    { min: 125900, max: 1000000, rate: 0.064, lowerLimit: 2417.28 },
    { min: 1000000, max: 3000000, rate: 0.30, lowerLimit: 58417.28 },
    { min: 3000000, max: Infinity, rate: 0.35, lowerLimit: 658417.28 },
  ]
  
  for (const bracket of brackets) {
    if (annualIncome >= bracket.min && annualIncome < bracket.max) {
      const excess = annualIncome - bracket.min
      return bracket.lowerLimit + (excess * bracket.rate)
    }
  }
  
  return 0
}

/**
 * Calcula IVA
 */
export function calculateIVA(amount: number, rate: number = 0.16): number {
  return amount * rate
}

/**
 * Obtiene saludo según la hora del día
 */
export function getGreeting(): string {
  const hour = new Date().getHours()
  
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

/**
 * Formatea teléfono mexicano
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

/**
 * Genera colores aleatorios para gráficas
 */
export function generateChartColors(count: number): string[] {
  const colors = [
    '#1e40af', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ]
  
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length])
  }
  
  return result
}