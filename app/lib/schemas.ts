import { z } from 'zod'

// Schema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el signo +'),
  
  companyType: z.enum(['fisica', 'moral', 'startup', 'pyme', 'corporativo'], {
    required_error: 'Por favor selecciona el tipo de empresa',
  }),
  
  situation: z
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .optional(),
})

// Tipo TypeScript inferido automáticamente del schema
export type ContactFormData = z.infer<typeof contactFormSchema>

// Labels para los tipos de empresa (para mostrar en UI)
export const companyTypeLabels: Record<ContactFormData['companyType'], string> = {
  fisica: 'Persona Física',
  moral: 'Persona Moral',
  startup: 'Startup',
  pyme: 'PyME',
  corporativo: 'Corporativo',
}