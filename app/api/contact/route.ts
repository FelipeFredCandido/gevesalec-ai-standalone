import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema, type ContactFormData } from '@/app/lib/schemas'
import { createNotificationEmailTemplate, createClientConfirmationTemplate } from '@/app/lib/email-templates'

// Initialize Resend only when needed
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la request
    const body = await request.json()
    
    // Validar los datos usando el mismo schema que el cliente
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos de formulario inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    const formData: ContactFormData = validationResult.data
    
    console.log('📧 Procesando nuevo contacto:', {
      nombre: formData.name,
      email: formData.email,
      tipoEmpresa: formData.companyType,
      fecha: new Date().toISOString(),
    })

    // Enviar emails usando Resend
    try {
      const resendClient = getResendClient()
      
      if (!resendClient) {
        console.error('❌ Resend client not initialized - missing RESEND_API_KEY')
        throw new Error('Email service not configured')
      }

      // Email de notificación para el equipo
      const notificationEmail = createNotificationEmailTemplate(formData)
      await resendClient.emails.send({
        from: 'GEVESALEC <noreply@gevesalec.com>',
        to: ['contacto@gevesalec.com'],
        subject: `Nueva consulta de ${formData.name}`,
        html: notificationEmail,
      })

      // Email de confirmación para el cliente
      const confirmationEmail = createClientConfirmationTemplate(formData)
      await resendClient.emails.send({
        from: 'GEVESALEC <noreply@gevesalec.com>',
        to: [formData.email],
        subject: 'Confirmación de tu consulta - GEVESALEC',
        html: confirmationEmail,
      })

      console.log('✅ Emails enviados exitosamente')
      
    } catch (emailError) {
      console.error('❌ Error enviando emails:', emailError)
      // No fallar la request si el email falla, solo registrar el error
    }
    
    return NextResponse.json({
      success: true,
      message: 'Consulta recibida exitosamente. Nos pondremos en contacto contigo en menos de 24 horas.',
      data: {
        name: formData.name,
        email: formData.email,
        submittedAt: new Date().toISOString(),
      }
    }, { status: 200 })
    
  } catch (error) {
    console.error('❌ Error procesando formulario de contacto:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor intenta nuevamente.' 
      },
      { status: 500 }
    )
  }
}

// Método GET para verificar que el endpoint está disponible
export async function GET() {
  return NextResponse.json({ 
    message: 'Contact API endpoint is running',
    status: 'ok' 
  })
}