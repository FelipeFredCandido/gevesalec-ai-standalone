/**
 * Exportaciones centralizadas del módulo de cálculos laborales
 * Motor de cálculo de finiquitos y liquidaciones para México
 */

// Constantes SAT y LFT
export {
  SALARIO_MINIMO_2025,
  FACTORES_INTEGRACION,
  DIAS_VACACIONES_LFT,
  PRIMA_VACACIONAL_PORCENTAJE,
  AGUINALDO_DIAS_MINIMO,
  TOPE_PRIMA_ANTIGUEDAD_SALARIOS_MINIMOS,
  INDEMNIZACION_CONSTITUCIONAL_MESES,
  PRIMA_ANTIGUEDAD_DIAS_MAXIMOS,
  LIMITES_CALCULO,
  obtenerDiasVacaciones,
  obtenerFactorIntegracion,
} from './constantes-sat';

// Funciones de finiquito
export {
  calcularSalarioDiario,
  calcularAguinaldoProporcional,
  calcularVacacionesPendientes,
  calcularPrimaVacacional,
  calcularFiniquitoCompleto,
  validarDatosFiniquito,
  type DatosFiniquito,
  type ResultadoFiniquito,
} from './finiquito';

// Funciones de liquidación
export {
  calcularSDI,
  calcularIndemnizacion3Meses,
  calcularPrimaAntiguedad,
  calcularLiquidacionCompleta,
  calcularSoloIndemnizaciones,
  validarDatosLiquidacion,
  type DatosLiquidacion,
  type ResultadoLiquidacion,
} from './liquidacion';

// Tipos adicionales para formularios y UI
export interface OpcionTipoRescision {
  value: DatosLiquidacion['tipoRescision'];
  label: string;
  descripcion: string;
  incluyeIndemnizacion: boolean;
  incluyePrimaAntiguedad: boolean;
}

// Opciones para formularios
export const OPCIONES_TIPO_RESCISION: OpcionTipoRescision[] = [
  {
    value: 'despido_injustificado',
    label: 'Despido Injustificado',
    descripcion: 'El patrón rescinde sin causa justificada',
    incluyeIndemnizacion: true,
    incluyePrimaAntiguedad: true,
  },
  {
    value: 'despido_justificado',
    label: 'Despido Justificado',
    descripcion: 'El patrón rescinde por causa justificada',
    incluyeIndemnizacion: false,
    incluyePrimaAntiguedad: true,
  },
  {
    value: 'renuncia',
    label: 'Renuncia Voluntaria',
    descripcion: 'El trabajador renuncia por decisión propia',
    incluyeIndemnizacion: false,
    incluyePrimaAntiguedad: true,
  },
  {
    value: 'mutuo_acuerdo',
    label: 'Mutuo Acuerdo',
    descripcion: 'Terminación acordada entre las partes',
    incluyeIndemnizacion: false,
    incluyePrimaAntiguedad: true,
  },
];

// Utilidades de validación para formularios
export function validarFechasLaborales(fechaIngreso: Date, fechaSalida: Date): {
  esValido: boolean;
  errores: string[];
} {
  const errores: string[] = [];
  
  if (!fechaIngreso || !fechaSalida) {
    errores.push('Las fechas de ingreso y salida son requeridas');
  }
  
  if (fechaIngreso && fechaSalida && fechaSalida < fechaIngreso) {
    errores.push('La fecha de salida no puede ser anterior a la fecha de ingreso');
  }
  
  if (fechaIngreso && fechaIngreso > new Date()) {
    errores.push('La fecha de ingreso no puede ser futura');
  }
  
  if (fechaSalida && fechaSalida > new Date()) {
    errores.push('La fecha de salida no puede ser futura');
  }
  
  const anosAntiguedad = fechaIngreso && fechaSalida 
    ? (fechaSalida.getTime() - fechaIngreso.getTime()) / (1000 * 3600 * 24 * 365.25)
    : 0;
    
  if (anosAntiguedad > LIMITES_CALCULO.MAXIMO_ANOS_ANTIGUEDAD) {
    errores.push(`Los años de antigüedad no pueden exceder ${LIMITES_CALCULO.MAXIMO_ANOS_ANTIGUEDAD} años`);
  }
  
  return {
    esValido: errores.length === 0,
    errores,
  };
}

// Utilidad para formatear resultados para display
export interface ResumenCalculoLaboral {
  tipo: 'finiquito' | 'liquidacion';
  trabajador: {
    salarioMensual: number;
    salarioDiario: number;
    anosAntiguedad: number;
    tipoRescision?: string;
  };
  conceptos: {
    finiquito: number;
    indemnizacion?: number;
    primaAntiguedad?: number;
    total: number;
  };
  observaciones: string[];
}

export function crearResumenCalculo(
  resultado: ResultadoFiniquito | ResultadoLiquidacion,
  tipo: 'finiquito' | 'liquidacion'
): ResumenCalculoLaboral {
  if (tipo === 'finiquito') {
    const res = resultado as ResultadoFiniquito;
    return {
      tipo: 'finiquito',
      trabajador: {
        salarioMensual: res.salarioDiario * 30,
        salarioDiario: res.salarioDiario,
        anosAntiguedad: res.anosAntiguedad,
      },
      conceptos: {
        finiquito: res.totalFiniquito,
        total: res.totalFiniquito,
      },
      observaciones: [
        `${res.diasTrabajadosEnAno} días trabajados en el año`,
        `${Math.floor(res.anosAntiguedad)} años de antigüedad`,
      ],
    };
  } else {
    const res = resultado as ResultadoLiquidacion;
    return {
      tipo: 'liquidacion',
      trabajador: {
        salarioMensual: res.finiquito.salarioDiario * 30,
        salarioDiario: res.finiquito.salarioDiario,
        anosAntiguedad: res.finiquito.anosAntiguedad,
      },
      conceptos: {
        finiquito: res.finiquito.totalFiniquito,
        indemnizacion: res.indemnizacionConstitucional,
        primaAntiguedad: res.primaAntiguedad,
        total: res.totalLiquidacion,
      },
      observaciones: res.observaciones,
    };
  }
}