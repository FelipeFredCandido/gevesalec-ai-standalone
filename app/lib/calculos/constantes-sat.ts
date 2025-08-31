/**
 * Constantes del SAT y LFT para cálculos de finiquitos y liquidaciones
 * Actualizadas para 2025
 */

// Salario mínimo vigente 2025
export const SALARIO_MINIMO_2025 = 248.93;

// Factores de integración por años de antigüedad
// Basados en días de vacaciones + prima vacacional + aguinaldo
export const FACTORES_INTEGRACION = {
  1: 1.0493,   // 12 días vacaciones
  2: 1.0507,   // 14 días vacaciones  
  3: 1.0521,   // 16 días vacaciones
  4: 1.0534,   // 18 días vacaciones
  5: 1.0548,   // 20 días vacaciones (5-9 años usan este)
  6: 1.0548,   
  7: 1.0548,   
  8: 1.0548,   
  9: 1.0548,   
  10: 1.0562,  // 22 días vacaciones (10-14 años)
  11: 1.0562,
  12: 1.0562,
  13: 1.0562,
  14: 1.0562,
  15: 1.0575,  // 24 días vacaciones (15-19 años)
  16: 1.0575,
  17: 1.0575,
  18: 1.0575,
  19: 1.0575,
  20: 1.0589,  // 26 días vacaciones (20-24 años)
  21: 1.0589,
  22: 1.0589,
  23: 1.0589,
  24: 1.0589,
  25: 1.0603,  // 28 días vacaciones (25-29 años)
  26: 1.0603,
  27: 1.0603,
  28: 1.0603,
  29: 1.0603,
  30: 1.0616,  // 30 días vacaciones (30+ años)
} as const;

// Tabla de días de vacaciones según Artículo 76 LFT
export const DIAS_VACACIONES_LFT = {
  1: 12,   // Primer año
  2: 14,   // Segundo año
  3: 16,   // Tercer año
  4: 18,   // Cuarto año
  5: 20,   // Quinto año
  6: 20,   // Del 5º al 9º año: 20 días
  7: 20,
  8: 20,
  9: 20,
  10: 22,  // Del 10º al 14º año: 22 días
  11: 22,
  12: 22,
  13: 22,
  14: 22,
  15: 24,  // Del 15º al 19º año: 24 días
  16: 24,
  17: 24,
  18: 24,
  19: 24,
  20: 26,  // Del 20º al 24º año: 26 días
  21: 26,
  22: 26,
  23: 26,
  24: 26,
  25: 28,  // Del 25º al 29º año: 28 días
  26: 28,
  27: 28,
  28: 28,
  29: 28,
  30: 30,  // A partir del 30º año: 30 días
} as const;

// Prima vacacional legal mínima
export const PRIMA_VACACIONAL_PORCENTAJE = 0.25; // 25%

// Aguinaldo mínimo legal
export const AGUINALDO_DIAS_MINIMO = 15;

// Topes para prima de antigüedad (Artículo 162 LFT)
export const TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS = 2;

// Días de indemnización constitucional
export const INDEMNIZACION_CONSTITUCIONAL_MESES = 3;

// Días máximos para prima de antigüedad
export const PRIMA_ANTIGUEDAD_DIAS_MAXIMOS = 12;

// Utilidad para obtener días de vacaciones por años de antigüedad
export function obtenerDiasVacaciones(anosAntiguedad: number): number {
  // Si tiene más de 30 años, mantener 30 días
  if (anosAntiguedad >= 30) {
    return DIAS_VACACIONES_LFT[30];
  }
  
  // Obtener días según la tabla, o 12 días por defecto
  return DIAS_VACACIONES_LFT[anosAntiguedad as keyof typeof DIAS_VACACIONES_LFT] || 12;
}

// Utilidad para obtener factor de integración por años de antigüedad
export function obtenerFactorIntegracion(anosAntiguedad: number): number {
  // Si tiene más de 30 años, usar el factor de 30 años
  if (anosAntiguedad >= 30) {
    return FACTORES_INTEGRACION[30];
  }
  
  // Obtener factor según la tabla, o factor del primer año por defecto
  return FACTORES_INTEGRACION[anosAntiguedad as keyof typeof FACTORES_INTEGRACION] || FACTORES_INTEGRACION[1];
}

// Constantes adicionales para validaciones
export const LIMITES_CALCULO = {
  SALARIO_MINIMO_ANUAL: SALARIO_MINIMO_2025 * 365,
  SALARIO_MINIMO_MENSUAL: SALARIO_MINIMO_2025 * 30,
  MAXIMO_DIAS_ANO: 365,
  MINIMO_DIAS_MES: 1,
  MAXIMO_ANOS_ANTIGUEDAD: 50, // Límite práctico
} as const;