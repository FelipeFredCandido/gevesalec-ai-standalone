/**
 * Funciones para cálculo de finiquitos según la Ley Federal del Trabajo
 */

import {
  PRIMA_VACACIONAL_PORCENTAJE,
  AGUINALDO_DIAS_MINIMO,
  obtenerDiasVacaciones,
  LIMITES_CALCULO
} from './constantes-sat';

// Tipos para los cálculos de finiquito
export interface DatosFiniquito {
  salarioMensual: number;
  fechaIngreso: Date;
  fechaSalida: Date;
  diasVacacionesPendientes?: number; // Si se especifica, usar este valor
  aguinaldoDias?: number; // Días de aguinaldo, por defecto 15
}

export interface ResultadoFiniquito {
  salarioDiario: number;
  diasTrabajadosEnAno: number;
  anosAntiguedad: number;
  aguinaldoProporcional: number;
  vacacionesPendientes: number;
  primaVacacional: number;
  salariosPendientes: number;
  totalFiniquito: number;
  desglose: {
    aguinaldo: number;
    vacaciones: number;
    primaVacacional: number;
    salarios: number;
  };
}

/**
 * Calcula el salario diario basado en el salario mensual
 * @param salarioMensual Salario mensual del trabajador
 * @returns Salario diario
 */
export function calcularSalarioDiario(salarioMensual: number): number {
  if (salarioMensual <= 0) {
    throw new Error('El salario mensual debe ser mayor a 0');
  }
  
  return salarioMensual / 30;
}

/**
 * Calcula los días trabajados en el año de la fecha de salida
 * @param fechaIngreso Fecha de ingreso del trabajador
 * @param fechaSalida Fecha de salida del trabajador
 * @returns Número de días trabajados en el año de salida
 */
function calcularDiasTrabajadosEnAno(fechaIngreso: Date, fechaSalida: Date): number {
  const inicioAno = new Date(fechaSalida.getFullYear(), 0, 1);
  const fechaInicioCalculo = fechaIngreso > inicioAno ? fechaIngreso : inicioAno;
  
  const diferenciaTiempo = fechaSalida.getTime() - fechaInicioCalculo.getTime();
  const diasTrabajados = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24)) + 1;
  
  return Math.max(0, Math.min(diasTrabajados, 365));
}

/**
 * Calcula los años de antigüedad
 * @param fechaIngreso Fecha de ingreso
 * @param fechaSalida Fecha de salida  
 * @returns Años de antigüedad (puede incluir decimales)
 */
function calcularAnosAntiguedad(fechaIngreso: Date, fechaSalida: Date): number {
  const diferenciaTiempo = fechaSalida.getTime() - fechaIngreso.getTime();
  const anosAntiguedad = diferenciaTiempo / (1000 * 3600 * 24 * 365.25);
  
  return Math.max(0, anosAntiguedad);
}

/**
 * Calcula el aguinaldo proporcional
 * @param salarioDiario Salario diario del trabajador
 * @param diasTrabajadosEnAno Días trabajados en el año
 * @param diasAguinaldo Días de aguinaldo (por defecto 15)
 * @returns Monto del aguinaldo proporcional
 */
export function calcularAguinaldoProporcional(
  salarioDiario: number,
  diasTrabajadosEnAno: number,
  diasAguinaldo: number = AGUINALDO_DIAS_MINIMO
): number {
  if (salarioDiario <= 0 || diasTrabajadosEnAno < 0) {
    return 0;
  }
  
  const aguinaldoProporcional = (salarioDiario * diasAguinaldo * diasTrabajadosEnAno) / 365;
  return Math.max(0, aguinaldoProporcional);
}

/**
 * Calcula las vacaciones pendientes según los años de antigüedad
 * @param salarioDiario Salario diario del trabajador
 * @param anosAntiguedad Años de antigüedad
 * @param diasVacacionesEspecificados Días de vacaciones específicos (opcional)
 * @returns Monto de vacaciones pendientes
 */
export function calcularVacacionesPendientes(
  salarioDiario: number,
  anosAntiguedad: number,
  diasVacacionesEspecificados?: number
): number {
  if (salarioDiario <= 0 || anosAntiguedad < 0) {
    return 0;
  }
  
  const diasVacaciones = diasVacacionesEspecificados ?? obtenerDiasVacaciones(Math.floor(anosAntiguedad));
  return salarioDiario * diasVacaciones;
}

/**
 * Calcula la prima vacacional (25% de las vacaciones)
 * @param montoVacaciones Monto de las vacaciones
 * @returns Prima vacacional
 */
export function calcularPrimaVacacional(montoVacaciones: number): number {
  if (montoVacaciones <= 0) {
    return 0;
  }
  
  return montoVacaciones * PRIMA_VACACIONAL_PORCENTAJE;
}

/**
 * Calcula salarios pendientes de pago (días trabajados en el mes de salida)
 * @param salarioDiario Salario diario
 * @param fechaSalida Fecha de salida
 * @returns Salarios pendientes
 */
function calcularSalariosPendientes(salarioDiario: number, fechaSalida: Date): number {
  const diasDelMes = fechaSalida.getDate();
  return salarioDiario * diasDelMes;
}

/**
 * Calcula el finiquito completo
 * @param datos Datos del trabajador para el cálculo
 * @returns Resultado completo del finiquito
 */
export function calcularFiniquitoCompleto(datos: DatosFiniquito): ResultadoFiniquito {
  // Validaciones básicas
  if (!datos.fechaIngreso || !datos.fechaSalida) {
    throw new Error('Las fechas de ingreso y salida son requeridas');
  }
  
  if (datos.fechaSalida < datos.fechaIngreso) {
    throw new Error('La fecha de salida no puede ser anterior a la fecha de ingreso');
  }
  
  if (datos.salarioMensual <= 0) {
    throw new Error('El salario mensual debe ser mayor a 0');
  }
  
  if (datos.salarioMensual > LIMITES_CALCULO.SALARIO_MINIMO_MENSUAL * 25) {
    console.warn('Salario mensual muy alto, revisar cálculo');
  }
  
  // Cálculos base
  const salarioDiario = calcularSalarioDiario(datos.salarioMensual);
  const diasTrabajadosEnAno = calcularDiasTrabajadosEnAno(datos.fechaIngreso, datos.fechaSalida);
  const anosAntiguedad = calcularAnosAntiguedad(datos.fechaIngreso, datos.fechaSalida);
  
  // Cálculo de componentes del finiquito
  const aguinaldoProporcional = calcularAguinaldoProporcional(
    salarioDiario,
    diasTrabajadosEnAno,
    datos.aguinaldoDias
  );
  
  const vacacionesPendientes = calcularVacacionesPendientes(
    salarioDiario,
    anosAntiguedad,
    datos.diasVacacionesPendientes
  );
  
  const primaVacacional = calcularPrimaVacacional(vacacionesPendientes);
  const salariosPendientes = calcularSalariosPendientes(salarioDiario, datos.fechaSalida);
  
  // Total del finiquito
  const totalFiniquito = aguinaldoProporcional + vacacionesPendientes + primaVacacional + salariosPendientes;
  
  return {
    salarioDiario,
    diasTrabajadosEnAno,
    anosAntiguedad,
    aguinaldoProporcional,
    vacacionesPendientes,
    primaVacacional,
    salariosPendientes,
    totalFiniquito,
    desglose: {
      aguinaldo: aguinaldoProporcional,
      vacaciones: vacacionesPendientes,
      primaVacacional,
      salarios: salariosPendientes,
    },
  };
}

/**
 * Valida que los datos de finiquito sean correctos
 * @param datos Datos a validar
 * @returns true si son válidos, lanza error si no
 */
export function validarDatosFiniquito(datos: DatosFiniquito): boolean {
  if (!datos.salarioMensual || datos.salarioMensual <= 0) {
    throw new Error('Salario mensual inválido');
  }
  
  if (!datos.fechaIngreso || !datos.fechaSalida) {
    throw new Error('Fechas de ingreso y salida son requeridas');
  }
  
  if (datos.fechaSalida < datos.fechaIngreso) {
    throw new Error('Fecha de salida no puede ser anterior a la de ingreso');
  }
  
  const anosAntiguedad = calcularAnosAntiguedad(datos.fechaIngreso, datos.fechaSalida);
  if (anosAntiguedad > LIMITES_CALCULO.MAXIMO_ANOS_ANTIGUEDAD) {
    throw new Error('Años de antigüedad exceden el límite máximo');
  }
  
  return true;
}