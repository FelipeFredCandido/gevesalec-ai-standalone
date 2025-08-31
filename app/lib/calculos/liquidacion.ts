/**
 * Funciones para cálculo de liquidaciones según la Ley Federal del Trabajo
 * Incluye indemnizaciones constitucionales y prima de antigüedad
 */

import {
  SALARIO_MINIMO_2025,
  TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS,
  INDEMNIZACION_CONSTITUCIONAL_MESES,
  PRIMA_ANTIGUEDAD_DIAS_MAXIMOS,
  obtenerFactorIntegracion,
  LIMITES_CALCULO
} from './constantes-sat';

import {
  calcularFiniquitoCompleto,
  type DatosFiniquito,
  type ResultadoFiniquito
} from './finiquito';

// Tipos para los cálculos de liquidación
export interface DatosLiquidacion extends DatosFiniquito {
  tipoRescision: 'despido_injustificado' | 'despido_justificado' | 'renuncia' | 'mutuo_acuerdo';
  incluyeIndemnizacion: boolean;
  incluyePrimaAntiguedad: boolean;
}

export interface ResultadoLiquidacion {
  finiquito: ResultadoFiniquito;
  sdi: number;
  indemnizacionConstitucional: number;
  primaAntiguedad: number;
  totalLiquidacion: number;
  desglose: {
    finiquitoTotal: number;
    indemnizacion: number;
    primaAntiguedad: number;
  };
  observaciones: string[];
}

/**
 * Calcula el Salario Diario Integrado (SDI)
 * @param salarioDiario Salario diario base
 * @param factorIntegracion Factor según años de antigüedad
 * @returns SDI calculado
 */
export function calcularSDI(salarioDiario: number, factorIntegracion: number): number {
  if (salarioDiario <= 0) {
    throw new Error('El salario diario debe ser mayor a 0');
  }
  
  if (factorIntegracion <= 0) {
    throw new Error('El factor de integración debe ser mayor a 0');
  }
  
  return salarioDiario * factorIntegracion;
}

/**
 * Calcula la indemnización constitucional (3 meses de SDI)
 * @param sdi Salario Diario Integrado
 * @returns Monto de indemnización
 */
export function calcularIndemnizacion3Meses(sdi: number): number {
  if (sdi <= 0) {
    return 0;
  }
  
  return sdi * 30 * INDEMNIZACION_CONSTITUCIONAL_MESES;
}

/**
 * Calcula la prima de antigüedad (12 días por año trabajado)
 * Con tope de 2 salarios mínimos por día
 * @param salarioDiario Salario diario base
 * @param anosAntiguedad Años de antigüedad
 * @param salarioMinimo Salario mínimo vigente
 * @returns Prima de antigüedad calculada
 */
export function calcularPrimaAntiguedad(
  salarioDiario: number,
  anosAntiguedad: number,
  salarioMinimo: number = SALARIO_MINIMO_2025
): number {
  if (salarioDiario <= 0 || anosAntiguedad < 0) {
    return 0;
  }
  
  // Solo se paga prima de antigüedad si tiene al menos 1 año de antigüedad
  if (anosAntiguedad < 1) {
    return 0;
  }
  
  // El salario diario para prima de antigüedad tiene tope de 2 salarios mínimos
  const salarioDiarioParaPrima = Math.min(salarioDiario, salarioMinimo * TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS);
  
  // 12 días por cada año de antigüedad
  const anosCompletos = Math.floor(anosAntiguedad);
  const diasPrima = anosCompletos * PRIMA_ANTIGUEDAD_DIAS_MAXIMOS;
  
  return salarioDiarioParaPrima * diasPrima;
}

/**
 * Determina si aplican las indemnizaciones según el tipo de rescisión
 * @param tipoRescision Tipo de terminación de la relación laboral
 * @returns Objeto indicando qué conceptos aplican
 */
function determinarConceptosLiquidacion(tipoRescision: DatosLiquidacion['tipoRescision']) {
  switch (tipoRescision) {
    case 'despido_injustificado':
      return {
        incluyeIndemnizacion: true,
        incluyePrimaAntiguedad: true,
        observacion: 'Despido injustificado: incluye indemnización constitucional y prima de antigüedad'
      };
    
    case 'despido_justificado':
      return {
        incluyeIndemnizacion: false,
        incluyePrimaAntiguedad: true,
        observacion: 'Despido justificado: solo prima de antigüedad'
      };
    
    case 'renuncia':
      return {
        incluyeIndemnizacion: false,
        incluyePrimaAntiguedad: true,
        observacion: 'Renuncia voluntaria: solo prima de antigüedad'
      };
    
    case 'mutuo_acuerdo':
      return {
        incluyeIndemnizacion: false,
        incluyePrimaAntiguedad: true,
        observacion: 'Rescisión de mutuo acuerdo: solo prima de antigüedad'
      };
    
    default:
      return {
        incluyeIndemnizacion: false,
        incluyePrimaAntiguedad: true,
        observacion: 'Tipo de rescisión no especificado'
      };
  }
}

/**
 * Calcula la liquidación completa incluyendo finiquito e indemnizaciones
 * @param datos Datos del trabajador y tipo de liquidación
 * @returns Resultado completo de la liquidación
 */
export function calcularLiquidacionCompleta(datos: DatosLiquidacion): ResultadoLiquidacion {
  // Validaciones básicas
  if (!datos.fechaIngreso || !datos.fechaSalida) {
    throw new Error('Las fechas de ingreso y salida son requeridas');
  }
  
  if (datos.salarioMensual <= 0) {
    throw new Error('El salario mensual debe ser mayor a 0');
  }
  
  // Calcular finiquito base
  const finiquito = calcularFiniquitoCompleto(datos);
  
  // Obtener factor de integración por antigüedad
  const factorIntegracion = obtenerFactorIntegracion(Math.floor(finiquito.anosAntiguedad));
  
  // Calcular SDI
  const sdi = calcularSDI(finiquito.salarioDiario, factorIntegracion);
  
  // Determinar qué conceptos aplican según el tipo de rescisión
  const conceptos = determinarConceptosLiquidacion(datos.tipoRescision);
  
  // Calcular indemnización constitucional
  const incluyeIndemnizacion = datos.incluyeIndemnizacion ?? conceptos.incluyeIndemnizacion;
  const indemnizacionConstitucional = incluyeIndemnizacion 
    ? calcularIndemnizacion3Meses(sdi) 
    : 0;
  
  // Calcular prima de antigüedad
  const incluyePrimaAntiguedad = datos.incluyePrimaAntiguedad ?? conceptos.incluyePrimaAntiguedad;
  const primaAntiguedad = incluyePrimaAntiguedad 
    ? calcularPrimaAntiguedad(finiquito.salarioDiario, finiquito.anosAntiguedad)
    : 0;
  
  // Total de la liquidación
  const totalLiquidacion = finiquito.totalFiniquito + indemnizacionConstitucional + primaAntiguedad;
  
  // Observaciones
  const observaciones: string[] = [conceptos.observacion];
  
  if (finiquito.anosAntiguedad < 1 && datos.incluyePrimaAntiguedad) {
    observaciones.push('No aplica prima de antigüedad (menos de 1 año de antigüedad)');
  }
  
  if (finiquito.salarioDiario > SALARIO_MINIMO_2025 * TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS) {
    observaciones.push(`Salario para prima de antigüedad limitado a ${TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS} salarios mínimos`);
  }
  
  if (sdi > SALARIO_MINIMO_2025 * 25) {
    observaciones.push('SDI muy alto, verificar factor de integración');
  }
  
  return {
    finiquito,
    sdi,
    indemnizacionConstitucional,
    primaAntiguedad,
    totalLiquidacion,
    desglose: {
      finiquitoTotal: finiquito.totalFiniquito,
      indemnizacion: indemnizacionConstitucional,
      primaAntiguedad: primaAntiguedad,
    },
    observaciones,
  };
}

/**
 * Calcula solo los conceptos de indemnización (sin finiquito)
 * Útil para cálculos separados o comparaciones
 * @param salarioDiario Salario diario
 * @param anosAntiguedad Años de antigüedad
 * @param tipoRescision Tipo de rescisión
 * @returns Montos de indemnización
 */
export function calcularSoloIndemnizaciones(
  salarioDiario: number,
  anosAntiguedad: number,
  tipoRescision: DatosLiquidacion['tipoRescision']
) {
  const factorIntegracion = obtenerFactorIntegracion(Math.floor(anosAntiguedad));
  const sdi = calcularSDI(salarioDiario, factorIntegracion);
  const conceptos = determinarConceptosLiquidacion(tipoRescision);
  
  const indemnizacionConstitucional = conceptos.incluyeIndemnizacion 
    ? calcularIndemnizacion3Meses(sdi) 
    : 0;
    
  const primaAntiguedad = conceptos.incluyePrimaAntiguedad 
    ? calcularPrimaAntiguedad(salarioDiario, anosAntiguedad)
    : 0;
  
  return {
    sdi,
    indemnizacionConstitucional,
    primaAntiguedad,
    total: indemnizacionConstitucional + primaAntiguedad,
    conceptos: conceptos.observacion,
  };
}

/**
 * Valida que los datos de liquidación sean correctos
 * @param datos Datos a validar
 * @returns true si son válidos, lanza error si no
 */
export function validarDatosLiquidacion(datos: DatosLiquidacion): boolean {
  // Validaciones base del finiquito
  if (!datos.salarioMensual || datos.salarioMensual <= 0) {
    throw new Error('Salario mensual inválido');
  }
  
  if (!datos.fechaIngreso || !datos.fechaSalida) {
    throw new Error('Fechas de ingreso y salida son requeridas');
  }
  
  if (datos.fechaSalida < datos.fechaIngreso) {
    throw new Error('Fecha de salida no puede ser anterior a la de ingreso');
  }
  
  // Validaciones específicas de liquidación
  if (!datos.tipoRescision) {
    throw new Error('Tipo de rescisión es requerido');
  }
  
  const tiposValidos: DatosLiquidacion['tipoRescision'][] = [
    'despido_injustificado',
    'despido_justificado',
    'renuncia',
    'mutuo_acuerdo'
  ];
  
  if (!tiposValidos.includes(datos.tipoRescision)) {
    throw new Error('Tipo de rescisión no válido');
  }
  
  return true;
}