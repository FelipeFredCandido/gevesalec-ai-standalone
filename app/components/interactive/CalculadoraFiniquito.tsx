'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Info, 
  AlertCircle,
  Download,
  UserCheck,
  UserX,
  Users,
  Scale
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { formatCurrency } from '@/app/lib/utils'
import { useAnalytics } from '@/app/lib/analytics'
import { calcularLiquidacionCompleta } from '@/app/lib/calculos/liquidacion'
import { calcularFiniquitoCompleto } from '@/app/lib/calculos/finiquito'
import { LIMITES_CALCULO } from '@/app/lib/calculos/constantes-sat'
import type { DatosLiquidacion, ResultadoLiquidacion } from '@/app/lib/calculos/liquidacion'
import type { ResultadoFiniquito } from '@/app/lib/calculos/finiquito'
import { OPCIONES_TIPO_RESCISION, validarFechasLaborales } from '@/app/lib/calculos'

// Tipos para el componente
type TipoCalculo = 'finiquito' | 'liquidacion'
type TipoRescision = DatosLiquidacion['tipoRescision']

interface FormData {
  tipoRescision: TipoRescision | ''
  fechaIngreso: string
  fechaSalida: string
  salarioMensual: string
  diasTrabajadosNoPagados: string
  diasVacacionesPendientes: string
}

interface CalculoResult {
  tipo: TipoCalculo
  resultado: ResultadoFiniquito | ResultadoLiquidacion
  formData: FormData
}

const STORAGE_KEY = 'gevesalec_calculo_finiquito'

export default function CalculadoraFiniquito() {
  // Estados principales
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    tipoRescision: '',
    fechaIngreso: '',
    fechaSalida: '',
    salarioMensual: '',
    diasTrabajadosNoPagados: '0',
    diasVacacionesPendientes: ''
  })
  const [result, setResult] = useState<CalculoResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { trackCTAClick } = useAnalytics()

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData || formData)
        setCurrentStep(parsed.step || 1)
      } catch (error) {
        console.warn('Error loading saved calculation data:', error)
      }
    }
  }, [])

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    if (formData.tipoRescision || formData.salarioMensual) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData,
        step: currentStep,
        timestamp: Date.now()
      }))
    }
  }, [formData, currentStep])

  // Determinar tipo de cálculo basado en tipo de rescisión
  const getTipoCalculo = (tipoRescision: TipoRescision): TipoCalculo => {
    return tipoRescision === 'despido_injustificado' ? 'liquidacion' : 'finiquito'
  }

  // Validar formulario por paso
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step >= 1) {
      if (!formData.tipoRescision) {
        newErrors.tipoRescision = 'Selecciona el tipo de separación'
      }
    }

    if (step >= 2) {
      if (!formData.fechaIngreso) {
        newErrors.fechaIngreso = 'La fecha de ingreso es requerida'
      }
      if (!formData.fechaSalida) {
        newErrors.fechaSalida = 'La fecha de salida es requerida'
      }
      if (!formData.salarioMensual || parseFloat(formData.salarioMensual) <= 0) {
        newErrors.salarioMensual = 'El salario mensual debe ser mayor a 0'
      }

      if (formData.fechaIngreso && formData.fechaSalida) {
        const fechaValidation = validarFechasLaborales(
          new Date(formData.fechaIngreso),
          new Date(formData.fechaSalida)
        )
        if (!fechaValidation.esValido) {
          newErrors.fechas = fechaValidation.errores.join(', ')
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navegar entre pasos
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Calcular finiquito/liquidación
  const handleCalculate = async () => {
    if (!validateStep(2)) return

    setIsCalculating(true)
    trackCTAClick('Calcular Finiquito', 'calculadora-finiquito')

    // Simular procesamiento AI
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const tipoCalculo = getTipoCalculo(formData.tipoRescision as TipoRescision)
      const datos: DatosLiquidacion = {
        salarioMensual: parseFloat(formData.salarioMensual),
        fechaIngreso: new Date(formData.fechaIngreso),
        fechaSalida: new Date(formData.fechaSalida),
        tipoRescision: formData.tipoRescision as TipoRescision,
        incluyeIndemnizacion: tipoCalculo === 'liquidacion',
        incluyePrimaAntiguedad: true,
        diasVacacionesPendientes: formData.diasVacacionesPendientes ? 
          parseFloat(formData.diasVacacionesPendientes) : undefined
      }

      let resultado: ResultadoFiniquito | ResultadoLiquidacion

      if (tipoCalculo === 'liquidacion') {
        resultado = calcularLiquidacionCompleta(datos)
      } else {
        resultado = calcularFiniquitoCompleto({
          salarioMensual: datos.salarioMensual,
          fechaIngreso: datos.fechaIngreso,
          fechaSalida: datos.fechaSalida,
          diasVacacionesPendientes: datos.diasVacacionesPendientes
        })
      }

      setResult({
        tipo: tipoCalculo,
        resultado,
        formData
      })

      setCurrentStep(3)
    } catch (error) {
      console.error('Error calculating:', error)
      setErrors({ calculation: 'Error en el cálculo. Verifica los datos ingresados.' })
    } finally {
      setIsCalculating(false)
    }
  }

  // Reset calculadora
  const resetCalculator = () => {
    setFormData({
      tipoRescision: '',
      fechaIngreso: '',
      fechaSalida: '',
      salarioMensual: '',
      diasTrabajadosNoPagados: '0',
      diasVacacionesPendientes: ''
    })
    setResult(null)
    setCurrentStep(1)
    setErrors({})
    localStorage.removeItem(STORAGE_KEY)
  }

  // Obtener años de antigüedad para display
  const getAnosAntiguedad = (): number => {
    if (!formData.fechaIngreso || !formData.fechaSalida) return 0
    const diff = new Date(formData.fechaSalida).getTime() - new Date(formData.fechaIngreso).getTime()
    return Math.max(0, diff / (1000 * 3600 * 24 * 365.25))
  }

  // Obtener información del tipo de rescisión seleccionado
  const getTipoRescisionInfo = () => {
    return OPCIONES_TIPO_RESCISION.find(opt => opt.value === formData.tipoRescision)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="ai" size="lg" icon={<Calculator size={16} />} className="mb-4">
          ⚖️ Calculadora de Finiquitos y Liquidaciones
        </Badge>
        
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Calcula tu{' '}
          <span className="text-gradient">Finiquito o Liquidación</span>
        </h2>
        
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Obtén un cálculo preciso de tus derechos laborales con base en la 
          Ley Federal del Trabajo y regulaciones mexicanas vigentes.
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-200 text-neutral-500'
              }`}>
                {step}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step <= currentStep ? 'text-primary-600' : 'text-neutral-500'
              }`}>
                {step === 1 && 'Tipo'}
                {step === 2 && 'Datos'}
                {step === 3 && 'Resultado'}
              </div>
              {step < 3 && (
                <div className={`w-8 h-0.5 ml-4 ${
                  step < currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="ai">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && <><Scale size={20} /><span>Tipo de Separación</span></>}
                {currentStep === 2 && <><FileText size={20} /><span>Datos Laborales</span></>}
                {currentStep === 3 && <><TrendingUp size={20} /><span>Resumen del Cálculo</span></>}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Paso 1: Tipo de Rescisión */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      ¿Cómo terminó la relación laboral?
                    </label>
                    <div className="space-y-3">
                      {OPCIONES_TIPO_RESCISION.map((opcion) => (
                        <button
                          key={opcion.value}
                          onClick={() => setFormData(prev => ({ ...prev, tipoRescision: opcion.value }))}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                            formData.tipoRescision === opcion.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {opcion.value === 'renuncia' && <UserCheck size={20} className="text-green-600" />}
                              {opcion.value === 'despido_injustificado' && <UserX size={20} className="text-red-600" />}
                              {opcion.value === 'despido_justificado' && <Scale size={20} className="text-orange-600" />}
                              {opcion.value === 'mutuo_acuerdo' && <Users size={20} className="text-blue-600" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-neutral-900">{opcion.label}</h4>
                              <p className="text-sm text-neutral-600 mt-1">{opcion.descripcion}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  opcion.incluyeIndemnizacion 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {opcion.incluyeIndemnizacion ? 'Con indemnización' : 'Sin indemnización'}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                                  Con prima antigüedad
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.tipoRescision && (
                      <p className="text-red-600 text-sm mt-2">{errors.tipoRescision}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Paso 2: Datos Laborales */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Fechas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Fecha de Ingreso
                      </label>
                      <div className="relative">
                        <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                        <input
                          type="date"
                          value={formData.fechaIngreso}
                          onChange={(e) => setFormData(prev => ({ ...prev, fechaIngreso: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Fecha de Salida
                      </label>
                      <div className="relative">
                        <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                        <input
                          type="date"
                          value={formData.fechaSalida}
                          onChange={(e) => setFormData(prev => ({ ...prev, fechaSalida: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Antigüedad calculada */}
                  {formData.fechaIngreso && formData.fechaSalida && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm text-blue-800">
                        <strong>Antigüedad calculada:</strong> {getAnosAntiguedad().toFixed(2)} años
                      </div>
                    </div>
                  )}

                  {/* Salario Mensual */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Salario Mensual (MXN)
                    </label>
                    <div className="relative">
                      <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <input
                        type="number"
                        value={formData.salarioMensual}
                        onChange={(e) => setFormData(prev => ({ ...prev, salarioMensual: e.target.value }))}
                        placeholder="Ej: 15000"
                        className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  {/* Campos opcionales */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-neutral-900">Campos Opcionales</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Días de Vacaciones Pendientes
                      </label>
                      <input
                        type="number"
                        value={formData.diasVacacionesPendientes}
                        onChange={(e) => setFormData(prev => ({ ...prev, diasVacacionesPendientes: e.target.value }))}
                        placeholder="Si no especificas, se calculará automáticamente"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  {/* Errores */}
                  {(errors.fechaIngreso || errors.fechaSalida || errors.salarioMensual || errors.fechas) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle size={20} className="text-red-600 mt-0.5" />
                        <div className="text-sm text-red-800">
                          {errors.fechaIngreso && <p>{errors.fechaIngreso}</p>}
                          {errors.fechaSalida && <p>{errors.fechaSalida}</p>}
                          {errors.salarioMensual && <p>{errors.salarioMensual}</p>}
                          {errors.fechas && <p>{errors.fechas}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Paso 3: Resumen */}
              {currentStep === 3 && result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-ai-light rounded-lg p-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Resumen del Cálculo</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600">Tipo:</span>
                        <span className="ml-2 font-medium">{getTipoRescisionInfo()?.label}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">Antigüedad:</span>
                        <span className="ml-2 font-medium">{getAnosAntiguedad().toFixed(2)} años</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ai"
                    size="lg"
                    className="w-full"
                    onClick={() => trackCTAClick('Descargar PDF Finiquito', 'calculadora-finiquito')}
                    icon={<Download size={20} />}
                  >
                    Descargar PDF Detallado - $99 MXN
                  </Button>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-neutral-200">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                  >
                    Anterior
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    variant="ai"
                    onClick={currentStep === 2 ? handleCalculate : nextStep}
                    disabled={isCalculating || (currentStep === 1 && !formData.tipoRescision)}
                    className="ml-auto"
                    icon={isCalculating ? undefined : (currentStep === 2 ? <Calculator size={20} /> : undefined)}
                  >
                    {isCalculating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Calculando...</span>
                      </div>
                    ) : currentStep === 2 ? (
                      'Calcular'
                    ) : (
                      'Siguiente'
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={resetCalculator}
                    className="ml-auto"
                  >
                    Nueva Calculación
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          {result ? (
            <>
              {/* Finiquito Card - Always Present */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText size={20} />
                    <span>Finiquito</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Finiquito Summary */}
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 font-medium mb-1">
                      Total Finiquito
                    </div>
                    <div className="text-2xl font-bold text-primary-700">
                      {formatCurrency(
                        result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).finiquito.totalFiniquito
                          : (result.resultado as ResultadoFiniquito).totalFiniquito
                      )}
                    </div>
                  </div>

                  {/* Finiquito Breakdown */}
                  <div className="space-y-3">
                    {[
                      { 
                        label: 'Aguinaldo Proporcional', 
                        value: result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).finiquito.aguinaldoProporcional
                          : (result.resultado as ResultadoFiniquito).aguinaldoProporcional
                      },
                      { 
                        label: 'Vacaciones Pendientes', 
                        value: result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).finiquito.vacacionesPendientes
                          : (result.resultado as ResultadoFiniquito).vacacionesPendientes
                      },
                      { 
                        label: 'Prima Vacacional', 
                        value: result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).finiquito.primaVacacional
                          : (result.resultado as ResultadoFiniquito).primaVacacional
                      },
                      { 
                        label: 'Salarios Pendientes', 
                        value: result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).finiquito.salariosPendientes
                          : (result.resultado as ResultadoFiniquito).salariosPendientes
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between py-2 border-b border-neutral-100"
                      >
                        <span className="text-neutral-700">{item.label}</span>
                        <span className="font-semibold text-neutral-900">
                          {formatCurrency(item.value)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Indemnizations Card - Only for Liquidacion */}
              {result.tipo === 'liquidacion' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Scale size={20} />
                      <span>Indemnizaciones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center justify-between py-2 border-b border-neutral-100"
                      >
                        <span className="text-neutral-700">Indemnización Constitucional</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency((result.resultado as ResultadoLiquidacion).indemnizacionConstitucional)}
                        </span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex items-center justify-between py-2 border-b border-neutral-100"
                      >
                        <span className="text-neutral-700">Prima de Antigüedad</span>
                        <span className="font-semibold text-orange-600">
                          {formatCurrency((result.resultado as ResultadoLiquidacion).primaAntiguedad)}
                        </span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Total General - Prominent */}
              <Card className="border-2 border-primary-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-lg font-medium text-neutral-600 mb-2">
                      Total {result.tipo === 'liquidacion' ? 'Liquidación' : 'Finiquito'}
                    </div>
                    <div className="text-4xl font-bold text-gradient">
                      {formatCurrency(
                        result.tipo === 'liquidacion' 
                          ? (result.resultado as ResultadoLiquidacion).totalLiquidacion
                          : (result.resultado as ResultadoFiniquito).totalFiniquito
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Base Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info size={20} className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Base Legal</p>
                    <p>
                      Cálculo basado en los artículos 76, 87, 162 y 50 de la Ley Federal del Trabajo. 
                      Los resultados son estimaciones que pueden variar según circunstancias específicas.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-16">
                <Calculator size={48} className="text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                  Calculadora Lista
                </h3>
                <p className="text-neutral-500">
                  Completa los datos para obtener tu cálculo de finiquito 
                  o liquidación según la legislación mexicana.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Disclaimer */}
      <motion.div
        className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-start space-x-3">
          <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Aviso Importante</p>
            <p>
              Los resultados son estimaciones basadas en la Ley Federal del Trabajo. 
              Para casos específicos y asesoría legal especializada, consulta con 
              nuestros abogados laboralistas certificados.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}