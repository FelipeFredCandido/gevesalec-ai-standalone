import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { 
  type ResultadoFiniquito, 
  type ResultadoLiquidacion,
  validarDatosLiquidacion
} from '@/app/lib/calculos'

// Schema para validar datos de entrada
const saveCalculationSchema = z.object({
  tipo: z.enum(['finiquito', 'liquidacion']),
  resultado: z.object({
    salarioDiario: z.number(),
    totalFiniquito: z.number().optional(),
    totalLiquidacion: z.number().optional(),
    anosAntiguedad: z.number(),
  }).passthrough(), // Permite propiedades adicionales
  metadata: z.object({
    tipoRescision: z.string(),
    fechaCalculo: z.string(),
    salarioMensual: z.number(),
  }).optional(),
})

const getCalculationSchema = z.object({
  id: z.string().uuid(),
})

// Interface para el cálculo guardado
interface SavedCalculation {
  id: string
  tipo: 'finiquito' | 'liquidacion'
  resultado: Partial<ResultadoFiniquito | ResultadoLiquidacion>
  metadata?: {
    tipoRescision?: string
    fechaCalculo?: string
    salarioMensual?: number
  }
  timestamp: number
  expiresAt: number
}

// Almacenamiento temporal en memoria (en producción usar Redis o DB)
const calculationsStore = new Map<string, SavedCalculation>()

// Función para limpiar cálculos expirados
function cleanExpiredCalculations() {
  const now = Date.now()
  const entries = Array.from(calculationsStore.entries())
  for (const [id, calculation] of entries) {
    if (calculation.expiresAt < now) {
      calculationsStore.delete(id)
    }
  }
}

// Ejecutar limpieza cada 1 hora
setInterval(cleanExpiredCalculations, 60 * 60 * 1000)

export async function POST(request: NextRequest) {
  try {
    console.log('📊 Nueva solicitud para guardar cálculo de finiquito')
    
    // Limpiar cálculos expirados
    cleanExpiredCalculations()
    
    // Parsear el body de la request
    const body = await request.json()
    
    // Validar los datos usando Zod
    const validationResult = saveCalculationSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error('❌ Datos de cálculo inválidos:', validationResult.error.flatten())
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos de cálculo inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    const { tipo, resultado, metadata } = validationResult.data
    
    // Generar ID único
    const calculationId = crypto.randomUUID()
    
    // Configurar expiración (24 horas)
    const now = Date.now()
    const expiresAt = now + (24 * 60 * 60 * 1000) // 24 horas
    
    // Solo guardar datos no sensibles del resultado
    const sanitizedResult = {
      salarioDiario: resultado.salarioDiario,
      anosAntiguedad: resultado.anosAntiguedad,
      totalFiniquito: tipo === 'finiquito' ? resultado.totalFiniquito : undefined,
      totalLiquidacion: tipo === 'liquidacion' ? resultado.totalLiquidacion : undefined,
    }
    
    // Crear objeto de cálculo guardado
    const savedCalculation: SavedCalculation = {
      id: calculationId,
      tipo,
      resultado: sanitizedResult,
      metadata,
      timestamp: now,
      expiresAt,
    }
    
    // Guardar en el store
    calculationsStore.set(calculationId, savedCalculation)
    
    console.log('✅ Cálculo guardado exitosamente:', {
      id: calculationId,
      tipo,
      expiresAt: new Date(expiresAt).toISOString(),
      totalCalculations: calculationsStore.size
    })
    
    return NextResponse.json({
      success: true,
      message: 'Cálculo guardado exitosamente',
      data: {
        id: calculationId,
        expiresAt: new Date(expiresAt).toISOString(),
        tipo,
      }
    }, { status: 201 })
    
  } catch (error) {
    console.error('❌ Error guardando cálculo de finiquito:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor intenta nuevamente.' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'ID de cálculo requerido' 
        },
        { status: 400 }
      )
    }
    
    // Validar formato del ID
    const validationResult = getCalculationSchema.safeParse({ id })
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Formato de ID inválido' 
        },
        { status: 400 }
      )
    }
    
    // Limpiar cálculos expirados antes de buscar
    cleanExpiredCalculations()
    
    // Buscar el cálculo
    const calculation = calculationsStore.get(id)
    
    if (!calculation) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Cálculo no encontrado o ha expirado' 
        },
        { status: 404 }
      )
    }
    
    // Verificar si no ha expirado (verificación adicional)
    if (calculation.expiresAt < Date.now()) {
      calculationsStore.delete(id)
      return NextResponse.json(
        { 
          success: false, 
          message: 'El cálculo ha expirado' 
        },
        { status: 404 }
      )
    }
    
    console.log('✅ Cálculo recuperado exitosamente:', {
      id,
      tipo: calculation.tipo,
      timestamp: new Date(calculation.timestamp).toISOString()
    })
    
    return NextResponse.json({
      success: true,
      message: 'Cálculo encontrado',
      data: {
        id: calculation.id,
        tipo: calculation.tipo,
        resultado: calculation.resultado,
        metadata: calculation.metadata,
        timestamp: new Date(calculation.timestamp).toISOString(),
        expiresAt: new Date(calculation.expiresAt).toISOString(),
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('❌ Error recuperando cálculo de finiquito:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor intenta nuevamente.' 
      },
      { status: 500 }
    )
  }
}

// Endpoint para obtener estadísticas generales (sin datos sensibles)
export async function OPTIONS(request: NextRequest) {
  try {
    // Limpiar cálculos expirados
    cleanExpiredCalculations()
    
    // Estadísticas generales
    const totalCalculations = calculationsStore.size
    const calculationsByType = {
      finiquito: 0,
      liquidacion: 0
    }
    
    // Contar por tipo sin exponer datos sensibles
    for (const calculation of calculationsStore.values()) {
      calculationsByType[calculation.tipo]++
    }
    
    return NextResponse.json({
      success: true,
      data: {
        totalActiveCalculations: totalCalculations,
        calculationsByType,
        serverTime: new Date().toISOString(),
      }
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
    
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo estadísticas' 
      },
      { status: 500 }
    )
  }
}