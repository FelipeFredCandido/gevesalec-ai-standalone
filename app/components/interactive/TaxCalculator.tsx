'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, FileText, TrendingUp, Info, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { formatCurrency, calculateISR, calculateIVA, validateRFC } from '@/app/lib/utils'
import { useAnalytics } from '@/app/lib/analytics'

interface TaxResult {
  grossIncome: number
  deductions: number
  taxableIncome: number
  isr: number
  iva: number
  totalTaxes: number
  netIncome: number
  effectiveRate: number
}

export default function TaxCalculator() {
  const [income, setIncome] = useState('')
  const [deductions, setDeductions] = useState('')
  const [personType, setPersonType] = useState<'fisica' | 'moral'>('fisica')
  const [taxRegime, setTaxRegime] = useState('general')
  const [result, setResult] = useState<TaxResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const { trackCTAClick } = useAnalytics()

  const handleCalculate = async () => {
    if (!income || parseFloat(income) <= 0) return

    setIsCalculating(true)
    trackCTAClick('Calcular Impuestos', 'tax-calculator')

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const grossIncome = parseFloat(income)
    const totalDeductions = parseFloat(deductions) || 0
    const taxableIncome = Math.max(0, grossIncome - totalDeductions)

    const isr = calculateISR(taxableIncome, personType, taxRegime)
    const iva = calculateIVA(grossIncome)
    const totalTaxes = isr + iva
    const netIncome = grossIncome - totalTaxes
    const effectiveRate = (totalTaxes / grossIncome) * 100

    setResult({
      grossIncome,
      deductions: totalDeductions,
      taxableIncome,
      isr,
      iva,
      totalTaxes,
      netIncome,
      effectiveRate
    })

    setIsCalculating(false)
  }

  const resetCalculator = () => {
    setIncome('')
    setDeductions('')
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="ai" size="lg" icon={<Calculator size={16} />} className="mb-4">
          🧮 Calculadora IA de Impuestos
        </Badge>
        
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Calcula tus Impuestos con{' '}
          <span className="text-gradient">Inteligencia Artificial</span>
        </h2>
        
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Obtén una estimación precisa de tus obligaciones fiscales utilizando
          nuestros algoritmos de IA entrenados específicamente para el SAT mexicano.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="ai">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText size={20} />
                <span>Información Fiscal</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Person Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tipo de Persona
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'fisica', label: 'Persona Física' },
                    { value: 'moral', label: 'Persona Moral' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPersonType(option.value as 'fisica' | 'moral')}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        personType === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tax Regime */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Régimen Fiscal
                </label>
                <select
                  value={taxRegime}
                  onChange={(e) => setTaxRegime(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="general">General de Ley</option>
                  <option value="simplificado">Régimen Simplificado</option>
                  <option value="incorporacion">Régimen de Incorporación Fiscal</option>
                  <option value="actividades">Actividades Empresariales</option>
                </select>
              </div>

              {/* Income Input */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Ingresos Brutos Anuales (MXN)
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Ej: 500000"
                    className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Deductions Input */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Deducciones Estimadas (MXN)
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    placeholder="Ej: 50000"
                    className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Incluye gastos médicos, donativos, colegiaturas, etc.
                </p>
              </div>

              {/* Calculate Button */}
              <Button
                variant="ai"
                size="lg"
                className="w-full"
                onClick={handleCalculate}
                disabled={!income || isCalculating}
                icon={isCalculating ? undefined : <Calculator size={20} />}
              >
                {isCalculating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculando con IA...</span>
                  </div>
                ) : (
                  'Calcular Impuestos'
                )}
              </Button>

              {/* Reset Button */}
              {result && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={resetCalculator}
                >
                  Nueva Calculación
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {result ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp size={20} />
                  <span>Resultados del Cálculo</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-primary-600 font-medium mb-1">
                      Total de Impuestos
                    </div>
                    <div className="text-2xl font-bold text-primary-700">
                      {formatCurrency(result.totalTaxes)}
                    </div>
                  </div>
                  
                  <div className="bg-success-50 rounded-lg p-4">
                    <div className="text-sm text-success-600 font-medium mb-1">
                      Ingreso Neto
                    </div>
                    <div className="text-2xl font-bold text-success-700">
                      {formatCurrency(result.netIncome)}
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-neutral-900">Desglose Detallado</h4>
                  
                  {[
                    { label: 'Ingresos Brutos', value: result.grossIncome, color: 'neutral' },
                    { label: 'Deducciones', value: result.deductions, color: 'success', isDeduction: true },
                    { label: 'Base Gravable', value: result.taxableIncome, color: 'neutral' },
                    { label: 'ISR', value: result.isr, color: 'primary' },
                    { label: 'IVA', value: result.iva, color: 'accent' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between py-3 border-b border-neutral-100"
                    >
                      <span className="text-neutral-700">{item.label}</span>
                      <span className={`font-semibold ${
                        item.color === 'primary' ? 'text-primary-600' :
                        item.color === 'success' ? 'text-success-600' :
                        item.color === 'accent' ? 'text-accent-600' :
                        'text-neutral-900'
                      }`}>
                        {item.isDeduction ? '-' : ''}{formatCurrency(item.value)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Effective Rate */}
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700 font-medium">Tasa Efectiva</span>
                    <span className="text-xl font-bold text-neutral-900">
                      {result.effectiveRate.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-gradient-ai-light rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info size={20} className="text-primary-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-neutral-900 mb-2">
                        Recomendaciones de IA
                      </h5>
                      <ul className="text-sm text-neutral-700 space-y-1">
                        {result.effectiveRate > 25 && (
                          <li>• Considera incrementar tus deducciones autorizadas</li>
                        )}
                        {result.deductions < result.grossIncome * 0.15 && (
                          <li>• Podrías optimizar tus gastos deducibles</li>
                        )}
                        <li>• Evalúa cambiar a un régimen fiscal más conveniente</li>
                        <li>• Considera la planeación fiscal para el próximo ejercicio</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="ai"
                  size="lg"
                  className="w-full"
                  onClick={() => trackCTAClick('Optimizar desde Calculadora', 'tax-calculator')}
                >
                  Optimizar mi Situación Fiscal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-16">
                <Calculator size={48} className="text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                  Calculadora Lista
                </h3>
                <p className="text-neutral-500">
                  Ingresa tus datos para obtener un cálculo preciso
                  de tus impuestos con inteligencia artificial.
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
              Los resultados son estimaciones basadas en la información proporcionada y 
              algoritmos de IA. Para cálculos oficiales y estrategias fiscales específicas, 
              consulta con nuestros contadores certificados.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}