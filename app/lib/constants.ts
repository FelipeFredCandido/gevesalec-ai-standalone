// Información de la empresa
export const COMPANY_INFO = {
  name: 'GEVESALEC',
  fullName: 'GEVESALEC - Despacho Contable',
  tagline: 'El primer despacho contable mexicano potenciado por IA',
  description: 'Transformamos la contabilidad tradicional con inteligencia artificial para ofrecer servicios más precisos, rápidos y eficientes.',
  email: 'contacto@gevesalec.com',
  phone: '+52 (81) 1680-1924',
  whatsapp: '+528116801924',
  address: {
    street: 'Av. Lazaro Cardenas',
    city: 'Monterrey',
    state: 'NL',
    zipCode: '64500',
    country: 'México',
  },
  socialMedia: {
    facebook: 'https://facebook.com/gevesalec',
    twitter: 'https://twitter.com/gevesalec',
    linkedin: 'https://linkedin.com/company/gevesalec',
    instagram: 'https://instagram.com/gevesalec',
    youtube: 'https://youtube.com/@gevesalec',
  },
  businessHours: {
    weekdays: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    saturday: 'Sábado: 10:00 AM - 2:00 PM',
    sunday: 'Domingo: Cerrado',
  },
} as const

// Servicios principales
export const SERVICES = [
  {
    id: 'consultoria-financiera',
    title: 'Consultoría Financiera',
    description: 'Te ayudamos a tomar decisiones financieras estratégicas para tu PYME. Analizamos tus opciones de inversión y optimizamos tu estructura de capital para impulsar un crecimiento rentable y sostenible.',
    icon: 'TrendingUp',
    features: [
      'Análisis de opciones de inversión',
      'Optimización de estructura de capital',
      'Decisiones financieras estratégicas',
      'Crecimiento rentable y sostenible',
    ],
    price: 'Desde $3,500 MXN/consulta',
    color: 'primary',
  },
  {
    id: 'gestion-nominas',
    title: 'Gestión de Nóminas',
    description: 'Asegura el cumplimiento puntual de tu PYME ante el IMSS y SAT. Nos encargamos del cálculo preciso de salarios y deducciones, evitando errores y multas en tu gestión de nómina.',
    icon: 'Users',
    features: [
      'Cumplimiento puntual IMSS y SAT',
      'Cálculo preciso de salarios',
      'Gestión de deducciones',
      'Prevención de errores y multas',
    ],
    price: 'Desde $200 MXN/empleado',
    color: 'success',
  },
  {
    id: 'planificacion-estrategica',
    title: 'Planificación Estratégica',
    description: 'Creamos planes de negocio sólidos y modelos financieros realistas para tu PYME, definiendo una hoja de ruta clara para alcanzar tus objetivos de crecimiento de forma estructurada.',
    icon: 'Target',
    features: [
      'Planes de negocio sólidos',
      'Modelos financieros realistas',
      'Hoja de ruta clara',
      'Objetivos de crecimiento estructurado',
    ],
    price: 'Desde $4,500 MXN/proyecto',
    color: 'accent',
  },
  {
    id: 'contabilidad-integral',
    title: 'Contabilidad Integral',
    description: 'Llevamos la contabilidad completa de tu PYME al día, desde el registro de operaciones hasta la preparación de estados financieros claros. Asegura el cumplimiento con el SAT y obtén la información precisa que necesitas para gestionar tu negocio eficazmente.',
    icon: 'Calculator',
    features: [
      'Contabilidad completa al día',
      'Registro de operaciones',
      'Estados financieros claros',
      'Cumplimiento total con SAT',
    ],
    price: 'Desde $2,800 MXN/mes',
    color: 'primary',
  },
  {
    id: 'asesoria-fiscal-estrategica',
    title: 'Asesoría Fiscal Estratégica',
    description: 'Navega el complejo sistema fiscal mexicano con confianza. Ayudamos a tu PYME con la preparación de declaraciones, planificación fiscal estratégica para optimizar tu carga tributaria legalmente y asegurar el cumplimiento total ante el SAT.',
    icon: 'FileText',
    features: [
      'Preparación de declaraciones',
      'Planificación fiscal estratégica',
      'Optimización legal de carga tributaria',
      'Cumplimiento total ante SAT',
    ],
    price: 'Desde $2,200 MXN/mes',
    color: 'success',
  },
  {
    id: 'automatizacion-procesos',
    title: 'Automatización de Procesos',
    description: 'Implementamos soluciones para automatizar procesos clave en tu PYME. Reduce la carga de trabajo manual, minimiza errores y acelera tus cierres mensuales, liberando tiempo valioso para que te enfoques en el crecimiento estratégico.',
    icon: 'Zap',
    features: [
      'Automatización de procesos clave',
      'Reducción de trabajo manual',
      'Minimización de errores',
      'Aceleración de cierres mensuales',
    ],
    price: 'Desde $3,800 MXN/implementación',
    color: 'accent',
  },
] as const

// Características de IA
export const AI_FEATURES = [
  {
    title: 'Clasificación Inteligente',
    description: 'Nuestro sistema clasifica automáticamente todos tus gastos e ingresos con 99.2% de precisión.',
    icon: 'Zap',
    stat: '99.2%',
    statLabel: 'Precisión',
  },
  {
    title: 'Detección de Errores',
    description: 'Identifica discrepancias y errores potenciales antes de que se conviertan en problemas.',
    icon: 'Shield',
    stat: '24/7',
    statLabel: 'Monitoreo',
  },
  {
    title: 'Reportes Predictivos',
    description: 'Genera reportes que predicen tendencias financieras y oportunidades de optimización.',
    icon: 'BarChart3',
    stat: '30%',
    statLabel: 'Ahorro promedio',
  },
  {
    title: 'Asistente Virtual',
    description: 'ChatBot inteligente que responde dudas fiscales y contables las 24 horas.',
    icon: 'MessageCircle',
    stat: '<1min',
    statLabel: 'Tiempo respuesta',
  },
] as const

// Testimonios de clientes
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'María González',
    role: 'CEO, TechStartup MX',
    company: 'TechStartup MX',
    content: 'GEVESALEC revolucionó nuestra contabilidad. La IA detectó errores que llevábamos arrastrando por meses y nos ahorró miles en optimización fiscal.',
    rating: 5,
    image: '/team/maria-gonzalez.jpg',
  },
  {
    id: 2,
    name: 'Alberto Maldonado',
    role: 'Director Financiero',
    company: 'Autotransportes Maldonado',
    content: 'El sistema de nómina digital es increíble. Lo que antes nos tomaba días, ahora se hace en minutos con total precisión.',
    rating: 5,
    image: '/team/alberto-maldonado.jpg',
  },
  {
    id: 3,
    name: 'Tomás Hernández',
    role: 'Propietario',
    company: 'Refacciones y Accesorios',
    content: 'Como dueño de un negocio, necesitaba un servicio confiable. GEVESALEC me da la tranquilidad de tener todo en orden.',
    rating: 5,
    image: '/team/tomas-hernandez.jpg',
  },
] as const

// Preguntas frecuentes
export const FAQ = [
  {
    question: '¿Cómo funciona la IA en los servicios contables?',
    answer: 'Nuestra inteligencia artificial analiza patrones en tus transacciones, aprende de tu negocio y automatiza tareas repetitivas como clasificación de gastos, detección de errores y generación de reportes.',
  },
  {
    question: '¿Es seguro usar IA para mi contabilidad?',
    answer: 'Absolutamente. Nuestra IA cumple con todos los estándares de seguridad bancaria, encripta toda la información y está supervisada por contadores públicos certificados.',
  },
  {
    question: '¿Qué pasa si la IA comete un error?',
    answer: 'Todos los procesos de IA son revisados por nuestros contadores expertos. Además, ofrecemos garantía total en caso de errores y seguro de responsabilidad profesional.',
  },
  {
    question: '¿Puedo migrar desde mi actual despacho contable?',
    answer: 'Sí, ofrecemos migración gratuita de todos tus datos. Nuestro equipo se encarga de la transición sin interrumpir tus operaciones.',
  },
  {
    question: '¿Cuánto tiempo toma implementar el sistema?',
    answer: 'La implementación básica toma 24-48 horas. Para empresas grandes con procesos complejos, puede tomar hasta una semana.',
  },
  {
    question: '¿Ofrecen soporte técnico?',
    answer: 'Sí, ofrecemos soporte 24/7 a través de nuestro asistente virtual IA y soporte humano especializado en horarios de oficina.',
  },
] as const

// Estadísticas de la empresa
export const STATS = [
  {
    number: '50+',
    label: 'Empresas atendidas',
    description: 'Clientes satisfechos en todo México',
  },
  {
    number: '99.8%',
    label: 'Precisión IA',
    description: 'En clasificación automática',
  },
  {
    number: '24/7',
    label: 'Disponibilidad',
    description: 'Asistente virtual siempre activo',
  },
  {
    number: '75%',
    label: 'Tiempo ahorrado',
    description: 'Reducción en procesos manuales',
  },
] as const

// Navegación del sitio
export const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'IA Features', href: '#ia-features' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Contacto', href: '#contacto' },
] as const

// Links del footer
export const FOOTER_LINKS = {
  services: [
    { name: 'Consultoría Financiera', href: '/servicios/consultoria-financiera' },
    { name: 'Gestión de Nóminas', href: '/servicios/gestion-nominas' },
    { name: 'Planificación Estratégica', href: '/servicios/planificacion-estrategica' },
    { name: 'Contabilidad Integral', href: '/servicios/contabilidad-integral' },
    { name: 'Asesoría Fiscal Estratégica', href: '/servicios/asesoria-fiscal-estrategica' },
    { name: 'Automatización de Procesos', href: '/servicios/automatizacion-procesos' },
  ],
  company: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Equipo', href: '/equipo' },
    { name: 'Carreras', href: '/carreras' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Centro de Ayuda', href: '/ayuda' },
    { name: 'Calculadoras', href: '/calculadoras' },
    { name: 'Guías Fiscales', href: '/guias' },
    { name: 'API Documentation', href: '/api-docs' },
  ],
  legal: [
    { name: 'Aviso de Privacidad', href: '/privacidad' },
    { name: 'Términos de Servicio', href: '/terminos' },
    { name: 'Política de Cookies', href: '/cookies' },
    { name: 'Compliance', href: '/compliance' },
  ],
} as const

// Metadatos SEO
export const SEO_DEFAULTS = {
  title: 'GEVESALEC - Despacho Contable con IA | México',
  description: 'El primer despacho contable mexicano potenciado por inteligencia artificial. Servicios de contabilidad, nómina y fiscal con tecnología avanzada.',
  keywords: [
    'contador público México',
    'despacho contable IA',
    'contabilidad inteligencia artificial',
    'servicios fiscales automatizados',
    'nómina digital México',
    'declaraciones fiscales IA',
    'GEVESALEC',
    'contador México CDMX',
  ] as string[],
  ogImage: '/images/og-image.jpg',
  twitterCard: 'summary_large_image',
} as const

// Configuración de analytics
export const ANALYTICS = {
  googleAnalyticsId: 'G-XXXXXXXXXX',
  facebookPixelId: '1234567890',
  linkedInPartnerId: 'XXXXXXX',
} as const

// Configuración de contacto
export const CONTACT_CONFIG = {
  emailTo: 'contacto@gevesalec.com',
  emailSubject: 'Solicitud de información - GEVESALEC',
  autoReplyEnabled: true,
  notificationEmails: ['admin@gevesalec.com', 'ventas@gevesalec.com'],
} as const

// Tipos de empresa para formularios
export const COMPANY_TYPES = [
  'Persona Física con Actividad Empresarial',
  'Sociedad Anónima (S.A.)',
  'Sociedad de Responsabilidad Limitada (S. de R.L.)',
  'Sociedad Anónima de Capital Variable (S.A. de C.V.)',
  'Sociedad Cooperativa',
  'Asociación Civil (A.C.)',
  'Fundación',
  'Otro',
] as const

// Sectores económicos
export const BUSINESS_SECTORS = [
  'Comercio',
  'Servicios',
  'Manufactura',
  'Construcción',
  'Tecnología',
  'Salud',
  'Educación',
  'Turismo',
  'Agricultura',
  'Transporte',
  'Finanzas',
  'Inmobiliario',
  'Otro',
] as const