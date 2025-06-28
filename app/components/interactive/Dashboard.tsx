'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Calendar,
  Activity,
  Users,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import Badge from '@/app/components/ui/Badge'
import { formatCurrency } from '@/app/lib/utils'
import { useAnalytics } from '@/app/lib/analytics'

interface DashboardData {
  revenue: {
    current: number
    previous: number
    growth: number
  }
  expenses: {
    current: number
    previous: number
    growth: number
  }
  taxes: {
    owed: number
    paid: number
    nextDue: string
  }
  documents: {
    processed: number
    pending: number
    errors: number
  }
  aiMetrics: {
    accuracy: number
    timesSaved: number
    documentsAutomated: number
  }
}

const mockData: DashboardData = {
  revenue: {
    current: 2450000,
    previous: 2100000,
    growth: 16.7
  },
  expenses: {
    current: 1850000,
    previous: 1920000,
    growth: -3.6
  },
  taxes: {
    owed: 245000,
    paid: 180000,
    nextDue: '2024-01-17'
  },
  documents: {
    processed: 1247,
    pending: 23,
    errors: 3
  },
  aiMetrics: {
    accuracy: 99.2,
    timesSaved: 45,
    documentsAutomated: 1870
  }
}

const recentActivities = [
  {
    type: 'success',
    icon: CheckCircle,
    title: 'Factura procesada automáticamente',
    description: 'CFDI-12345 clasificado como gasto de oficina',
    timestamp: 'Hace 2 minutos',
    amount: 15420
  },
  {
    type: 'warning',
    icon: AlertCircle,
    title: 'Posible error detectado',
    description: 'RFC inconsistente en documento 67890',
    timestamp: 'Hace 15 minutos',
    amount: null
  },
  {
    type: 'info',
    icon: FileText,
    title: 'Reporte mensual generado',
    description: 'Balance general diciembre 2024',
    timestamp: 'Hace 1 hora',
    amount: null
  },
  {
    type: 'success',
    icon: TrendingUp,
    title: 'Optimización fiscal aplicada',
    description: 'Deducción adicional identificada',
    timestamp: 'Hace 3 horas',
    amount: 8500
  }
]

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(mockData)
  const [isLoading, setIsLoading] = useState(true)
  const { trackCTAClick } = useAnalytics()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const StatCard = ({ 
    title, 
    value, 
    previousValue, 
    growth, 
    icon: Icon, 
    format = 'currency',
    color = 'primary' 
  }: {
    title: string
    value: number
    previousValue?: number
    growth?: number
    icon: any
    format?: 'currency' | 'number' | 'percentage'
    color?: 'primary' | 'success' | 'warning' | 'accent'
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'currency':
          return formatCurrency(val)
        case 'percentage':
          return `${val.toFixed(1)}%`
        default:
          return val.toLocaleString()
      }
    }

    const colorClasses = {
      primary: 'text-primary-600 bg-primary-100',
      success: 'text-success-600 bg-success-100',
      warning: 'text-warning-600 bg-warning-100',
      accent: 'text-accent-600 bg-accent-100'
    }

    return (
      <Card hover={true}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">{title}</p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">
                {formatValue(value)}
              </p>
              {growth !== undefined && (
                <div className="flex items-center mt-2">
                  {growth > 0 ? (
                    <TrendingUp size={16} className="text-success-600 mr-1" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    growth > 0 ? 'text-success-600' : 'text-red-600'
                  }`}>
                    {Math.abs(growth).toFixed(1)}%
                  </span>
                  <span className="text-xs text-neutral-500 ml-1">vs mes anterior</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
              <Icon size={24} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-neutral-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-neutral-200 rounded-lg"></div>
            <div className="h-96 bg-neutral-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Dashboard Inteligente
            </h1>
            <p className="text-neutral-600">
              Análisis en tiempo real potenciado por IA • Última actualización: ahora
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="success" icon={<Activity size={14} />}>
              Sistema Activo
            </Badge>
            <Button
              variant="ai"
              icon={<BarChart3 size={18} />}
              onClick={() => trackCTAClick('Exportar Reporte', 'dashboard')}
            >
              Exportar Reporte
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatCard
          title="Ingresos del Mes"
          value={data.revenue.current}
          growth={data.revenue.growth}
          icon={DollarSign}
          color="success"
        />
        
        <StatCard
          title="Gastos del Mes"
          value={data.expenses.current}
          growth={data.expenses.growth}
          icon={TrendingDown}
          color="warning"
        />
        
        <StatCard
          title="Documentos Procesados"
          value={data.documents.processed}
          icon={FileText}
          format="number"
          color="primary"
        />
        
        <StatCard
          title="Precisión de IA"
          value={data.aiMetrics.accuracy}
          icon={Zap}
          format="percentage"
          color="accent"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap size={20} className="text-primary-600" />
                <span>Rendimiento de IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-ai-light rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {data.aiMetrics.accuracy}%
                  </div>
                  <div className="text-sm text-neutral-600">Precisión</div>
                </div>
                
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600 mb-1">
                    {data.aiMetrics.timesSaved}h
                  </div>
                  <div className="text-sm text-neutral-600">Tiempo Ahorrado</div>
                </div>
                
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    {data.aiMetrics.documentsAutomated}
                  </div>
                  <div className="text-sm text-neutral-600">Docs Automatizados</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Clasificación Automática</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-ai h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '96%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Detección de Errores</span>
                    <span>99%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-success-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '99%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Optimización Fiscal</span>
                    <span>87%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-accent-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '87%' }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => trackCTAClick('Ver Detalles IA', 'dashboard')}
              >
                Ver Detalles de IA
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity size={20} className="text-primary-600" />
                <span>Actividad Reciente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center shrink-0
                      ${activity.type === 'success' ? 'bg-success-100 text-success-600' :
                        activity.type === 'warning' ? 'bg-warning-100 text-warning-600' :
                        'bg-primary-100 text-primary-600'}
                    `}>
                      <activity.icon size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {activity.title}
                        </p>
                        {activity.amount && (
                          <span className="text-sm font-semibold text-success-600 ml-2">
                            {formatCurrency(activity.amount)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => trackCTAClick('Ver Todas Actividades', 'dashboard')}
              >
                Ver Todas las Actividades
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tax Status */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary-600" />
              <span>Estado de Obligaciones Fiscales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {formatCurrency(data.taxes.owed)}
                </div>
                <div className="text-sm text-red-700 mb-1">Impuestos por Pagar</div>
                <div className="text-xs text-red-600">
                  Vence: {new Date(data.taxes.nextDue).toLocaleDateString('es-MX')}
                </div>
              </div>
              
              <div className="text-center p-6 bg-success-50 rounded-lg border border-success-200">
                <div className="text-3xl font-bold text-success-600 mb-2">
                  {formatCurrency(data.taxes.paid)}
                </div>
                <div className="text-sm text-success-700 mb-1">Impuestos Pagados</div>
                <div className="text-xs text-success-600">Este ejercicio fiscal</div>
              </div>
              
              <div className="text-center p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="text-3xl font-bold text-neutral-600 mb-2">
                  {((data.taxes.paid / (data.taxes.paid + data.taxes.owed)) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-neutral-700 mb-1">Cumplimiento</div>
                <div className="text-xs text-neutral-600">Progreso anual</div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                variant="ai"
                onClick={() => trackCTAClick('Calcular Impuestos', 'dashboard')}
              >
                Calcular Próximos Impuestos
              </Button>
              <Button
                variant="outline"
                onClick={() => trackCTAClick('Programar Pago', 'dashboard')}
              >
                Programar Pago
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}